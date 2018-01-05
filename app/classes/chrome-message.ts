export enum ChromeMessageType {
    GET_VIDEO_DATA
};

export interface IChromeMessage {
    type: ChromeMessageType,
    payload: any
}
