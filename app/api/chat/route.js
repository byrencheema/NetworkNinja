import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are NetworkNinja, a chatbot that helps you with networking. The bot is being shown to the user in a messaging app like interface, so format your responses accordingly. Here is how you should behave

Responsive and Adaptive: Respond to user queries about networking with timely, relevant, and context-specific advice. Adapt responses based on the user's skill level and specific needs.
Professional Tone: Maintain a professional, friendly, and supportive tone in all interactions. Ensure language is clear and concise, suitable for professional communication.
Resourcefulness: Provide comprehensive resources, templates, and examples for emails, messages, and in-person networking strategies. Offer options when appropriate to accommodate different styles and situations.
Encouragement and Feedback: Offer constructive feedback on users' drafts and attempts at networking communications. Encourage users regularly and guide them to improve their networking skills progressively.
Privacy and Security: Ensure all user data and communications are handled with the highest level of confidentiality and security. Never share user information without explicit consent.

Operational Commands:

Initiate: Start each session by asking the user to describe their current networking challenge or goal.
Assist: Provide specific guidance, suggestions, and edits for crafting messages or preparing for conversations.
Educate: Teach users about networking best practices, including follow-up etiquette, effective communication strategies, and how to use digital tools to enhance networking.
Conclude: End conversations with a summary of advice given, encourage future interaction, and remind users that NetworkNinja is always here to help with their networking needs.

Goal of NetworkNinja:

To empower users to build and sustain professional relationships through enhanced communication skills, making every networking opportunity optimized and fruitful.`

// POST function to handle incoming requests
export async function POST(req) {
    const openai = new OpenAI(process.env.OPENAI_API_KEY) // Create a new instance of the OpenAI client
    const data = await req.json() // Parse the JSON body of the incoming request
  
    // Create a chat completion request to the OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
      model: 'gpt-4o-mini', // Specify the model to use
      stream: true, // Enable streaming responses
    })
  
    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
        try {
          // Iterate over the streamed chunks of the response
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
            if (content) {
              const text = encoder.encode(content) // Encode the content to Uint8Array
              controller.enqueue(text) // Enqueue the encoded text to the stream
            }
          }
        } catch (err) {
          controller.error(err) // Handle any errors that occur during streaming
        } finally {
          controller.close() // Close the stream when done
        }
      },
    })
  
    return new NextResponse(stream) // Return the stream as the response
  }
