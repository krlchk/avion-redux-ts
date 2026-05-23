"use client";

import { useState } from "react";

import { Container, Loader } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useToggleTwoFactorMutation } from "@/store/services/authApi";
import {
  useProfileQuery,
  useUpdateUserMutation,
} from "@/store/services/usersApi";
import { logout } from "@/store/slices/authSlice";
import Link from "next/link";
import { ProfileLogin } from "../auth";
import { ProfileOrders } from "../orders";
import {
  formatProfileDate,
  getProfileActionErrorMessage,
} from "../../model/profile.utils";
import { ProfileConfirmAction, ProfileMessageType } from "../../model/types";
import { ProfileConfirmModal } from "./ProfileConfirmModal";
import { ProfileField } from "./ProfileField";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const [toggleTwoFactor, { isLoading: isToggleTwoFactorLoading }] =
    useToggleTwoFactorMutation();
  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();
  const [actionMessage, setActionMessage] = useState("");
  const [actionMessageType, setActionMessageType] =
    useState<ProfileMessageType>("success");
  const [nameMessage, setNameMessage] = useState("");
  const [nameMessageType, setNameMessageType] =
    useState<ProfileMessageType>("success");
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [confirmAction, setConfirmAction] =
    useState<ProfileConfirmAction | null>(null);
  const {
    data: profile,
    isError,
    isLoading,
  } = useProfileQuery(undefined, {
    skip: !token,
  });

  if (!token) {
    return <ProfileLogin />;
  }

  if (isLoading) {
    return (
      <section className="bg-[#f5f5f5]">
        <div className="w-full bg-[url('/images/auth/login.jpg')] bg-cover bg-center py-44">
          <Container className="flex min-h-120 items-center justify-center border border-[#f5f5f5]/20 bg-black/30 px-14 py-14 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-md">
            <Loader styles="h-10 w-10 border-4 border-[#f5f5f5]/35 border-t-[#f5f5f5]" />
          </Container>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-[#f5f5f5]">
        <div className="w-full bg-[url('/images/auth/login.jpg')] bg-cover bg-center py-44">
          <Container className="mobile:px-5 mobile:py-10 border border-[#f5f5f5]/20 bg-black/30 px-14 py-14 text-[#f5f5f5] shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-md">
            <div className="mobile:p-6 mx-auto max-w-2xl border border-[#f5f5f5]/25 bg-[#f5f5f5] p-10 text-center text-black shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              <p className="text-2xl font-bold">Unable to load profile</p>
              <p className="mt-3 text-base leading-7 font-medium text-black/50">
                Your session may have expired. Please sign in again.
              </p>
              <button
                type="button"
                onClick={() => dispatch(logout())}
                className="mt-8 cursor-pointer border border-black px-8 py-3 text-base font-medium tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1 hover:border-[#947458] hover:text-[#947458] hover:shadow-lg"
              >
                Back to login
              </button>
            </div>
          </Container>
        </div>
      </section>
    );
  }

  if (!profile) {
    return null;
  }

  const handleToggleTwoFactor = async () => {
    setActionMessage("");

    try {
      await toggleTwoFactor({
        enabled: !profile.isTwoFactorEnabled,
      }).unwrap();

      setActionMessageType("success");
      setActionMessage(
        profile.isTwoFactorEnabled
          ? "Two-factor authentication disabled."
          : "Two-factor authentication enabled.",
      );
    } catch (error) {
      setActionMessageType("error");
      setActionMessage(getProfileActionErrorMessage(error));
    }
  };

  const handleSaveName = async () => {
    const trimmedName = nameValue.trim();
    setNameMessage("");

    if (!trimmedName) {
      setNameMessageType("error");
      setNameMessage("Name cannot be empty.");
      return;
    }

    if (trimmedName === profile.name) {
      setIsNameEditing(false);
      return;
    }

    try {
      await updateUser({ id: profile.id, name: trimmedName }).unwrap();
      setNameMessageType("success");
      setNameMessage("Name updated.");
      setIsNameEditing(false);
    } catch (error) {
      setNameMessageType("error");
      setNameMessage(getProfileActionErrorMessage(error));
    }
  };

  const handleCancelNameEdit = () => {
    setNameValue(profile.name);
    setNameMessage("");
    setIsNameEditing(false);
  };

  const handleConfirmAction = async () => {
    if (confirmAction === "logout") {
      dispatch(logout());
      setConfirmAction(null);
      return;
    }

    if (confirmAction === "twoFactor") {
      await handleToggleTwoFactor();
      setConfirmAction(null);
    }
  };

  const isTwoFactorConfirm = confirmAction === "twoFactor";
  const confirmTitle = isTwoFactorConfirm
    ? profile.isTwoFactorEnabled
      ? "Disable two-factor authentication?"
      : "Enable two-factor authentication?"
    : "Log out of your account?";
  const confirmDescription = isTwoFactorConfirm
    ? profile.isTwoFactorEnabled
      ? "You will no longer need a verification code when signing in. Your account will be easier to access, but less protected."
      : "Next time you sign in, we will send a verification code to your email before opening your account."
    : "You will leave your current session and return to the login screen.";
  const confirmButtonText = isTwoFactorConfirm
    ? profile.isTwoFactorEnabled
      ? "Disable 2FA"
      : "Enable 2FA"
    : "Logout";
  const canAccessAdmin =
    profile.role === "ADMIN" || profile.role === "DESIGNER";

  return (
    <section className="bg-[#f5f5f5]">
      <div className="w-full bg-[url('/images/auth/login.jpg')] bg-cover bg-center py-44">
        <Container className="tablet:grid-cols-1 tablet:gap-12 tablet:px-10 mobile:grid-cols-1 mobile:gap-10 mobile:px-5 mobile:py-10 grid grid-cols-2 gap-12 border border-[#f5f5f5]/20 bg-black/30 px-14 py-14 text-[#f5f5f5] shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-md">
          <section className="mobile:py-0 flex flex-col justify-between py-10">
            <div>
              <p className="text-lg font-bold tracking-[0.18em] text-[#f5f5f5]/75 uppercase">
                Avion profile
              </p>
              <h1 className="mobile:text-4xl mobile:leading-12 mt-8 text-5xl leading-16.25 font-bold">
                {profile.name}
              </h1>
              <p className="mt-7 max-w-135 text-base leading-7 font-normal text-[#f5f5f5]/82">
                Manage your Avion account, review your access details, and
                continue checkout with a saved session.
              </p>
            </div>
            <div className="mt-20 border-t border-[#f5f5f5]/20 pt-8">
              <p className="text-2xl leading-8 font-bold text-[#f5f5f5]/75">
                Account access
              </p>
              <p className="mt-3 max-w-110 text-base leading-7 text-[#f5f5f5]/65">
                Your profile keeps orders, checkout details and review access in
                one calm place.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {canAccessAdmin && (
                  <Link
                    href={profile.role === "DESIGNER" ? "/designer" : "/admin"}
                    className="flex min-w-44 cursor-pointer items-center justify-center border border-[#f5f5f5]/70 px-8 py-3 text-base font-medium tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5f5f5] hover:text-[#947458] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {profile.role === "DESIGNER"
                      ? "Designer panel"
                      : "Admin panel"}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setConfirmAction("twoFactor")}
                  disabled={isToggleTwoFactorLoading}
                  className="flex min-w-44 cursor-pointer items-center justify-center border border-[#f5f5f5]/70 px-8 py-3 text-base font-medium tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5f5f5] hover:text-[#947458] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isToggleTwoFactorLoading ? (
                    <Loader styles="h-5 w-5 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
                  ) : profile.isTwoFactorEnabled ? (
                    "Disable 2FA"
                  ) : (
                    "Enable 2FA"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmAction("logout")}
                  className="cursor-pointer border border-[#f5f5f5]/70 px-8 py-3 text-base font-medium tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5f5f5] hover:text-[#947458] hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
              {actionMessage && (
                <p
                  className={`mt-4 text-sm font-medium ${
                    actionMessageType === "success"
                      ? "text-[#f5f5f5]/85"
                      : "text-[#ffb4b4]"
                  }`}
                >
                  {actionMessage}
                </p>
              )}
            </div>
          </section>

          <div className="mobile:p-6 border border-[#f5f5f5]/25 bg-[#f5f5f5] p-10 text-black shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <h2 className="text-3xl font-bold">Account details</h2>
            <p className="mt-4 text-base leading-7 font-medium text-black/50">
              Your current profile information.
            </p>
            <div className="mt-8 grid gap-5">
              <div className="border-b border-black/10 pb-5">
                <div className="mobile:flex-col mobile:items-start flex items-center justify-between gap-6">
                  <p className="text-sm font-medium tracking-[0.16em] text-black/40 uppercase">
                    Name
                  </p>

                  {isNameEditing ? (
                    <div className="mobile:w-full flex flex-wrap justify-end gap-3">
                      <input
                        value={nameValue}
                        onChange={(event) => setNameValue(event.target.value)}
                        disabled={isUpdateUserLoading}
                        className="mobile:w-full min-w-64 border border-black/15 bg-[#f5f5f5] px-4 py-3 text-lg font-bold text-black transition-colors outline-none focus:border-[#947458] disabled:opacity-60"
                      />
                      <button
                        type="button"
                        onClick={handleSaveName}
                        disabled={isUpdateUserLoading}
                        className="flex min-w-24 cursor-pointer items-center justify-center bg-[#947458] px-5 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-all duration-300 hover:bg-[#a9825f] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isUpdateUserLoading ? (
                          <Loader styles="h-5 w-5 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
                        ) : (
                          "Save"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelNameEdit}
                        disabled={isUpdateUserLoading}
                        className="cursor-pointer border border-black/20 px-5 py-3 text-sm font-bold tracking-[0.12em] text-black/65 uppercase transition-all duration-300 hover:border-[#947458] hover:text-[#947458] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-black">
                        {profile.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setNameValue(profile.name);
                          setNameMessage("");
                          setIsNameEditing(true);
                        }}
                        className="cursor-pointer border border-black/20 px-4 py-2 text-xs font-bold tracking-[0.12em] text-black/55 uppercase transition-all duration-300 hover:border-[#947458] hover:text-[#947458]"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
                {nameMessage && (
                  <p
                    className={`mt-3 text-right text-sm font-medium ${
                      nameMessageType === "success"
                        ? "text-[#947458]"
                        : "text-[#FB5454]"
                    }`}
                  >
                    {nameMessage}
                  </p>
                )}
              </div>
              <ProfileField label="Email" value={profile.email} />
              <ProfileField label="Role" value={profile.role} />
              <ProfileField
                label="Two-factor authentication"
                value={profile.isTwoFactorEnabled ? "Enabled" : "Disabled"}
              />
              <ProfileField
                label="Member since"
                value={formatProfileDate(profile.createdAt)}
              />
            </div>
          </div>
        </Container>
        <Container className="tablet:gap-12 tablet:px-10 mobile:gap-10 mobile:px-5 mobile:py-10 mt-10 grid gap-12 border border-[#f5f5f5]/20 bg-black/30 px-14 py-14 text-[#f5f5f5] shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-md">
          <ProfileOrders />
        </Container>
      </div>
      {confirmAction && (
        <ProfileConfirmModal
          title={confirmTitle}
          description={confirmDescription}
          confirmText={confirmButtonText}
          isLoading={isTwoFactorConfirm && isToggleTwoFactorLoading}
          onCancel={() => setConfirmAction(null)}
          onConfirm={handleConfirmAction}
        />
      )}
    </section>
  );
};
