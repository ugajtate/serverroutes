import connectMongoDB from "../../../../libs/mongodb";
import Item from "../../../models";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    const { title, name, description } = await request.json();
    await connectMongoDB();
    await Item.create({ title, name, description });
    return NextResponse.json({ message: "Item added successfuly"}, {status: 201})
}

export async function GET() {
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({items});
}