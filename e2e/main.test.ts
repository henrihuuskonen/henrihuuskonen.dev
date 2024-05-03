import {test, expect} from '@playwright/test';

test('verify title', async ({ page }) => {

    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Henri Huuskonen - Software Engineer/);

});