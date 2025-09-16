import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Send, 
  Minimize2, 
  Maximize2, 
  X, 
  BookOpen, 
  Search, 
  History,
  Lightbulb,
  Database,
  FileText
} from "lucide-react";
import { useMode } from "@/components/ModeToggle";

interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  sources?: string[];
  relatedTopics?: string[];
}

const AIResearchAgent = () => {
  const { mode } = useMode();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'agent',
      content: 'Hello! I\'m your AI Research Assistant for Sikkim monastery heritage. I can help you find information from our digital archives, manuscripts, historical records, and academic research. What would you like to know?',
      timestamp: new Date(),
      relatedTopics: ['Monastery History', 'Buddhist Practices', 'Architectural Styles', 'Cultural Heritage']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for mode changes and close assistant when switching to tourist
  useEffect(() => {
    const handleModeToggle = (event: CustomEvent) => {
      if (event.detail.mode === 'tourist') {
        setIsOpen(false);
      }
    };

    window.addEventListener('toggleAIAssistant', handleModeToggle as EventListener);
    return () => window.removeEventListener('toggleAIAssistant', handleModeToggle as EventListener);
  }, []);

  const suggestedQuestions = [
    "Tell me about the history of Rumtek Monastery",
    "What are the main Buddhist festivals celebrated in Sikkim?",
    "Explain the architectural significance of Pemayangtse Monastery",
    "What manuscripts are available about Tibetan Buddhism?",
    "How did monasteries influence Sikkimese culture?",
    "Find research papers on monastery conservation"
  ];

  const simulateAgentResponse = (userQuery: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      let sources: string[] = [];
      let relatedTopics: string[] = [];

      if (userQuery.toLowerCase().includes('rumtek')) {
        response = `Based on our digital archives, Rumtek Monastery (officially Dharma Chakra Centre) was rebuilt in the 1960s by the 16th Karmapa. It serves as the seat of the Karma Kagyu lineage and houses remarkable murals depicting Buddhist cosmology. The monastery's golden stupa contains relics and is considered one of the most significant Tibetan Buddhist centers outside Tibet.

Key findings from our research:
• Founded originally in 1740, rebuilt 1960s
• Architectural style: Traditional Tibetan with Sikkimese influences  
• Houses 300+ monks
• Contains rare manuscripts and artifacts
• Famous for annual Cham dance festivals`;
        
        sources = [
          'Digital Archives: Rumtek Manuscript Collection',
          'Historical Records: Sikkim Monastery Survey 1975',
          'Research Paper: "Karma Kagyu Architecture in Sikkim" (2019)'
        ];
        
        relatedTopics = ['Karma Kagyu Lineage', 'Tibetan Architecture', 'Buddhist Art', 'Cham Dance'];
      } else if (userQuery.toLowerCase().includes('festival') || userQuery.toLowerCase().includes('buddhist')) {
        response = `Sikkim's monasteries celebrate numerous Buddhist festivals throughout the year. Major celebrations include:

**Losar (Tibetan New Year)**: February/March - Most significant festival with 15 days of celebrations
**Saga Dawa**: Commemorates Buddha's birth, enlightenment, and death
**Drupka Teshi**: Celebrates Buddha's first teaching
**Lhabab Duchen**: Buddha's descent from heaven

Each monastery has unique variations based on their lineage (Nyingma, Kagyu, etc.). Our archives contain detailed ritual descriptions and historical variations.`;
        
        sources = [
          'Cultural Calendar Database',
          'Ethnographic Study: "Buddhist Festivals in Sikkim" (2020)',
          'Monastery Records: Annual Celebration Archives'
        ];
        
        relatedTopics = ['Buddhist Calendar', 'Ritual Practices', 'Cultural Heritage', 'Monastery Traditions'];
      } else {
        response = `I found several relevant materials in our digital archives. Our AI has indexed over 1,200 documents, manuscripts, and research papers related to Sikkim monastery heritage. 

Here are some key resources I can help you explore:
• Digitized manuscripts (342 items)
• Historical photographs (296 items) 
• Academic research papers (156 items)
• Oral history recordings (89 items)

Could you be more specific about what aspect interests you? I can search across all these materials using semantic understanding.`;
        
        sources = [
          'Digital Archives Search Index',
          'Metadata Database',
          'Academic Research Collection'
        ];
        
        relatedTopics = ['Research Methodology', 'Archive Navigation', 'Source Verification'];
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'agent',
        content: response,
        timestamp: new Date(),
        sources,
        relatedTopics
      }]);
      
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAgentResponse(inputMessage);
    setInputMessage('');
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
    handleSendMessage();
  };

  if (mode !== 'researcher') {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Bot className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-[600px]'
        } w-80 md:w-96`}>
          <Card className="h-full flex flex-col shadow-2xl">
            {/* Header */}
            <CardHeader className="pb-3 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Research Assistant
                  <Badge variant="secondary" className="text-xs">
                    Beta
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-6 w-6 p-0 hover:bg-white/20"
                  >
                    {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6 p-0 hover:bg-white/20"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full max-h-[400px] p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.type === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                            
                            {message.sources && message.sources.length > 0 && (
                              <div className="mt-3 pt-2 border-t border-border/20">
                                <div className="text-xs font-semibold mb-1 flex items-center gap-1">
                                  <Database className="h-3 w-3" />
                                  Sources:
                                </div>
                                {message.sources.map((source, index) => (
                                  <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    {source}
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {message.relatedTopics && message.relatedTopics.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {message.relatedTopics.map((topic, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            <div className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Suggested Questions */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2">
                    <div className="text-xs font-semibold mb-2 flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" />
                      Try asking about:
                    </div>
                    <div className="space-y-1">
                      {suggestedQuestions.slice(0, 3).map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuestionClick(question)}
                          className="text-xs text-left w-full p-2 hover:bg-muted rounded transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask about monastery heritage..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="text-sm"
                    />
                    <Button size="sm" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default AIResearchAgent;