import React from "react";
import "./login.css";
export default function NotFound({ email , setStep , setEmail }) {
  return (
    <div className="contentFormLogin">
      <span className="headerForm">Looks like you're new to Amazon</span>
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
      <span style={{
        fontSize:"13px", fontWeight:"500"
      }}>Let's create an account using your mobile number</span>


       <button onClick={() => {
        setStep("createAcound")
      }} className='BtnForm'>

        Proceed to create an account
      

      </button>


        <span style={{
        display:"block",
        width:"100%",
        height:"1px",
        background:"#d1d1d1"

      }}></span>
      
      <span style={{
        fontSize:"13px",
        fontWeight:"bold"
      }}>
        Already a customer?
      </span>


      <span onClick={()=> {
            setStep("email")
            setEmail("")
      }} style ={{
        fontSize:"14px"
      }} className='linkColor'>Sign in with another email or mobile number</span>
    </div>
  );
}
