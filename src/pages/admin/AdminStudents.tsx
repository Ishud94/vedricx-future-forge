import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";

interface StudentData {
  user_id: string;
  display_name: string | null;
  enrollments: { course_title: string; payment_status: string; enrolled_at: string }[];
}

const AdminStudents = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      // Get all enrollments
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("user_id, course_id, payment_status, enrolled_at")
        .order("enrolled_at", { ascending: false });

      if (!enrollments || enrollments.length === 0) {
        setLoading(false);
        return;
      }

      const userIds = [...new Set(enrollments.map((e) => e.user_id))];
      const courseIds = [...new Set(enrollments.map((e) => e.course_id))];

      const [{ data: profiles }, { data: courses }] = await Promise.all([
        supabase.from("profiles").select("user_id, display_name").in("user_id", userIds),
        supabase.from("courses").select("id, title").in("id", courseIds),
      ]);

      const courseMap = Object.fromEntries(courses?.map((c) => [c.id, c.title]) ?? []);
      const profileMap = Object.fromEntries(profiles?.map((p) => [p.user_id, p.display_name]) ?? []);

      const grouped: Record<string, StudentData> = {};
      for (const e of enrollments) {
        if (!grouped[e.user_id]) {
          grouped[e.user_id] = {
            user_id: e.user_id,
            display_name: profileMap[e.user_id] ?? "Unknown",
            enrollments: [],
          };
        }
        grouped[e.user_id].enrollments.push({
          course_title: courseMap[e.course_id] ?? "Unknown",
          payment_status: e.payment_status,
          enrolled_at: e.enrolled_at,
        });
      }

      setStudents(Object.values(grouped));
      setLoading(false);
    };

    fetch();
  }, []);

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
          <h1 className="font-heading text-2xl font-bold">Student Management</h1>
        </div>

        {students.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No students enrolled yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <motion.div
                key={student.user_id}
                className="rounded-xl border border-border bg-card p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="font-heading font-semibold mb-3">{student.display_name}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-muted-foreground border-b border-border">
                        <th className="text-left py-2 pr-4">Course</th>
                        <th className="text-left py-2 pr-4">Status</th>
                        <th className="text-left py-2">Enrolled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.enrollments.map((e, i) => (
                        <tr key={i} className="border-b border-border last:border-0">
                          <td className="py-2 pr-4">{e.course_title}</td>
                          <td className="py-2 pr-4">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              e.payment_status === "paid" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                            }`}>
                              {e.payment_status}
                            </span>
                          </td>
                          <td className="py-2 text-muted-foreground">{new Date(e.enrolled_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminStudents;
