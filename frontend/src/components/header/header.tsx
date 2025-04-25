import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavigateComponent } from "./header-components";
import { BurgerWindow } from "./header-components";
import { UserModal } from "./header-components";
import { BasketIcon, BurgerIcon, LogoIcon, ProfileIcon } from "./icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  hideBurgerModal,
  hideUserModal,
  showBurgerModal,
  showUserModal,
} from "../store/ui/ui-slice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isBurgerModalOpen, isUserModalOpen } = useAppSelector(
    (state) => state.root.ui,
  );

  useEffect(() => {
    const handleResize = () => {
      if (
        (window.innerWidth > 1279.99 && isBurgerModalOpen) ||
        isUserModalOpen
      ) {
        dispatch(hideBurgerModal());
        dispatch(hideUserModal());
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, isBurgerModalOpen, isUserModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.scrollY > 1 && isBurgerModalOpen) || isUserModalOpen) {
        dispatch(hideBurgerModal());
        dispatch(hideUserModal());
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, isBurgerModalOpen, isUserModalOpen]);

  const handleUserButton = () => {
    if (isUserModalOpen) {
      dispatch(hideUserModal());
    } else {
      dispatch(showUserModal());
    }
  };
  const handleBurgerButton = () => {
    if (isBurgerModalOpen) {
      dispatch(hideBurgerModal());
    } else {
      dispatch(showBurgerModal());
    }
  };

  return (
    <section className="container">
      <div className="flex justify-between">
        <Link to="/" className="flex items-center">
          <LogoIcon />
        </Link>
        <NavigateComponent className="flex gap-11 font-Playfair text-lg font-normal leading-6 text-[#726E8D] mobile:hidden [&>*:hover]:text-[#22202E] [&>*]:transition-colors" />
        <div className="flex gap-4">
          <Link to="/basket-page">
            <BasketIcon />
          </Link>
          <button onClick={handleUserButton}>
            <ProfileIcon />
          </button>
          <button className="hidden mobile:block" onClick={handleBurgerButton}>
            <BurgerIcon />
          </button>
        </div>
      </div>
      <BurgerWindow isBurgerModalOpen={isBurgerModalOpen} />
      <UserModal isUserModalOpen={isUserModalOpen} />
    </section>
  );
};
