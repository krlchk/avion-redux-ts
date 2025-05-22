import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { hideProductModal } from "../../../components/store/ui/ui-slice";
import {
  createProduct,
  fetchDesigners,
  fetchProducts,
  fetchTypes,
  loadMoreProducts,
} from "../../../components/store/products/products-slice";

export const AllProductsModalWindow = () => {
  const dispatch = useAppDispatch();
  const { designers, types } = useAppSelector((state) => state.root.products);
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [depth, setDepth] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [designerId, setDesignerId] = useState<number | null>(null);
  const [typeId, setTypeId] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(
      createProduct({
        title,
        cost,
        description,
        depth,
        width,
        height,
        img,
        designerId,
        typeId,
      }),
    );
    if (createProduct.fulfilled.match(resultAction)) {
      await dispatch(fetchProducts());
      await dispatch(fetchDesigners());
      await dispatch(fetchTypes());
      dispatch(loadMoreProducts());
      dispatch(hideProductModal());
    }
  };

  return (
    <div
      onClick={() => dispatch(hideProductModal())}
      className="absolute inset-0 flex h-screen w-full items-center justify-center backdrop-blur-md"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="h-auto w-1/3 rounded-lg border-2 border-[#2A254B] bg-white p-5 mobile:w-2/3"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold">Create product</h1>
          <input
            onChange={(e) => setImg(e.target.value)}
            required
            className="rounded-md border border-[#2A254B] px-2 py-1 outline-none"
            placeholder="product image url..."
            id="img"
            type="text"
          />
          <input
            onChange={(e) => setTitle(e.target.value)}
            required
            className="rounded-md border border-[#2A254B] px-2 py-1 outline-none"
            placeholder="product title..."
            id="title"
            type="text"
          />
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            required
            className="rounded-md border border-[#2A254B] px-2 py-1 outline-none"
            placeholder="product description..."
            id="description"
            rows={5}
          />
          <input
            onChange={(e) => setCost(Number(e.target.value))}
            required
            className="rounded-md border border-[#2A254B] px-2 py-1 outline-none"
            placeholder="product cost..."
            id="cost"
            type="number"
          />
          <h1 className="text-lg font-semibold">Dimensions</h1>
          <div className="flex gap-4">
            <input
              onChange={(e) => setDepth(Number(e.target.value))}
              required
              className="w-1/3 rounded-md border border-[#2A254B] px-2 py-1 outline-none"
              placeholder="depth..."
              id="depth"
              type="number"
            />
            <input
              onChange={(e) => setWidth(Number(e.target.value))}
              required
              className="w-1/3 rounded-md border border-[#2A254B] px-2 py-1 outline-none"
              placeholder="width..."
              id="width"
              type="number"
            />
            <input
              onChange={(e) => setHeight(Number(e.target.value))}
              required
              className="w-1/3 rounded-md border border-[#2A254B] px-2 py-1"
              placeholder="height..."
              id="height"
              type="number"
            />
          </div>
          <h1 className="text-lg font-semibold">Designer</h1>
          <select
            required
            id="designer"
            onChange={(e) => setDesignerId(Number(e.target.value))}
            value={designerId ?? ""}
          >
            <option value="">Choose designer</option>
            {designers.map((designer) => (
              <option key={designer.id} value={designer.id}>
                {designer.full_name}
              </option>
            ))}
          </select>
          <h1 className="text-lg font-semibold">Type</h1>
          <select
            required
            id="type"
            onChange={(e) => setTypeId(Number(e.target.value))}
            value={typeId ?? ""}
          >
            <option value="">Choose type</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-2 rounded-md border border-[#2A254B] py-2 transition-colors hover:bg-[#2A254B] hover:text-white"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
