export enum AppMessageType {
    GET_VIDEO_DATA,
    GET_CURRENT_TIMESTAMP
};

export interface IAppMessage {
    type: AppMessageType,
    payload?: any
}
