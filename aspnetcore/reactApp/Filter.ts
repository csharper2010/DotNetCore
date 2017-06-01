export interface KeineEinschränkung {
    kind: 'noRestriction';
}

export interface StringFilter {
    kind: 'string';
    pattern: string;
}

export interface RangeFilter<T> {
    kind: 'range';
    von: T;
    bis: T;
}

export interface VonFilter<T> {
    kind: 'von';
    von: T;
}

export interface BisFilter<T> {
    kind: 'bis';
    bis: T;
}
