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
import { getAiResponse } from "@/api/ai";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AiChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<
    { answer: string; time: string }[]
  >([]);

  const handleSendMessage = async () => {
    const response = await getAiResponse(message);
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setResponses([
      ...responses,
      { answer: response.answer, time: currentTime },
    ]);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="
                fixed bottom-8 right-5 z-10
              bg-black/50 backdrop-blur-xs text-white
              flex items-center justify-center
              px-4 py-4
              rounded-full cursor-pointer
              hover:bg-black/70 hover:scale-105
              transition-all duration-200 active:scale-95 active:bg-black/80 group"
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

      <PopoverContent className="mr-4 p-4 min-w-[410px] bg-black/60 backdrop-blur-sm border border-black/10 text-white flex ">
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
            <ScrollArea className="max-h-[200px]">
              {responses.map((response, index) => (
                <p key={index} className="text-sm text-white mb-2">
                  <span className="text-xs text-white/50">
                    {response.time} -{" "}
                  </span>
                  {response.answer}
                </p>
              ))}
            </ScrollArea>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Textarea
              className="resize-none mt-8 min-h-[100px] border border-white/20 rounded-md bg-black"
              placeholder="What are you looking for?"
              rows={1}
              onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                const target = e.currentTarget;
                target.style.height = "auto";
                target.style.height = target.scrollHeight + "px";
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="
                px-4 py-2 rounded-md w-fit
               bg-black backdrop-blur-xs text-white/90 border border-black/10  
                cursor-pointer hover:bg-black/90 hover:scale-105
                transition-all duration-200 active:scale-95"
              onClick={() => {
                handleSendMessage();
              }}
            >
              Send message
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
