export interface Transaction {
    id: string;
    date: string;
    type: 'payment' | 'usage';
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    description: string;
}

export interface DailySpend {
    date: string;
    amount: number;
    model?: string;
}

export const mockTransactions: Transaction[] = [
    {
        id: 't1',
        date: '2024-12-09',
        type: 'payment',
        amount: 5000,
        status: 'completed',
        description: 'Balance top-up via card',
    },
    {
        id: 't2',
        date: '2024-12-09',
        type: 'usage',
        amount: -145,
        status: 'completed',
        description: 'Daily usage aggregate',
    },
    {
        id: 't3',
        date: '2024-12-08',
        type: 'usage',
        amount: -230,
        status: 'completed',
        description: 'Daily usage aggregate',
    },
    {
        id: 't4',
        date: '2024-12-07',
        type: 'usage',
        amount: -189,
        status: 'completed',
        description: 'Daily usage aggregate',
    },
];

export const mockDailySpend: DailySpend[] = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: Math.floor(Math.random() * 150) + 50,
})).reverse();

export const mockModelBreakdown = [
    { model: 'GPT-4o', percentage: 60, cost: 900 },
    { model: 'Claude 3.5', percentage: 30, cost: 450 },
    { model: 'Embeddings', percentage: 10, cost: 150 },
];
