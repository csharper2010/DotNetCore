import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/scan';

import { QueryFeld } from './QueryFeld';
import { KundeSucheState, Loading } from './KundeSucheState';
import { KundeQueryFeldRepository } from './KundeSucheServices';

function getInitialState(): KundeSucheState {
    return {
        queryFelder: { kind: 'loading' },
        query: [],
        result: [],
    };
};

interface LoadQueryFelderAction {
    kind: 'loadQueryFelder';
}
interface QueryFelderLoadedAction {
    kind: 'queryFelderLoaded';
    queryFelder: Array<QueryFeld>;
}

type Action = LoadQueryFelderAction | QueryFelderLoadedAction;

export const createLoadQueryFelderAction = () : LoadQueryFelderAction => {
    return {
        kind: 'loadQueryFelder',
    }
};
export const createQueryFelderLoadedAction = (queryFelder: Array<QueryFeld>) : QueryFelderLoadedAction => {
    return {
        kind: 'queryFelderLoaded',
        queryFelder,
    }
}

export interface KundeSucheStore {
    action$: Subject<Action>,
    store$: Observable<KundeSucheState>,
}

export const createStore = (queryFeldRepository: KundeQueryFeldRepository): KundeSucheStore => {
    const init = getInitialState();
    const action$ = new Subject<Action>();

    const reducer = (state: KundeSucheState, action: Action): KundeSucheState => {
        switch (action.kind) {
            case 'loadQueryFelder':
                queryFeldRepository.getQueryFelder()
                    .then(
                        value => action$.next(createQueryFelderLoadedAction(value)),
                        rejected => setTimeout(() => action$.next(createLoadQueryFelderAction()), 2000))
                    .catch(reason => {
                        // TODO Fehlerzustand in KundeSucheState einführen
                        if (console && console.log) {
                            console.log(reason);
                        } else {
                            throw reason;
                        }
                    });
                return state;
            case 'queryFelderLoaded':
                return Object.assign({}, state, { queryFelder: {
                    kind: 'data',
                    data: action.queryFelder,
                }});
            default:
                const _exhaustiveCheck: never = action;
                return _exhaustiveCheck;
        }
    };

    const store$ = action$.scan(reducer, init).startWith(init).publishReplay(1);
    const subscription = store$.connect();

    action$.next(createLoadQueryFelderAction());

    return {
        action$,
        store$,
    }
}
