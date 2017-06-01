import { StringQueryFeld, DatumQueryFeld } from './QueryFeld';
import * as filter from './Filter';

class QueryFilterBase<TQueryFeld> {
    constructor(
        public readonly queryFeld: TQueryFeld,
        ) {}
}

class StringQueryFilter extends QueryFilterBase<StringQueryFeld> {
    query: filter.KeineEinschränkung | filter.StringFilter;

    constructor(
        queryFeld: StringQueryFeld,
    ) {
        super(queryFeld);
    }
}

class DatumQueryFilter extends QueryFilterBase<DatumQueryFeld> {
    query: filter.KeineEinschränkung | filter.RangeFilter<Date> | filter.VonFilter<Date> | filter.BisFilter<Date>;

    constructor(
        queryFeld: DatumQueryFeld,
    ) {
        super(queryFeld);
    }
}

export type QueryFilter = StringQueryFilter | DatumQueryFilter;