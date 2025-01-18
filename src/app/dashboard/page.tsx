"use client";
import React, { useEffect, useState } from 'react'
import { BouncingBallsLoader } from '@/components/BouncingBallsLoader';
import { StreamChat, Channel as ChannelType } from 'stream-chat'
import {
  Chat,
  MessageList,
  MessageInput,
  Window,
} from 'stream-chat-react'
import { Channel } from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'


const chatClient = StreamChat.getInstance("x9v4sqj4t9qf")

export default function ExpertChat() {
  const [channel, setChannel] = useState<ChannelType | null>(null)

  useEffect(() => {
    const connectUser = async () => {
      await chatClient.connectUser(
        { id: "expert_1" },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhwZXJ0XzEifQ.lUHvPjwS5HqacDkv6P_1ThJ-vROVQF5IjrRE5LzYv7I" // Generate this token on your server
      )

      const channel = chatClient.channel("messaging", "health_consultation", {
        members: ["patient_1", "expert_1"],
      })

      await channel.watch()
      setChannel(() => channel)
    }

    connectUser()

    return () => {
      chatClient.disconnectUser()
    }
  }, [])

  if (!channel) return <BouncingBallsLoader />;
  return (
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <Window>
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  )
}
