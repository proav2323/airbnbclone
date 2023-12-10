import bcrypt from "bcrypt";
import prisma from "../../../libs/prismaDb";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("invalid credentials", { status: 401 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email: email,
      hashedPassword: hashedPassword,
      name: name,
    },
  });

  return NextResponse.json(user);
}
