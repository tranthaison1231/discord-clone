import { getOrgs } from "@/apis/orgs";
import OrgSidebar from "@/components/OrgSidebar";
import { getToken } from "@/lib/storage";
import { redirect } from "@/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";

export function Loader() {
  const isAuth = getToken();
  if (!isAuth) {
    return redirect("/login");
  }
  return null;
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const { data: orgs } = useQuery(["orgs"], () => getOrgs());

  return (
    <div className="flex h-screen bg-background w-full text-primary-foreground">
      <OrgSidebar orgs={orgs ?? []} />
      <Outlet />
    </div>
  );
}
