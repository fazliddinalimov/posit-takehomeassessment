import { Page } from "@playwright/test";
import BasePage from "./base.page";

class IdePage extends BasePage {
    ideIframe = 'iframe#contentIFrame';
    fileButton = '#rstudio_label_file_menu';

    constructor(page: Page) {
        super(page);
    }


    async waitForProjectToDeploy() {
        await this.page.getByText("Creating Project").waitFor({ state: 'visible', timeout: 30000 });
        await this.page.getByText("Creating Project").waitFor({ state: 'hidden', timeout: 30000 });
        await this.page.getByText("Deploying Project").waitFor({ state: 'visible', timeout: 30000 });
        await this.page.getByText("Deploying Project").waitFor({ state: 'hidden', timeout: 30000 });
        await (await this.getIframe()).locator(this.fileButton).waitFor({ state: 'attached', timeout: 100000 });
    }

    async getIframe() {
        return this.page.frameLocator(this.ideIframe);
    }

}

export default IdePage;