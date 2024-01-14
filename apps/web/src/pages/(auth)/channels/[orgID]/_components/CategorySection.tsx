import { ChevronDown, ChevronRight } from "lucide-react";
import AddChannelModal from "./AddChannelModal";
import { useNavigate } from "react-router-dom";
import { useParams } from "@/router";
import { cn } from "@/lib/utils";
import { Category } from "@/apis/categories";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";

interface Props {
  category: Category;
}

export default function CategorySection({ category }: Props) {
  const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();
  const { channelID, orgID } = useParams("/channels/:orgID/:channelID");

  const navigateToChannel = (id: string) => {
    navigate(`/channels/${orgID}/${id}`);
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className="py-4 cursor-pointer hover:text-foreground"
          onClick={() => setCollapse((collapse) => !collapse)}
        >
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
              {collapse ? (
                <ChevronDown className="w-4" />
              ) : (
                <ChevronRight className="w-4" />
              )}
              <h1 className="uppercase"> {category.name} </h1>
            </div>
            <AddChannelModal />
          </div>
          {collapse && (
            <div className="space-y-2">
              {category.channels?.map((channel) => (
                <div
                  className={cn("px-6 py-3 cursor-pointer", {
                    "bg-primary-foreground/20 text-primary-foreground/80":
                      channel.id === channelID,
                  })}
                  key={channel.id}
                  onClick={() => navigateToChannel(channel.id)}
                >
                  {channel.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">Hello </ContextMenuContent>
    </ContextMenu>
  );
}
