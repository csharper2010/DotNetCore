import { KundeSucheView } from './KundeSucheModel';
import { QueryFeld } from './QueryFeld';
import { QueryFilter } from './QueryFilter';

export interface Loading {
    kind: 'loading',
}

export interface Data<T> {
    kind: 'data',
    data: T,
}

export interface KundeSucheState {
    queryFelder: Loading | Data<Array<QueryFeld>>,
    query: Array<QueryFilter>,
    result: Loading | Array<KundeSucheView>,
}