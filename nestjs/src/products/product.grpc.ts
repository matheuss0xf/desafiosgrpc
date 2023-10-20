import { Observable } from 'rxjs'; //reactive x

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ProductClientGrpc {
  createProduct: (data: {
    name: string;
    description: string;
    price: number;
  }) => Observable<{
    id: number;
    name: string;
    description: string;
    price: number;
  }>;
  findProducts: (data: object) => Observable<Product>;
}
