import { Link } from "react-router-dom";
import { UiButtons } from "../../../UI";
import image from "./static-images/about-page-image.png";

export const AboutPageHero = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 gap-4 tablet:grid-cols-1">
        <div className="bg-[#2A254B] p-16 text-white">
          <h1 className="text-3xl">It started with a small idea</h1>
          <p className="mt-3 text-lg">
            A global brand with local beginnings, our story begain in a small
            studio in South London in early 2014
          </p>
          <Link to="/allproducts">
            <UiButtons
              color="lightBlue"
              className="mt-48 tablet:w-full mobile:mt-14"
            >
              View all
            </UiButtons>
          </Link>
        </div>
        <div className="max-h-[480px]">
          <img className="h-full w-full object-cover" src={image} alt="image" />
        </div>
      </div>
    </section>
  );
};
