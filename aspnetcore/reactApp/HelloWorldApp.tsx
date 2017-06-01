import * as React from 'react';
import * as ReactDOM from 'react-dom';

import HelloWorldComponent from './HelloWorldComponent';

import {AppContainer} from 'react-hot-loader';

let x = document.getElementById('react-app');

let render = (Component) => {
  ReactDOM.render(<Component />, x);
};

if (module.hot) {
    render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>, x);
    };

    module.hot.accept('./HelloWorldComponent', () => {
        const NextHelloWorldComponent = require('./HelloWorldComponent').default;
        render(NextHelloWorldComponent);
    });
}

render(HelloWorldComponent);
