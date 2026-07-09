import React from "react";

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-container">
        {/* 좌측 로고 */}
        <div className="header-logo">K-AI Station</div>

        <div className="header-language">
          <svg
            className="icon-globe"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            ></path>
          </svg>
        </div>
      </div>
    </header>
  );
}