import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ORACLE_SYSTEM_PROMPT } from '@/lib/oracle'
import type { OracleRequest } from '@/types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OracleRequest
    const { message, history = [] } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: ORACLE_SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.75,
        maxOutputTokens: 400,
        topP: 0.9,
      },
    })

    const chat = model.startChat({ history })
    const result = await chat.sendMessage(message)
    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error('[Oracle API Error]', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}