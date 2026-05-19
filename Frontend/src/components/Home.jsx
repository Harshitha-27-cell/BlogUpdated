function Home() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center py-10 w-full h-full">

      <h1 className="text-5xl md:text-7xl font-extrabold text-[#ff0a54] tracking-tight animate-pulse leading-normal pb-2">
        Welcome to MyBlog
      </h1>
      <p className="text-xl md:text-2xl text-[#b07d92] font-medium max-w-2xl leading-relaxed mt-8 hover:text-[#ff0a54] transition-colors cursor-default">
        Discover, read, and publish amazing articles in a vibrant and creative community.
      </p>

    </div>
  );
}

export default Home;