import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/admin/login");
  }
  return (
    <main className="h-screen w-full bg-white dark:bg-black">
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-1 border-r-2 border-gray-200">side bar</div>
        <div className="col-span-6">
          <div className="w-full">
            <div className="w-full">header</div>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
