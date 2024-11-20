import connectMongoDB from "../../../libs/mongodb";
import mongoose from "mongoose";
import Item from "../../../models/models";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: {id: string};
}

export async function GET(request:NextRequest, {params}: RouteParams) {
    const {id} = params;
    await connectMongoDB();
    const item = await Item.findOne({_id: id});
    return NextResponse.json({item}, {status: 200});
}

export async function PUT(request:NextRequest, {params}: RouteParams) {
    const {id} = params;
    const {title: title, name: name, description: description} = await request.json();
    await connectMongoDB();
    await Item.findByIdAndUpdate(id, {title, name, description});
    return NextResponse.json({message: "Item updated"}, {status: 200});
}

export async function DELETE(request: NextRequest, {params}:RouteParams) {
    const {id} = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message : "Invalid ID format"}, {status: 400});
    }
    await connectMongoDB();
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
        return NextResponse.json({message: "Item not found"}, {status: 404});
    }
    return NextResponse.json({message: "Item deleted"}, {status: 200});
}