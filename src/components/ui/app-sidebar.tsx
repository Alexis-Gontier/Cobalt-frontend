import * as React from "react";
import { HandMetal, UserRound } from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import { Logo } from "@/components/ui/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
const data = {
  user: {
    name:
      (localStorage.getItem("firstname") as string) +
      " " +
      (localStorage.getItem("lastname") as string),
    email: localStorage.getItem("email") as string,
    avatar: "/public/batman_avatar.jpg",
  },
  navMain: [
    {
      title: "Head",
      url: "#",
      icon: UserRound,
      isActive: true,
      items: [
        {
          title: "Necklace",
          url: "/Necklaces",
        },
        {
          title: "Pendant",
          url: "/Pendants",
        },
        {
          title: "Earrings",
          url: "/Earrings",
        },
      ],
    },
    {
      title: "Hands",
      url: "#",
      icon: HandMetal,
      items: [
        {
          title: "Bracelet",
          url: "/Bracelets",
        },
        {
          title: "Ring",
          url: "/Rings",
        },
        {
          title: "Watch",
          url: "/Watches",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
      {token ? (
        <SidebarFooter className="bg-white">
          <NavUser user={data.user} />
        </SidebarFooter>
      ) : (
        <SidebarFooter className="bg-white">
          <div className="flex justify-center gap-1 w-full mb-2">
            <Button
              className="text-md bg-transparent text-black hover:bg-transparent shadow-none cursor-pointer hover:underline"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
            <Separator orientation="vertical" />
            <Button
              className="text-md bg-transparent text-black hover:bg-transparent shadow-none cursor-pointer hover:underline"
              onClick={() => navigate("/auth/register")}
            >
              Register
            </Button>
          </div>
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
