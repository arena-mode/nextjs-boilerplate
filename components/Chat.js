// app/components/Chat.js
'use client';

import { useChat } from 'ai';
import { useState } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat'
  });
  
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format citations in text
  const formatWithCitations = (text) => {
    return text.replace(/$(\d+)$/g, '<sup>[<a href="#citation-$1" class="text-blue-600">$1</a>]</sup>');
  };

  return (
    <div className="flex flex-col h-[80vh] bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Message area with Perplexity styling */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p className="text-lg">Ask me anything...</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="group">
              {/* User message */}
              {message.role === 'user' && (
                <div className="flex items-start mb-6">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    You
                  </div>
                  <div className="ml-4 px-4 py-3 bg-blue-50 rounded-2xl rounded-tl-none max-w-[85%]">
                    <p className="text-gray-800">{message.content}</p>
                  </div>
                </div>
              )}

              {/* AI message */}
              {message.role === 'assistant' && (
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                    AI
                  </div>
                  <div className="ml-4 px-6 py-4 bg-white border border-gray-100 shadow-sm rounded-2xl max-w-[85%]">
                    <div 
                      className="prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: formatWithCitations(message.content) 
                      }} 
                    />
                    
                    {/* Citations section (simplified) */}
                    <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500">
                      <p className="font-medium">Sources</p>
                      <ol className="list-decimal list-inside mt-1">
                        <li>Google.com - Recent information</li>
                        <li>Wikipedia.org - Background information</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        
        {/* Loading indicator with Perplexity style */}
        {isLoading && (
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
              AI
            </div>
            <div className="ml-4 px-6 py-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area with Perplexity styling */}
      <div className="border-t border-gray-100 p-4 bg-white rounded-b-xl shadow-[0_-2px_5px_rgba(0,0,0,0.03)]">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none text-gray-800 placeholder-gray-400"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
