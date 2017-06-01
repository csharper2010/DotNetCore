import * as React from 'react';

import { Subscription } from 'rxjs/Subscription';

import { StringQueryFeld, DatumQueryFeld, QueryFeld } from './QueryFeld';
import { KundeSucheStore } from './KundeSucheStore';
import { KundeSucheState, Loading } from './KundeSucheState';

import { QueryFeldSelector } from './QueryFeldSelector';

export default class HelloWorld extends React.Component<KundeSucheStore, KundeSucheState> {
    subscription: null | Subscription;

    constructor(props: KundeSucheStore) {
        super(props);
        this.subscription = null;
    }

    componentDidMount() {
        this.subscription = this.props.store$.subscribe(state => this.setState(state));
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    getQueryFelder(state: KundeSucheState) {
        const queryFelder = state.queryFelder;
        if (queryFelder.kind == 'loading') {
            return 'Loading';
        } else {
            return <ul>{queryFelder.data.map(q => QueryFeldSelector(q))}</ul>;
        }
    }

    public render() {
        let state = this.state;
        if (!state) {
            return <div>Loading...</div>
        }
        return (
            <div>
                KundeSuche {this.getQueryFelder(this.state)}
            </div>
        );
    }
}

