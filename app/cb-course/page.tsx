export default function CBCourse() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">CB Course</h1>
      <div className="mt-4">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold">Course Module 1</h2>
          <p>Sample course module</p>
          <iframe className="w-full h-64 mt-2" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Course Module" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}
