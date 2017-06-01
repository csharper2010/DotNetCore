interface QueryFeldBase {
    feldKey: string,
    feldName: string,
}

export interface StringQueryFeld extends QueryFeldBase {
    kind: 'string',
}

export interface DatumQueryFeld extends QueryFeldBase {
    kind: 'datum',
}

export type QueryFeld = StringQueryFeld | DatumQueryFeld;