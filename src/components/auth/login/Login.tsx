"use client";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

const Login = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<null | string>(null);
  const [trxnId, setTrxnId] = useState<null | string>(null);
  return (
    <div>
      {step === 1 ? (
        <Step1
          setStep={setStep}
          setEmail={setEmail}
          email={email}
          setTrxnId={setTrxnId}
        />
      ) : (
        <Step2 setStep={setStep} email={email} trxnId={trxnId} />
      )}
    </div>
  );
};

export default Login;
