// app/components/Chat.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/anthropic',
    initialMessages: []
  });
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] border rounded-lg shadow-md bg-white">
      {/* Chat header */}
      <div className="border-b p-3 bg-gray-50 rounded-t-lg">
        <h2 className="text-lg font-medium text-gray-700">Chat with Claude</h2>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 my-8">
            <p>No messages yet. Start a conversation!</p>
          </div>
        )}
        
        {messages.map((message, i) => (
          <div 
            key={i} 
            className={`p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-100 ml-auto max-w-[80%] text-right' 
                : 'bg-gray-100 max-w-[80%]'
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          </div>
        ))}
        
        {isLoading && (
          <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
            <div className="flex space-x-2 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="border-t p-3">
        <div className="flex space-x-2">
          <input
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
