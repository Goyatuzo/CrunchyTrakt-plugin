declare const CLIENT_ID: string;
declare const CLIENT_SECRET: string;

interface ICredentials {
    key: string;
    clientId: string;
    clientSecret: string;
}

export var traktCredentials: ICredentials = {
    key: "",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
};