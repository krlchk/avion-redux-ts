import {
  AboutUsCategories,
  AboutUsLiveComfortably,
  AboutUsShowcase,
  AboutUsTwoImages,
} from "@/widgets/aboutUs";

const AboutUs = () => {
  return (
    <section className="bg-[#f5f5f5]">
      <AboutUsTwoImages />
      <AboutUsLiveComfortably />
      <AboutUsCategories />
      <AboutUsShowcase />
    </section>
  );
};

export default AboutUs;
