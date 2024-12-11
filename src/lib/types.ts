export enum Reply {
    TEXT = 'text',
    IMAGE = 'image'

}
export type ReplyType = {
    id: string;
    type: Reply;
    data: string;
    timestamp: Date | string;
    loading?: boolean
}