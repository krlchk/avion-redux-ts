import {
  IconFour,
  IconOne,
  IconThree,
  IconTwo,
} from "../icons/what-makes-component-icons";

//WHAT MAKES CARDS DATA
export const cardsData = [
  {
    Icon: IconOne,
    header: "Next day as standard",
    paragraph: "Order before 3pm and get your order the next day as standard",
  },
  {
    Icon: IconTwo,
    header: "Made by true artisans",
    paragraph:
      "Handmade crafted goods made with real passion and craftsmanship",
  },
  {
    Icon: IconThree,
    header: "Unbeatable prices",
    paragraph:
      "For our materials and quality you won’t find better prices anywhere",
  },
  {
    Icon: IconFour,
    header: "Recycled packaging",
    paragraph:
      "We use 100% recycled packaging to ensure our footprint is manageable",
  },
];

//FOOTER LINKS
export const menu = [
  { name: "Homepage", to: "/" },
  { name: "About Us", to: "/aboutus" },
  { name: "All products", to: "/allproducts" },
  { name: "Your basket", to: "/basket-page" },
];

//CONSTANTS FOR SORTING
export const priceOptions = [
  { id: 1, price: "0 - 100" },
  { id: 2, price: "101 - 250" },
  { id: 3, price: "250 - 10000" },
];