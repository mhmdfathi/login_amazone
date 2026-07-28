"use client";
import { useState } from "react";

import "./login.css";
import ErrMssg from "./errMssg";

export default function CreateAcound({ setStep, setEmail, email  , setOtpType }) {
  const [errMssgNumber, setErrMssgNumber] = useState(false);
  const [errMssgName, setErrMssgName] = useState(false);
  const [errMssgPassword, setErrMssgPassword] = useState(false);
  const [errMssgRePassword, setErrMssgRePassword] = useState(false);
  const [loding, setLoding] = useState(false);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handelClaick = async () => {
    if (!number.trim()) {
      setErrMssgNumber(true);
    }

    if (!name.trim()) {
      setErrMssgName(true);
    }
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
      setLoding(true);
      await fetch("http://localhost:4000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          phone: number.trim(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOtpType("veriftEmail")
            setStep(data.step);
          }
        });
      setLoding(false);
    }
  };

  return (
    <div className="contentFormLogin">
      <span
        style={{
          fontSize: "27px",
        }}
        className="headerForm"
      >
        Create Account
      </span>

      <div className="inputsCon">
        <div className="inputContainer">
          <p className="infoInput">Mobile number</p>
          <input
            onChange={(e) => {
              setNumber(e.currentTarget.value);
              setErrMssgNumber(false);
            }}
            value={number}
            className={errMssgNumber ? "inputFormErr " : "inputForm"}
            type="text"
            placeholder="Mobile number
"
          />

          {errMssgNumber && <ErrMssg message={"Enter mobile number"} />}
        </div>
        <div className="inputContainer">
          <p className="infoInput">Your name</p>
          <input
            onChange={(e) => {
              setName(e.currentTarget.value);
              setErrMssgName(false);
            }}
            value={name}
            className={errMssgName ? "inputFormErr " : "inputForm"}
            type="text"
            placeholder="First and last name
"
          />

          {errMssgName && <ErrMssg message={"Enter your name"} />}
        </div>

        <div className="inputContainer">
          <p className="infoInput">Password (at least 6 characters)</p>
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
      </div>

      <span
        style={{
          fontSize: "11px",
          fontWeight: "500",
        }}
      >
        To verify your number, we will send you a text message with a temporary
        code. Message and data rates may apply.
      </span>

      <button onClick={handelClaick} className="BtnForm">
        {loding ? "loding..." : " Verify email"}
      </button>

      <span
        style={{
          display: "block",
          width: "100%",
          height: "1px",
          background: "#d1d1d1",
          marginTop: "20PX",
        }}
      ></span>

      <div className="d-flex flex-column">
        <span
          style={{
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          Already a customer?
        </span>

        <span
          onClick={() => {
            setStep("emailForm");
            setEmail("");
          }}
          style={{
            fontSize: "14px",
          }}
          className="linkColor"
        >
          Sign in instead
        </span>
      </div>

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
    </div>
  );
}
