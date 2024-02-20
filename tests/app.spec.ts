import { test, expect } from '@playwright/test';

test.describe('Tour of Heroes pages', () => {
  test('should load default route', async ({page}) => {
    await page.goto('http://localhost:4200');

    await expect(page).toHaveURL(/\/$/);
  });

  test('should rended characters list', async ({page}) => {
    await page.goto('http://localhost:4200');

    await expect(page.getByText('Rick Sanchez')).toBeVisible();
    await expect(page.getByText('Morty Smith')).toBeVisible();
    await expect(page.getByText('Summer Smith')).toBeVisible();
  });

  test('click on pencil button should navigate to edit page', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.click('text=Edit');
    await expect(page).toHaveURL(/\/edit\/\d+$/);
  });

  test('click on create button should navigate to create page', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.click('text=Add');
    await expect(page).toHaveURL(/\/create$/);
  });

  test('edit character information should change it', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.click('text=Edit');
    await page.fill('input[name="name"]', 'Rick Sanchez 2');
    await page.click('text=Update');
    await expect(page.getByText('Rick Sanchez 2')).toBeVisible();
  });

  test('create character should create it and add it to the character list', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.click('text=Add');
    await page.fill('input[name="name"]', 'New Character');
    await page.fill('input[name="image"]', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Golden_Retriever_9-year_old.jpg');
    await page.fill('input[name="location"]', 'New Location');
    await page.click('text=Create');

    await expect(page.getByText('New Character')).toBeVisible();
  });
});