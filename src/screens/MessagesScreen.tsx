import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCheck,
  Headphones,
  HelpCircle,
  MessageCircle,
  Mic,
  Phone,
  Search,
  Send,
} from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import ScreenHeader from "@/components/layout/ScreenHeader";

const chats = [
  {
    id: 1,
    name: "Operator - Aziz",
    avatar: "AZ",
    lastMessage: "Hujjatlaringiz tasdiqlandi ✓",
    time: "14:30",
    unread: 0,
    online: true,
    type: "operator",
  },
  {
    id: 2,
    name: "Dispetcher - Sardor",
    avatar: "SD",
    lastMessage: "Yangi yo'nalish tayinlandi",
    time: "12:45",
    unread: 2,
    online: true,
    type: "dispatcher",
  },
];

const messagesByChatId: Record<
  number,
  {
    id: number;
    text: string;
    time: string;
    sender: "user" | "operator" | "system";
    type?: "text" | "voice" | "call" | "system";
  }[]
> = {
  1: [
    { id: 1, text: "Dushanba, 09:20", time: "09:20", sender: "system", type: "system" },
    { id: 2, text: "Assalomu alaykum, hujjatlarim holati qanday?", time: "09:21", sender: "user", type: "text" },
    { id: 3, text: "Va alaykum assalom. Hujjatlaringiz ko'rib chiqilmoqda.", time: "09:25", sender: "operator", type: "text" },
    { id: 4, text: "Ovozli xabar", time: "09:26", sender: "operator", type: "voice" },
    { id: 5, text: "Qo'ng'iroq: 10 daqiqa", time: "09:40", sender: "operator", type: "call" },
    { id: 6, text: "Seshanba, 16:10", time: "16:10", sender: "system", type: "system" },
    { id: 7, text: "Hujjatlaringiz tasdiqlandi.", time: "16:12", sender: "operator", type: "text" },
    { id: 8, text: "Rahmat!", time: "16:13", sender: "user", type: "text" },
    { id: 9, text: "Ovozli xabar", time: "16:15", sender: "user", type: "voice" },
    { id: 10, text: "Chorshanba, 08:05", time: "08:05", sender: "system", type: "system" },
    { id: 11, text: "Bugun yuklash vaqti 12:00.", time: "08:06", sender: "operator", type: "text" },
    { id: 12, text: "Qabul qildim.", time: "08:07", sender: "user", type: "text" },
    { id: 13, text: "Qo'ng'iroq: 6 daqiqa", time: "08:20", sender: "user", type: "call" },
    { id: 14, text: "Payshanba, 18:30", time: "18:30", sender: "system", type: "system" },
    { id: 15, text: "Marshrut bo'yicha qo'shimcha tekshiruv bor.", time: "18:32", sender: "operator", type: "text" },
    { id: 16, text: "Ovozli xabar", time: "18:33", sender: "operator", type: "voice" },
  ],
  2: [
    { id: 1, text: "Dushanba, 12:45", time: "12:45", sender: "system", type: "system" },
    { id: 2, text: "Yangi yo'nalish tayinlandi.", time: "12:45", sender: "operator", type: "text" },
    { id: 3, text: "Qabul qildim, rahmat.", time: "12:47", sender: "user", type: "text" },
    { id: 4, text: "Seshanba, 09:10", time: "09:10", sender: "system", type: "system" },
    { id: 5, text: "Qo'ng'iroq: 12 daqiqa", time: "09:22", sender: "operator", type: "call" },
    { id: 6, text: "Chorshanba, 17:05", time: "17:05", sender: "system", type: "system" },
    { id: 7, text: "Ovozli xabar", time: "17:06", sender: "user", type: "voice" },
  ],
};

const MessagesScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "operators">("all");
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  const filteredChats = useMemo(() => {
    return chats.filter((chat) => chat.type === "operator" || chat.type === "dispatcher");
  }, []);

  const activeChat = activeChatId ? filteredChats.find((chat) => chat.id === activeChatId) : null;
  const activeMessages = activeChatId ? messagesByChatId[activeChatId] || [] : [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "operator":
      case "dispatcher":
        return <Headphones size={14} className="text-primary" />;
      default:
        return <MessageCircle size={14} className="text-muted-foreground" />;
    }
  };

  return (
    <MobileShell>
      <div className="safe-area-top">
        <ScreenHeader
          title={activeChat ? activeChat.name : "Xabarlar"}
          showBack={true}
          onBack={() => (activeChat ? setActiveChatId(null) : navigate(-1))}
          rightAction={
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary">
              <Phone size={20} className="text-foreground" />
            </button>
          }
        />

        {!activeChat && (
          <div>
            {/* Search */}
            <div className="px-4 py-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Qidirish..."
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="px-4 py-2">
              <div className="flex gap-2">
                {[
                  { key: "all", label: "Hammasi" },
                  { key: "operators", label: "Operatorlar" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === tab.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3">
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-3 p-4 bg-card rounded-2xl shadow-card border-l-4 border-primary">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Qo'ng'iroq</p>
                    <p className="text-xs text-muted-foreground">Operatorga</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 bg-card rounded-2xl shadow-card border-l-4 border-success">
                  <div className="w-11 h-11 rounded-xl bg-success/10 flex items-center justify-center">
                    <HelpCircle size={20} className="text-success" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Yordam</p>
                    <p className="text-xs text-muted-foreground">24/7 xizmat</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Chat List */}
            <div className="px-4 py-2">
              <h2 className="section-title mb-3">Suhbatlar</h2>
              <div className="space-y-2">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card active:bg-secondary transition-colors"
                  >
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{chat.avatar}</span>
                      </div>
                      {chat.online && (
                        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        {getTypeIcon(chat.type)}
                        <p className="font-semibold truncate">{chat.name}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {chat.unread === 0 && (
                          <CheckCheck size={14} className="text-primary flex-shrink-0" />
                        )}
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                      {chat.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeChat && (
          <div className="px-4 py-3 pb-28">
            <div className="space-y-3">
              {activeMessages.map((message) => {
                if (message.type === "system" || message.sender === "system") {
                  return (
                    <div key={message.id} className="flex justify-center">
                      <span className="text-xs text-muted-foreground">
                        {message.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-card ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground"
                      }`}
                    >
                      {message.type === "voice" ? (
                        <div className="flex items-center gap-2">
                          <Mic size={16} />
                          <span className="text-sm">Ovozli xabar</span>
                        </div>
                      ) : message.type === "call" ? (
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          <span className="text-sm">{message.text}</span>
                        </div>
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                      <p
                        className={`text-[10px] mt-1 ${
                          message.sender === "user" ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Composer */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4">
              <div className="bg-card rounded-2xl shadow-card p-3">
                <div className="flex items-center gap-3">
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10"
                    aria-label="Call"
                  >
                    <Phone size={18} className="text-primary" />
                  </button>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Xabar yozing..."
                      className="w-full h-11 px-4 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary"
                    aria-label="Voice message"
                  >
                    <Mic size={18} className="text-foreground" />
                  </button>
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground"
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Matn yozish, qo'ng'iroq qilish yoki ovozli xabar jo'natish mumkin.
              </p>
            </div>
          </div>
        )}
      </div>
    </MobileShell>
  );
};

export default MessagesScreen;