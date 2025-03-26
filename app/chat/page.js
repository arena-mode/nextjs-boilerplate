// app/chat/page.js
import Chat from '../components/Chat';

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-6">
        AI Chat with Claude
      </h1>
      
      <Chat />
      
      <div className="mt-4 text-center text-sm text-gray-500">
        Powered by Anthropic Claude API
      </div>
    </div>
  );
}
