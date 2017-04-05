import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {store} from './HelloWorldStore';

export class HelloWorld extends React.Component<{ data: Array<string> }, any> {
    constructor() {
        super();
    }

    public render() {
        let data: String[] = (this as any).props.store.data;
        return (
            <div>
                Hello World {(this as any).props.store.lastFetched}
                <ul>
                { data.map((s, index) => <li key={index}>{s}</li>) }
                </ul>
            </div>
        );
    }
}

let x = document.getElementById('react-app');
ReactDOM.render(<HelloWorld store={store}/>, x);
store.fetchData();
