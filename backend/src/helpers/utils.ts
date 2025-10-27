import { Tag, None } from "./types.js";

export function timeNow(): string {
  return new Date().toTimeString().split(" ")[0]!;
}

export function customLog(tag: Tag, text: string | None): void {
  console.log(`(${timeNow()}) [${tag.toUpperCase()}] ${text}`);
}
