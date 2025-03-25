'use client';

import { useState } from 'react';

export default function AICodingAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('AI functionality will be available soon!');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Coding Assistant</h1>
      <p>Coming soon - we're setting up the AI integration.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Ask about your code or project..."
          rows={4}
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}
