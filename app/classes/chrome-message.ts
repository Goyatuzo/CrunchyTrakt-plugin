export enum ChromeMessageType {
    GET_VIDEO_DATA,
    GET_CURRENT_TIMESTAMP
};

export interface IChromeMessage {
    type: ChromeMessageType,
    payload?: any
}
