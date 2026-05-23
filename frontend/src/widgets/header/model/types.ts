export interface CategoryDropdownOption {
  label: string;
  value: string;
}

export interface CategoryDropdownProps {
  selectedCategoryId: string;
  onSelect: (value: string) => void;
  options: CategoryDropdownOption[];
}
