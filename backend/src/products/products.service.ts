import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  findAll() {
    return [
      {
        title: 'Chair',
        cost: 150,
        description: 'Chair desc',
        dimensions: { depth: 5, height: 5, width: 5 },
        img: 'imgstring',
        designerId: 1,
        typeId: 2,
      },
    ];
  }
}
