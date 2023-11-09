import { Input } from "@/components/ui/input";
import { Gift, PlusCircle, Sticker } from "lucide-react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";

const MESSAGES = [
  {
    id: 1,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
  {
    id: 2,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
  {
    id: 3,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
  {
    id: 4,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
  {
    id: 5,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
  {
    id: 6,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
  {
    id: 7,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
  {
    id: 8,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
  {
    id: 9,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
  {
    id: 10,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
  {
    id: 11,
    sender: {
      name: 'John Doe',
      avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
    },
    createdAt: '2022-01-01T00:00:00.000Z',
    message: 'Hey, how are you?',
  },
];

export default function ChatList() {
  const chatListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState(MESSAGES)

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && inputRef.current?.value.trim() !== '') {
      flushSync(() => {
        setMessages([
          ...messages,
          {
            id: messages.length + 1,
            sender: {
              name: 'John Doe',
              avatar: 'https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg',
            },
            createdAt: '2022-01-01T00:00:00.000Z',
            message: inputRef.current!.value,
          },
        ]);
      })
      inputRef.current!.value = '';
      chatListRef.current?.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className="relative h-full">
      <div className="flex flex-col h-[calc(100vh-9rem)] overflow-y-auto" ref={chatListRef}>
        {messages.map((message) => (
          <div key={message.id} className="flex gap-5 my-2">
            <img
              src={message.sender.avatar}
              alt={message.sender.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p>
                <span className="text-blue-500 font-bold">{message.sender.name} </span>
                <span className="text-primary/40 text-sm"> {new Date(message.createdAt).toLocaleString()}</span>
              </p>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute w-full bottom-6">
        <PlusCircle className="absolute top-3 left-4 w-8 h-8" />
        <Input ref={inputRef} className="pl-14 pr-28" onKeyUp={handleChange}/>
        <div className="absolute top-3 right-4 flex gap-3">
          <Gift className="w-8 h-8 cursor-pointer" />
          <Sticker className="w-8 h-8 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
