import { getEmbedding, notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import openai from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import {
  ChatCompletionMessage,
  ChatCompletionSystemMessageParam,
} from "openai/resources/index.mjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const parsedCookie = cookies().get("userId");
  const cookieValue = parsedCookie?.value || null;
  const parsedCookieValue = cookieValue ? JSON.parse(cookieValue) : {};
  const userId = parsedCookieValue.userId;
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesSliced = messages.slice(-4);

    const embedding = await getEmbedding(
      messagesSliced.map((message) => message.content).join("\n"),
    );

  
    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 4,
      filter: { userId },
    });

    const relevantNotes = await prisma.notes.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });
    
    const systemMessage: ChatCompletionSystemMessageParam = {
      role: "system",
      content:
        "You are an intelligent note-taking app. You answer the user's question based on their existing notes." +
        "The relevant notes for this question are:\n" +
        relevantNotes
          .map((note) => `Title: ${note.title}\n\nContent:\n${note.content}`)
          .join("\n\n"),
    };
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesSliced],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
