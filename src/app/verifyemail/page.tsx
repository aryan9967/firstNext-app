"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function VerifyEmail() {
  const [token, setToken] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const search = window.location.search;
    console.log(search);
    const token = search.slice(7);
    console.log(token);
    setToken(token);
  }, []);

  useEffect(()=>{
    if(token){
        VerifyEmail()
    }
  }, [token])

  async function VerifyEmail() {
    try {
      const { data } = await axios.post("api/users/verifyemail", { token });
      console.log(data);
      if(data.success){
        setVerified(true)
      }
    } catch (error) {
      console.error(error);
      toast.error("Email verification failed", {
        position: "bottom-right",
      });
    }
  }

  return (
    <div className="verification_message text-center mt-10">
        {verified? <div>Email verified successfullly
            <Link href="/login">login</Link>
        </div> :<div>Wait for a minute Verifying your Email...</div>}
      <ToastContainer />
    </div>
  );
}
