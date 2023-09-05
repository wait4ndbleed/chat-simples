import { useUser } from "@/contexts/UserContext";
import { NameInput } from "./NameInput";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

export const Chat = () => {
  const userCtx = useUser();

  if (!userCtx) return null;

  if (!userCtx.user) return <NameInput />;

  return (
    <div className="border border-white/30 rounded-md">
      <div className="h-96 p-3 overflow-y-scroll">
        <ChatMessage />
      </div>
      <div className="border-t border-t-white/30 p-3">
        <ChatInput name={userCtx.user} />
      </div>
      <div className="border-t border-t-white/30 p-3">
        <ChatInput name={'bot'} />
      </div>
    </div>
  );
};
