import { Result } from "typescript-result";
import { uuidv7 } from "uuidv7";
export class InvalidUUID extends Error {
    type = 'invalid-uuid';
}
;
const uuidv7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function isUUIDv7(value) {
    return uuidv7Regex.test(value);
}
export function toUUIDv7(value) {
    if (!isUUIDv7(value))
        return Result.error(new InvalidUUID());
    return Result.ok(value.toLowerCase());
}
export function newUUIDv7() {
    return uuidv7();
}
