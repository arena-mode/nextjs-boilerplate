'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';

export default function AICodingAssistant() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Coding Assistant</h1>
      
      <div className="mb-6 border rounded-lg p-4 bg-gray-50 h-[500px] overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className="mb-4">
            <div className="font-bold">
              {message.role === 'user' ? 'You:' : 'Assistant:'}
            </div>
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        ))}
        {isLoading && <div className="text-gray-400">Assistant is typing...</div>}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea 
          value={input} 
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Ask about your code or project..."
          rows={4}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
