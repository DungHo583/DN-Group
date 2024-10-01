import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Demo from "./demo";
import React from "react";

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/admin/login");
  }

  return (
    <>
      <Demo></Demo>
    </>
  );
}
