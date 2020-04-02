namespace Trakt {
    export interface GetTokenRequest {
        code: string;
        client_id: string;
        client_secret: string;
        redirect_uri: string;
        grant_type: string;
    }

    export interface GetTokenResponse {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
        scope: string;
        created_at: number;
    }

    export interface RevokeTokenRequest {
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

    export type SearchType = 'movie' | 'show' | 'episode' | 'person' | 'list';

    interface IdTypes {
        trakt: number;
        tvdb: number;
        imdb?: string;
    }

    interface BaseSearchResult {
        title: string;
        year: number;
        ids: IdTypes;
    }

    export interface EpisodeContent {
        season: number;
        number: number;
        title: string;
        ids: IdTypes;
    }

    export interface SearchResult {
        type: SearchType;
        score: number;
        movie?: BaseSearchResult;
        show?: BaseSearchResult;
        episode?: EpisodeContent;
        person?: BaseSearchResult;
    }

    export interface ScrobbleHistory extends SearchResult {
        watched_at: string;
    }
}