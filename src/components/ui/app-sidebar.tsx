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

const data = {
  user: {
    name: "Bruce Wayne",
    email: "save@gotham.com",
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

  console.log(token);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
      {token && (
        <SidebarFooter className="bg-white">
          <NavUser user={data.user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
