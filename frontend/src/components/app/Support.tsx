import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Bot, Users, Send, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatHistory {
  userId: string;
  messages: {
    role: string;
    content: string;
    timestamp: string;
  }[];
  model: string;
  createdAt: string;
  updatedAt: string;
}

const Support: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm your AI assistant. How can I help you today?" }  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Generate a random user ID or use a stored one
  const getUserId = () => {
    let userId = localStorage.getItem('chatUserId');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('chatUserId', userId);
    }
    return userId;
  };

  // Load chat history when component mounts
  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    const userId = getUserId();
    setIsLoadingHistory(true);
    
    try {
      const response = await fetch(`/api/chat/history/${userId}`);
      
      if (response.ok) {
        const history: ChatHistory = await response.json();
          if (history.messages.length > 0) {
          // Convert the history format to our local format
          // Filter out any system messages - only show user and assistant messages
          const formattedMessages = history.messages
            .filter(msg => msg.role === 'user' || msg.role === 'assistant')
            .map(msg => ({
              role: msg.role as 'user' | 'assistant',
              content: msg.content
            }));
          
          setMessages(formattedMessages);
        }
      } else if (response.status !== 404) {
        // 404 just means no history yet, which is fine
        console.error('Error loading chat history:', await response.text());
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const clearChatHistory = async () => {
    const userId = getUserId();
    
    try {
      await fetch(`/api/chat/history/${userId}`, {
        method: 'DELETE'
      });
      
      // Reset to default welcome message
      setMessages([
        { role: 'assistant', content: "Hello! I'm your AI assistant. How can I help you today?" }
      ]);
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  };  const scrollToBottom = (smooth = true) => {
    if (chatContainerRef.current) {
      // Use setTimeout to ensure scrolling happens after DOM update
      setTimeout(() => {
        if (chatContainerRef.current) {
          const container = chatContainerRef.current;
          const isNearBottom = container.scrollHeight - container.clientHeight - container.scrollTop < 100;
          
          // Only auto-scroll if we're already near the bottom or this is triggered by a user action
          if (isNearBottom || smooth) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: smooth ? 'smooth' : 'auto'
            });
          }
        }
      }, 0);
    }
  };
  useEffect(() => {
    scrollToBottom(true);
  }, [messages]);
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = message;
    setMessage('');
      // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Immediately scroll to bottom after sending a message
    scrollToBottom(true);
    
    // Set loading state
    setIsLoading(true);
      // Store the assistant's response outside the try block so it's accessible in catch
    let assistantResponse = '';
      try {
      // Add a placeholder for the assistant response before making the request
      // This prevents issues if the request fails immediately
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
        // Prepare the request to the streaming endpoint
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: getUserId(),
          message: userMessage,
          // Send system message separately - this won't be displayed in the chat
          systemMessage: "You are an AI assistant for REVOFF, a luxury car fractional investment platform. Help users with queries about car investments, rental yields, portfolio management, and platform features. Be friendly, professional, and helpful."
        }),
      }).catch(err => {
        console.error('Network error during fetch:', err);
        throw new Error('Network error: Could not connect to the server');
      });      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      // Handle the streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Response body is null');

      const decoder = new TextDecoder();

      let streamComplete = false;
      while (!streamComplete) {
        const { done, value } = await reader.read();
        if (done) break;        // Decode the chunk and process each line
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));
              
              if (data.done) {
                // Stream is complete
                streamComplete = true;
                break;
              } else if (data.error) {
                console.warn('Error in stream data:', data.error);
                // Continue processing instead of throwing - this allows partial responses
              } else if (data.content) {
                // Append content to the response
                assistantResponse += data.content;
                // Update the last message with accumulated response
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    ...newMessages[newMessages.length - 1],
                    content: assistantResponse
                  };
                  return newMessages;
                });
                
                // Use non-smooth scrolling during streaming for better performance
                scrollToBottom(false);
              }
            } catch (parseError) {
              console.error('Error parsing stream data:', parseError, 'Raw line:', line);
              // Continue processing despite parse errors
            }
          }
        }      }    } catch (error) {
      console.error('Error sending message:', error);
      
      if (assistantResponse.trim()) {
        // If we already received some content, keep it as the final response
        console.log('Error occurred during streaming, but partial response was received');
        
        // Make sure the last message contains whatever content we received
        setMessages(prev => {
          const newMessages = [...prev];
          // Only update if the last message is from the assistant (which should be the case)
          if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'assistant') {
            newMessages[newMessages.length - 1].content = assistantResponse;
          }
          return newMessages;
        });
      } else {
        // No content received, show error message
        setMessages(prev => {
          // Check if we already added an empty assistant message
          if (prev.length > 0 && prev[prev.length - 1].role === 'assistant' && !prev[prev.length - 1].content) {
            // Replace the empty message with an error message
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: 'assistant',
              content: "I'm sorry, but I encountered an error. Please try again later."
            };
            return newMessages;
          } else {
            // Add a new error message
            return [
              ...prev, 
              { 
                role: 'assistant', 
                content: "I'm sorry, but I encountered an error. Please try again later." 
              }
            ];
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Support</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Chat Support */}
        <div className="md:col-span-2 bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Assistant</h2>
                <p className="text-gray-600">Get instant help with your questions</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={clearChatHistory}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Clear chat history"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>          <div 
            ref={chatContainerRef}
            className="h-[400px] border border-gray-100 rounded-xl mb-4 p-4 overflow-y-auto scroll-smooth"
          >
            {isLoadingHistory ? (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
              </div>
            ) : (              <div className="space-y-4">
                {messages
                  .filter(msg => msg.role === 'user' || msg.role === 'assistant') // Only show user and assistant messages
                  .map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-red-600" />
                      </div>
                    )}
                    
                    <div 
                      className={`${
                        msg.role === 'assistant' 
                          ? 'bg-gray-100 rounded-2xl rounded-tl-none' 
                          : 'bg-red-600 text-white rounded-2xl rounded-tr-none'
                      } p-4 max-w-[80%]`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                      <Loader2 className="w-4 h-4 animate-spin" />                    </div>
                  </div>
                )}
                {/* No need for a separate reference for scrolling */}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading || isLoadingHistory}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || isLoadingHistory || !message.trim()}
              className={`${
                isLoading || isLoadingHistory || !message.trim() 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'
              } text-white px-4 py-2 rounded-xl transition-colors`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>{/* Support Options */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Contact Live Agent</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-gray-500">Response in 2 mins</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Schedule Call</div>
                    <div className="text-sm text-gray-500">Book a time slot</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>          <div className="bg-white rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Common Topics</h3>
            <div className="space-y-2">
              <button 
                onClick={() => {
                  setMessage("Can you explain the investment process at REVOFF?");
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Investment Process
              </button>
              <button 
                onClick={() => {
                  setMessage("How do I set up my account properly?");
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Account Setup
              </button>
              <button 
                onClick={() => {
                  setMessage("I'm having issues with payments. Can you help?");
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Payment Issues
              </button>
              <button 
                onClick={() => {
                  setMessage("Can you provide more information about the vehicles available for investment?");
                  setTimeout(() => handleSendMessage(), 100);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Vehicle Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;