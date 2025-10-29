export type Tag = "server" | "database" | "redis";
export type None = undefined | null;
type DatabaseError = Error | None;
export type DatabaseResponse = [any, DatabaseError];
