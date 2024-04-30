import { DI } from "../index";

export const getProducts = async () => {
  return await DI.productRepository.findAll();
};

export const getProduct = async (id: string) => {
  return await DI.productRepository.findOne(id);
};
