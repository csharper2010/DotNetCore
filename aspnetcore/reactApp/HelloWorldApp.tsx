import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {HelloWorldState} from './HelloWorldState';

//import {store} from './HelloWorldStore';
import { polyfill } from 'es6-promise';
polyfill();
import 'whatwg-fetch';

export class HelloWorld extends React.Component<any, HelloWorldState> {
    constructor() {
        super();

        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        this.setState({
            data: ['initial'],
            lastFetched: new Date(),
        });
        this.fetchData();
    }

    fetchData() {
        // fetch.fetchUrl('http://localhost:5000/api/Values',
        //     (error, meta, body) => this.data = body.json() as Array<string>)
        let self = this;
        fetch('/api/Values')
            .then(response => response.json()
            .then(j => {
                this.setState({
                    data: j as Array<string>,
                    lastFetched: new Date(),
                });
            }));
    }

    reload(e: React.MouseEvent<HTMLButtonElement>) {
        this.fetchData();
    }

    public render() {
        let state = this.state;
        return (
            <div>
                Hello World {state && state.lastFetched.toLocaleString()}
                <ul>
                { state && state.data.map((s, index) => <li key={index}>{s}</li>) }
                </ul>
                <button onClick={this.reload}>Reload</button>
            </div>
        );
    }
}

let x = document.getElementById('react-app');
ReactDOM.render(<HelloWorld />, x);
