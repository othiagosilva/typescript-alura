import { Printable } from "./printable.js";

export function print(...objs: Printable[]) {
    for (let obj of objs) {
        console.log(obj.toText());
    }
}