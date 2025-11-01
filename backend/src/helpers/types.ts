type DatabaseError = Error | None;

export interface PreRegisterInfo {
  name: string;
  email: string;
  hashedPassword: string;
}

export type Tag = "server" | "database" | "redis";
export type None = undefined | null;
export type DatabaseResponse = [any, DatabaseError];
export type RedisValue = string | number | null;
