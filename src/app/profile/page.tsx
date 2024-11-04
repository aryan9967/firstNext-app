"use client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  async function logout() {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      toast("signing out user");
      router.push("/login");
    } catch (error) {
      console.error("error occured", error);
      toast.error("Something wrong occured");
    }
  }

  async function getDetails() {
    try {
      const { data } = await axios.get("/api/users/user");
      console.log(data);
      setUser(data.data);
    } catch (error) {
      console.error("some error occured", error);
      toast.error("Something wrong occured");
    }
  }

  return (
    <div className="main_screen flex flex-col min-h-screen justify-center items-center">
      <div className="heading text-3xl ">Profile page</div>
      <button className="p-2 mt-2 border rounded-sm" onClick={logout}>
        SignOut
      </button>
      <button className="p-2 mt-2 border rounded-sm" onClick={getDetails}>
        Profile Details
      </button>
      {user ? (
        <div className="user_details">
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
}
