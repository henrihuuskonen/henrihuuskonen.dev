import {test, expect} from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test('verify title', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Henri Huuskonen - Software Engineer/);
});

test("regression test", async ({ page }) => {
    await page.goto(BASE_URL);

    // Remove the particles.js canvas element from the DOM
    const elementToRemove = await page.$('#tsparticles');
    expect(elementToRemove).not.toBeNull();

    // Check if element exists before attempting to remove it
    if (elementToRemove) {
        // Remove the element from the DOM
        await page.evaluate(element => {
            element.remove();
        }, elementToRemove);
    }

    await expect(page).toHaveScreenshot('frontpage.png', { fullPage: true });
})