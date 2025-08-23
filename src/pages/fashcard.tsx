import React from "react";

const Flashcard = () => {
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      {/* Responsive wrapper to hide overflow (crop from top) */}
      <div className="w-full h-[90vh] overflow-hidden">
        <iframe
          src="https://pdf-summarizer-ckg.pages.dev/"
          title="Flashcard App"
          className="w-full h-[150%] border-0 -translate-y-32 sm:h-[170%] sm:-translate-y-40"
          style={{
            WebkitTransform: 'translateY(-8rem)',
            transform: 'translateY(-8rem)',
          }}
        />
      </div>
    </div>
  );
};

export default Flashcard;