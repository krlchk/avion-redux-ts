import { ArrowDown, Search, Phone } from "@/shared/icons";

export const TopHeader = () => {
  return (
    <div className="bg-[#F6F4F2]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 text-sm font-medium text-black max-[834.99px]:flex-col max-[834.99px]:items-stretch">
        <p className="max-[834.99px]:text-center">
          60 Fremont Ave. Hamden, CT 06514
        </p>
        <div className="flex h-10.5 w-full max-w-[520px] items-center border border-[#D8DEE3] bg-white px-6 max-[834.99px]:order-3 max-[834.99px]:max-w-none max-[375.99px]:px-4">
          <div className="relative flex shrink-0 items-center pr-9 max-[375.99px]:pr-6">
            <select
              className="appearance-none bg-transparent pr-8 text-sm font-medium text-black outline-none max-[375.99px]:max-w-[118px] max-[375.99px]:pr-6"
              name="category"
              id="category"
            >
              <option value="all">All Categories</option>
            </select>
            <ArrowDown />
          </div>
          <span className="h-8 w-px bg-[#D8DEE3]" />
          <input
            className="min-w-0 flex-1 bg-transparent px-6 text-sm font-medium text-black outline-none placeholder:text-[#ADB5BD] max-[375.99px]:px-4"
            type="text"
            placeholder="Search product..."
          />
          <button
            className="ml-4 shrink-0 cursor-pointer text-black"
            type="button"
            aria-label="Search"
          >
            <Search />
          </button>
        </div>
        <div className="flex items-center justify-center gap-3 max-[834.99px]:text-center">
          <Phone />
          <p>(097) - 962 - 37 - 22</p>
        </div>
      </div>
    </div>
  );
};
