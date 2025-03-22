export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Crypto Bellwether</h1>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Chatbot</h2>
        <div className="mt-2">
          <input type="text" placeholder="Ask a question..." className="p-2 border rounded w-full" />
          <button className="mt-2 p-2 bg-blue-500 text-white rounded">Send</button>
          <p className="mt-2">Chatbot: Hello! How can I help you today?</p>
        </div>
      </div>
    </div>
  );
}
