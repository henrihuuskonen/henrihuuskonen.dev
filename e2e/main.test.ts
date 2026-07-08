import {test, expect, Page} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const terminal = (page: Page) =>
    page.getByRole('region', {name: 'Interactive terminal introduction'})

const seo = (page: Page) =>
    page.getByRole('region', {name: /Henri Huuskonen, Senior/})

// Click through the gated intro until the contact links are on screen.
async function revealAll(page: Page) {
    const link = terminal(page).getByRole('link', {name: /LinkedIn/})
    for (let i = 0; i < 20 && !(await link.isVisible()); i++) {
        await page.keyboard.press('Enter')
        await page.waitForTimeout(500)
    }
    await link.waitFor()
}

test('has the right title', async ({page}) => {
    await page.goto(BASE_URL)
    await expect(page).toHaveTitle(/Henri Huuskonen - Software Engineer/)
})

test('serves crawlable content without interaction', async ({page}) => {
    await page.goto(BASE_URL)
    const block = seo(page)
    // A single h1 with name + role, plus bio, skills and links all present in
    // the DOM before any interaction (for search engines and screen readers).
    await expect(page.getByRole('heading', {level: 1})).toContainText('Henri Huuskonen')
    await expect(block.getByText(/knack for optimizing business operations/)).toBeAttached()
    await expect(block.getByText('typescript', {exact: true})).toBeAttached()
    await expect(block.getByRole('link', {name: /GitHub/})).toHaveAttribute(
        'href',
        /github\.com\/henrihuuskonen/,
    )
})

test('gates content behind interaction', async ({page}) => {
    await page.goto(BASE_URL)
    const t = terminal(page)
    await expect(t.getByText('press enter or click to continue')).toBeVisible()
    // The next section has not been revealed in the terminal yet.
    await expect(t.getByText('cat about.md')).toHaveCount(0)
})

test('reveals the next message on interaction', async ({page}) => {
    await page.goto(BASE_URL)
    const t = terminal(page)
    await t.getByText('press enter or click to continue').waitFor()
    await page.keyboard.press('Enter')
    await expect(t.getByText('cat about.md')).toBeVisible()
})

test('runs commands in the interactive shell', async ({page}) => {
    await page.goto(BASE_URL)
    await revealAll(page)

    const input = page.getByRole('textbox', {name: 'Terminal command input'})

    await input.fill('help')
    await input.press('Enter')
    await expect(page.getByText('show this list')).toBeVisible()

    await input.fill('nope')
    await input.press('Enter')
    await expect(page.getByText('command not found: nope')).toBeVisible()

    await input.fill('clear')
    await input.press('Enter')
    await expect(page.getByText('command not found: nope')).toHaveCount(0)
})

test('regression test', {tag: '@ci'}, async ({page}) => {
    test.skip(!process.env.CI, 'Skipping this test if not in CI')

    await page.goto(BASE_URL)
    await revealAll(page)

    await expect(page).toHaveScreenshot('frontpage.png', {fullPage: true, animations: 'disabled'})
})

test('has no accessibility violations at load', async ({page}) => {
    await page.goto(BASE_URL)
    const results = await new AxeBuilder({page}).analyze()
    expect(results.violations).toEqual([])
})

test('has no accessibility violations once fully revealed', async ({page}) => {
    await page.goto(BASE_URL)
    await revealAll(page)
    await page.waitForTimeout(500)
    const results = await new AxeBuilder({page}).analyze()
    expect(results.violations).toEqual([])
})
