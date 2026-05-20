import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyToken(token);

  if (!user || user.role !== "ADMIN") {
    // If not authenticated or not an admin, redirect to login
    redirect("/login?error=unauthorized");
  }

  return <>{children}</>;
}
