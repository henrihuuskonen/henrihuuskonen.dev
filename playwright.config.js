import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './e2e',
    snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{projectName}/{arg}{ext}',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry - retry in CI to catch flaky builds */
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : 4,
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://127.0.0.1:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        launchOptions: {
            slowMo: 200,
        },
    },
    /* Timeout for single tests, 1 minute */
    timeout: 1 * 60 * 1000,
    /* Timeout for the whole test suite, 15 minutes */
    globalTimeout: 15 * 60 * 1000,
    reporter: 'html',

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        /* Test against mobile viewports. */
        {
            name: 'Mobile Chrome',
            use: { ...devices['iPhone 12'] },
        },
    ],

    webServer: {
        command: process.env.GITHUB_ACTIONS ? 'npm run start' : 'npm run dev',
        url: 'http://127.0.0.1:3000',
        /*
        If true, it will re-use an existing server on the port or url when available.
        If no server is running on that port or url, it will run the command to start a new server.

        Explicitly set to false for GitHub actions.
        */
        reuseExistingServer: !process.env.GITHUB_ACTIONS,
        stdout: 'ignore',
        stderr: 'pipe',
    },
})
