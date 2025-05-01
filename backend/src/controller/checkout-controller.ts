import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

export interface ICartItem {
  amount: number;
  choosenProduct: IProduct;
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

export interface IDimension {
  depth: string;
  width: string;
  height: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2025-04-30.basil",
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { products } = req.body;
    const lineItems = products.map((product: ICartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.choosenProduct.title,
          images: [product.choosenProduct.img],
        },
        unit_amount: product.choosenProduct.cost * 100,
      },
      quantity: product.amount,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
