// app/page.js
import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">AI Assistant</h1>
        <Chat />
      </div>
    </main>
  );
}
