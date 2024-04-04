import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY

if (!apiKey){
    throw Error("OPENAI_API_KEY is not defined")
}

const openai = new OpenAI({apiKey})

export default openai