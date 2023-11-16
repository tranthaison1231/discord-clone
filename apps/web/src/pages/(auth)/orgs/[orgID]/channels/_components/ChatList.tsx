import { Input } from "@/components/ui/input";
import { Gift, PlusCircle, Sticker } from "lucide-react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import EmojiPicker from "./EmojiPicker";
import MessageItem from './MessageItem';

const MESSAGES = [
  {
    id: 1,
    sender: {
      id: 1,
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
];

export default function ChatList() {
  const chatListRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState(MESSAGES)

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && content.trim() !== '') {
      flushSync(() => {
        setMessages([
          ...messages,
          {
            id: messages.length + 1,
            sender: {
              id: 1,
              name: 'John Doe',
              avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
            },
            createdAt: '2022-01-01T00:00:00.000Z',
            message: content,
          },
        ]);
      });
      setContent('');
      chatListRef.current?.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className="relative h-full text-primary-foreground">
      <div className="flex flex-col h-[calc(100vh-9rem)] overflow-y-auto" ref={chatListRef}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
      <div className="absolute w-full bottom-6">
        <PlusCircle className="absolute top-3 left-4 w-8 h-8" />
        <Input value={content} className="pl-14 pr-28 h-14" onChange={(e) => setContent(e.target.value)} onKeyUp={handleChange} />
        <div className="absolute top-3 right-4 flex gap-3">
          <Gift className="w-8 h-8 cursor-pointer" />
          <Sticker className="w-8 h-8 cursor-pointer" />
          <EmojiPicker
            onEmojiClick={({ emoji }) => {
              setContent((prev) => prev + emoji);
            }}
          />
        </div>
      </div>
    </div>
  );
}
