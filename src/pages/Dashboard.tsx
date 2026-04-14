import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award, Bell } from "lucide-react";

interface EnrolledCourse {
  id: string;
  course_id: string;
  enrolled_at: string;
  completed_at: string | null;
  payment_status: string;
  course: {
    id: string;
    title: string;
    short_description: string | null;
    thumbnail_url: string | null;
    duration_weeks: number | null;
  };
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<EnrolledCourse[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ display_name: string | null }>({ display_name: null });

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", user.id)
        .maybeSingle();
      if (profileData) setProfile(profileData);

      // Fetch enrollments with courses
      const { data: enrollmentData } = await supabase
        .from("enrollments")
        .select("id, course_id, enrolled_at, completed_at, payment_status")
        .eq("user_id", user.id)
        .eq("payment_status", "paid");

      if (enrollmentData && enrollmentData.length > 0) {
        const courseIds = enrollmentData.map((e) => e.course_id);
        const { data: courses } = await supabase
          .from("courses")
          .select("id, title, short_description, thumbnail_url, duration_weeks")
          .in("id", courseIds);

        // Fetch all lessons for these courses
        const { data: modules } = await supabase
          .from("modules")
          .select("id, course_id")
          .in("course_id", courseIds);

        const moduleIds = modules?.map((m) => m.id) ?? [];
        const { data: lessons } = await supabase
          .from("lessons")
          .select("id, module_id")
          .in("module_id", moduleIds);

        // Fetch user progress
        const lessonIds = lessons?.map((l) => l.id) ?? [];
        const { data: progressData } = await supabase
          .from("lesson_progress")
          .select("lesson_id, completed")
          .eq("user_id", user.id)
          .in("lesson_id", lessonIds)
          .eq("completed", true);

        const completedSet = new Set(progressData?.map((p) => p.lesson_id) ?? []);

        const enriched: EnrolledCourse[] = enrollmentData.map((enrollment) => {
          const course = courses?.find((c) => c.id === enrollment.course_id);
          const courseModules = modules?.filter((m) => m.course_id === enrollment.course_id) ?? [];
          const courseModuleIds = courseModules.map((m) => m.id);
          const courseLessons = lessons?.filter((l) => courseModuleIds.includes(l.module_id)) ?? [];
          const completedCount = courseLessons.filter((l) => completedSet.has(l.id)).length;
          const total = courseLessons.length;

          return {
            ...enrollment,
            course: course ?? { id: enrollment.course_id, title: "Unknown", short_description: null, thumbnail_url: null, duration_weeks: null },
            progress: total > 0 ? Math.round((completedCount / total) * 100) : 0,
            totalLessons: total,
            completedLessons: completedCount,
          };
        });

        setEnrollments(enriched);

        // Fetch announcements for enrolled courses
        const { data: ann } = await supabase
          .from("announcements")
          .select("*")
          .in("course_id", courseIds)
          .order("created_at", { ascending: false })
          .limit(5);
        setAnnouncements(ann ?? []);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold mb-2">
            Welcome back, {profile.display_name || "Student"}!
          </h1>
          <p className="text-muted-foreground mb-8">Track your learning progress and continue your courses.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Enrolled Courses</span>
            </div>
            <span className="text-3xl font-bold">{enrollments.length}</span>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">Lessons Completed</span>
            </div>
            <span className="text-3xl font-bold">
              {enrollments.reduce((a, e) => a + e.completedLessons, 0)}
            </span>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Courses Completed</span>
            </div>
            <span className="text-3xl font-bold">
              {enrollments.filter((e) => e.progress === 100).length}
            </span>
          </div>
        </div>

        {/* Courses */}
        <h2 className="font-heading text-xl font-semibold mb-4">My Courses</h2>
        {enrollments.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading text-lg font-semibold mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-4">Browse our programs and enroll to start learning.</p>
            <Button asChild>
              <Link to="/programs">Browse Programs</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {enrollments.map((enrollment, i) => (
              <motion.div
                key={enrollment.id}
                className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="h-32 bg-hero-gradient flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white/80" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold mb-2 line-clamp-2">{enrollment.course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {enrollment.course.short_description}
                  </p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{enrollment.completedLessons}/{enrollment.totalLessons} lessons</span>
                      <span>{enrollment.progress}%</span>
                    </div>
                    <Progress value={enrollment.progress} className="h-2" />
                  </div>
                  <Button asChild className="w-full" variant={enrollment.progress > 0 ? "default" : "outline"}>
                    <Link to={`/dashboard/courses/${enrollment.course.id}`}>
                      {enrollment.progress > 0 ? "Continue Learning" : "Start Course"}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Announcements */}
        {announcements.length > 0 && (
          <>
            <h2 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" /> Announcements
            </h2>
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.id} className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-medium text-sm mb-1">{a.title}</h4>
                  <p className="text-xs text-muted-foreground">{a.content}</p>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {new Date(a.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
