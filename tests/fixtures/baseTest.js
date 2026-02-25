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
        await page.addInitScript(({ keys }) => {
            // This script runs on every document load (goto/reload).
            // Use sessionStorage as a per-tab flag so we only reset once, 
            // This allows tests to verify persistence across reloads.
            const flag = '__tbl_pw_storage_reset_done__';

            if (sessionStorage.getItem(flag) === '1') return;

            for (const k of keys) localStorage.removeItem(k);

            // Force deterministic performance (disable artificial latency).
            localStorage.setItem('tbl_net_delay_ms', '0');

            sessionStorage.setItem(flag, '1');
        }, { keys: STORAGE_KEYS });

        await use(page);
    },
});

export { expect };
export { STORAGE_KEYS };