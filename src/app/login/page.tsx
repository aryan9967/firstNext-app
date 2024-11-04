"use client";
import { useState } from "react";
// import { useRouter } from "next/router";
import  Link  from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function Login() {
   const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    username: "",
  });


  async function login(){
   try {
      const response = await axios.post("/api/users/login", user)
      console.log(response.data)
      toast("User Logged in successfullly")
      router.push("/profile")
   
   } catch (error) {
      console.log("error occured", error)
      toast.error(error.response.data.error)
   }

  }

  return (
    <div className="main_screen flex flex-col min-h-screen justify-center items-center">
      <h1>Login</h1>
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

      <button className="border bg-black text-white p-2 mt-2 rounded-md " onClick={login}>Submit</button>    
      <Link href = "/signup" >Visit signup </Link>
      <ToastContainer />
      </div>
  );
}
