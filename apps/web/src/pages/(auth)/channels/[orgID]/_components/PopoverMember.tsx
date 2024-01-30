import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/type";
import { cn } from "@/lib/utils";

interface Props {
  member: User;
}

export default function PopoverMember({ member }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          key={member.id}
          className="flex cursor-pointer items-center gap-4 hover:bg-primary-foreground/10 p-2 rounded-md"
        >
          <img
            className="w-14 h-14 object-cover rounded-full"
            src={member.avatar}
            alt={member.name}
          />
          <p className="text-green-700 font-bold"> {member.name} </p>
        </div>
      </PopoverTrigger>
      <PopoverContent side="left" className="w-80 p-0 bg-slate-950">
        <div
          className={cn("rounded-t-md h-14 relative")}
          style={{ backgroundColor: member.backgroundColor }}
        >
          <div className="w-20 h-20 p-2 bg-slate-950 absolute -bottom-10 left-4 rounded-full">
            <img
              src={member.avatar}
              alt={member.name}
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="p-4 pt-16">
          <div className="bg-primary-foreground/10 p-4 rounded-md">
            <p> {member.name} </p>
            <hr className="my-2" />
            <p> Roles </p>
            <div className="flex gap-2 mt-2">
              {member.roles?.map((role) => <Badge key={role}> {role} </Badge>)}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
