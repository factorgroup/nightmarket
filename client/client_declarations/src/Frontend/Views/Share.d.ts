import { ReactNode } from 'react';
import ReaderDataStore from '../../Backend/Storage/ReaderDataStore';
export interface ShareProps<T> {
    load: (store: ReaderDataStore) => Promise<T>;
    children: (state: T | undefined, loading: boolean, error: Error | undefined) => ReactNode;
}
/**
 * Helper component that allows you to load data from the contract, as if it was
 * viewed from a particular account. Allows you to switch accounts. Just pass in:
 *
 * 1) a function that loads the data you want, given a [[ReaderDataStore]]
 * 2) a function that renders the given data with React
 *
 * ... and this component will take care of loading what you want.
 */
export declare function Share<T>(props: ShareProps<T>): JSX.Element;
