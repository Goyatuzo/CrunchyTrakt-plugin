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

    interface BaseSearchResult {
        title: string;
        year: number;
        ids: {
            trakt: number;
            slug: string;
            imdb?: string;
            tmdb?: string;
        }
    }

    interface EpisodeSearchResult extends BaseSearchResult {
        season: number;
        number: number;
    }

    export interface SearchResult {
        type: SearchType;
        score: number;
        movie?: BaseSearchResult;
        show?: BaseSearchResult;
        episode?: EpisodeSearchResult;
        person?: BaseSearchResult;
    }
}