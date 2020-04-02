import * as React from 'react';
import { browser } from 'webextension-polyfill-ts';

const SyncRedirect: React.StatelessComponent<{}> = _ => {
    const onClick = async (_: React.MouseEvent<HTMLButtonElement>) => {
        const tabs = await browser.tabs.query({ url: `*://*.crunchyroll.com/*`, active: true });

        browser.tabs.create({
            index: tabs[0].index + 1,
            url: browser.runtime.getURL('dist/crunchyroll-sync/index.html')
        });
    }

    return <button className="button is-info is-light" type="button" onClick={onClick}>Go to Sync Page</button>
}

export default SyncRedirect;