import * as React from 'react';
import { ChevronRight, File, Folder, GalleryVerticalEnd } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail
} from '@/components/ui/sidebar';
import { MenuData } from '@/lib/definitions';

export function MySidebar({ menus, ...props }: { menus: MenuData[] }) {
  return (
    <Sidebar {...props} className="text-secondary py-4 pl-4 ">
      <SidebarHeader className="!">
        <SidebarMenu className="rounded-2xl">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">FLYINGFOX FOX LABS</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{menus.length && menus.map((d) => <Tree item={d} key={d.id} />)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function Tree({ item }: { item: MenuData }) {
  const { name, children } = item;

  // If no children, render as a simple file
  if (!children || children.length === 0) {
    return (
      <SidebarMenuButton isActive={name === 'button.tsx'} className="data-[active=true]:bg-transparent">
        <File />
        {name}
      </SidebarMenuButton>
    );
  }

  // Otherwise, render as a collapsible folder
  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {children.map((subItem: MenuData, index: number) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
