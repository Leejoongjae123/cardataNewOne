"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
function MyInfo({ session, language, dictionary }) {
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
      .eq("id", session.user.id);

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
      <div>
        <div>
          <div className="space-y-6">
            <div className="md:flex items-center gap-10">
              <label className="md:w-32 text-right"> {dictionary.mypage.currentPassword[language]} </label>
              <div className="flex-1 max-md:mt-4">
                <input
                  type="password"
                  placeholder=""
                  className="w-full"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="md:flex items-center gap-10">
              <label className="md:w-32 text-right"> {dictionary.mypage.newPassword[language]} </label>
              <div className="flex-1 max-md:mt-4">
                <input
                  type="password"
                  placeholder=""
                  className="w-full"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex items-center gap-10">
              <label className="md:w-32 text-right"> {dictionary.mypage.confirmPassword[language]} </label>
              <div className="flex-1 max-md:mt-4">
                <input
                  type="password"
                  placeholder=""
                  className="w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>



            <div className="md:flex items-start gap-10 " hidden>
              <label className="md:w-32 text-right"> Avatar </label>
              <div className="flex-1 flex items-center gap-5 max-md:mt-4">
                {/* <img
                  src="assets/images/avatars/avatar-3.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full"
                /> */}
                <button
                  type="submit"
                  className="px-4 py-1 rounded-full bg-slate-100/60 border "
                >
                  {" "}
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-16 lg:pl-[10.5rem]">
            <button
              type="button"
              className="button lg:px-10 bg-primary text-white max-md:flex-1"
              onClick={changePassword}
            >
              Save <span className="ripple-overlay"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyInfo;
