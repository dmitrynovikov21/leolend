export interface KPI {
    label: string;
    value: string | number;
    change: string;
    trend: 'up' | 'down' | 'neutral';
}

export interface VolumeData {
    date: string;
    volume: number;
}

export interface AgentStat {
    id: string;
    name: string;
    sessions: number;
    avgDuration: string;
    csat: number;
}

export const mockKPIs: KPI[] = [
    { label: 'Total Conversations', value: '1,240', change: '+12.5%', trend: 'up' },
    { label: 'Avg. Messages / Chat', value: '4.2', change: '-2.1%', trend: 'down' },
    { label: 'Avg. Response Time', value: '1.4s', change: '-0.2s', trend: 'up' },
    { label: 'Engagement Rate', value: '85%', change: '+5.4%', trend: 'up' },
];

export const mockVolumeData: VolumeData[] = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        volume: Math.floor(Math.random() * 150) + 50,
    };
});

export const mockAgentStats: AgentStat[] = [
    { id: '1', name: 'Sales Assistant', sessions: 450, avgDuration: '4m 12s', csat: 4.8 },
    { id: '2', name: 'Tech Support', sessions: 320, avgDuration: '8m 45s', csat: 4.5 },
    { id: '3', name: 'HR Helper', sessions: 180, avgDuration: '2m 30s', csat: 4.9 },
    { id: '4', name: 'Legal Advisor', sessions: 90, avgDuration: '12m 10s', csat: 4.2 },
];
