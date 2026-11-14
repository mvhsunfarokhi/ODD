import { ProductsService } from '../src/products/products.service';

describe('ProductsService', () => {
  it('returns all products from the configured model', async () => {
    const model = { countDocuments: jest.fn(), find: jest.fn() } as any;
    model.find.mockReturnValue({ sort: () => ({ lean: () => Promise.resolve([{ handle: 'coffee-coffee' }]) }) });
    const service = new ProductsService(model);
    expect(await service.findAll()).toEqual([{ handle: 'coffee-coffee' }]);
  });
});
