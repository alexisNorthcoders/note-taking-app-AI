import {Pinecone} from "@pinecone-database/pinecone"
import openai from "../openai"

const apiKey = process.env.PINECONE_API_KEY

if (!apiKey){
    throw Error("PINECONE_API_KEY is not defined")
}

const pinecone = new Pinecone({
    apiKey
    })

export const notesIndex = pinecone.Index("nextjs-chat")

export async function getEmbedding(text:string){
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text
    })

    const embedding = response.data[0].embedding

    if (!embedding) throw Error("Error generating embedding")
    
    
    return embedding
}