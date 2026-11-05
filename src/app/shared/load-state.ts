import { Observable, catchError, map, of, startWith } from 'rxjs';

export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'loaded'; data: T }
  | { status: 'error'; message: string };

export function withLoadState<T>(source: Observable<T>): Observable<LoadState<T>> {
  return source.pipe(
    map((data): LoadState<T> => ({ status: 'loaded', data })),
    startWith<LoadState<T>>({ status: 'loading' }),
    catchError((err: Error) => of<LoadState<T>>({ status: 'error', message: err.message })),
  );
}