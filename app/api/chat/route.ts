import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/db";

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Default fallback prompt (used when no DB settings exist)
const DEFAULT_SYSTEM_PROMPT = `
Ты — Leo, умный AI-ассистент для платформы LeoAgent. 
Твоя цель — помогать бизнесу автоматизировать процессы с помощью AI-решений.

Инструкции:
1. Квалифицируй лида.
2. Консультируй по продукту.
3. Лидогенерация (если клиент оставит контакты, поблагодари и скажи, что менеджер свяжется).
4. Цены: Start (30к), Business (90к).

Тон: Дружелюбный, профессиональный, используй эмодзи.

ВАЖНО: Форматируй ответы с переносами строк. Каждый абзац отделяй пустой строкой.
`;

const DEFAULT_MODEL = "claude-sonnet-4-5-20250929"; // DO NOT CHANGE - locked by user request
const DEFAULT_MAX_TOKENS = 1000;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        console.log("Chat Request Received:", messages.length);

        // Fetch agent settings from database
        let settings;
        try {
            settings = await prisma.agentSettings.findUnique({
                where: { id: "singleton" }
            });
        } catch (dbError) {
            console.warn("Could not fetch agent settings from DB, using defaults:", dbError);
        }

        // Use DB settings or fallback to defaults
        const systemPrompt = settings?.systemInstruction || DEFAULT_SYSTEM_PROMPT;
        const modelId = settings?.modelId || DEFAULT_MODEL;
        const maxTokens = settings?.maxTokens || DEFAULT_MAX_TOKENS;
        const isActive = settings?.isActive ?? true;

        // Check if agent is enabled
        if (!isActive) {
            return Response.json({
                error: "Агент временно отключён. Обратитесь к администратору."
            }, { status: 503 });
        }

        console.log("Using model:", modelId, "| Max tokens:", maxTokens);

        // RAG: Inject Context
        let finalSystemPrompt = systemPrompt;
        if (settings?.ragFiles) {
            try {
                const files = settings.ragFiles as any[];
                const activeFiles = files.filter((f: any) => f.active);

                if (activeFiles.length > 0) {
                    const contextText = activeFiles
                        .map((f: any) => `[Document: ${f.name}]\n${f.content}`)
                        .join("\n\n---\n\n");

                    finalSystemPrompt += `\n\n=== KNOWLEDGE BASE CONTEXT ===\nUse the following documents to answer the user's request. Prioritize this context over your general knowledge.\n\n${contextText}\n\n=== END CONTEXT ===`;
                    console.log(`Injected ${activeFiles.length} files into context.`);
                }
            } catch (e) {
                console.error("Error parsing RAG files:", e);
            }
        }

        // Filter messages to ensure they are valid for Anthropic API
        const validMessages = messages.map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content
        }));

        // Create stream directly from Anthropic SDK
        const response = await anthropic.messages.create({
            model: modelId,
            stream: true,
            max_tokens: maxTokens,
            system: finalSystemPrompt,
            messages: validMessages,
        });

        // Create a ReadableStream that outputs text/event-stream format for Vercel AI SDK
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const event of response) {
                        if (event.type === 'content_block_delta') {
                            const delta = (event as any).delta;
                            if (delta?.type === 'text_delta' && delta.text) {
                                // Format for Vercel AI SDK: data: {"text":"..."}\n\n
                                // Actually, for `ai` SDK <v4, we send plain text chunks
                                // For `useChat` with ai SDK v3, we need SSE format with "0:" prefix
                                controller.enqueue(encoder.encode(`0:${JSON.stringify(delta.text)}\n`));
                            }
                        }
                    }
                    controller.close();
                } catch (error) {
                    console.error("Stream error:", error);
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (e: any) {
        console.error("Route Error:", e);
        return Response.json({ error: e.message }, { status: 500 });
    }
}
