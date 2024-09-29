import fakeData from "../fakeData";
import { promises as fs } from "fs";
import path from "path";

interface productType {
  id: number;
  title: string;
  price: number;
  desc: string;
  available: boolean;
}

export const findAll = async (): Promise<productType[]> => {
  try {
    return fakeData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const findById = async (productId: number): Promise<productType> => {
  try {
    const product = await fakeData.find((product) => productId === product.id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const getLengthOfProducts = async (): Promise<{ len: number }> => {
  try {
    return {
      len: fakeData.length,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const create = async (product: productType): Promise<productType> => {
  try {
    fakeData.push(product);
    const filePath = path.join(__dirname, "../fakeData.ts");
    const updatedFakeData = `export default ${JSON.stringify(
      fakeData,
      null,
      2
    )};`;
    // Write the updated data back to the fakeData.ts file
    await fs.writeFile(filePath, updatedFakeData, "utf-8");
    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const filterProduct = async (priceRange: number): Promise<productType[]> => {
  try {
    return await fakeData.filter((product) => product.price >= priceRange);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
