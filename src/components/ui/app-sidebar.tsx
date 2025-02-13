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
          url: "#",
        },
        {
          title: "Pendant",
          url: "#",
        },
        {
          title: "Earrings",
          url: "#",
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
          url: "#",
        },
        {
          title: "Ring",
          url: "#",
        },
        {
          title: "Watch",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
