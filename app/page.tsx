export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Crypto Bellwether</h1>
      <p className="text-xl max-w-2xl mb-8">
        Your comprehensive cryptocurrency platform for alerts, market updates, and exclusive content.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="/live-stream-alerts" className="px-6 py-3 bg-[#444654] rounded-lg hover:bg-[#565869]">
          Live Stream Alerts
        </a>
        <a href="/videos" className="px-6 py-3 bg-[#444654] rounded-lg hover:bg-[#565869]">
          Videos
        </a>
        <a href="/posts" className="px-6 py-3 bg-[#444654] rounded-lg hover:bg-[#565869]">
          Posts
        </a>
      </div>
    </div>
  );
}
