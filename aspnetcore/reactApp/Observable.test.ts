import { AsyncTest, Test, TestCase, Expect } from 'alsatian';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/startWith';

export class ObservableTests {
    @AsyncTest()
    public testSubjectStartwith() {
        let action$ = new Subject<boolean>();
        let store$ = action$.scan((acc, v) => v).startWith(false);

        return new Promise((resolve, reject) => {
            store$.subscribe(next => {
                Expect(next).toBe(false);
                resolve();
            })
        });
    }

    @AsyncTest()
    public testSubjectPurePromise() {
        let action$ = new Subject<boolean>();

        let promise = new Promise((resolve, reject) => {
            action$.subscribe(next => {
                Expect(next).toBe(true);
                resolve();
            });
        });

        action$.next(true);

        return promise;
    }

    @Test()
    public testSubjectPure() {
        let action$ = new Subject<boolean>();

        let wasCalled = false;
        action$.subscribe(next => {
            Expect(next).toBe(true);
            wasCalled = true;
        });

        action$.next(true);
        Expect(wasCalled).toBe(true);
    }

    @Test()
    public testSubject() {
        let lastValue = -1;
        const action$ = new Subject<boolean>();
        const store$ = action$.scan((acc: number, v: boolean) => {
            if (v) {
                acc++;
            }
            return acc;
        }, 0).startWith(0).subscribe(value => {
            lastValue = value;
        });
        Expect(lastValue).toBe(0);
        action$.next(true);
        Expect(lastValue).toBe(1);
        action$.next(false);
        Expect(lastValue).toBe(1);
        action$.next(true);
        Expect(lastValue).toBe(2);
    }

    @AsyncTest()
    public testSubjectWithPromiseResolve() {
        let lastValue = -1;
        let wasCalled = false;
        const action$ = new Subject<boolean | Promise<boolean>>();
        const store$ = action$.scan((acc: number, v: boolean | Promise<boolean>) => {
            if (v === true || v === false) {
                if (v) {
                    acc++;
                }
            } else {
                v.then(result => {
                    wasCalled = true;
                    action$.next(result)
                });
            }
            return acc;
        }, 0).startWith(0).subscribe(value => {
            lastValue = value;
        })
        Expect(lastValue).toBe(0);
        action$.next(true);
        Expect(wasCalled).toBe(false);
        Expect(lastValue).toBe(1);
        action$.next(Promise.resolve(true));
        return Promise.resolve().then(() => {
            Expect(wasCalled).toBe(true);
            Expect(lastValue).toBe(2);
        });
    }
}