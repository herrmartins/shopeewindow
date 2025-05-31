import { getCategoryModel } from "@/app/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, emoji } = body;

    const Category = await getCategoryModel();
    const created = await Category.create({ title, emoji });

    const fullCategory = await Category.findById(created._id).lean();

    return NextResponse.json(fullCategory);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create category." }, { status: 500 });
  }
}
