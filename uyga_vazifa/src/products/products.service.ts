import { Injectable } from '@nestjs/common';
import IProduct from './product-dto/dto';

@Injectable()
export class ProductsService {
  products: IProduct[] = [];
  constructor() {}

  FindAll(query: { limit: string; offset: string; sort?: string; order?: string }) {
    let take = Number(query.limit) || 10;
    let prev = Number(query.offset) || 1;
    let sortBy = query.sort || 'id'; 
    let order = query.order == 'desc' ? -1 : 1;
  
    let sortPrd = [...this.products];
  
    sortPrd.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * order;
      if (a[sortBy] > b[sortBy]) return 1 * order;
      return 0;
    });
  
    let data = sortPrd.slice((prev - 1) * take, prev * take);
  
    return {
      data,
      totalItem: this.products.length,
    };
  }
  
  FindOne(id: number) {
    let product = this.products.find((val) => val.id == id);
    if (!product) return 'Product not found !';
    return product;
  }
  Create(product: Omit<IProduct, 'id'>) {
    let len = this.products.length;
    let newPrd = {
      ...product,
      id: len != 0 ? this.products.at(-1)?.id! + 1 : 1,
    };
    this.products.push(newPrd);
    return newPrd;
  }
  Update(id: number, product: Partial<IProduct>) {
    let findIndex = this.products.findIndex((val) => val.id == id);
    if (findIndex == -1) return 'Product not found !';
    this.products[findIndex] = {
      ...this.products[findIndex],
      ...product,
    };
    return this.products[findIndex];
  }

  Remove(id: number) {
    let findIndex = this.products.findIndex((val) => val.id == id);
    if (findIndex == -1) return 'Product not found';
    
    let deletedProduct = this.products[findIndex];
    this.products.splice(findIndex, 1);
    return deletedProduct;
  }
}
