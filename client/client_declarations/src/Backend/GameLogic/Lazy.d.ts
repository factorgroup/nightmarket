export declare class Lazy<T> {
    private getPromise;
    private promise;
    constructor(getPromise: () => Promise<T>);
    get(): Promise<T>;
}
export declare function lazy<T>(getPromise: () => Promise<T>): Lazy<T>;
