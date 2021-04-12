const fs = require("fs/promises");
const path = require("path");

const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const template = require("./src/page-template");

const managerPrompt = [
  {
    type: "input",
    name: "name",
    message: "What is the team manager's name?",
  },

  {
    type: "input",
    name: "id",
    message: "What is the team manager's id?",
  },

  {
    type: "input",
    name: "email",
    message: "What is the team manager's email?",
  },

  {
    type: "input",
    name: "officeNumber",
    message: "What is the team manager's office number?",
  },
];

const teamPrompt = [
  {
    type: "list",
    name: "role",
    message: "Which type of team member would you like to add?",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add any more team members",
    ],
    default: "(Use arrow keys)",
  },
];

const engineerPrompt = [
  {
    type: "input",
    name: "name",
    message: "What is your engineer's name?",
  },

  {
    type: "input",
    name: "id",
    message: "What is your engineer's id?",
  },

  {
    type: "input",
    name: "email",
    message: "What is your engineer's email?",
  },

  {
    type: "input",
    name: "githubUsername",
    message: "What is your engineer's Github username?",
  },
];

const internPrompt = [
  {
    type: "input",
    name: "name",
    message: "What is your intern's name?",
  },

  {
    type: "input",
    name: "id",
    message: "What is your intern's id?",
  },

  {
    type: "input",
    name: "email",
    message: "What is your intern's email?",
  },

  {
    type: "input",
    name: "school",
    message: "What is your intern's school?",
  },
];

async function isExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function writeFile(filePath, data) {
  try {
    const dirname = path.dirname(filePath);
    const exist = await isExists(dirname);
    if (!exist) {
      await fs.mkdir(dirname, { recursive: true });
    }

    await fs.writeFile(filePath, data, "utf8");
  } catch (err) {
    throw new Error(err);
  }
}

const employees = [];

const main = async () => {
  const data = await inquirer.prompt(managerPrompt);
  employees.push(
    new Manager(data.name, data.id, data.email, data.officeNumber)
  );
  while (true) {
    const answer = await inquirer.prompt(teamPrompt);

    switch (answer.role) {
      case "Engineer": {
        const data = await inquirer.prompt(engineerPrompt);
        employees.push(
          new Engineer(data.name, data.id, data.email, data.githubUsername)
        );
        break;
      }
      case "Intern": {
        const data = await inquirer.prompt(internPrompt);
        employees.push(new Intern(data.name, data.id, data.email, data.school));
        break;
      }

      case "I don't want to add any more team members": {
        const html = template(employees);
        await writeFile("output/team.html", html);
        process.exit(1);
      }
    }
  }
};

main();
