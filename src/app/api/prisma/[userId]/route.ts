import prisma from "@/lib/db/prisma";

export async function GET(req: Request, { params }: any) {
  const userId = params.userId;

  try {
    const allNotes = await prisma.notes.findMany({ where: { userId } });
    return Response.json({ allNotes }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
