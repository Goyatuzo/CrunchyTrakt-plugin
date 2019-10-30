declare namespace Trakt {
    interface GetTokenRequest {
        code: string;
        client_id: string;
        client_secret: string;
        redirect_uri: string;
        grant_type: string;
    }

    interface GetTokenResponse {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
        scope: string;
        created_at: number;
    }

    interface RevokeTokenRequest {
        /**
         * A valid OAuth access_token.
         */
        token: string;
        /**
         * Get this from your app settings.
         */
        client_id: string;
        /**
         * Get this from your app settings.
         */
        client_secret: string;
    }
}