import { browser } from "webextension-polyfill-ts";

export class StorageWrapper {
    // private hasSync: boolean = browser.storage.sync !== null && browser.storage.sync !== undefined;
    private tokenResponseKey = 'trakt-oauth-response';

    get<T = any>(key: string): Promise<{ [s: string]: T }> {
        return browser.storage.local.get(key);
    }

    async getTokenData(): Promise<Trakt.GetTokenResponse> {
        const dict = await this.get<Trakt.GetTokenResponse>(this.tokenResponseKey)

        return dict[this.tokenResponseKey];
    }

    set(key: string, value: any): Promise<void> {
        return browser.storage.local.set({ [key]: value });
    }

    async setTokenData(response: Trakt.GetTokenResponse): Promise<void> {
        return browser.storage.local.set({ [this.tokenResponseKey]: response });
    }

    delete(key: string): Promise<void> {
        return browser.storage.local.remove(key);
    }

    async deleteTokenData(): Promise<void> {
        return await this.delete(this.tokenResponseKey);
    }
}

const StorageWrap = new StorageWrapper();

export default StorageWrap;