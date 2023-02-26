import React, { useEffect, useState } from "react";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

const scrollToTop = () => {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  return (
    showButton && (
      <button
        className="fixed bg-indigo-900 text-white shadow hover:shadow-xl rounded-full float-right bottom-5 right-5 p-2"
        onClick={scrollToTop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
          />
        </svg>
      </button>
    )
  );
};

export default ScrollToTopButton;
