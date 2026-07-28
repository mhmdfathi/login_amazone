"use client";
import { useState } from "react";

import "./login.css";
import ErrMssg from "./errMssg";

export default function ResetPasswordForm({ email, setStep }) {
  const [errMssgPassword, setErrMssgPassword] = useState(false);
  const [errMssgRePassword, setErrMssgRePassword] = useState(false);

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handelClaick = async () => {
    if (!password.trim()) {
      setErrMssgPassword(true);
      return;
    }

    if (password.trim().length < 6) {
      setErrMssgPassword("lengthErr");
      return;
    }
    if (!rePassword.trim()) {
      setErrMssgRePassword(true);
      return;
    }

    if (password !== rePassword) {
      setErrMssgRePassword("notSame");
    } else {
      await fetch("https://back-production-e1fb.up.railway.app/api/user/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          password: password.trim(),
          email: email.trim()
        }),
      })
        .then((res) => res.json())
        .then((data) => {
         if (data.success) {
            setStep(data.step)
            
         }
        });
    }
  };

  return (
    <div className="contentFormLogin">
      <div className="inputContainer">
        <p className="infoInput">New Password (at least 6 characters)</p>
        <input
          onChange={(e) => {
            setPassword(e.currentTarget.value);
            setErrMssgPassword(false);
          }}
          value={password}
          className={errMssgPassword ? "inputFormErr " : "inputForm"}
          type="password"
        />

        {errMssgPassword === true && (
          <ErrMssg message={"Enter your password"} />
        )}
        {errMssgPassword === "lengthErr" && (
          <ErrMssg message={" Passwords must be at least 6 characters."} />
        )}

        {!errMssgPassword && (
          <span
            className="d-flex align-itens-center"
            style={{
              fontSize: "11px",
              fontWeight: "500",
              gap: "5px",
            }}
          >
            <span
              style={{
                width: "15px",
                fontSize: "13px",
                height: "15px",
                border: "1px solid #246fb6",
                borderRadius: "50%",
                display: "Flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                background: "#246fb6",
                color: "#fff",
              }}
            >
              !
            </span>
            Passwords must be at least 6 characters.
          </span>
        )}
      </div>
      <div className="inputContainer">
        <p className="infoInput">Re-enter password</p>
        <input
          onChange={(e) => {
            setRePassword(e.currentTarget.value);
            setErrMssgRePassword(false);
          }}
          value={rePassword}
          className={errMssgRePassword ? "inputFormErr " : "inputForm"}
          type="password"
        />
        {errMssgRePassword === "notSame" && (
          <ErrMssg message={"Password not same"} />
        )}
        {errMssgRePassword === true && (
          <ErrMssg message={"Enter your password"} />
        )}
      </div>
      <button onClick={handelClaick} className="BtnForm">
        Submit
      </button>
    </div>
  );
}
