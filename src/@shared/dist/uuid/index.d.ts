import { Result } from "typescript-result";
export declare class InvalidUUID extends Error {
    readonly type = "invalid-uuid";
}
export type UUIDv7 = string & {
    readonly __brand: unique symbol;
};
export declare function isUUIDv7(value: string): value is UUIDv7;
export declare function toUUIDv7(value: string): Result<UUIDv7, InvalidUUID>;
export declare function newUUIDv7(): UUIDv7;
