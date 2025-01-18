"use client";
import React, { useEffect, useState } from 'react';
import { StreamChat, Channel as ChannelType } from 'stream-chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Chat as StreamChatComponent,
  MessageList,
  MessageInput,
  Window,
  Channel,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = StreamChat.getInstance("x9v4sqj4t9qf");

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <VerticalNav />
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<ChatSection />} />
            <Route path="/upload" element={<UploadSection />} />
            {/* Add other routes if necessary */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function VerticalNav() {
  return (
    <nav className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex items-center gap-2 p-6">
        <div className="rounded-full bg-primary p-1">
          {/* Logo SVG */}
        </div>
        <a className="text-lg font-semibold" href='/'>Ayurchikitsa</a>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <NavItem to="/dashboard">Chat</NavItem>
        <NavItem to="/upload">Upload</NavItem>
      </div>
    </nav>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <a href={to} className="w-full justify-start btn btn-ghost">
      {children}
    </a>
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

