export interface Chat {
    id: string
    name: string
    avatar: string
    lastMessage: string
    time: string
    unread: number
    sentiment: string
    channel: string
}

export const mockChats: Chat[] = [
    {
        id: "1",
        name: "Alice Smith",
        avatar: "/avatars/01.png",
        lastMessage: "Can you help me with the pricing plan?",
        time: "Just now",
        unread: 2,
        sentiment: "neutral",
        channel: "telegram"
    },
    {
        id: "2",
        name: "Bob Johnson",
        avatar: "/avatars/02.png",
        lastMessage: "I want to request a refund.",
        time: "5m ago",
        unread: 0,
        sentiment: "negative",
        channel: "whatsapp"
    },
    {
        id: "3",
        name: "Charlie Brown",
        avatar: "/avatars/03.png",
        lastMessage: "Thanks! That was very helpful.",
        time: "1h ago",
        unread: 0,
        sentiment: "positive",
        channel: "web"
    }
]
