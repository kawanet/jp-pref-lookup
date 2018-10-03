export interface LookupOptions {
    ll?: string;
    lat?: number;
    lng?: number;
    mesh?: string;
}
export declare module Pref {
    function all(): Array<string>;
    function code(name: string): string | undefined;
    function name(code: string | number): string | undefined;
    function lookup(options?: LookupOptions): string[];
}
