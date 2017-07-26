export enum MessageType {
    SCROBBLE
};

export interface IChromeMessage {
    type: MessageType,
    payload: any
}
