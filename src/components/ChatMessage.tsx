import { useChat } from "@/contexts/ChatContext";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useRef, useState } from "react";

export const ChatMessage = () => {
  const chatCtx = useChat();
  const userCtx = useUser();
  const chatDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chatDiv = chatDivRef.current;

    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [chatCtx?.chat, chatCtx?.typingIndicator]);

  return (
    <div
      className="flex flex-col gap-1 max-h-[360px] overflow-y-auto"
      ref={chatDivRef}
    >
      {chatCtx?.chat.map((item, index) => (
        <div
          key={item.id}
          className={`border border-white/20 rounded-md p-2 text-sm
            ${
              item.user === userCtx?.user
                ? "self-end bg-white/10 text-right"
                : "self-start bg-white/5 text-left"
            }`}
        >
          <div className="font-bold">{item.user}</div>
          <p>{item.text}</p>
        </div>
      ))}
      {chatCtx?.typingIndicator.map((typingUser, index) => (
        <div
          key={`typing-${index}`}
          className={`border border-white/20 rounded-md p-2 text-sm
            self-start bg-white/5 text-left
            ${
                typingUser.name === userCtx?.user
                  ? "self-end bg-white/10 text-right"
                  : "self-start bg-white/5 text-left"
              }`}
        >
          <div className="font-bold">{typingUser.name}</div>
          <p> está digitando...</p>
        </div>
      ))}
    </div>
  );
};
