import { Page } from '@playwright/test';
import BasePage from './base.page';
import random from 'random-number';
import IdePage from './ide.page';


class DashboardPage extends BasePage {
    private navigationSideBarButton = 'button[title="Open Navigation Sidebar"]';
    private newSpaceButton = 'button:has-text("New Space")';
    private newProjectButton = 'button[title="New Project"]';
    private newSpaceNameInput = '#name';
    private createSpaceButton = 'button[type="submit"]:has-text("Create")';
    private maxSpaceErrorMessage = 'div[class="message"]:has-text("You have reached the maximum number of private spaces in your account.")';
    private closeNewSpaceModal = 'button[aria-label="Close Dialog"]';
    private creatingSpaceMessage = 'span:has-text("Creating Space")';



    constructor(page: Page) {
        super(page);
    }

    // Navigate to the dashboard page
    async openDashboard() {
        await this.open('https://posit.cloud/content/yours');
    }

    // Open menu sidebar
    async openMenuSidebar() {
        await this.page.click(this.navigationSideBarButton);
    }

    // Click "New Space" button
    async clickNewSpace() {
        await this.page.click(this.newSpaceButton);
    }

    // Click "New Project" button
    async clickNewProject() {
        await this.page.click(this.newProjectButton);
    }

    // Select a project type
    async selectProjectType(projcetType: ProjectType = ProjectType.newRStudioProject) {
        await this.page.click(projcetType);
    }

    // Create new space
    async createNewSpace(name = 'FazSpace') {
        if (await this.page.locator(this.newSpaceButton).isVisible({ timeout: 500 })) {
            await this.page.click(this.navigationSideBarButton);
        }
        await this.page.click(this.newSpaceButton);
        await this.page.fill(this.newSpaceNameInput, name);
        await this.page.click(this.createSpaceButton);
        await this.page.locator(this.creatingSpaceMessage).waitFor({state: 'detached'});

        if (await this.page.locator(this.maxSpaceErrorMessage).isVisible()) {
            console.log('Max space amount reached');
            await this.page.click(this.closeNewSpaceModal);
        }
    }
    
    // Create a new project, default project type is RSTUDIO
    async createNewProject(projectType: ProjectType = ProjectType.newRStudioProject) {
        const idePage = new IdePage(this.page);

        await this.clickNewProject();
        await this.selectProjectType(projectType);
        await idePage.waitForProjectToDeploy();
    }
}

export default DashboardPage;


export enum ProjectType {
    newRStudioProject = 'button[title="New RStudio Project"]',
    newJupitarProject = 'button[title="New Jupyter Project"]',
    newProjectFromTemplate = 'button[title="New Project from Template"]',
    newProjectFromGitReposigtory = 'button[title="New Project from Git Repository"]',
}