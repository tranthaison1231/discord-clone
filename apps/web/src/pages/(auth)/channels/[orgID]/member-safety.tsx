import { getOrgMembers } from "@/apis/orgs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useParams } from "@/router";
import { HelpCircle, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { addFriend } from "@/apis/friends";

export default function Component() {
  const { orgID } = useParams("/channels/:orgID/member-safety");
  const location = useLocation();

  const { data: members } = useQuery({
    queryKey: ["members"],
    queryFn: () => getOrgMembers(orgID),
  });
  const handleAddFriend = async (username: string) => {
    await addFriend(username);
  };

  return (
    <div>
      <header className="p-3 h-14 border-b bg-primary-foreground/20  text-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Users />
          Members
        </div>
        <div className="flex items-center gap-4">
          {location.state?.channel && (
            <Link
              to="/channels/:orgID/:channelID"
              params={{ orgID: orgID, channelID: location.state.channel.id }}
              className="text-xs border border-gray-300 p-2"
            >
              Return to {location.state.channel.name}
            </Link>
          )}
          <HelpCircle className="cursor-pointer" />
        </div>
      </header>
      <div className="p-6 ">
        <div className="bg-primary-foreground/20  rounded-lg">
          <div className="p-4 border-b border-gray-400">
            <h1> Recent Members </h1>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="gap-2 flex items-center">
                  <Checkbox />
                  <span>Name</span>
                </TableHead>
                <TableHead>Member Since</TableHead>
                <TableHead>JOINED Discord</TableHead>
                <TableHead>Join Method</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Signals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members?.map((member) => (
                <ContextMenu>
                  <ContextMenuTrigger asChild>
                    <TableRow key={member?.user?.id}>
                      <TableCell className="gap-2  flex items-center">
                        <Checkbox />
                        <div className="flex gap-2">
                          <img
                            src={member?.user.avatarUrl || ""}
                            alt={member?.user?.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-green-500">
                              {member?.user?.fullName}
                            </p>
                            <p>{member?.user?.username}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>member</TableCell>
                      <TableCell>member</TableCell>
                      <TableCell>member</TableCell>
                      <TableCell>member</TableCell>
                      <TableCell>
                        <button>View</button>
                        <button>Edit</button>
                      </TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-64 p-2">
                    <h3
                      className="cursor-pointer"
                      onClick={() => {
                        handleAddFriend(member?.user?.username);
                      }}
                    >
                      Add Friends
                    </h3>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
