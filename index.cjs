const fs = require("fs");
const path = require('path');
const { prompt } = require('inquirer');
const generateMarkdown = require("./starter/utils/generateMarkdown");

// array of questions for user
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

// function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(fileName, data);
}

// function to initialize program
function init() {
    prompt(questions)
        .then((answers) => {
            const readmeContent = generateMarkdown(answers);
            const outputPath = path.join(process.cwd(), 'README.md');
            writeToFile(outputPath, readmeContent);
            console.log(`README generated at ${outputPath}`);
        })
        .catch((error) => console.error('Error:', error));
}


// function call to initialize program
init();