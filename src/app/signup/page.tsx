"use client";
import { useState } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonStatus, setbuttonStatus] = useState(true);

  async function handleSignUp() {
    try {
      setbuttonStatus(false);
      const response = await axios.post("api/users/signup", user);
      console.log(response.data);
      if (response.data.status == 201) {
        toast.success("User Signed up successfully !", {
            position: "bottom-right",
          })
        router.push("/login");          
      }
    } catch (error) {
      console.error(error);
      toast.error("User signUp failed", {
        position: "bottom-right",
      });
    } finally {
      setbuttonStatus(true);
    }
  }

  return (
    <>
      <div className="main_screen flex flex-col min-h-screen justify-center items-center">
        <h1>{buttonStatus ? "SignUp" : "Signing up"} </h1>
        <label htmlFor="username">Username</label>
        <input
          className="border p-2"
          type="text"
          id="username"
          value={user.username}
          placeholder="username"
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
        />
        <label htmlFor="email">email</label>
        <input
          className="border p-2"
          type="text"
          id="email"
          value={user.email}
          placeholder="email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <label htmlFor="password">password</label>
        <input
          className="border p-2"
          type="password"
          id="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />

        <button
          className="border bg-black text-white p-2 mt-2 rounded-md "
          onClick={handleSignUp}
          disabled={buttonStatus ? false : true}
        >
          Submit
        </button>
        <ToastContainer/>
        <Link href="/login">Visit login </Link>
      </div>
      
    </>
  );
}
