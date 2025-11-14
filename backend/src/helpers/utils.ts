import { Tag, None, ResObj } from "./types.js";

export function timeNow(): string {
  return new Date().toTimeString().split(" ")[0]!;
}

export function customLog(tag: Tag, text: string | None): void {
  console.log(`(${timeNow()}) [${tag.toUpperCase()}] ${text}`);
}

export function generateOtp(length = 5): string {
  const chars = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randChar = chars[Math.floor(Math.random() * chars.length)];
    result = `${result}${randChar}`;
  }

  return result;
}

export function makeResObj(message: string, data: Object = {}): ResObj {
  return { message, data };
}

export function isNone(value: any): value is None {
  return value === null || value === undefined;
}
