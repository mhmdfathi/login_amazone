import React from "react";
import './login.css'
export default function ErrMssg({message}) {
  return (
    <span
      style={{
        color: "red",
        fontSize: "12px",
        marginTop: "7px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {" "}
      <span
        style={{
          width: "15px",
          fontSize: "13px",
          height: "15px",
          border: "1px solid red",
          borderRadius: "50%",
          display: "Flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          background: "red",
          color: "#fff",
        }}
      >
        !
      </span>{" "}
      {message}
    </span>
  );
}
