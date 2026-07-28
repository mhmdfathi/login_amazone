"use client";
import { useState, useEffect, useRef } from "react";

import "./login.css";
import ReSendOtp from "./reSendCode";

export default function Otp({
  setStep,
  email,
  setMssgSuccess,
  setMssgSuccessContent,
  otpType,
}) {
  const [errMssgreOtp, setErrMssgreOtp] = useState("");
  const [code, setCode] = useState("");
  const [loding, setLoding] = useState(false);
  const hasSend = useRef(false);

  useEffect(() => {
    if (hasSend.current) return;
    sendCodeAndSaveUser(email);
    hasSend.current = true;
  }, []);

  const sendCodeAndSaveUser = async (email) => {
    if (otpType === "veriftEmail") {
      await fetch("http://back-production-e1fb.up.railway.app/api/user/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      })
        .then((res) => res.json())
        .then((data) => {});
    } else if (otpType === "otpPassword") {
      await fetch("http://back-production-e1fb.up.railway.app/api/user/sendOtpPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      })
        .then((res) => res.json())
        .then((data) => {});
    }
  };

  const handelClick = async () => {
    setLoding(true);

    if (otpType === "veriftEmail") {
      await fetch("http://back-production-e1fb.up.railway.app/api/user/verifyEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: code,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStep(data.step);
          }
        });
    } else if (otpType === "otpPassword") {
      await fetch("http://back-production-e1fb.up.railway.app/api/user/checkCodePass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: code,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStep(data.step)
          }
        });
    }
    setLoding(false);
  };

  return (
    <div className="contentFormLogin">
      <span
        style={{
          fontSize: "27px",
        }}
        className="mssgHeader"
      >
        Verify email code
      </span>

      <span>Enter the OTP we sent you.</span>

      <div
        style={{ gap: "10px" }}
        className="changeEmailData d-flex align-atems-center"
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          {email}
        </span>
        <span
          style={{
            fontSize: "13px",
          }}
          className="linkColor"
          onClick={() => {
            setStep("emailForm");
            setMssgSuccess(false);
          }}
        >
          Change
        </span>
      </div>

      <div
        style={{
          width: "100%",
          gap: "5px",
        }}
        className="d-flex flex-column"
      >
        <label htmlFor="">Enter OTP</label>
        <input
          onChange={(e) => {
            setCode(e.currentTarget.value);
          }}
          value={code}
          className={errMssgreOtp ? "inputFormErr" : "inputForm"}
          type="text"
        />
      </div>

      <button onClick={handelClick} className="BtnForm">
        {otpType === "veriftEmail"
          ? loding
            ? "loding"
            : " Create your account"
          : otpType === "otpPassword"
            ? loding
              ? "loding"
              : " Submit code"
            : ""}
      </button>

      <span
        style={{
          fontSize: "11PX",
          marginTop: "25px",
          display: "block",
        }}
        className=""
      >
        By creating an account, you agree to Amazon's{" "}
        <span className="linkColor">Conditions of Use </span>and
        <span className="linkColor"> Privacy Notice.</span>
      </span>

      <ReSendOtp
        email={email}
        setMssgSuccess={setMssgSuccess}
        setMssgSuccessContent={setMssgSuccessContent}
        otpType={otpType}
      />
    </div>
  );
}
