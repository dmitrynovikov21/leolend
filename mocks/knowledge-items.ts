export type KnowledgeItemType = 'folder' | 'file'
export type FileStatus = 'ready' | 'processing' | 'error'

export interface KnowledgeItem {
    id: string
    name: string
    type: KnowledgeItemType
    parentId: string | null  // null = root level

    // File-specific fields (only for type: 'file')
    status?: FileStatus
    size?: string
    chunks?: number
    tokens?: number
    uploadDate?: string
    errorMessage?: string
}

export const mockKnowledgeItems: KnowledgeItem[] = [
    // Root-level folders
    {
        id: 'folder-marketing',
        name: 'Marketing',
        type: 'folder',
        parentId: null,
    },
    {
        id: 'folder-engineering',
        name: 'Engineering',
        type: 'folder',
        parentId: null,
    },
    {
        id: 'folder-hr',
        name: 'HR & Recruiting',
        type: 'folder',
        parentId: null,
    },

    // Marketing subfolders
    {
        id: 'folder-marketing-q4',
        name: 'Q4 Reports',
        type: 'folder',
        parentId: 'folder-marketing',
    },
    {
        id: 'folder-marketing-campaigns',
        name: 'Ad Campaigns',
        type: 'folder',
        parentId: 'folder-marketing',
    },

    // Engineering subfolders
    {
        id: 'folder-engineering-api',
        name: 'API Documentation',
        type: 'folder',
        parentId: 'folder-engineering',
    },

    // Root-level files
    {
        id: 'file-root-1',
        name: 'company-handbook.pdf',
        type: 'file',
        parentId: null,
        status: 'ready',
        size: '3.2 MB',
        chunks: 68,
        tokens: 18500,
        uploadDate: '2024-01-10',
    },
    {
        id: 'file-root-2',
        name: 'product-roadmap-2024.pdf',
        type: 'file',
        parentId: null,
        status: 'ready',
        size: '1.5 MB',
        chunks: 32,
        tokens: 8900,
        uploadDate: '2024-01-05',
    },

    // Marketing folder files
    {
        id: 'file-marketing-1',
        name: 'brand-guidelines-v2.pdf',
        type: 'file',
        parentId: 'folder-marketing',
        status: 'ready',
        size: '4.1 MB',
        chunks: 52,
        tokens: 14200,
        uploadDate: '2024-01-15',
    },
    {
        id: 'file-marketing-2',
        name: 'social-media-strategy.docx',
        type: 'file',
        parentId: 'folder-marketing',
        status: 'processing',
        size: '890 KB',
        chunks: 0,
        tokens: 0,
        uploadDate: '2024-01-20',
    },

    // Marketing Q4 files
    {
        id: 'file-marketing-q4-1',
        name: 'sales-report-q4-2023.pdf',
        type: 'file',
        parentId: 'folder-marketing-q4',
        status: 'ready',
        size: '2.3 MB',
        chunks: 45,
        tokens: 12100,
        uploadDate: '2024-01-12',
    },
    {
        id: 'file-marketing-q4-2',
        name: 'marketing-metrics-q4.xlsx',
        type: 'file',
        parentId: 'folder-marketing-q4',
        status: 'ready',
        size: '1.2 MB',
        chunks: 28,
        tokens: 7800,
        uploadDate: '2024-01-12',
    },

    // Marketing Campaigns files
    {
        id: 'file-marketing-campaigns-1',
        name: 'fb-ads-performance.csv',
        type: 'file',
        parentId: 'folder-marketing-campaigns',
        status: 'ready',
        size: '450 KB',
        chunks: 15,
        tokens: 4200,
        uploadDate: '2024-01-18',
    },

    // Engineering folder files
    {
        id: 'file-engineering-1',
        name: 'architecture-design-2024.pdf',
        type: 'file',
        parentId: 'folder-engineering',
        status: 'ready',
        size: '5.6 MB',
        chunks: 92,
        tokens: 24500,
        uploadDate: '2024-01-08',
    },
    {
        id: 'file-engineering-2',
        name: 'security-guidelines.pdf',
        type: 'file',
        parentId: 'folder-engineering',
        status: 'error',
        size: '2.1 MB',
        chunks: 0,
        tokens: 0,
        uploadDate: '2024-01-19',
        errorMessage: 'Failed to extract text from PDF',
    },

    // Engineering API folder files
    {
        id: 'file-engineering-api-1',
        name: 'api-specification-v3.yaml',
        type: 'file',
        parentId: 'folder-engineering-api',
        status: 'ready',
        size: '780 KB',
        chunks: 22,
        tokens: 6100,
        uploadDate: '2024-01-14',
    },
    {
        id: 'file-engineering-api-2',
        name: 'authentication-flow.md',
        type: 'file',
        parentId: 'folder-engineering-api',
        status: 'processing',
        size: '120 KB',
        chunks: 0,
        tokens: 0,
        uploadDate: '2024-01-21',
    },

    // HR folder files
    {
        id: 'file-hr-1',
        name: 'interview-questions-bank.pdf',
        type: 'file',
        parentId: 'folder-hr',
        status: 'ready',
        size: '1.8 MB',
        chunks: 38,
        tokens: 10200,
        uploadDate: '2024-01-11',
    },
    {
        id: 'file-hr-2',
        name: 'benefits-overview-2024.pdf',
        type: 'file',
        parentId: 'folder-hr',
        status: 'ready',
        size: '2.5 MB',
        chunks: 48,
        tokens: 13100,
        uploadDate: '2024-01-09',
    },
]
