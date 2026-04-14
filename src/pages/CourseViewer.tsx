import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, BookOpen } from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  sort_order: number;
  completed: boolean;
}

const CourseViewer = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalLessons, setTotalLessons] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const fetchCourseData = async () => {
    if (!courseId || !user) return;

    const { data: courseData } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single();
    setCourse(courseData);

    const { data: modulesData } = await supabase
      .from("modules")
      .select("*")
      .eq("course_id", courseId)
      .order("sort_order");

    const moduleIds = modulesData?.map((m) => m.id) ?? [];
    const { data: lessonsData } = await supabase
      .from("lessons")
      .select("*")
      .in("module_id", moduleIds)
      .order("sort_order");

    const lessonIds = lessonsData?.map((l) => l.id) ?? [];
    const { data: progressData } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .in("lesson_id", lessonIds)
      .eq("completed", true);

    const completedSet = new Set(progressData?.map((p) => p.lesson_id) ?? []);

    const enrichedModules: Module[] = (modulesData ?? []).map((mod) => ({
      ...mod,
      lessons: (lessonsData ?? [])
        .filter((l) => l.module_id === mod.id)
        .map((l) => ({ ...l, completed: completedSet.has(l.id) })),
    }));

    setModules(enrichedModules);
    setTotalLessons(lessonIds.length);
    setCompletedCount(completedSet.size);

    // Set first incomplete lesson as active, or first lesson
    if (!activeLesson) {
      const allLessons = enrichedModules.flatMap((m) => m.lessons);
      const firstIncomplete = allLessons.find((l) => !l.completed);
      setActiveLesson(firstIncomplete ?? allLessons[0] ?? null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId, user]);

  const toggleLessonComplete = async (lesson: Lesson) => {
    if (!user) return;

    if (lesson.completed) {
      // Mark incomplete — delete the record
      await supabase
        .from("lesson_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("lesson_id", lesson.id);
    } else {
      await supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_id: lesson.id,
        completed: true,
        completed_at: new Date().toISOString(),
      });
      toast({ title: "Lesson completed! 🎉" });
    }

    // Refresh data
    await fetchCourseData();
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </main>
    );
  }

  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div className="flex-1">
            <h1 className="font-heading text-xl font-bold">{course?.title}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground">{completedCount}/{totalLessons} lessons</span>
              <Progress value={progress} className="h-2 flex-1 max-w-xs" />
              <span className="text-xs font-medium text-primary">{progress}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar — module/lesson list */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="rounded-xl border border-border bg-card overflow-hidden sticky top-24">
              <div className="p-4 border-b border-border">
                <h2 className="font-heading font-semibold text-sm">Course Content</h2>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {modules.map((mod) => (
                  <div key={mod.id}>
                    <div className="px-4 py-3 bg-muted/50 border-b border-border">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {mod.title}
                      </span>
                    </div>
                    {mod.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-border hover:bg-muted/30 transition-colors ${
                          activeLesson?.id === lesson.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={`text-sm ${lesson.completed ? "text-muted-foreground line-through" : ""}`}>
                          {lesson.title}
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {activeLesson ? (
              <motion.div
                key={activeLesson.id}
                className="rounded-xl border border-border bg-card p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-heading text-2xl font-bold mb-1">{activeLesson.title}</h2>
                  </div>
                  <Button
                    variant={activeLesson.completed ? "outline" : "default"}
                    size="sm"
                    onClick={() => toggleLessonComplete(activeLesson)}
                  >
                    {activeLesson.completed ? "Mark Incomplete" : "Mark Complete"}
                  </Button>
                </div>

                {activeLesson.video_url && (
                  <div className="aspect-video rounded-lg bg-muted mb-6 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground ml-2">Video content</span>
                  </div>
                )}

                <div className="prose prose-sm max-w-none text-foreground">
                  {activeLesson.content ? (
                    <div className="whitespace-pre-wrap">{activeLesson.content}</div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Lesson content will be available soon.</p>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  {(() => {
                    const allLessons = modules.flatMap((m) => m.lessons);
                    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
                    const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
                    const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
                    return (
                      <>
                        <Button variant="outline" disabled={!prev} onClick={() => prev && setActiveLesson(prev)}>
                          Previous
                        </Button>
                        <Button disabled={!next} onClick={() => next && setActiveLesson(next)}>
                          Next Lesson
                        </Button>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a lesson to begin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseViewer;
