import React from "react";

import "./login.css";

export default function MssgSuccess({ content }) {
  return (
    <div className="mssgSuccess d-flex align-items-center">
      <span
        style={{
          width: "18px",
          fontSize: "13px",
          height: "18px",
          border: "1px solid green",
          borderRadius: "50%",
          display: "Flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          background: "green",
          color: "#fff",
        }}
      >
        <svg
          width="8"
          height="8"
          viewBox="0 0 15 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.24268L5.24264 9.48532L13.727 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        style={{
          color: "green",
          fontWeight: "500",
        }}
      >
        {content}
      </span>
    </div>
  );
}
