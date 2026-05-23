import Link from "next/link";
import { navLinks } from "../model/constants";
import { Container } from "@/shared/ui";
import { useAppSelector } from "@/store/hooks";
import { Cart, Like, Profile } from "@/shared/icons";
import { useProfileQuery } from "@/store/services/usersApi";

export const MainHeader = () => {
  const likedProductIds = useAppSelector(
    (state) => state.wishlist.likedProductIds ?? [],
  );
  const cartProducts = useAppSelector((state) => state.cart.cartProducts ?? []);
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);

  const { data: profile } = useProfileQuery(undefined, {
    skip: !token,
  });
  return (
    <div>
      <Container className="mobile:flex-wrap mobile:py-7 flex items-center justify-between gap-6 py-10">
        <div className="flex items-center justify-center gap-2">
          <Link
            href={"/"}
            className="xs:text-lg text-xl leading-6 font-bold text-black uppercase"
          >
            Avion
            {profile?.role === "ADMIN" && (
              <p className="mt-1 text-lg font-light text-[#947458]">ADMIN</p>
            )}
            {profile?.role === "DESIGNER" && (
              <p className="mt-1 text-lg font-light text-[#947458]">DESIGNER</p>
            )}
          </Link>
        </div>

        <div className="mobile:order-3 mobile:w-full mobile:justify-center mobile:text-base xs:gap-4 xs:text-sm flex gap-8 text-lg leading-6 font-normal text-black">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-transparent transition-colors duration-300 hover:border-b hover:border-[#947458]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="xs:gap-4 flex gap-5">
          <Link
            href="/profile"
            aria-label="Profile"
            className="border-b border-transparent transition-colors duration-300 hover:border-b hover:border-[#947458]"
          >
            <Profile fill="none" />
          </Link>

          <div className="relative">
            <Link
              href="/wishlist"
              aria-label="Liked products"
              className="border-b border-transparent transition-colors duration-300 hover:border-b hover:border-[#947458]"
            >
              <Like fill="none" />
            </Link>
            {likedProductIds.length > 0 ? (
              <div className="pointer-events-none absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full border border-[#f5f5f5] bg-[#ccab8f] px-1.5 text-xs font-semibold text-[#f5f5f5] shadow-sm">
                {likedProductIds.length}
              </div>
            ) : null}
          </div>
          <div className="relative">
            <Link
              href="/cart"
              aria-label="Cart"
              className="border-b border-transparent transition-colors duration-300 hover:border-b hover:border-[#947458]"
            >
              <Cart fill="none" />
            </Link>
            {cartProducts.length > 0 ? (
              <div className="pointer-events-none absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full border border-[#f5f5f5] bg-[#ccab8f] px-1.5 text-xs font-semibold text-[#f5f5f5] shadow-sm">
                {cartProducts.length}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
};
