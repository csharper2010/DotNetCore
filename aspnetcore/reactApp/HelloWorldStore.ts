import {HelloWorldState} from './HelloWorldState';

import * as fetch from 'fetch';
import * as got from 'got';

class HelloWorldStore implements HelloWorldState {
    data: string[] = ['initial'];
    lastFetched: Date;

    fetchData() {
        // fetch.fetchUrl('http://localhost:5000/api/Values',
        //     (error, meta, body) => this.data = body.json() as Array<string>)
        let self = this;
        got('http://localhost:5000/api/Values')
            .then(response => {
                let j = JSON.parse(response.body);
                self.data = j as Array<string>;
            })
    }
}

export const store = new HelloWorldStore();