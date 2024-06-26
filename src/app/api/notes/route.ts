import { getEmbedding, notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/note";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const parsedCookie = cookies().get("userId");
  const cookieValue = parsedCookie?.value || null;
  const parsedCookieValue = cookieValue ? JSON.parse(cookieValue) : {};
  const userId = parsedCookieValue.userId;

  try {
    const body = await req.json();

    const parseResult = createNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, content } = parseResult.data;

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const embedding = await getEmbeddingFromNote(title, content);

    const note = await prisma.$transaction(async (tx) => {
      const note = await tx.notes.create({
        data: {
          title,
          content,
          userId,
        },
      });
      await notesIndex.upsert([
        { id: note.id, values: embedding, metadata: { userId } },
      ]);

      return note;
    });

    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  const parsedCookie = cookies().get("userId");
  const cookieValue = parsedCookie?.value || null;
  const parsedCookieValue = cookieValue ? JSON.parse(cookieValue) : {};
  const userId = parsedCookieValue.userId;
  try {
    const body = await req.json();
    const parseResult = updateNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id, title, content } = parseResult.data;

    const note = await prisma.notes.findUnique({ where: { id } });

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    if (!userId || userId !== note.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const embedding = await getEmbeddingFromNote(title, content);

    const updatedNote = await prisma.$transaction(async (tx) => {
      const updatedNote = await tx.notes.update({
        where: { id },
        data: {
          title,
          content,
        },
      });
      await notesIndex.upsert([
        {
          id,
          values: embedding,
          metadata: { userId },
        },
      ]);

      return updatedNote;
    });

    return Response.json({ updatedNote }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  const parsedCookie = cookies().get("userId");
  const cookieValue = parsedCookie?.value || null;
  const parsedCookieValue = cookieValue ? JSON.parse(cookieValue) : {};
  const userId = parsedCookieValue.userId;
  try {
    const body = await req.json();
    const parseResult = deleteNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id } = parseResult.data;

    const note = await prisma.notes.findUnique({ where: { id } });

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    if (!userId || userId !== note.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    await prisma.$transaction(async (tx) => {
      await tx.notes.delete({ where: { id } });
      await notesIndex.deleteOne(id);
    });

    return Response.json({ message: "Note deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function getEmbeddingFromNote(
  title: string,
  content: string | undefined,
) {
  return getEmbedding(title + "\n\n" + content ?? "");
}

export async function GET(req: Request) {
  const parsedCookie = cookies().get("userId");
  const cookieValue = parsedCookie?.value || null;
  const parsedCookieValue = cookieValue ? JSON.parse(cookieValue) : {};
  const userId = parsedCookieValue.userId;
  try {
    const body = await req.json();

    const parseResult = createNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, content } = parseResult.data;

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const embedding = await getEmbeddingFromNote(title, content);

    const note = await prisma.$transaction(async (tx) => {
      const note = await tx.notes.create({
        data: {
          title,
          content,
          userId,
        },
      });
      await notesIndex.upsert([
        { id: note.id, values: embedding, metadata: { userId } },
      ]);

      return note;
    });

    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
