const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Square, Circle } = require("./lib/shape");

function createLogo(fileName, answers) {
    let svgCode = '';
  
    svgCode += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">';
  
    svgCode += '<g>';
  
    let selectedShape;
  
    if (answers.shape === 'Triangle') {
      selectedShape = new Triangle();
      svgCode += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === 'Square') {
      selectedShape = new Square();
      svgCode += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
      selectedShape = new Circle();
      svgCode += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }
  
    svgCode += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text></g></svg>`;

    fs.writeFile(fileName, svgCode, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Generated logo.svg');
      }
    });
  }

function logoPrompt() {
    inquirer
    .prompt([
 
      {
        type: "input",
        message:
          "Enter the text you'd like in your logo! (1-3 characters)",
        name: "text",
      },
      {
        type: "list",
        message: "Choose your logo shape! (arrow key up or down, the press enter)",
        choices: ["Circle", "Square", "Triangle"],
        name: "shape",
      },  
      {
        type: "input",
        message:
          "Choose the color of your TEXT! (Hex code or Color name)",
        name: "textColor",
      },
      {
        type: "input",
        message:
          "Choose the color of your SHAPE! (Hex code or Color name)",
        name: "shapeBackgroundColor",
      },
    ])
    .then((answers) => {
     
      if (answers.text.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        logoPrompt();
      } else {
   
        createLogo("logo.svg", answers);
      }
    });
}
logoPrompt();