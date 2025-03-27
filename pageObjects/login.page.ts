import { Page } from '@playwright/test';
import BasePage from './base.page';


class LoginPage extends BasePage {
  private usernameInput = 'input[name="email"]';
  private passwordInput = 'input[name="password"]';
  private submit = 'button[type="submit"]';

  constructor(page: Page) {
    super(page);
  }

  // Navigate to the login page
  async openLoginPage() {
    await this.open('https://login.posit.cloud/login');
  }

  // Enter username
  async enterUsername(username: string) {
    await this.page.fill(this.usernameInput, username);
  }

  // Enter password
  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  // Click continue and login button
  async clickContinueLogin() {
    await this.page.click(this.submit);
  }

  // Perform login with credentials
  async login(username = process.env.USERNAME, password = process.env.PASSWORD) {
    if (!username || !password) {
      throw new Error('Username or Password missing from env');
    }
    await this.openLoginPage();
    await this.enterUsername(username);
    await this.clickContinueLogin();
    await this.enterPassword(password);
    await this.clickContinueLogin();
    
    // modal seems to appear only while running tests, can not reproduce on the browser
    if (await this.page.locator('a:has-text("Posit Cloud")').isVisible()) {
      await this.page.locator('a:has-text("Posit Cloud")').click();
    }
  }
}

export default LoginPage;
