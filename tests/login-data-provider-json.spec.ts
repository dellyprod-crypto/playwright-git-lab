import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'test-data', 'login.json'), 'utf-8')
);

test('login with data from JSON', async ({ page }) => {
  await page.goto(data.baseUrl);
  await page.locator('[data-test="username"]').fill(data.validUser.username);
  await page.locator('[data-test="password"]').fill(data.validUser.password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});