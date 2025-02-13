import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";

export const AiChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
          className="
          fixed bottom-8 right-4 z-10 px-4 py-2 rounded-md
          bg-black backdrop-blur-xs text-white border border-black/10  
          cursor-pointer hover:bg-black/90 hover:scale-105
          transition-all duration-200 active:scale-95"
          onClick={() => {
            console.log("clicked");
          }}
        >
          Send Message
        </PopoverTrigger>
      )}
      <PopoverContent className="mr-4 p-4 min-w-[380px] bg-black/60 backdrop-blur-sm border border-black/10 text-white">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <h1 className="text-lg">Ask AI</h1>
            </div>
            <Separator className="bg-white/20" />
            <p className="text-xs text-white/70">
              Our AI agent can help you to choose the best products! Tell him
              about your needs!
            </p>
          </div>

          <Textarea
            className="resize-none mt-8 min-h-[100px] border border-white/20 rounded-md bg-black"
            placeholder="What are you looking for?"
            rows={1}
            onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
              const target = e.currentTarget;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
