import { Tag } from "./types.js";

export function customLog(tag: Tag, text: string): void {
  console.log(`[${tag.toUpperCase()}] ${text}`);
}
