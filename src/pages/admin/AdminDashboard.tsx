import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, DollarSign, BarChart3, Plus, Settings, Bell } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ courses: 0, students: 0, enrollments: 0 });
  const [recentEnrollments, setRecentEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [coursesRes, enrollmentsRes] = await Promise.all([
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("enrollments").select("id, enrolled_at, payment_status, course_id", { count: "exact" }).order("enrolled_at", { ascending: false }).limit(10),
      ]);

      // Get unique student count from enrollments
      const { data: allEnrollments } = await supabase.from("enrollments").select("user_id");
      const uniqueStudents = new Set(allEnrollments?.map((e) => e.user_id) ?? []);

      // Get course titles for recent enrollments
      const courseIds = [...new Set(enrollmentsRes.data?.map((e) => e.course_id) ?? [])];
      const { data: courses } = await supabase.from("courses").select("id, title").in("id", courseIds);
      const courseMap = Object.fromEntries(courses?.map((c) => [c.id, c.title]) ?? []);

      // Get user profiles for enrollments
      const userIds = [...new Set(enrollmentsRes.data?.map((e: any) => e.user_id) ?? [])];
      let profileMap: Record<string, string> = {};
      if (userIds.length > 0) {
        // We need to get profiles - but enrollments select doesn't have user_id in this query
        // Let's refetch with user_id
        const { data: enrollWithUsers } = await supabase
          .from("enrollments")
          .select("id, user_id, enrolled_at, payment_status, course_id")
          .order("enrolled_at", { ascending: false })
          .limit(10);
        
        const uIds = [...new Set(enrollWithUsers?.map((e) => e.user_id) ?? [])];
        if (uIds.length > 0) {
          const { data: profiles } = await supabase.from("profiles").select("user_id, display_name").in("user_id", uIds);
          profileMap = Object.fromEntries(profiles?.map((p) => [p.user_id, p.display_name ?? "Unknown"]) ?? []);
        }

        setRecentEnrollments(
          (enrollWithUsers ?? []).map((e) => ({
            ...e,
            courseName: courseMap[e.course_id] ?? "Unknown",
            studentName: profileMap[e.user_id] ?? "Unknown",
          }))
        );
      }

      setStats({
        courses: coursesRes.count ?? 0,
        students: uniqueStudents.size,
        enrollments: enrollmentsRes.count ?? 0,
      });

      setLoading(false);
    };

    fetchStats();
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
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="font-heading text-3xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage courses, students, and content.</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button asChild><Link to="/admin/courses"><Settings className="mr-2 h-4 w-4" /> Manage Courses</Link></Button>
            <Button variant="outline" asChild><Link to="/admin/students"><Users className="mr-2 h-4 w-4" /> Students</Link></Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Courses</span>
            </div>
            <span className="text-3xl font-bold">{stats.courses}</span>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">Students</span>
            </div>
            <span className="text-3xl font-bold">{stats.students}</span>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Enrollments</span>
            </div>
            <span className="text-3xl font-bold">{stats.enrollments}</span>
          </div>
        </div>

        {/* Recent enrollments */}
        <h2 className="font-heading text-xl font-semibold mb-4">Recent Enrollments</h2>
        {recentEnrollments.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            No enrollments yet.
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Student</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Course</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnrollments.map((e) => (
                    <tr key={e.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 text-sm">{e.studentName}</td>
                      <td className="px-4 py-3 text-sm">{e.courseName}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          e.payment_status === "paid" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                        }`}>
                          {e.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(e.enrolled_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
