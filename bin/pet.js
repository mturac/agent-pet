#!/usr/bin/env node

const { PixelPet } = require('../src/pet-ascii.js');
const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pet = new PixelPet('Clawdy');

function showMenu() {
  pet.render();
  
  rl.question('What would you like to do? (feed/play/code/sleep/status/quit): ', (answer) => {
    const command = answer.trim().toLowerCase();
    
    switch(command) {
      case 'feed':
      case 'f':
        pet.feed();
        break;
      case 'play':
      case 'p':
        pet.play();
        break;
      case 'code':
      case 'c':
        pet.code(1);
        break;
      case 'sleep':
      case 's':
        pet.sleep();
        break;
      case 'status':
      case 'st':
        // Just re-render
        break;
      case 'quit':
      case 'q':
      case 'exit':
        console.log(chalk.cyan(`\n  👋 Goodbye! Take care of ${pet.name}!\n`));
        rl.close();
        return;
      default:
        console.log(chalk.gray('\n  Unknown command. Try: feed, play, code, sleep, status, quit'));
    }
    
    pet.tick();
    setTimeout(showMenu, 1000);
  });
}

console.clear();
console.log(chalk.cyan('\n  🐣 Welcome to AGENT PET!'));
console.log(chalk.gray('  Your coding companion that grows with you.\n'));
console.log(chalk.yellow('  Keep coding to evolve your pet!'));
console.log(chalk.gray('  Feed, play, and take care of your pet.\n'));

setTimeout(showMenu, 2000);
