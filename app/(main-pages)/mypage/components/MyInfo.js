"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
function MyInfo({ session }) {
  const supabase = createClient();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();
    console.log("data11:", data);
    setProfile(data);
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      console.log("1234");
      toast.error("The new password does not match.");
      return;
    }
    console.log("55555");
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
      router.refresh();
    } catch (error) {
      toast.error("Error changing password: " + error.message);
    }
  };

  const changeInfo = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: profile.name,
        phone: profile.phone,
        email: profile.email,
        refererEmail: profile.refererEmail,
        refererPhone: profile.refererPhone,
      })
      .eq('id', session.user.id);
  
    if (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile.");
    } else {
      toast.success("Profile updated successfully.");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-y-5">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 ">
        <div className="flex flex-col w-[50vw] h-full p-10 gap-y-5">
          <div>
            <h1 className="text-lg font-semibold">Name</h1>
            <Input
              value={profile?.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              type="email"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Phone</h1>
            <Input
              value={profile?.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              type="email"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Email</h1>
            <Input
              value={profile?.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              type="email"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Referer Email</h1>
            <Input
              value={profile?.refererEmail}
              onChange={(e) =>
                setProfile({ ...profile, referer_email: e.target.value })
              }
              type="email"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Referer Phone</h1>
            <Input
              value={profile?.refererPhone}
              onChange={(e) =>
                setProfile({ ...profile, referer_phone: e.target.value })
              }
              type="email"
            />
          </div>
          <button
            type="button"
            className="button bg-primary text-white w-full h-full px-5"
            onClick={changeInfo}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 ">
        <div className="flex flex-col w-[50vw] h-full p-10 gap-y-5">
          <div>
            <h1 className="text-lg font-semibold">Current Password</h1>
            <Input
              type="password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">New Password</h1>
            <Input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Confirm Password</h1>
            <Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="button bg-primary text-white w-full h-full px-5"
            onClick={changePassword}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyInfo;
