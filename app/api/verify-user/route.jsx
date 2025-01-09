// app/api/verify-user/route.js
import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { user } = await req.json();

        if (!user) {
            return NextResponse.json({ error: "User data is missing." }, { status: 400 });
        }

        // Add debug logging
        console.log("Processing user:", user);

        // Check if the user exists
        const userInfo = await db
            .select()
            .from(Users)
            .where(eq(Users.email, user.primaryEmailAddress.emailAddress));

        console.log("Query result:", userInfo);

        if (!userInfo?.length) {
            // Insert new user if not found
            const saveResult = await db
                .insert(Users)
                .values({
                    name: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    imageUrl: user.imageUrl,
                })
                .returning();

            console.log("New user created:", saveResult[0]);
            return NextResponse.json({ result: saveResult[0].Users }, { status: 201 });
        }

        // Return existing user info
        return NextResponse.json({ result: userInfo[0] }, { status: 200 });
    } catch (e) {
        // Enhanced error logging
        console.error("API Error Details:", {
            message: e.message,
            stack: e.stack,
            name: e.name
        });
        return NextResponse.json({ 
            error: "Internal Server Error", 
            details: e.message 
        }, { status: 500 });
    }
}