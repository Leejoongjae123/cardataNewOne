"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
function Products({ session }) {
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
          <div class="space-y-6">
            <div class="md:flex items-center gap-10">
              <label class="md:w-32 text-right"> Current Password </label>
              <div class="flex-1 max-md:mt-4">
                <input
                  type="password"
                  placeholder=""
                  class="w-full"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>

            <div class="md:flex items-center gap-10">
              <label class="md:w-32 text-right"> New Password </label>
              <div class="flex-1 max-md:mt-4">
                <input
                  type="password"
                  placeholder=""
                  class="w-full"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div class="md:flex items-center gap-10">
              <label class="md:w-32 text-right"> Confirm Password </label>
              <div class="flex-1 max-md:mt-4">
                <input
                  type="password"
                  placeholder=""
                  class="w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>



            <div class="md:flex items-start gap-10 " hidden>
              <label class="md:w-32 text-right"> Avatar </label>
              <div class="flex-1 flex items-center gap-5 max-md:mt-4">
                <img
                  src="assets/images/avatars/avatar-3.jpg"
                  alt=""
                  class="w-10 h-10 rounded-full"
                />
                <button
                  type="submit"
                  class="px-4 py-1 rounded-full bg-slate-100/60 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                >
                  {" "}
                  Change
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4 mt-16 lg:pl-[10.5rem]">
            <button
              type="button"
              class="button lg:px-10 bg-primary text-white max-md:flex-1"
              onClick={changePassword}
            >
              Save <span class="ripple-overlay"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
