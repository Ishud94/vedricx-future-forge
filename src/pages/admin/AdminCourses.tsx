import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, ArrowLeft, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  description: string | null;
  short_description: string | null;
  price: number;
  duration_weeks: number | null;
  is_published: boolean;
  software_tools: string[] | null;
  target_roles: string[] | null;
}

interface ModuleWithLessons {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
  lessons: { id: string; title: string; content: string | null; sort_order: number }[];
}

const AdminCourses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [courseModules, setCourseModules] = useState<ModuleWithLessons[]>([]);

  // Form state
  const [form, setForm] = useState({
    title: "", description: "", short_description: "", price: "0",
    duration_weeks: "", is_published: false, software_tools: "", target_roles: "",
  });

  // Module/lesson form
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [addingModuleTo, setAddingModuleTo] = useState<string | null>(null);
  const [addingLessonTo, setAddingLessonTo] = useState<string | null>(null);

  const fetchCourses = async () => {
    const { data } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
    setCourses(data ?? []);
    setLoading(false);
  };

  const fetchModules = async (courseId: string) => {
    const { data: modules } = await supabase
      .from("modules").select("*").eq("course_id", courseId).order("sort_order");
    const moduleIds = modules?.map((m) => m.id) ?? [];
    const { data: lessons } = await supabase
      .from("lessons").select("*").in("module_id", moduleIds).order("sort_order");

    setCourseModules(
      (modules ?? []).map((m) => ({
        ...m,
        lessons: (lessons ?? []).filter((l) => l.module_id === m.id),
      }))
    );
  };

  useEffect(() => { fetchCourses(); }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", short_description: "", price: "0", duration_weeks: "", is_published: false, software_tools: "", target_roles: "" });
    setEditingCourse(null);
    setIsCreating(false);
  };

  const openEdit = (course: Course) => {
    setEditingCourse(course);
    setIsCreating(false);
    setForm({
      title: course.title,
      description: course.description ?? "",
      short_description: course.short_description ?? "",
      price: String(course.price),
      duration_weeks: course.duration_weeks ? String(course.duration_weeks) : "",
      is_published: course.is_published,
      software_tools: course.software_tools?.join(", ") ?? "",
      target_roles: course.target_roles?.join(", ") ?? "",
    });
  };

  const handleSave = async () => {
    const payload = {
      title: form.title,
      description: form.description || null,
      short_description: form.short_description || null,
      price: parseFloat(form.price) || 0,
      duration_weeks: form.duration_weeks ? parseInt(form.duration_weeks) : null,
      is_published: form.is_published,
      software_tools: form.software_tools ? form.software_tools.split(",").map((s) => s.trim()) : null,
      target_roles: form.target_roles ? form.target_roles.split(",").map((s) => s.trim()) : null,
    };

    if (editingCourse) {
      const { error } = await supabase.from("courses").update(payload).eq("id", editingCourse.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Course updated!" });
    } else {
      const { error } = await supabase.from("courses").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Course created!" });
    }
    resetForm();
    fetchCourses();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course and all its content?")) return;
    await supabase.from("courses").delete().eq("id", id);
    toast({ title: "Course deleted" });
    fetchCourses();
  };

  const handleTogglePublish = async (course: Course) => {
    await supabase.from("courses").update({ is_published: !course.is_published }).eq("id", course.id);
    fetchCourses();
  };

  const addModule = async (courseId: string) => {
    if (!newModuleTitle.trim()) return;
    const maxOrder = courseModules.length > 0 ? Math.max(...courseModules.map((m) => m.sort_order)) : -1;
    await supabase.from("modules").insert({ course_id: courseId, title: newModuleTitle, sort_order: maxOrder + 1 });
    setNewModuleTitle("");
    setAddingModuleTo(null);
    fetchModules(courseId);
    toast({ title: "Module added!" });
  };

  const addLesson = async (moduleId: string, courseId: string) => {
    if (!newLessonTitle.trim()) return;
    const mod = courseModules.find((m) => m.id === moduleId);
    const maxOrder = mod && mod.lessons.length > 0 ? Math.max(...mod.lessons.map((l) => l.sort_order)) : -1;
    await supabase.from("lessons").insert({ module_id: moduleId, title: newLessonTitle, sort_order: maxOrder + 1 });
    setNewLessonTitle("");
    setAddingLessonTo(null);
    fetchModules(courseId);
    toast({ title: "Lesson added!" });
  };

  const deleteModule = async (moduleId: string, courseId: string) => {
    if (!confirm("Delete this module and all its lessons?")) return;
    await supabase.from("modules").delete().eq("id", moduleId);
    fetchModules(courseId);
  };

  const deleteLesson = async (lessonId: string, courseId: string) => {
    await supabase.from("lessons").delete().eq("id", lessonId);
    fetchModules(courseId);
  };

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
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div className="flex-1">
            <h1 className="font-heading text-2xl font-bold">Course Management</h1>
          </div>
          <Button onClick={() => { resetForm(); setIsCreating(true); }}>
            <Plus className="mr-2 h-4 w-4" /> New Course
          </Button>
        </div>

        {/* Create/Edit form */}
        {(isCreating || editingCourse) && (
          <motion.div
            className="rounded-xl border border-border bg-card p-6 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-heading text-lg font-semibold mb-4">
              {editingCourse ? "Edit Course" : "Create New Course"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Duration (weeks)</Label>
                <Input type="number" value={form.duration_weeks} onChange={(e) => setForm({ ...form, duration_weeks: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Software Tools (comma separated)</Label>
                <Input value={form.software_tools} onChange={(e) => setForm({ ...form, software_tools: e.target.value })} placeholder="CATIA V5, ANSYS" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Short Description</Label>
                <Input value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Full Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Target Roles (comma separated)</Label>
                <Input value={form.target_roles} onChange={(e) => setForm({ ...form, target_roles: e.target.value })} />
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
                <Label>Published</Label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleSave}>{editingCourse ? "Update Course" : "Create Course"}</Button>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </motion.div>
        )}

        {/* Course list */}
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-semibold">{course.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      course.is_published ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                    }`}>
                      {course.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{course.short_description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>₹{course.price}</span>
                    {course.duration_weeks && <span>{course.duration_weeks} weeks</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    if (expandedCourse === course.id) {
                      setExpandedCourse(null);
                    } else {
                      setExpandedCourse(course.id);
                      fetchModules(course.id);
                    }
                  }}>
                    {expandedCourse === course.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    Content
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleTogglePublish(course)}>
                    {course.is_published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => openEdit(course)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(course.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Expanded modules/lessons */}
              {expandedCourse === course.id && (
                <div className="border-t border-border p-6 bg-muted/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-heading font-semibold text-sm">Modules & Lessons</h4>
                    {addingModuleTo === course.id ? (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Module title"
                          value={newModuleTitle}
                          onChange={(e) => setNewModuleTitle(e.target.value)}
                          className="h-8 text-sm w-48"
                        />
                        <Button size="sm" onClick={() => addModule(course.id)}>Add</Button>
                        <Button size="sm" variant="outline" onClick={() => setAddingModuleTo(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setAddingModuleTo(course.id)}>
                        <Plus className="mr-1 h-3 w-3" /> Module
                      </Button>
                    )}
                  </div>

                  {courseModules.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No modules yet. Add one above.</p>
                  ) : (
                    <div className="space-y-3">
                      {courseModules.map((mod) => (
                        <div key={mod.id} className="rounded-lg border border-border bg-card p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{mod.title}</span>
                            <div className="flex gap-1">
                              {addingLessonTo === mod.id ? (
                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Lesson title"
                                    value={newLessonTitle}
                                    onChange={(e) => setNewLessonTitle(e.target.value)}
                                    className="h-7 text-xs w-40"
                                  />
                                  <Button size="sm" className="h-7 text-xs" onClick={() => addLesson(mod.id, course.id)}>Add</Button>
                                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setAddingLessonTo(null)}>×</Button>
                                </div>
                              ) : (
                                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setAddingLessonTo(mod.id)}>
                                  <Plus className="mr-1 h-3 w-3" /> Lesson
                                </Button>
                              )}
                              <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={() => deleteModule(mod.id, course.id)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          {mod.lessons.length > 0 && (
                            <div className="space-y-1 ml-4">
                              {mod.lessons.map((lesson) => (
                                <div key={lesson.id} className="flex items-center justify-between text-xs py-1">
                                  <span className="text-muted-foreground">{lesson.title}</span>
                                  <Button size="sm" variant="ghost" className="h-6 text-xs text-destructive" onClick={() => deleteLesson(lesson.id, course.id)}>
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AdminCourses;
