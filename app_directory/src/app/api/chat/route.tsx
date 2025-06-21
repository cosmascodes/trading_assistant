// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface ChatRequest {
  message: string;
  session_id: string; // Changed to match FastAPI format
}

interface ChatResponse {
  response: string;
  session_id?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, session_id } = body;

    console.log('Next.js API received:', { message, session_id });

    // Validate input
    if (!message || !session_id) {
      console.error('Missing required fields:', { message: !!message, session_id: !!session_id });
      return NextResponse.json(
        { error: 'Message and session_id are required' },
        { status: 400 }
      );
    }

    // Replace with your actual FastAPI endpoint URL
    const FASTAPI_ENDPOINT = process.env.FASTAPI_CHAT_ENDPOINT || 'http://localhost:8000/agent';

    console.log('Forwarding to FastAPI:', FASTAPI_ENDPOINT);

    // Call your FastAPI endpoint
    const response = await fetch(FASTAPI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        session_id, // Pass through as-is
      }),
    });

    console.log('FastAPI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FastAPI error:', response.status, errorText);
      return NextResponse.json(
        { error: 'FastAPI request failed', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('FastAPI response data:', data);

    return NextResponse.json({
      response: data.response || data.message || 'No response from AI',
      session_id: data.session_id || data.sessionId || session_id
    });
  } catch (error:any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}