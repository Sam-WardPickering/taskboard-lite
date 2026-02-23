import { test as base, expect } from '@playwright/test';

const STORAGE_KEYS = [
    'tbl_session',
    'tbl_tasks',
    'tbl_order',
    'tbl_theme',
    'tbl_net_delay_ms',
];

/**
 * Base test that enforces deterministic localStorage state for every test.
 * All specs must import { test, expect } from this file (not @playwright/test).
 */
export const test = base.extend({
    page: async ({ page }, use) => {
        // Runs before any page scripts execute.
        await page.addInitScript(({ keys }) => {
            for (const k of keys) localStorage.removeItem(k);
            // Force deterministic performance (disable artificial latency).
            localStorage.setItem('tbl_net_delay_ms', '0');
        }, { keys: STORAGE_KEYS });

        await use(page);
    },
});

export { expect };
export { STORAGE_KEYS };