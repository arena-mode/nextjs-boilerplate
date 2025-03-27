// components/Chat.js - Complete example with Vercel AI SDK
import { useState } from 'react';
import { useChat } from 'ai/react';

export default function Chat() {
  // This hook from the Vercel AI SDK manages the chat state and API calls
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/anthropic', // Your API endpoint
  });

  return (
    <div className="flex flex-col h-[600px] border rounded-lg">
      {/* Messages display area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-900 text-white ml-auto max-w-[80%]'
                : 'bg-gray-800 text-white max-w-[80%]'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">Claude is thinking...</div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex space-x-4">
          <input
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask something..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
