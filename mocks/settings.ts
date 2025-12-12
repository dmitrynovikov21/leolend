export interface APIKey {
    id: string;
    name: string;
    prefix: string;
    lastUsed: string;
    created: string;
}

export interface Session {
    id: string;
    device: string;
    browser: string;
    location: string;
    ip: string;
    lastActive: string;
    isCurrent: boolean;
}

export const mockAPIKeys: APIKey[] = [
    { id: '1', name: 'Production App', prefix: 'pk_live_...', lastUsed: 'Just now', created: 'Oct 12, 2024' },
    { id: '2', name: 'Development', prefix: 'pk_test_...', lastUsed: '2 days ago', created: 'Nov 01, 2024' },
    { id: '3', name: 'CI/CD Pipeline', prefix: 'pk_ci_...', lastUsed: '1 week ago', created: 'Sep 15, 2024' },
];

export const mockSessions: Session[] = [
    { id: '1', device: 'MacBook Pro', browser: 'Chrome', location: 'San Francisco, US', ip: '192.168.1.1', lastActive: 'Active now', isCurrent: true },
    { id: '2', device: 'iPhone 15', browser: 'Safari', location: 'San Francisco, US', ip: '10.0.0.1', lastActive: '2 hours ago', isCurrent: false },
    { id: '3', device: 'Windows PC', browser: 'Edge', location: 'New York, US', ip: '24.55.12.1', lastActive: '1 week ago', isCurrent: false },
];
