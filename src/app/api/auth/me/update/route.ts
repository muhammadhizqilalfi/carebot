import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { 
      fullName, 
      age, 
      weight, 
      height,
      encryption,
      dataSharing,
      reminders,
      alerts,
      insights 
    } = body;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName,
        age: age ? Number(age) : undefined,
        weight: weight ? Number(weight) : undefined,
        height: height ? Number(height) : undefined,
        encryption: encryption !== undefined ? Boolean(encryption) : undefined,
        dataSharing: dataSharing !== undefined ? Boolean(dataSharing) : undefined,
        reminders: reminders !== undefined ? Boolean(reminders) : undefined,
        alerts: alerts !== undefined ? Boolean(alerts) : undefined,
        insights: insights !== undefined ? Boolean(insights) : undefined,
      },
    });

    return NextResponse.json(updatedUser);

  } catch (error: any) {
    console.error("Update Error:", error.message);
    return NextResponse.json(
      { error: "Gagal update user: " + error.message },
      { status: 500 }
    );
  }
}