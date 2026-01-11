import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/db";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Default prompt for post generation
const DEFAULT_POST_PROMPT = `Ты — профессиональный копирайтер и контент-менеджер.
Твоя задача — создавать качественные посты для блога/социальных сетей.

Правила:
1. Пиши на русском языке
2. Используй эмодзи для привлечения внимания
3. Структурируй текст с заголовками и списками
4. Делай текст лёгким для чтения
5. Добавляй призыв к действию в конце

Отвечай только готовым постом, без лишних комментариев.`;

export async function POST(req: Request) {
    try {
        const { prompt, style } = await req.json();

        if (!prompt) {
            return Response.json({ error: "Prompt is required" }, { status: 400 });
        }

        // Try to fetch settings from database
        let systemInstruction = DEFAULT_POST_PROMPT;
        let modelId = "claude-3-haiku-20240307";
        let maxTokens = 2000;

        try {
            const settings = await prisma.agentSettings.findUnique({
                where: { id: "singleton" }
            });

            if (settings) {
                // Use custom system instruction if available
                if (settings.systemInstruction) {
                    systemInstruction = settings.systemInstruction + "\n\n" + DEFAULT_POST_PROMPT;
                }
                modelId = settings.modelId || modelId;
                maxTokens = settings.maxTokens || maxTokens;
            }
        } catch (dbError) {
            console.warn("Could not fetch settings from DB, using defaults:", dbError);
        }

        // Build the user message with style context
        let userMessage = `Создай пост на тему: ${prompt}`;
        if (style) {
            userMessage += `\n\nСтиль: ${style}`;
        }

        console.log("Generating post with model:", modelId);

        // Generate the post
        const response = await anthropic.messages.create({
            model: modelId,
            max_tokens: maxTokens,
            system: systemInstruction,
            messages: [{ role: "user", content: userMessage }],
        });

        // Extract text content
        const content = response.content[0];
        if (content.type !== "text") {
            throw new Error("Unexpected response type");
        }

        return Response.json({
            success: true,
            post: content.text,
            usage: {
                input_tokens: response.usage.input_tokens,
                output_tokens: response.usage.output_tokens,
            }
        });

    } catch (e: any) {
        console.error("Post Generation Error:", e);
        return Response.json({ error: e.message }, { status: 500 });
    }
}
