const fs = require('fs').promises;
const path = require('path');
const inquirer = require('inquirer');
const generateMarkdown = require('./starter/utils/generateMarkdown');

// Array of questions for user
const questions = [{
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a short description of your project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How do you install your project?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use your project?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'Other'],
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can others contribute to your project?',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'How do you run tests for your project?',
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    },
];

// Function to write README file
async function writeToFile(fileName, data) {
    try {
        await fs.writeFile(fileName, data);
        console.log(`README generated at ${fileName}`);
    } catch (error) {
        console.error('Error writing README file:', error);
    }
}

// Function to initialize program
function init() {
    inquirer
        .prompt(questions)
        .then(async(answers) => {
            const readmeContent = generateMarkdown(answers);
            const outputPath = path.join(process.cwd(), 'README.md');
            await writeToFile(outputPath, readmeContent);
        })
        .catch((error) => {
            console.error('Error:', error);
            process.exit(1);
        });
}

// Function call to initialize program
init();