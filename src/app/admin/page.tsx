import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getRepository } from "@/lib/data";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard Redaksi",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const repo = await getRepository();
  const [page, stats] = await Promise.all([
    repo.listPosts({ limit: 60, includeDrafts: true }),
    repo.stats(),
  ]);

  return (
    <AdminDashboard
      initialPosts={page.posts}
      stats={stats}
      driver={repo.driver}
      adminHealthy={repo.driver === "supabase"}
    />
  );
}
