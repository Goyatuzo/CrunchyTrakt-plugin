declare namespace Trakt {
    interface GetTokenRequest {
        code: string;
        client_id: string;
        client_secret: string;
        redirect_url: string;
        grant_type: string;
    }
}