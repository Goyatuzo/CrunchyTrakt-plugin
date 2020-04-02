import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';
import AppStateContext from '../contexts/app-state';

class SyncRedirect extends React.Component {
    static contextType = AppStateContext;
    context!: React.ContextType<typeof AppStateContext>;

    private onClick = async (_: React.MouseEvent<HTMLButtonElement>) => {
        const tabs = await browser.tabs.query({ url: `*://*.crunchyroll.com/*`, active: true });

        browser.tabs.create({
            index: tabs[0].index + 1,
            url: browser.runtime.getURL('dist/crunchyroll-sync/index.html')
        });
    }

    render() {
        if (this.context.loggedIn) {
            return <button className="button is-info is-light" type="button" onClick={this.onClick}>Go to Sync Page</button>
        }

        return <p>Please log into Trakt by clicking the button above.</p>
    }
}
export default SyncRedirect;