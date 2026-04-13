import type { NextApiRequest, NextApiResponse } from "next";
import { getAllProducts, type Product } from "../../lib/products";

type SuccessResponse = {
  message: string;
  total: number;
  data: Product[];
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const products = getAllProducts();

  return res.status(200).json({
    message: "Products fetched successfully",
    total: products.length,
    data: products
  });
}
