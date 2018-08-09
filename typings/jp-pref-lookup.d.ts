export declare module Pref {
    function all(): Array<string>;
    function code(name: string): string;
    function name(code: any): string;
    function lookup(options: {
        ll?: string;
        lat?: number;
        lng?: number;
        mesh?: string;
    }): string[];
}
