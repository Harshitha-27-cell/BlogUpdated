function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0a54] to-[#ff477e] tracking-tight mb-6 animate-pulse">
        Welcome to MyBlog
      </h1>
      <p className="text-xl md:text-2xl text-[#b07d92] font-medium max-w-2xl leading-relaxed">
        Discover, read, and publish amazing articles in a vibrant and creative community.
      </p>
    </div>
  );
}

export default Home;