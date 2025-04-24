export interface IAvionState {
  products: IProduct[];
  filteredProducts: IProduct[];
  status: string;
  error: null | string;
}

export interface IProduct {
  id: number;
  title: string;
  cost: number;
  description: string;
  dimensions: IDimension;
  designer: string;
  type: string;
  img: string;
}

export interface IResponse {
  status: number;
  message: string;
  data: IProduct[];
}

interface IDimension {
  depth: string;
  width: string;
  height: string;
}
