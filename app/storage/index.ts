import { browser } from "webextension-polyfill-ts";

export class StorageWrapper {
    private hasSync: boolean = browser.storage.sync !== null && browser.storage.sync !== undefined;

    get<T = any>(key: string): Promise<{ [s: string]: T }> {
        if (this.hasSync) {
            return browser.storage.sync.get(key);
        } else {
            return browser.storage.local.get(key);
        }
    }

    set(key: string, value: any): Promise<void> {
        if (this.hasSync) {
            return browser.storage.sync.set({ key, value });
        } else {
            return browser.storage.local.set({ key, value });
        }
    }
}

const StorageWrap = new StorageWrapper();

export default StorageWrap;