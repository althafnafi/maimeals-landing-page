import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { PostgresChatMessageHistory } from "@langchain/community/stores/message/postgres";

export async function GET(request: Request) {
    const cookies = request.headers.get("cookie") || "";
    const sessionId =
        cookies
            .split("; ")
            .find((row) => row.startsWith("sessionId="))
            ?.split("=")[1] || "";

    const messageHistory = new PostgresChatMessageHistory({
        tableName: "history",
        sessionId: sessionId,
        pool,
    });

    const messages = await messageHistory.getMessages();
    const response = messages.map((message) => {
        let role_type = "";
        if (message.lc_id[2] === "AIMessage") {
            role_type = "ai";
        } else if (message.lc_id[2] === "HumanMessage") {
            role_type = "human";
        }
        return {
            role: role_type,
            content: message.content,
        };
    });
    return NextResponse.json(response);
}

export async function POST(request: Request) {
    const cookies = request.headers.get("cookie") || "";
    const sessionId =
        cookies
            .split("; ")
            .find((row) => row.startsWith("sessionId="))
            ?.split("=")[1] || "";

    const messageHistory = new PostgresChatMessageHistory({
        tableName: "history",
        sessionId: sessionId,
        pool,
    });

    const { role, content } = await request.json();

    if (role === "ai") {
        await messageHistory.addAIMessage(content);
    } else if (role === "human") {
        await messageHistory.addUserMessage(content);
    }

    return NextResponse.json({ success: true });
}
