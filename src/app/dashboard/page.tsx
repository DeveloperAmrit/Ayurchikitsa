"use client";
import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { MessageSquare, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

function UploadComponent() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Documents</h2>
      <div className="text-gray-600">Upload component content goes here</div>
    </div>
  );
}

function NavItem({
  onClick,
  icon: Icon,
  children,
  isActive,
}: {
  onClick: () => void;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Button 
      variant={isActive ? "secondary" : "ghost"} 
      className="w-full justify-start"
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
}

function VerticalNav({ activeComponent, setActiveComponent }) {
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
        <NavItem 
          onClick={() => setActiveComponent('chat')} 
          icon={MessageSquare}
          isActive={activeComponent === 'chat'}
        >
          Chat
        </NavItem>
        <NavItem 
          onClick={() => setActiveComponent('upload')} 
          icon={Upload}
          isActive={activeComponent === 'upload'}
        >
          Upload
        </NavItem>
      </div>
    </nav>
  );
}

function ChatComponent() {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const chatClient = StreamChat.getInstance("x9v4sqj4t9qf");
      
      await chatClient.connectUser(
        { id: "expert_1" },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZXhwZXJ0XzEifQ.lUHvPjwS5HqacDkv6P_1ThJ-vROVQF5IjrRE5LzYv7I"
      );

      const channel = chatClient.channel("messaging", "health_consultation", {
        members: ["patient_1", "expert_1"],
      });
      
      await channel.watch();
      setClient(chatClient);
      setChannel(channel);
    };

    initChat();

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, []);

  if (!channel || !client) return <div>Loading...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}

export default function ExpertDashboard() {
  const [activeComponent, setActiveComponent] = useState('chat');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'chat':
        return <ChatComponent />;
      case 'upload':
        return <UploadComponent />;
      default:
        return <ChatComponent />;
    }
  };

  return (
    <div className="flex h-screen">
      <VerticalNav 
        activeComponent={activeComponent} 
        setActiveComponent={setActiveComponent} 
      />
      <main className="flex-1">
        {renderComponent()}
      </main>
    </div>
  );
}