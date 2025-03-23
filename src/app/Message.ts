export interface Message {
    id?: number;
    from: string;
    date: string;
    subject: string;
    body: string;
    isRead: boolean;
}