import { chatReducer } from "@/recuders/chatReducer";
import { Message } from "@/types/Message";
import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

type TypingIndicator = {
  name: string;
};

type ChatContextType = {
    chat: Message[];
    addMessage: (user: string, text: string) => void;
    typingIndicator: TypingIndicator[];
    addTypingIndicator: (name: string) => void;
    removeTypingIndicator: (name: string) => void;
    updateTypingIndicator: (name: string) => void; // Adicione a função de atualização
  };

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [typingIndicator, setTypingIndicator] = useState<TypingIndicator[]>([]);

  const [chat, dispatch] = useReducer(chatReducer, []);

  const addMessage = (user: string, text: string) => {
    dispatch({
      type: "add",
      payload: { user, text },
    });
  };

  const addTypingIndicator = (name: string) => {
    // Implemente a lógica para adicionar o indicador de digitação ao estado
    setTypingIndicator([...typingIndicator, { name }]);
  };

  const removeTypingIndicator = (name: string) => {
    // Implemente a lógica para remover o indicador de digitação do estado
    setTypingIndicator(
      typingIndicator.filter((indicator) => indicator.name !== name)
    );
  };

  const updateTypingIndicator = (name: string) => {
    // Verifique se o usuário já existe no indicador de "digitando"
    const isUserTyping = typingIndicator.some((indicator) => indicator.name === name);
  
    if (!isUserTyping) {
      // Se o usuário não estiver no indicador de "digitando", adicione-o
      setTypingIndicator([...typingIndicator, { name }]);
    }
  };

  const contextValue = {
    chat,
    addMessage,
    typingIndicator,
    addTypingIndicator, // Certifique-se de que a função seja parte do contexto
    removeTypingIndicator,
    updateTypingIndicator
  };

  return (
    <ChatContext.Provider
      value={contextValue}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
