import { AsyncTest, Test, TestCase, Expect } from 'alsatian';

import { createStore, createLoadQueryFelderAction, createQueryFelderLoadedAction } from './KundeSucheStore';
import { Loading } from './KundeSucheState';
import { KundeQueryFeldRepository } from './KundeSucheServices';
import { DatumQueryFeld, StringQueryFeld, QueryFeld } from './QueryFeld';

class KundeQueryFeldRepositoryMock implements KundeQueryFeldRepository {
    promises: ((result: QueryFeld[]) => void)[] = [];

    getQueryFelder(): Promise<QueryFeld[]> {
        const newPromise = new Promise<QueryFeld[]>(resolve => {
            this.promises.push(qf => resolve(qf));
        });
        return newPromise;
    }
}

export class KundeSucheStoreTests {
    @Test()
    public testBeforeLoadQueryFelder() {
        let getQueryFelderCalled = false;
        const store = createStore({
            getQueryFelder() {
                getQueryFelderCalled = true;
                return new Promise<QueryFeld[]>(resolve => {})
            },
        });

        Expect(getQueryFelderCalled).toBe(true);

        let wasCalled = false;
        store.store$.subscribe(state => {
            wasCalled = true;
            Expect(state.queryFelder.kind).toBe('loading');
        });
        Expect(wasCalled).toBe(true);
    }

    @AsyncTest()
    public testLoadQueryFelder() {
        const felder = [
            { kind: 'string', feldKey: 'name', feldName: 'Name' },
            { kind: 'string', feldKey: 'vorname', feldName: 'Vorname' },
            { kind: 'datum', feldKey: 'geburtsdatum', feldName: 'Geburtsdatum' },
        ];

        let getQueryFelderCalled = false;
        const store = createStore({
            getQueryFelder() {
                getQueryFelderCalled = true;
                return Promise.resolve(felder);
            },
        });

        Expect(getQueryFelderCalled).toBe(true);

        let wasCalled = false;
        let result;
        store.store$.subscribe(state => {
            wasCalled = true;
            result = state.queryFelder;
        });
        Expect(wasCalled).toBe(true);
        return Promise.resolve().then(() => {
            Expect(result).toEqual(felder);
        });
    }

    @AsyncTest()
    public async testLoadQueryFelderFromJson() {
        const felder = `[
            {"kind":"string","feldKey":"name","feldName":"Name"},
            {"kind":"string","feldKey":"vorname","feldName":"Vorname"},
            {"kind":"datum","feldKey":"geburtsdatum","feldName":"Geburtsdatum"}]`;

        let getQueryFelderCalled = false;
        const store = createStore({
            getQueryFelder() {
                getQueryFelderCalled = true;
                return Promise.resolve(JSON.parse(felder));
            },
        });

        Expect(getQueryFelderCalled).toBe(true);

        let wasCalled = false;
        let result;
        store.store$.subscribe(state => {
            wasCalled = true;
            result = state.queryFelder;
        });
        Expect(wasCalled).toBe(true);
        await Promise.resolve();

        Expect(result).toEqual([
            { kind: 'string', feldKey: 'name', feldName: 'Name' },
            { kind: 'string', feldKey: 'vorname', feldName: 'Vorname' },
            { kind: 'datum', feldKey: 'geburtsdatum', feldName: 'Geburtsdatum' },
        ]);
    }
    // @TestCase(1, 2, 3)
    // @TestCase(0, 0, 0)
    // @TestCase(2, -3, -1)
    // public shouldAdd(a: number, b: number, r: number) {
    //     Expect(add(a, b)).toEqual(r);
    // }
}