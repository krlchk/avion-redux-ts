"use client";

import { Container, Loader } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useProfileQuery } from "@/store/services/usersApi";
import { logout } from "@/store/slices/authSlice";
import { ProfileLogin } from "./ProfileLogin";
import { formatProfileDate } from "../model/profile.utils";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
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
          <Container className="border border-[#f5f5f5]/20 bg-black/30 px-14 py-14 text-[#f5f5f5] shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-md mobile:px-5 mobile:py-10">
            <div className="mx-auto max-w-2xl border border-[#f5f5f5]/25 bg-[#f5f5f5]/95 p-10 text-center text-black shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl mobile:p-6">
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

  return (
    <section className="bg-[#f5f5f5]">
      <div className="w-full bg-[url('/images/auth/login.jpg')] bg-cover bg-center py-44">
        <Container className="tablet:grid-cols-1 tablet:gap-12 tablet:px-10 mobile:grid-cols-1 mobile:gap-10 mobile:px-5 mobile:py-10 grid grid-cols-2 gap-12 border border-[#f5f5f5]/20 bg-black/30 px-14 py-14 text-[#f5f5f5] shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-md">
          <section className="mobile:py-0 flex flex-col justify-between py-10">
            <div>
              <p className="text-sm font-bold tracking-[0.18em] text-[#f5f5f5]/75 uppercase">
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
              <button
                type="button"
                onClick={() => dispatch(logout())}
                className="mt-8 cursor-pointer border border-[#f5f5f5]/70 px-8 py-3 text-base font-medium tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#f5f5f5] hover:text-[#947458] hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </section>

          <div className="border border-[#f5f5f5]/25 bg-[#f5f5f5]/95 p-10 text-black shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl mobile:p-6">
            <h2 className="text-3xl font-bold">Account details</h2>
            <p className="mt-4 text-base leading-7 font-medium text-black/50">
              Your current profile information.
            </p>
            <div className="mt-8 grid gap-5">
              <ProfileField label="Name" value={profile.name} />
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
      </div>
    </section>
  );
};

const ProfileField = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-black/10 pb-5 mobile:flex-col mobile:items-start">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-black/40">
        {label}
      </p>
      <p className="text-lg font-bold text-black">{value}</p>
    </div>
  );
};
