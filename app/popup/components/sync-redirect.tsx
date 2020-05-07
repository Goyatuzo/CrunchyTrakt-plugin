import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';
import AppStateContext from '../contexts/app-state';

class SyncRedirect extends React.Component {
    static contextType = AppStateContext;
    context!: React.ContextType<typeof AppStateContext>;

    private onClick = async (_: React.MouseEvent<HTMLButtonElement>) => {
        browser.tabs.create({
            index: 0,
            url: browser.runtime.getURL('crunchyroll-sync/index.html')
        });
    }

    render() {
        return <button className="button is-info is-light" type="button" onClick={this.onClick}>Go to Sync Page</button>
    }
}
export default SyncRedirect;