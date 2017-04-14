import * as React from 'react';
import * as ReactDOM from 'react-dom';

import HelloWorldComponent from './HelloWorldComponent';

import {AppContainer} from 'react-hot-loader';

let x = document.getElementById('react-app');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
        <Component />
    </AppContainer>, x);
};

render(HelloWorldComponent);

if (module.hot) {
    module.hot.accept('./HelloWorldComponent', () => {
        const NextHelloWorldComponent = require('./HelloWorldComponent').default;
        render(NextHelloWorldComponent);
    });
}