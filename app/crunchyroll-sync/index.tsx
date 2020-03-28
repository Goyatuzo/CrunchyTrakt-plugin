import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import CrunchyrollSync from './react';
import store from './redux';

render(<Provider store={store}>
    <CrunchyrollSync />
</Provider>, document.getElementById("crunchy-sync-container"));