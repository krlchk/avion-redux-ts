"use client";

import { ComponentProps, useState } from "react";
import type { User } from "@/features/user/model/types";
import { Loader } from "@/shared/ui";
import { useUpdateUserMutation } from "@/store/services/usersApi";
import { getProfileActionErrorMessage } from "@/widgets/profile/model/profile.utils";

interface AdminUserFormModalProps {
  user: User;
  onClose: () => void;
}

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

export const AdminUserFormModal = ({
  user,
  onClose,
}: AdminUserFormModalProps) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [name, setName] = useState(user.name);
  const [message, setMessage] = useState("");

  const handleSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      await updateUser({
        id: user.id,
        name: name.trim(),
      }).unwrap();
      onClose();
    } catch (error) {
      setMessage(getProfileActionErrorMessage(error));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-user-form-title"
    >
      <div className="mobile:p-6 w-full max-w-lg border border-[#f5f5f5]/35 bg-[#f5f5f5] p-8 text-black shadow-[0_30px_100px_rgba(0,0,0,0.34)]">
        <p id="admin-user-form-title" className="text-3xl leading-10 font-bold">
          Edit user
        </p>
        <p className="mt-3 text-base leading-7 font-medium text-black/50">
          Update the display name for this account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <label className="grid gap-2">
            <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
              Name
            </span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border border-black/15 bg-white px-4 py-3 text-base font-bold outline-none transition-colors focus:border-[#947458]"
            />
          </label>

          {message && (
            <p className="text-sm font-medium text-[#FB5454]">{message}</p>
          )}

          <div className="mt-2 flex flex-wrap justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="cursor-pointer border border-black/20 px-7 py-3 text-sm font-bold tracking-[0.12em] text-black/65 uppercase transition-all duration-300 hover:border-[#947458] hover:text-[#947458] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-w-36 cursor-pointer items-center justify-center bg-[#947458] px-7 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-all duration-300 hover:bg-[#a9825f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <Loader styles="h-5 w-5 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
