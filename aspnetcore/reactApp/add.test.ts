import { Test, TestCase, Expect } from 'alsatian';
import add from "./add";

export class AddTests {
    @Test()
    public shouldNotThrowError() {
        Expect(() => add(1, 2)).not.toThrow();
    }
    @TestCase(1, 2, 3)
    public shouldAdd(a: number, b: number, r: number) {
        Expect(add(a, b)).toEqual(r);
    }
}