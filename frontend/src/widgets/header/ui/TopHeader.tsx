import { ArrowDown, Search, Phone } from "@/shared/icons";

export const TopHeader = () => {
  return (
    <div className="bg-[#F6F4F2]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 text-sm font-medium text-black">
        <p>60 Fremont Ave. Hamden, CT 06514</p>
        <div className="flex h-10.5 w-1/3 items-center border border-[#D8DEE3] bg-white px-6">
          <div className="relative flex shrink-0 items-center pr-9">
            <select
              className="appearance-none bg-transparent pr-8 text-sm font-medium text-black outline-none"
              name="category"
              id="category"
            >
              <option value="all">All Categories</option>
            </select>
            <ArrowDown />
          </div>
          <span className="h-8 w-px bg-[#D8DEE3]" />
          <input
            className="min-w-0 flex-1 bg-transparent px-6 text-sm font-medium text-black outline-none placeholder:text-[#ADB5BD]"
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
        <div className="flex items-center justify-center gap-3">
          <Phone />
          <p>(097) - 962 - 37 - 22</p>
        </div>
      </div>
    </div>
  );
};