import { randomUUID } from "node:crypto";

export function uniqueTitle(prefix = 'Task') {
    return `${prefix} ${randomUUID().slice(0, 8)}`;
};