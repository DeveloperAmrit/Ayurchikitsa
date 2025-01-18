'use client'

import React, { useEffect, useState } from 'react'
import { StreamChat, Channel as ChannelType } from 'stream-chat'
import {
  Chat as StreamChatComponent,
  MessageList,
  MessageInput,
  Window,
  Channel,
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'

const chatClient = StreamChat.getInstance("x9v4sqj4t9qf")

export default function Chat() {
  const [channel, setChannel] = useState<ChannelType | null>(null)
  const [isConnecting, setIsConnecting] = useState(true)

  useEffect(() => {
    const initChat = async () => {
      try {
        await chatClient.connectUser(
          { id: "expert_1" },
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhwZXJ0XzEifQ.lUHvPjwS5HqacDkv6P_1ThJ-vROVQF5IjrRE5LzYv7I"
        )

        const channel = chatClient.channel("messaging", "health_consultation", {
          members: ["patient_1", "expert_1"],
        })

        await channel.watch()
        setChannel(channel)
      } catch (error) {
        console.error("Error connecting to chat:", error)
      } finally {
        setIsConnecting(false)
      }
    }

    initChat()

    return () => {
      chatClient.disconnectUser()
    }
  }, [])

  if (isConnecting) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!channel) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load chat</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      
      <div className="flex-grow overflow-hidden">
        <StreamChatComponent client={chatClient} theme="messaging light">
          <Channel channel={channel}>
            <Window>
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </StreamChatComponent>
      </div>
    </div>
  )
}

