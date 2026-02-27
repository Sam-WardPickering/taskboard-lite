export function todayISO() {
    return new Date().toISOString().split('T')[0];
}