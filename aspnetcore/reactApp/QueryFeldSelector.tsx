import * as React from 'react';
import {QueryFeld, StringQueryFeld, DatumQueryFeld} from './QueryFeld';

export function QueryFeldSelector(queryFeld: QueryFeld) {
    switch (queryFeld.kind) {
        case 'string':
            return <p key={queryFeld.feldKey}>{queryFeld.feldName} &#x201C;&#x201D;</p>;
        case 'datum':
            return <p key={queryFeld.feldKey}>{queryFeld.feldName} &#x1f4c5;</p>;
        default:
            const never: never = queryFeld;
    }
}