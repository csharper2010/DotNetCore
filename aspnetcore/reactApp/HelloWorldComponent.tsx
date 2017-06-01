import * as React from 'react';

import {HelloWorldState} from './HelloWorldState';

export default class HelloWorld extends React.Component<any, HelloWorldState> {
    constructor() {
        super();
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

    public render() {
        let state = this.state;
        return (
            <div>
                Hello WorldComponent {state && state.lastFetched.toLocaleString()}
                <button onClick={e => this.fetchData()}>Fetch</button>
                <ul>
                { state && state.data.map((s, index) => <li key={index}>a {s}</li>) }
                </ul>
            </div>
        );
    }
}

