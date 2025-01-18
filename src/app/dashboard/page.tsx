"use client";
import React, { useEffect, useState } from 'react';
import { StreamChat, Channel as ChannelType } from 'stream-chat';
import {
  Chat as StreamChatComponent,
  MessageList,
  MessageInput,
  Window,
  Channel,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { Button } from '@/components/ui/button';

const chatClient = StreamChat.getInstance("x9v4sqj4t9qf");

export default function App() {
  const [activeSection, setActiveSection] = useState<React.ReactNode>(<ChatSection />);

  return (
    <div className="flex h-screen">
      <VerticalNav setActiveSection={setActiveSection} />
      <div className="flex-1">{activeSection}</div>
    </div>
  );
}

function VerticalNav({ setActiveSection }: { setActiveSection: (section: React.ReactNode) => void }) {
  return (
    <nav className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex items-center gap-2 p-6">
        <div className="rounded-full bg-primary p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary-foreground"
          >
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
          </svg>
        </div>
        <span className="text-lg font-semibold">AppName</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <NavItem onClick={() => setActiveSection(<ChatSection />)}>Chat</NavItem>
        <NavItem onClick={() => setActiveSection(<UploadSection />)}>Upload</NavItem>
      </div>
    </nav>
  );
}

function NavItem({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <Button onClick={onClick} variant="ghost" className="w-full justify-start">
      {children}
    </Button>
  );
}

function ChatSection() {
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const initChat = async () => {
      try {
        await chatClient.connectUser(
          { id: "expert_1" },
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhwZXJ0XzEifQ.lUHvPjwS5HqacDkv6P_1ThJ-vROVQF5IjrRE5LzYv7I"
        );

        const channel = chatClient.channel("messaging", "health_consultation", {
          members: ["patient_1", "expert_1"],
        });

        await channel.watch();
        setChannel(channel);
      } catch (error) {
        console.error("Error connecting to chat:", error);
      } finally {
        setIsConnecting(false);
      }
    };

    initChat();

    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  if (isConnecting) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load chat</div>
      </div>
    );
  }

  return (
    <StreamChatComponent client={chatClient}>
      <Channel channel={channel}>
        <Window>
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </StreamChatComponent>
  );
}

function UploadSection() {
  return <div>This is the Upload section.</div>;
}

