import { getOrgs } from "@/apis/orgs";
import { getToken } from "@/lib/storage";
import { redirect } from "@/router";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import OrgSidebar from "./_components/OrgSidebar";
import useGetMeQuery from "@/hooks/useGetMeQuery";
import { FriendStatus, getFriends } from "@/apis/friends";

export function Loader() {
  const isAuth = getToken();
  if (!isAuth) {
    return redirect("/login");
  }
  return null;
}

export default function App() {
  const { data: me } = useGetMeQuery();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const { data: orgs } = useQuery({
    queryKey: ["orgs"],
    queryFn: () => getOrgs(),
  });

  const friendsQuery = useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriends(),
  });

  const totalIncommingFriendsRequest = useMemo(() => {
    const pendingFriends = friendsQuery.data?.filter(
      (friend) => friend.status === FriendStatus.PENDING,
    );

    return pendingFriends?.filter((friend) => friend.user.id !== me.id).length;
  }, [friendsQuery.data, me]);

  return (
    <div className="flex h-screen bg-background w-full text-primary-foreground">
      <OrgSidebar
        orgs={orgs ?? []}
        totalIncommingFriendsRequest={totalIncommingFriendsRequest ?? 0}
      />
      <Outlet
        context={{
          totalIncommingFriendsRequest,
          friends: friendsQuery.data,
          me,
        }}
      />
    </div>
  );
}
