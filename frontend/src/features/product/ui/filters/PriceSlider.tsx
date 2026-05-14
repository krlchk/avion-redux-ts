import Slider from "rc-slider";
import { PriceSliderProps } from "../../model/types";

export const PriceSlider = ({
  priceRange,
  onPriceRangeChange,
  onResetPage
}: PriceSliderProps) => {
  return (
    <Slider
      range
      min={99}
      max={9999}
      value={priceRange}
      onChange={(value) => {
        if (Array.isArray(value) && value.length === 2) {
          onPriceRangeChange([value[0], value[1]]);
          onResetPage();
        }
      }}
      allowCross={false}
      styles={{
        rail: { backgroundColor: "#9A7B60", height: 4 },
        track: { backgroundColor: "#9A7B60", height: 4 },
        handle: {
          width: 20,
          height: 20,
          border: "4px solid #9A7B60",
          backgroundColor: "#fff",
          opacity: 1,
          marginTop: -8,
          boxShadow: "none",
        },
      }}
    />
  );
};
