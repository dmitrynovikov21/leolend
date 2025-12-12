export type AgentStatus = 'active' | 'training' | 'paused' | 'error';

export interface Agent {
    id: string
    name: string
    role: string
    avatar: string
    initials?: string
    capabilities?: string[]
    status: AgentStatus
    lastActive: string
    conversations?: number
    avgResponseTime?: string
    metrics: {
        totalDialogs: number       // Total conversations handled
        dialogsToday: number       // Conversations today
        conversionRate: number     // Lead conversion percentage (0-100)
        spend: number              // Total spend in rubles
        connectedChannels: {
            whatsapp: boolean
            telegram: boolean
            instagram: boolean
            facebook: boolean
            web: boolean
        }
    }
}

export const mockAgents: Agent[] = [
    {
        id: '1',
        name: 'Oleg HR',
        role: 'Recruiting Assistant',
        avatar: '👨‍💼',
        status: 'active',
        lastActive: '2m ago',
        metrics: {
            totalDialogs: 1240,
            dialogsToday: 45,
            conversionRate: 8.5,
            spend: 850,
            connectedChannels: {
                whatsapp: true,
                telegram: true,
                instagram: false,
                facebook: false,
                web: true,
            },
        },
    },
    {
        id: '2',
        name: 'Alice Support',
        role: 'Customer Support',
        avatar: '👩‍💻',
        status: 'active',
        lastActive: '5m ago',
        metrics: {
            totalDialogs: 2850,
            dialogsToday: 128,
            conversionRate: 12.3,
            spend: 1240,
            connectedChannels: {
                whatsapp: true,
                telegram: false,
                instagram: true,
                facebook: true,
                web: true,
            },
        },
    },
    {
        id: '3',
        name: 'Mike Tech',
        role: 'Technical Support',
        avatar: '🛠️',
        status: 'paused',
        lastActive: '1h ago',
        metrics: {
            totalDialogs: 580,
            dialogsToday: 0,
            conversionRate: 15.7,
            spend: 420,
            connectedChannels: {
                whatsapp: true,
                telegram: true,
                instagram: false,
                facebook: false,
                web: true,
            },
        },
    },
    {
        id: '4',
        name: 'Lead Gen Bot',
        role: 'Outbound Sales',
        avatar: '🚀',
        status: 'active',
        capabilities: ['LinkedIn', 'Email'],
        lastActive: '5 min ago',
        conversations: 350,
        avgResponseTime: '0.5s',
        metrics: {
            totalDialogs: 350,
            dialogsToday: 12,
            conversionRate: 6.2,
            spend: 320,
            connectedChannels: {
                whatsapp: false,
                telegram: true,
                instagram: false,
                facebook: false,
                web: false,
            },
        },
    }
];
