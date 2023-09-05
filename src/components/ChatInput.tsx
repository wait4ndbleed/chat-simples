import { useChat } from "@/contexts/ChatContext";
import { useUser } from "@/contexts/UserContext";
import { KeyboardEvent, useEffect, useState, useRef } from "react";

type Props = {
  name: string;
};

export const ChatInput = ({ name }: Props) => {
  const chatCtx = useChat();
  const [textInput, setTextInput] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleKeyUpAction = (event: KeyboardEvent<HTMLInputElement>) => {
    if (typingTimeoutRef.current !== undefined) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (event.code.toLowerCase() === 'enter') {
      if (textInput.trim() !== '') {
        chatCtx?.addMessage(name, textInput.trim());
        setTextInput('');
        chatCtx?.removeTypingIndicator(name);
      }
    } else {
      chatCtx?.updateTypingIndicator(name);

      // Defina um tempo limite (por exemplo, 3 segundos) para remover o indicador de "digitando" após a inatividade
      typingTimeoutRef.current = setTimeout(() => {
        chatCtx?.removeTypingIndicator(name);
      }, 3000); // Remova o indicador após 3 segundos de inatividade (ajuste conforme necessário)
    }
  };

  useEffect(() => {
    return () => {
      chatCtx?.removeTypingIndicator(name);
      if (typingTimeoutRef.current !== undefined) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <input
      className="w-full bg-transparent text-white text-md outline-none"
      placeholder={`${name}, digite uma mensagem (e aperte enter)`}
      value={textInput}
      onChange={(e) => setTextInput(e.target.value)}
      onKeyUp={(e) => {
        if (e.code.toLowerCase() === 'enter') {
          handleKeyUpAction(e);
        } else {
          handleKeyUpAction(e);
        }
      }}
    />
  );
};