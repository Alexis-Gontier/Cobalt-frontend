import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { ShoppingBag, Sparkles } from "lucide-react";
import { Outlet } from "react-router-dom";
import NeoBreadcrumb from "@/components/NeoBreadcrumb";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center justify-between w-full">
              <NeoBreadcrumb />
              <Sheet>
                <SheetTrigger className="flex items-center gap-2 bg-black text-white h-full px-3 py-2 rounded-md cursor-pointer hover:bg-black/90 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-sm">My cart</span>
                </SheetTrigger>
                <SheetContent className="h-full">
                  <SheetHeader>
                    <SheetTitle>My Cart.</SheetTitle>
                    <SheetDescription>What have we here?</SheetDescription>
                    <Separator />
                  </SheetHeader>
                  <div className="flex flex-col justify-between h-full pb-4">
                    <ScrollArea className="flex flex-col gap-2 px-2">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://via.placeholder.com/150"
                          alt="Product"
                          width={150}
                          height={150}
                        />
                        <div className="flex flex-col gap-2">
                          <h3 className="text-sm font-medium">Product Name</h3>
                          <p className="text-sm text-gray-500">$100.00</p>
                        </div>
                      </div>
                    </ScrollArea>
                    <button className="text-sm bg-black text-white px-4 py-2 rounded-md w-fit drop-shadow-md cursor-pointer hover:bg-black/90 transition-colors fixed bottom-4 right-4">
                      Go to checkout
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          {!isOpen ? (
            <PopoverTrigger
              className="
                fixed bottom-8 right-5 z-10
              bg-black/50 backdrop-blur-xs text-white
              flex items-center justify-center
              px-4 py-4
              rounded-full cursor-pointer
              hover:bg-black/70 hover:scale-105
              transition-all duration-200 active:scale-95 active:bg-black/80 group"
              onClick={() => {
                console.log("clicked");
              }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="">
                    <Sparkles className="w-5 h-5 group-hover:w-6 group-hover:h-6 transition-all duration-200" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ask AI</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </PopoverTrigger>
          ) : (
            <PopoverTrigger
              className="fixed bottom-8 right-4 z-10 bg-black backdrop-blur-xs text-white border border-black/10 px-4 py-2 rounded-md cursor-pointer hover:bg-black/90 hover:scale-105 transition-all duration-200 active:scale-95"
              onClick={() => {
                console.log("clicked");
              }}
            >
              Send Message
            </PopoverTrigger>
          )}
          <PopoverContent className="mr-4">
            <div className="flex flex-col gap-2">
              <h1>Ask AI</h1>
            </div>
          </PopoverContent>
        </Popover>
      </SidebarInset>
    </SidebarProvider>
  );
}
