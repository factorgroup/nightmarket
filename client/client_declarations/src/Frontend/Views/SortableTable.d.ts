import React from 'react';
export declare function SortableTable<T>({ rows, headers, columns, sortFunctions, alignments, paginated, }: {
    rows: T[];
    headers: React.ReactNode[];
    columns: Array<(t: T, i: number) => React.ReactNode>;
    sortFunctions: Array<(left: T, right: T) => number>;
    alignments?: Array<'r' | 'c' | 'l'>;
    paginated?: boolean;
}): JSX.Element;
