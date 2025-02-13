import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebare,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <h1>Cobalt</h1>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
