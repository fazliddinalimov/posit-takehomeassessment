# Posit Cloud Playwright Test
This repository contains an automated test for Posit Cloud using Playwright, a framework for end-to-end testing of web applications.

## Prerequisites

Ensure you have the following installed:

1. Node.js (LTS version recommended)

2. npm (comes with Node.js) or Yarn

## Installation

Clone the repository: `git clone https://github.com/fazliddinalimov/posit-takehomeassessment.git`

Install dependencies: `npm install`

## Environment Configuration

This project requires user credentials to be stored securely in a .env file. Please follow the steps below to set up your environment:

1. Create a `.env` File

If not already present, create a .env file in the root directory of the project.

2. Add Your Credentials

Open the `.env` file and add the required credentials in the following format:

USERNAME=your_username
PASSWORD=your_password

Note: Replace `your_username` and `your_password` with your valid credentials.


## Running Tests

After installing the project and setting the environment variables, please run `npx playwright test`
