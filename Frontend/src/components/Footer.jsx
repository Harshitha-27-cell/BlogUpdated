import React from 'react';
import { NavLink } from 'react-router';

function Footer() {
  return (
    <footer className="bg-white border-t border-[#ffe5ec] mt-auto py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-black bg-gradient-to-r from-[#ff0a54] to-[#ff8fab] bg-clip-text text-transparent tracking-tighter">MyBlog</h2>
          <p className="text-sm font-medium text-[#b07d92] mt-1">© {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <NavLink to="/" className="text-sm font-bold text-[#6e3b52] hover:text-[#ff0a54] transition-colors">Home</NavLink>

        </div>
      </div>
    </footer>
  );
}

export default Footer