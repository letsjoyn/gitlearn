"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMode } from "@/components/ModeToggle";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "How many hours does it take to explore Rumtek Monastery?",
  "Best time of year to visit Sikkim monasteries?",
  "Minimum days needed to cover major monasteries?",
  "What's the dress code for monastery visits?",
  "Are there photography restrictions in monasteries?",
  "Which monasteries offer meditation sessions?"
];

const botResponses: Record<string, string> = {
  "rumtek": "Rumtek Monastery typically takes 2-3 hours to explore fully. This includes time to visit the main assembly hall, view the golden stupa, admire the intricate murals, and spend quiet moments in meditation. I'd recommend allowing extra time during festivals when special ceremonies take place.",
  "best time": "The best time to visit Sikkim monasteries is March-June and September-November. During these months, you'll enjoy pleasant weather, clear mountain views, and many festivals. Avoid monsoon season (July-August) due to heavy rains and potential landslides.",
  "minimum days": "For major monasteries, I recommend at least 5 days to cover the main sites comfortably. For a comprehensive spiritual journey including remote monasteries and cultural experiences, plan for 10+ days. This allows time for meaningful interactions and reflection.",
  "dress code": "Monasteries require modest dress - cover shoulders and knees. Remove shoes before entering prayer halls. Avoid bright colors; earth tones are preferred. Many monasteries require silence in certain areas, and always walk clockwise around stupas and prayer wheels.",
  "photography": "Photography policies vary by monastery. Most allow exterior photos, but flash photography and photos of sacred statues/murals are often prohibited. Always ask permission from monks or guides. Some monasteries charge a small photography fee.",
  "meditation": "Several monasteries offer guided meditation sessions: Rumtek has daily morning sessions, Pemayangtse offers weekend retreats, and Tashiding provides silent meditation during festivals. Contact monasteries in advance to arrange authentic spiritual experiences."
};

const BOT_AVATAR = "/icon.png";
const USER_AVATAR = "https://ui-avatars.com/api/?name=Tourist&background=eee&color=555";

const AIAssistant = () => {
  const { mode } = useMode();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Namastey! I'm your AI travel assistant for Sikkim's monasteries. I can help with planning your spiritual journey, monastery information, cultural etiquette, and travel logistics. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    const handleModeToggle = (event: CustomEvent) => {
      if (event.detail.mode === 'researcher') {
        setIsOpen(false);
      }
    };
    window.addEventListener('toggleAIAssistant', handleModeToggle as EventListener);
    return () => window.removeEventListener('toggleAIAssistant', handleModeToggle as EventListener);
  }, []);

  if (mode === 'researcher') {
    return null;
  }

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    setTimeout(() => {
      let response = "I'd be happy to help you with that! For specific monastery details, booking assistance, or travel planning, our team can provide personalized recommendations based on your interests and schedule.";
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes('rumtek') || lowerContent.includes('hours')) {
        response = botResponses.rumtek;
      } else if (lowerContent.includes('time') || lowerContent.includes('when')) {
        response = botResponses["best time"];
      } else if (lowerContent.includes('days') || lowerContent.includes('minimum')) {
        response = botResponses["minimum days"];
      } else if (lowerContent.includes('dress') || lowerContent.includes('wear')) {
        response = botResponses["dress code"];
      } else if (lowerContent.includes('photo') || lowerContent.includes('camera')) {
        response = botResponses.photography;
      } else if (lowerContent.includes('meditation') || lowerContent.includes('spiritual')) {
        response = botResponses.meditation;
      }
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 900);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#f7c873] to-[#fbeee0] text-primary shadow-lg hover:shadow-heritage transition-all duration-300 hover:scale-110 z-50 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-full max-w-md h-[520px] shadow-2xl z-50 flex flex-col animate-fade-in border-0"
          style={{
            background: "linear-gradient(135deg, #fffbe6 60%, #f7e9d0 100%)",
            borderRadius: 22,
            boxShadow: "0 8px 32px rgba(0,0,0,0.13)"
          }}
        >
          <CardHeader className="bg-gradient-to-r from-[#b22234] to-[#f7c873] text-primary-foreground rounded-t-2xl flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={BOT_AVATAR} alt="Bot" className="w-9 h-9 rounded-full border-2 border-white shadow" />
                <div>
                  <CardTitle className="text-lg font-semibold">AI Travel Assistant</CardTitle>
                  <p className="text-xs opacity-90">Your monastery guide</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 max-h-[340px] bg-[url('/prayer-flags.jpg')] bg-cover bg-center bg-no-repeat bg-blend-lighten"
              style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
            >
              {messages.map((message, idx) => (
                <div
                  key={message.id}
                  className={`flex items-end ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  {message.type === 'bot' && (
                    <img src={BOT_AVATAR} alt="Bot" className="w-8 h-8 rounded-full mr-2 border border-saffron shadow" />
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm leading-relaxed ${
                      message.type === 'user'
                        ? 'bg-[#e6f7f1] text-[#1a3c34] ml-2'
                        : 'bg-[#fff7e6] text-[#7a3a00] mr-2'
                    }`}
                    style={{
                      borderBottomRightRadius: message.type === 'user' ? 6 : 22,
                      borderBottomLeftRadius: message.type === 'bot' ? 6 : 22,
                      transition: "background 0.2s"
                    }}
                  >
                    {message.content}
                  </div>
                  {message.type === 'user' && (
                    <img src={USER_AVATAR} alt="You" className="w-8 h-8 rounded-full ml-2 border border-gray-200 shadow" />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t bg-white/80">
                <p className="text-xs text-muted-foreground mb-2">Popular questions:</p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {suggestedQuestions.map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-saffron/30 text-xs px-3 py-2 whitespace-nowrap rounded-full border-saffron border"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t flex-shrink-0 bg-white/90">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about monasteries, travel tips..."
                  className="flex-1 p-2 border border-border rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent text-sm bg-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputMessage.trim()) {
                      handleSendMessage(inputMessage.trim());
                    }
                  }}
                  aria-label="Type your message"
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (inputMessage.trim()) {
                      handleSendMessage(inputMessage.trim());
                    }
                  }}
                  className="bg-saffron text-primary hover:bg-saffron-dark rounded-lg"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
