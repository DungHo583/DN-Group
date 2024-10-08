import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/admin/login");
  }

  return redirect("/admin/site/dashboard");
}
