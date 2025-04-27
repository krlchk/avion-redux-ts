export interface IProductsState {
  products: IProduct[];
  filteredProducts: IProduct[];
  loadedProducts: IProduct[];
  types: IType[];
  designers: IDesigner[];
  selectedTypes: number[];
  selectedDesigners: number[];
  selectedPrices: number[];
  limitForLoadedProducts: number;
  loadedProductIndex: number;
  isLoadMore: boolean;
  status: string;
  error: null | string;
  searchName: string;
}

export interface IProduct {
  id: number;
  title: string;
  cost: number;
  description: string;
  dimensions: IDimension;
  type_id: number;
  designer_id: number;
  img: string;
}
export interface IDesigner {
  id: number;
  full_name: string;
}
export interface IType {
  id: number;
  name: string;
}

export interface IResponseForProduct {
  status: number;
  message: string;
  data: IProduct[];
}
export interface IResponseForDesigner {
  status: number;
  message: string;
  data: IDesigner[];
}
export interface IResponseForType {
  status: number;
  message: string;
  data: IType[];
}

interface IDimension {
  depth: string;
  width: string;
  height: string;
}
