export default function Videos() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Videos</h1>
      <div className="mt-4">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold">Sample Video</h2>
          <p>Sample description</p>
          <iframe className="w-full h-64 mt-2" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Sample Video" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}
