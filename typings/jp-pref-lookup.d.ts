export interface LookupOptions {
    ll?: string;
    lat?: number;
    lng?: number;
    mesh?: string;
}
export declare module Pref {
    function all(): Array<string>;
    function code(name: string): string;
    function name(code: string | number): string;
    function lookup(options?: LookupOptions): string[] | undefined;
}
