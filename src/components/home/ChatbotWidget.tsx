import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Nirmal Carbon Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickQuestions = [
    "How do carbon credits work?",
    "What projects can I support?",
    "How to verify my contribution?",
    "What are the rewards?",
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("carbon credit") || lowerQuestion.includes("how")) {
      return "Carbon credits represent a reduction of one metric ton of CO₂ emissions. When you purchase or earn credits through our platform, you're directly supporting verified environmental projects. Each credit is tracked and verified by third-party organizations.";
    } else if (lowerQuestion.includes("project")) {
      return "We have various projects including tree plantation, solar energy, wind farms, and coastal restoration. Visit our Marketplace to explore all verified projects with detailed impact metrics.";
    } else if (lowerQuestion.includes("verify") || lowerQuestion.includes("contribution")) {
      return "After making a contribution, you'll receive a digital certificate in your dashboard. All transactions are recorded on our transparent ledger. You can track your impact through your personal dashboard.";
    } else if (lowerQuestion.includes("reward")) {
      return "Earn credits by contributing to projects, then redeem them in our Rewards Shop for gift cards, eco-friendly products, and exclusive offers from partner brands!";
    } else if (lowerQuestion.includes("price") || lowerQuestion.includes("cost")) {
      return "Prices vary by project type. Individual contributions start from ₹399, while corporate credit purchases range from ₹8-18 per credit depending on the project.";
    } else if (lowerQuestion.includes("firm") || lowerQuestion.includes("upload")) {
      return "Firms can upload and manage projects through the Marketplace. You'll need verification documents, project details, and proof of impact. Our team reviews all submissions within 48 hours.";
    } else {
      return "That's a great question! For detailed information, please visit our Help Center or contact our support team at support@nirmalcarbon.com. Is there anything specific about our platform I can help you with?";
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-2xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-foreground/20 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Nirmal Carbon Assistant</h3>
                <p className="text-xs opacity-90">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Quick questions:</p>
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatbotWidget;
