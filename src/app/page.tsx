"use client"

import { Chat } from "@/components/Chat"
import { ChatProvider } from "@/contexts/ChatContext"
import { UserProvider } from "@/contexts/UserContext"

export default function Home() {
  return (
    <div className="container mx-auto max-w-lg px-2">
      <UserProvider>
        <ChatProvider>
          <h1 className="text-3xl my-3 text-center"> Chat Simples</h1>

          <Chat />
        </ChatProvider>
      </UserProvider>
    </div>
  )
}
