import * as React from 'react';
import * as ReactDOM from 'react-dom';

import KundeSucheComponent from './KundeSucheComponent';

import {createStore} from './KundeSucheStore';
import {QueryFeld} from './QueryFeld';

import {AppContainer} from 'react-hot-loader';

let x = document.getElementById('kundeSuche-app');

let store = createStore({
    getQueryFelder(): Promise<QueryFeld[]> {
        return fetch('/api/Kunde/queryfelder')
            .then(response => response.json()
            .then<QueryFeld[]>(value => Promise.resolve(value as QueryFeld[])));
    },
});

let render = (Component) => {
  ReactDOM.render(<Component { ...store } />, x);
};

if (module.hot) {
    render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component { ...store } />
        </AppContainer>, x);
    };

    module.hot.accept('./KundeSucheComponent', () => {
        const NextKundeSucheComponent = require('./KundeSucheComponent').default;
        render(NextKundeSucheComponent);
    });
}

render(KundeSucheComponent);
