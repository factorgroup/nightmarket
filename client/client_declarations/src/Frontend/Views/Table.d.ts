import React from 'react';
/**
 * React api for creating tables.
 * @param rows - rows of an arbitrary type
 * @param headers - required (for now) array of strings that head each column
 * @param columns - functions, one per column, that convert a row into the react representation of
 * that row's column's value.
 * @param alignments - optional, one per column, specifies that the text-alignment in that cell is
 * either right, center, or left, represented by the characters 'r', 'c', and 'l'
 */
export declare function Table<T>({ rows, headers, columns, alignments, headerStyle, paginated, }: {
    rows: T[];
    headers: React.ReactNode[];
    columns: Array<(t: T, i: number) => React.ReactNode>;
    alignments?: Array<'r' | 'c' | 'l'>;
    headerStyle?: React.CSSProperties;
    paginated?: boolean;
}): JSX.Element;
