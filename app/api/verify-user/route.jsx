import { NextResponse } from "next/server";
import { db } from "@/config/db"; // Ensure correct path to your DB config
import { Users } from "@/config/schema"; // Ensure correct schema import
import { eq } from "drizzle-orm"; // Import the `eq` function

export async function POST(req) {
    try {
        const { user } = await req.json();

        if (!user) {
            return NextResponse.json({ error: "User data is missing." }, { status: 400 });
        }

        // Check if the user exists
        const userInfo = await db
            .select()
            .from(Users)
            .where(eq(Users.email, user.primaryEmailAddress.emailAddress));

        console.log("User Info:", userInfo);

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

            return NextResponse.json({ result: saveResult[0] }, { status: 201 });
        }

        // Return existing user info
        return NextResponse.json({ result: userInfo[0] }, { status: 200 });
    } catch (e) {
        console.error("Error in POST /api/verify-user:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
