import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const body = await req.json();
        const userData = body.formData;

        // Confirm data exists

        if (!userData.name || !userData.email || !userData.password) {
            return NextResponse.json(
                {
                    message: "Missing data",
                },
                {
                    status: 400,
                }
            );
        }

        // Confirm user doesn't already exist

        const duplicate = await User.findOne({ email: userData.email }).lean().exec();

        if (duplicate) {
            return NextResponse.json(
                {
                    message: "User already exists",
                },
                {
                    status: 409,
                }
            );
        }

        // Hash password

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(userData.password, salt);

        // replace password with hashed password

        userData.password = hashedPassword;

        // Create user
        await User.create(userData);

        console.log("User created -> ", userData.name, " - ", userData.email, " - ", userData.role)

        return NextResponse.json(
            {
                message: "User created",
            },
            {
                status: 201,
            }
        );


    } catch (err) {
        console.log(err);
        return NextResponse.json(
            {
                message: err.message,
            },
            {
                status: 500,
            }
        );
    }
}
