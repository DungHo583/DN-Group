"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const pathname = usePathname();

  const components: { title: string; href: string }[] = [
    {
      title: "Home",
      href: "/admin/site/home",
    },
    {
      title: "Dashboard",
      href: "/admin/site/dashboard",
    },
  ];

  return (
    <div className="h-full">
      <div className="h-[80px] py-5 pl-5 text-white font-bold">LOGO</div>
      <div className="px-3">
        <div className="w-full flex-wrap">
          {components.map((nav, idx) => {
            const isActive = nav.href.includes(pathname);
            return (
              <Link className="w-full" key={idx} href={nav.href}>
                <div
                  className={
                    "inline-flex items-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground h-9 px-3 w-full justify-start mb-2 " +
                    (isActive
                      ? "bg-muted text-muted-foreground"
                      : "bg-transparent text-white dark:text-black")
                  }
                >
                  {nav.title}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
