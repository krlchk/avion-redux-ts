import { Loader } from "@/shared/ui";
import { ProfileConfirmModalProps } from "../../model/types";

export const ProfileConfirmModal = ({
  title,
  description,
  confirmText,
  isLoading,
  onCancel,
  onConfirm,
}: ProfileConfirmModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-confirm-title"
    >
      <div className="mobile:p-6 w-full max-w-lg border border-[#f5f5f5]/35 bg-[#f5f5f5] p-8 text-black shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl">
        <p
          id="profile-confirm-title"
          className="text-2xl leading-8 font-bold"
        >
          {title}
        </p>
        <p className="mt-4 text-base leading-7 font-medium text-black/55">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="cursor-pointer border border-black/20 px-7 py-3 text-sm font-bold tracking-[0.12em] text-black/65 uppercase transition-all duration-300 hover:border-black hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex min-w-36 cursor-pointer items-center justify-center bg-[#947458] px-7 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#a9825f] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <Loader styles="h-5 w-5 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
