"use client";

import { useState } from "react";

import "./login.css";
import ErrMssg from "./errMssg";

export default function ForgetPassword({
  email,
  setEmail,
  setStep,
  setMssgError,
  setMssgErrorContent,
  
  setOtpType,
}) {
  const [errMssgEmailForm, setErrMssgEmailForm] = useState(false);

  const handelClick = async () => {
    if (!email.trim()) {
      setErrMssgEmailForm(true);
    } else {
      setErrMssgEmailForm(false);
    }

    await fetch("http://back-production-e1fb.up.railway.app/api/user/findEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOtpType("otpPassword");
          setStep(data.step);
        } else {
          setMssgErrorContent(data.message);
          setMssgError(true);
        }
      });
  };

  return (
    <div className="contentFormLogin">
      <span
        style={{
          fontSize: "27px",
        }}
        className="mssgHeader"
      >
        Password assistance
      </span>

      <span>Enter the email address associated with your Amazon account.</span>

      <div className="inputContainer">
        <p className="infoInput">Email</p>
        <input
          className={errMssgEmailForm ? "inputFormErr" : "inputForm"}
          type="email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          value={email}
        />
        {errMssgEmailForm && <ErrMssg message={"Enter your email"} />}
      </div>

      <button onClick={handelClick} className="BtnForm">
        Continue
      </button>

      <div
        style={{
          gap: "3px",
        }}
        className="d-flex align-items-center"
      >
        <span
          style={{ flex: "1", height: "1px", background: "#d1d1d1" }}
        ></span>
        <span
          style={{
            fontSize: "11px",
          }}
        >
          or
        </span>
        <span
          style={{ flex: "1", height: "1px", background: "#d1d1d1" }}
        ></span>
      </div>

      <button
        onClick={() => {
          setStep("emailForm");
        }}
        className="BtnFormOr"
      >
        Sign in
      </button>
    </div>
  );
}
