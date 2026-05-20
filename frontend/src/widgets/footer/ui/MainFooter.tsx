"use client";

import { Container, Loader } from "@/shared/ui";
import { customerLinks, deliveryLinks, navIconLinks } from "../model/constants";
import Link from "next/link";
import { FooterLinksColumn } from "./FooterLinksColumn";
import { Payment } from "@/shared/icons";
import { useGetCategoriesQuery } from "@/store/services/categoriesApi";
import { FooterCategoryLinkColumn } from "./FooterCategoryLinkColumn";

export const MainFooter = () => {
  const { data, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center py-8">
        <Loader />
      </Container>
    );
  }

  if (isError)
    return (
      <Container className="py-5 text-center text-sm text-[#FB5454]">
        Failed to load categories
      </Container>
    );

  if (!data) return null;

  const categories = data.data;

  if (categories.length === 0) {
    return (
      <Container className="py-8 text-center text-sm text-black/60">
        No categories available
      </Container>
    );
  }

  return (
    <>
      <Container className="tablet:grid-cols-2 mobile:grid-cols-2 mobile:gap-y-10 xs:grid-cols-1 grid grid-cols-4 gap-10">
        <div className="flex flex-col items-start justify-center gap-5 text-sm font-medium text-black/60">
          <div className="flex gap-2">
            <h2 className="mobile:text-lg text-xl leading-6 font-bold text-black">
              Avion
            </h2>
          </div>
          <p>60 Fremont Ave. Hamden, CT 06514</p>
          <p>
            <span className="text-black">Email:</span>{" "}
            avion.furniture.depot@gmail.com
          </p>
          <p>
            <span className="text-black">Phone:</span> + (437) - 402 - 2459
          </p>
          <div className="flex gap-3">
            {navIconLinks.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className="flex h-6 w-6 items-center justify-start rounded-full bg-black px-2 py-1.5"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-3 text-sm font-medium text-black/60">
          <FooterCategoryLinkColumn title="Shop" categories={categories} />
        </div>
        <div className="flex flex-col items-start justify-start gap-3 text-sm font-medium text-black/60">
          <FooterLinksColumn title="Customer service" links={customerLinks} />
        </div>
        <div className="flex flex-col items-start justify-start gap-3 text-sm font-medium text-black/60">
          <FooterLinksColumn title="Delivery" links={deliveryLinks} />
        </div>
      </Container>
      <Container className="mobile:flex-col mobile:items-center mobile:gap-5 flex justify-between">
        <p className="text-sm font-medium text-black/60">
          © Copyright Avion 2026.
        </p>
        <Payment />
      </Container>
    </>
  );
};
