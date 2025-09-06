// src/app/api/wishlist/route.js
import { connectToDB } from "@lib/db";
import Wishlist from "@models/WishListModel";
import { getUserFromToken } from "@lib/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDB();
  const { id: userId } = await getUserFromToken(req);

  const wishlist = await Wishlist.findOne({ userId }).populate("items.productId");

  return NextResponse.json({ success: true, wishlist: wishlist || { items: [] } });
}


export async function POST(req) {
  await connectToDB();
  const { id: userId } = await getUserFromToken(req);
  const { productId } = await req.json();

  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, items: [{ productId }] });
  } else {
    const exists = wishlist.items.some(
      (item) => item.productId.toString() === productId
    );
    if (!exists) {
      wishlist.items.push({ productId });
      await wishlist.save();
    }
  }

  return NextResponse.json({ success: true, wishlist });
}

export async function DELETE(req) {
  await connectToDB();
  const { id: userId } = await getUserFromToken(req);
  const { productId } = await req.json();

  const wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) return NextResponse.json({ success: true });

  wishlist.items = wishlist.items.filter(
    (item) => item.productId.toString() !== productId
  );
  await wishlist.save();

  return NextResponse.json({ success: true });
}
