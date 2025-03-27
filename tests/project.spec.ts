import { test, expect } from '@playwright/test';
import LoginPage from '../pageObjects/login.page';
import DashboardPage from '../pageObjects/dashboard.page';
import IdePage from '../pageObjects/ide.page';


test('Create a new RStudio Project', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const idePage = new IdePage(page);

  await loginPage.login();
  
  await dashboardPage.createNewSpace();

  await dashboardPage.createNewProject();

  const iframe = await idePage.getIframe();
  
  expect(iframe.locator(idePage.fileButton)).toBeVisible();
});

