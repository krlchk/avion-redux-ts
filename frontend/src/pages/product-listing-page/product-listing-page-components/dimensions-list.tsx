import { IDimension } from "../../../components/store/products/products-types";

export const DimensionList = ({ height, width, depth }: IDimension) => {
  return (
    <div className="mt-7 flex gap-14">
      <div className="flex flex-col text-sm">
        <h3>Height</h3>
        <p className="mt-3 text-base">{height}</p>
      </div>
      <div className="flex flex-col">
        <h3>Width</h3>
        <p className="mt-3 text-base">{width}</p>
      </div>
      <div className="flex flex-col">
        <h3>Depth</h3>
        <p className="mt-3 text-base">{depth}</p>
      </div>
    </div>
  );
};
