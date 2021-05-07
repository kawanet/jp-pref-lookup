/**
 * jp-pref-lookup
 *
 * @see https://github.com/kawanet/jp-pref-lookup
 */

export interface LookupOptions {
    /// latitude,longitude
    ll?: string,

    /// latitude
    lat?: number,

    /// longitude
    lng?: number,

    /// mesh code
    mesh?: string,
}

export declare module Pref {
    function all(): string[];

    function code(name: string): string | undefined;

    function name(code: string | number): string | undefined;

    function lookup(options?: LookupOptions): string[];
}
