"use client";

import { useRef, useState } from "react";
import "./login.css";
export default function ReSendOtp({
  email,
  setMssgSuccess,
  setMssgSuccessContent,
  otpType,
}) {
  const time = useRef(true);
  const [timer, setTimer] = useState(60);
  const intervalRef = useRef(null);

  const reSendTime = () => {
    time.current = false;
    setTimer(60);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          time.current = true;
          return 60;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handelClick = async () => {
    if (!time.current) return;
    reSendTime();
    if (otpType === "veriftEmail") {
      await fetch("http://back-production-e1fb.up.railway.app/api/user/reSendCode", {
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
            setMssgSuccessContent(data.message);
            setMssgSuccess(true);
          }
        });
    }

    if (otpType === "otpPassword") {
      await fetch("http://back-production-e1fb.up.railway.app/api/user/sendOtpPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      })
        .then((res) => res.json())
        .then((data) => {
             if (data.success) {
            setMssgSuccessContent(data.message);
            setMssgSuccess(true);
          }

        });
    }
  };
  return (
    <div style={{ gap: "0px" }} className="d-flex flex-column">
      <span
        style={{
          fontSize: "12px",
          width: "fit-content",
        }}
        onClick={handelClick}
        className={!time.current ? "linkDisabled" : "linkColor"}
      >
        Resend OTP
      </span>

      {!time.current ? (
        <span
          style={{
            fontSize: "12px",
            color: "#2162a1",
            fontWeight: "500",
          }}
        >
          Request new OTP in “{timer}” second(s).
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
