// src/styles/common.js
// Theme: Creative Amazing Pink & White — #ffffff background, #ff0a54 accent, sleek gradients and shadows

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-[#fff5f8] min-h-screen text-[#4a0e28] font-sans selection:bg-[#ff0a54] selection:text-white";
export const pageWrapper = "max-w-5xl mx-auto px-6 py-16";
export const section = "mb-14";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white rounded-3xl p-7 shadow-[0_8px_30px_rgb(255,10,84,0.06)] hover:shadow-[0_8px_30px_rgb(255,10,84,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-[#ffe5ec]";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl font-extrabold text-[#2d0a16] tracking-tight leading-tight mb-2 bg-gradient-to-r from-[#ff0a54] to-[#ff477e] bg-clip-text text-transparent";
export const headingClass = "text-3xl font-bold text-[#2d0a16] tracking-tight";
export const subHeadingClass = "text-xl font-bold text-[#ff0a54] tracking-tight";
export const bodyText = "text-[#6e3b52] leading-relaxed";
export const mutedText = "text-sm text-[#b07d92]";
export const linkClass = "text-[#ff0a54] hover:text-[#d90443] transition-colors font-semibold";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-gradient-to-r from-[#ff0a54] to-[#ff477e] text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-[#ff0a54]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm tracking-wide";
export const secondaryBtn =
  "bg-white border-2 border-[#ff0a54] text-[#ff0a54] font-bold px-6 py-2.5 rounded-full hover:bg-[#fff0f3] hover:shadow-md transition-all cursor-pointer text-sm";
export const ghostBtn = "text-[#ff0a54] font-bold hover:text-[#d90443] hover:underline underline-offset-4 transition-all cursor-pointer text-sm flex items-center gap-1";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-white/80 backdrop-blur-xl border border-[#ffe5ec] shadow-xl shadow-[#ff0a54]/5 rounded-[2rem] p-10 max-w-lg mx-auto";
export const formTitle = "text-3xl font-extrabold text-[#2d0a16] tracking-tight text-center mb-8";
export const labelClass = "text-sm font-bold text-[#ff477e] mb-2 block uppercase tracking-wider";
export const inputClass =
  "w-full bg-[#fff5f8] border-2 border-transparent rounded-2xl px-5 py-3.5 text-[#2d0a16] text-base placeholder:text-[#b07d92] focus:outline-none focus:border-[#ff0a54] focus:bg-white transition-all shadow-inner";
export const formGroup = "mb-6";
export const submitBtn =
  "w-full bg-gradient-to-r from-[#ff0a54] to-[#ff477e] text-white font-bold py-3.5 rounded-2xl hover:shadow-lg hover:shadow-[#ff0a54]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer mt-4 text-base tracking-wide uppercase";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-white/70 backdrop-blur-2xl border-b border-[#ffe5ec] h-[72px] flex items-center sticky top-0 z-50 shadow-sm";
export const navContainerClass = "max-w-6xl mx-auto w-full px-6 flex items-center justify-between";
export const navBrandClass = "text-2xl font-black bg-gradient-to-r from-[#ff0a54] to-[#ff8fab] bg-clip-text text-transparent tracking-tighter";
export const navLinksClass = "flex items-center gap-8";
export const navLinkClass = "text-[0.95rem] font-medium text-[#6e3b52] hover:text-[#ff0a54] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#ff0a54] hover:after:w-full after:transition-all after:duration-300";
export const navLinkActiveClass = "text-[0.95rem] font-bold text-[#ff0a54] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#ff0a54]";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8";
export const articleCardClass =
  "bg-white border border-[#ffe5ec] rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-[#ff0a54]/10 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-3 cursor-pointer group";
export const articleTitle = "text-xl font-bold text-[#2d0a16] leading-tight group-hover:text-[#ff0a54] transition-colors line-clamp-2";
export const articleExcerpt = "text-[0.95rem] text-[#6e3b52] leading-relaxed";
export const articleMeta = "text-xs font-bold text-[#ff8fab] uppercase tracking-wider";
export const articleBody = "text-[#4a0e28] leading-[1.85] text-[1.05rem] max-w-3xl";
export const timestampClass = "text-xs font-medium text-[#b07d92] flex items-center gap-1.5 mt-2";
export const tagClass = "text-[0.7rem] font-bold bg-[#fff0f3] text-[#ff0a54] px-3 py-1 rounded-full uppercase tracking-widest w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-4xl mx-auto px-6 py-16 bg-white shadow-2xl shadow-[#ff0a54]/5 rounded-[3rem] mt-10 mb-20 border border-[#ffe5ec]";
export const articleHeader = "mb-12 flex flex-col gap-5";
export const articleCategory = "text-[0.8rem] font-black uppercase tracking-[0.2em] text-[#ff0a54] bg-[#fff0f3] px-4 py-1.5 rounded-full w-fit";
export const articleMainTitle = "text-5xl font-extrabold text-[#2d0a16] leading-tight tracking-tight";
export const articleAuthorRow =
  "flex items-center justify-between border-y-2 border-[#fff0f3] py-5 text-sm text-[#6e3b52] font-medium";
export const authorInfo = "flex items-center gap-3 font-bold text-[#2d0a16] text-base";
export const articleContent = "text-[#4a0e28] leading-[2] text-[1.1rem] whitespace-pre-line mt-10 selection:bg-[#ff0a54] selection:text-white";
export const articleFooter = "border-t-2 border-[#fff0f3] mt-16 pt-8 flex items-center justify-between";

// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-4 mt-8";
export const editBtn = "bg-[#ff8fab] text-white font-bold px-6 py-2.5 rounded-full hover:bg-[#ff477e] hover:shadow-lg hover:-translate-y-0.5 transition-all";
export const deleteBtn = "bg-[#fff0f3] text-[#ff0a54] font-bold px-6 py-2.5 rounded-full border border-[#ffe5ec] hover:bg-[#ff0a54] hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-4 right-4 text-[10px] font-black px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ff0a54] to-[#ff477e] text-white shadow-md uppercase tracking-wider";
export const articleStatusDeleted =
  "absolute top-4 right-4 text-[10px] font-black px-3 py-1.5 rounded-full bg-[#f1f5f9] text-[#94a3b8] shadow-inner uppercase tracking-wider";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-[#fff0f3] text-[#d90443] border border-[#ffb3c6] rounded-2xl px-5 py-4 text-sm font-medium shadow-sm flex items-center gap-3";
export const successClass =
  "bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] rounded-2xl px-5 py-4 text-sm font-medium shadow-sm flex items-center gap-3";
export const loadingClass = "text-[#ff0a54] font-bold animate-pulse text-center py-12 text-lg";
export const emptyStateClass = "text-center text-[#b07d92] font-medium py-20 text-lg bg-[#fff5f8] rounded-[2rem] border-2 border-dashed border-[#ffb3c6] m-6";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t-2 border-[#fff0f3] my-12";
