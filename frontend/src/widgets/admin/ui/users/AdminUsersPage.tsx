"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Role, User } from "@/features/user/model/types";
import { ArrowDown, Search } from "@/shared/icons";
import { useClientPagination } from "@/shared/model/pagination";
import { Loader, PaginationControls } from "@/shared/ui";
import { useGetUsersQuery } from "@/store/services/usersApi";
import { ADMIN_USERS_PER_PAGE } from "../../model/constants";
import { AdminUserFormModal } from "./AdminUserFormModal";

type UserRoleFilter = Role | "ALL";

const roleFilterOptions: { value: UserRoleFilter; title: string }[] = [
  { value: "ALL", title: "All roles" },
  { value: "CUSTOMER", title: "Customers" },
  { value: "DESIGNER", title: "Designers" },
  { value: "ADMIN", title: "Admins" },
];

const getRoleClassName = (role: Role) => {
  if (role === "ADMIN") return "text-[#947458]";
  if (role === "DESIGNER") return "text-green-700";

  return "text-black/55";
};

export const AdminUsersPage = () => {
  const { data, isError, isLoading } = useGetUsersQuery();
  const [selectedRole, setSelectedRole] = useState<UserRoleFilter>("ALL");
  const [isRoleFilterOpen, setIsRoleFilterOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const roleFilterRef = useRef<HTMLDivElement | null>(null);
  const users = useMemo(() => data?.data ?? [], [data]);
  const selectedRoleOption = roleFilterOptions.find(
    (option) => option.value === selectedRole,
  );
  const filteredUsers = useMemo(() => {
    const normalizedSearch = userSearch.trim().toLowerCase();
    const roleUsers =
      selectedRole === "ALL"
        ? users
        : users.filter((user) => user.role === selectedRole);
    const nextUsers = !normalizedSearch
      ? roleUsers
      : roleUsers.filter((user) => {
          const userFields = [user.name, user.email, user.id];

          return userFields.some((field) =>
            field.toLowerCase().includes(normalizedSearch),
          );
        });

    return [...nextUsers].sort((firstUser, secondUser) =>
      firstUser.name.localeCompare(secondUser.name),
    );
  }, [selectedRole, userSearch, users]);
  const {
    page,
    setPage,
    lastPage,
    startItem,
    endItem,
    totalItems,
    paginatedItems,
    onPrevPage,
    onNextPage,
  } = useClientPagination({
    items: filteredUsers,
    itemsPerPage: ADMIN_USERS_PER_PAGE,
  });

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        roleFilterRef.current &&
        !roleFilterRef.current.contains(event.target as Node)
      ) {
        setIsRoleFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleRoleSelect = (role: UserRoleFilter) => {
    setSelectedRole(role);
    setIsRoleFilterOpen(false);
    setPage(1);
  };

  return (
    <div className="border border-black/10 bg-white p-8 text-black shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold tracking-[0.18em] text-[#947458] uppercase">
            Accounts
          </p>
          <h1 className="mt-4 text-4xl font-bold">Users</h1>
          <p className="mt-3 text-base font-medium text-black/50">
            Showing {startItem}-{endItem} of {totalItems} users.
          </p>
        </div>

        <div
          ref={roleFilterRef}
          className="xs:w-full relative min-w-65 shrink-0"
        >
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isRoleFilterOpen}
            onClick={() =>
              setIsRoleFilterOpen((previousValue) => !previousValue)
            }
            className="mobile:text-base xs:w-full flex w-full cursor-pointer items-center justify-between border border-[#947458] bg-[#f5f5f5] px-4 py-2 text-xl font-medium text-black/70 transition-colors hover:border-[#7f6249]"
          >
            <span className="truncate">
              {selectedRoleOption?.title ?? "All roles"}
            </span>
            <ArrowDown
              className={`shrink-0 transition-transform duration-200 ${
                isRoleFilterOpen ? "rotate-180" : ""
              }`}
              stroke="#947458"
            />
          </button>

          {isRoleFilterOpen && (
            <div className="absolute top-full right-0 z-20 mt-2 w-full overflow-hidden border border-[#947458] bg-[#f5f5f5] p-2">
              <ul role="listbox" className="flex flex-col gap-1">
                {roleFilterOptions.map(({ value, title }) => {
                  const isSelected = value === selectedRole;

                  return (
                    <li key={value}>
                      <button
                        type="button"
                        onClick={() => handleRoleSelect(value)}
                        className={`mobile:text-base flex w-full items-center rounded-xl px-4 py-3 text-left text-xl font-medium transition-colors ${
                          isSelected
                            ? "bg-[#947458] text-[#f5f5f5]"
                            : "text-black/70 hover:bg-[#eeedec]"
                        }`}
                      >
                        {title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <label className="grid max-w-xl gap-2">
          <span className="text-xs font-bold tracking-[0.16em] text-black/40 uppercase">
            User search
          </span>
          <div className="relative">
            <input
              value={userSearch}
              onChange={(event) => {
                setUserSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by user name, email or id"
              className="w-full border border-[#947458] bg-white py-3 pr-12 pl-4 text-base font-medium outline-none transition-colors focus:border-[#947458]"
            />
            <Search
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
              stroke="#947458"
            />
          </div>
        </label>
      </div>

      {isLoading && (
        <div className="flex min-h-80 items-center justify-center">
          <Loader />
        </div>
      )}

      {isError && !isLoading && (
        <div className="mt-8 border border-[#FB5454]/20 bg-[#FB5454]/5 p-6 text-center text-sm font-medium text-[#FB5454]">
          Unable to load users.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-180">
            <div className="grid grid-cols-[1fr_1.2fr_0.7fr_0.7fr_0.7fr] border-b border-black/10 pb-4 text-xs font-bold tracking-[0.16em] text-black/35 uppercase">
              <p>Name</p>
              <p>Email</p>
              <p>Role</p>
              <p>2FA</p>
              <p className="text-right">Actions</p>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="py-12 text-center text-base font-medium text-black/45">
                No users found.
              </div>
            ) : (
              paginatedItems.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[1fr_1.2fr_0.7fr_0.7fr_0.7fr] items-center gap-4 border-b border-black/10 py-5"
                >
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="mt-1 text-sm font-medium text-black/40">
                      #{user.id.slice(0, 8)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-black/60">
                    {user.email}
                  </p>
                  <p
                    className={`text-sm font-bold ${getRoleClassName(
                      user.role,
                    )}`}
                  >
                    {user.role}
                  </p>
                  <p className="text-sm font-medium text-black/60">
                    {user.isTwoFactorEnabled ? "Enabled" : "Disabled"}
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingUser(user)}
                      className="cursor-pointer border border-black/15 px-3 py-2 text-xs font-bold tracking-[0.12em] text-black/55 uppercase transition-colors hover:border-[#947458] hover:text-[#947458]"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <PaginationControls
            page={page}
            lastPage={lastPage}
            onPageChange={setPage}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
          />
        </div>
      )}

      {editingUser && (
        <AdminUserFormModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};
