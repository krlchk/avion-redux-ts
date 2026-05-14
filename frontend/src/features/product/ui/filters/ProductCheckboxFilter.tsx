import { ProductCheckboxFilterProps } from "../../model/types";

export const ProductCheckboxFilter = ({
  title,
  options,
  selectedValues,
  onChange,
  setCatalogPage,
}: ProductCheckboxFilterProps) => {
  const handleChange = (value: string) => {
    const isSelected = selectedValues.includes(value);
    if (isSelected) {
      onChange(
        selectedValues.filter((selectedValue) => selectedValue !== value),
      );
      setCatalogPage(1);
      return;
    }
    onChange([...selectedValues, value]);
    setCatalogPage(1);
  };
  return (
    <fieldset>
      <legend>{title}</legend>
      <div className="mt-5 flex flex-col gap-2">
        {options.map(({ value, label, count }) => (
          <label key={value} className="flex justify-between">
            <span className="flex items-center justify-center gap-2 text-xl font-medium">
              <input
                type="checkbox"
                checked={selectedValues.includes(value)}
                onChange={() => handleChange(value)}
                className="h-4 w-4 rounded-sm border accent-[#9A7B60]"
              />
              {label}
            </span>
            <span className="flex items-center justify-center rounded-xl border border-black/50 px-2 text-base font-normal text-black/50">
              {count}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
