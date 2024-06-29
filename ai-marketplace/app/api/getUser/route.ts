import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function Get() {
    const session =  await  getServerSession(authOptions);

    if(!session){
        return NextResponse.json({error:"Not authorized"}, {status:400})
    }

    return NextResponse.json({success:session},{status:200});
    
}