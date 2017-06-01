import { Test, TestCase, Expect } from 'alsatian';

export class PromiseTests {
    @Test()
    public testPromise() {
        let wasCalled = false;
        let wasResolved = false;
        let action: (boolean) => void;
        const newPromise = new Promise<boolean>(resolve => {
            wasCalled = true;
            action = v => {
                resolve(v);
                wasResolved = true;
            }
        })
        Expect(wasCalled).toBe(true);
        Expect(wasResolved).toBe(false);
        action(true);
        Expect(wasResolved).toBe(true);
    }
}