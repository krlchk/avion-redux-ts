import { ArrowDown, Search, Phone } from "@/shared/icons";

export const TopHeader = () => {
  return (
    <div className="bg-[#F6F4F2]">
      <div className="mobile:flex-col mobile:items-stretch mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 text-sm font-medium text-black">
        <p className="mobile:text-center">
          60 Fremont Ave. Hamden, CT 06514
        </p>
        <div className="mobile:order-3 mobile:max-w-none xs:px-4 flex h-10.5 w-full max-w-130 items-center border border-[#D8DEE3] bg-white px-6">
          <div className="xs:pr-6 relative flex shrink-0 items-center pr-9">
            <select
              className="xs:max-w-29.5 xs:pr-6 appearance-none bg-transparent pr-8 text-sm font-medium text-black outline-none"
              name="category"
              id="category"
            >
              <option value="all">All Categories</option>
            </select>
            <ArrowDown />
          </div>
          <span className="h-8 w-px bg-[#D8DEE3]" />
          <input
            className="xs:px-4 min-w-0 flex-1 bg-transparent px-6 text-sm font-medium text-black outline-none placeholder:text-[#ADB5BD]"
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
        <div className="mobile:text-center flex items-center justify-center gap-3">
          <Phone />
          <p>(097) - 962 - 37 - 22</p>
        </div>
      </div>
    </div>
  );
};
