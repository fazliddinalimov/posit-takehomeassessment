import { Page } from '@playwright/test';
import BasePage from './base.page';
import random from 'random-number';


class DashboardPage extends BasePage {
    private navigationSideBarButton = 'button[title="Open Navigation Sidebar"]';
    private newSpaceButton = 'button:has-text("New Space")';
    private newProjectButton = 'button[title="New Project"]';
    private newSpaceNameInput = '#name';
    private createSpaceButton = 'button[type="submit"]:has-text("Create")';



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
    }

    async createNewProject(projectType: ProjectType = ProjectType.newRStudioProject) {
        await this.clickNewProject();
        await this.selectProjectType(projectType);
    }
}

export default DashboardPage;


export enum ProjectType {
    newRStudioProject = 'button[title="New RStudio Project"]',
    newJupitarProject = 'button[title="New Jupyter Project"]',
    newProjectFromTemplate = 'button[title="New Project from Template"]',
    newProjectFromGitReposigtory = 'button[title="New Project from Git Repository"]',
}