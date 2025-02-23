import { NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Content } from 'next/font/google';

const GEMINI_API_KEY = 'AIzaSyD9UodH5OAWT-WD0vMOUt5P7rGIi-0PV1I';

const systemPrompt = `You are a helpful and knowledgeable healthcare assistant. 
Provide accurate, evidence-based medical information while being clear that you're not replacing professional medical advice. 
Always encourage users to consult healthcare professionals for specific medical concerns.
Focus on general health information, wellness tips, and medical education.`;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const llm = new ChatGoogleGenerativeAI({
      modelName: 'gemini-pro',
      apiKey: GEMINI_API_KEY,
      temperature: 0.7,
    });

    const response = await llm.invoke([
      ['system', systemPrompt],
      ['human', query],
    ]);
    console.log(response);

    return NextResponse.json({ response: response.content });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}