"use client";
import { useState } from "react";
import "./login.css";
import ErrMssg from "./errMssg";
export default function PasswordForm({
  email,
  setStep,
  setMssgSuccess,
  setMssgSuccessContent,
}) {
  const [errMssgrePassword, setErrMssgrePassword] = useState(false);
  const [password, setPassword] = useState("");

  const handelClick = async () => {
    if (!password.trim()) {
      return setErrMssgrePassword(true);
    }

    await fetch("http://localhost:4000/api/user/checkPass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
        window.location.href = "https://www.amazon.eg/-/en/ref=nav_logo"
        }
      });
  };
  return (
    <div className="contentFormLogin">
      <span className="headerForm">Sign in </span>
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
        className="d-flex flex-column inputContainer"
      >
        <div className="d-flex align-items-center justify-content-between">
          <p className="infoInput">Password</p>
          <span  onClick={() => {

            setStep("forgetPassword")

          }} style={{ fontSize: "13px" }} className="linkColor">
            Forgot password?
          </span>
        </div>
        <input
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          value={password}
          className={errMssgrePassword ? "inputFormErr" : "inputForm"}
          type="password"
        />

        {errMssgrePassword && <ErrMssg message={"Enter your password"} />}
      </div>

      <button onClick={handelClick} className="BtnForm">
        Sign in
      </button>
    </div>
  );
}
