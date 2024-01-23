import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function SettingLayout() {
  const location = useLocation();
  return (
    <div className="w-full flex">
      <div className="relative bg-primary-foreground/10 text-primary-foreground 0 w-[16rem] flex flex-col">
        <div className="h-3/4 overflow-scroll">
          <div className="text-xl text-primary-foreground/60 p-2 pt-2">
            <Link
              to="/channels/@me"
              className={cn(
                "px-3 py-2 flex gap-2 w-full hover:bg-primary-foreground/20",
                {
                  "bg-primary-foreground/20":
                    location.pathname === "/channels/@me",
                },
              )}
            >
              <User />
              <p> Friends </p>
            </Link>
            <Link
              to="/store"
              className={cn(
                "px-3 py-2 flex gap-2 w-full hover:bg-primary-foreground/20",
                {
                  "bg-primary-foreground/20": location.pathname === "/store",
                },
              )}
            >
              <User />
              <p> Nitro </p>
            </Link>
            <Link
              to="/shop"
              className={cn(
                "px-3 py-2 flex gap-2 w-full hover:bg-primary-foreground/20",
                {
                  "bg-primary-foreground/20": location.pathname === "/shop",
                },
              )}
            >
              <User />
              <p> Shop</p>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 p-3 flex justify-between items-center w-full">
          <div className="flex gap-2">
            <img
              src="https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg"
              width={40}
              className="rounded-full aspect-square object-cover"
            />
            <div>
              <p className="font-bold text-base">Son Tran</p>
              <p className="text-sm">sontran1711</p>
            </div>
          </div>
          <div className="flex gap-2"></div>
        </div>
      </div>
      <div className="w-[calc(100%-16rem)]">
        <Outlet />
      </div>
    </div>
  );
}
