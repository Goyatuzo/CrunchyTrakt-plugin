interface ICredentials {
    key: string;
    clientId: string;
    clientSecret: string;
}

export var traktCredentials: ICredentials = {
    key: "",
    clientId: "",
    clientSecret: ""
};