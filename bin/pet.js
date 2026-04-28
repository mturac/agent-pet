#!/usr/bin/env node
const chalk = require('chalk');
const pets = ['🐕', '🐈', '🦊', '🐰', '🐼'];
const pet = pets[Math.floor(Math.random() * pets.length)];
const levels = ['Level 1 - Baby', 'Level 5 - Teen', 'Level 10 - Adult', 'Level 50 - Legend'];
const level = levels[Math.floor(Math.random() * levels.length)];
console.log('\n' + chalk.cyan('🐾 AGENT PET'));
console.log(chalk.yellow('  ╔════════════════════╗'));
console.log(chalk.yellow('  ║ ') + pet + chalk.white(' Your coding pet') + chalk.yellow('  ║'));
console.log(chalk.yellow('  ║ ') + chalk.white(level) + chalk.yellow('           ║'));
console.log(chalk.yellow('  ║ ') + chalk.gray('Commit attıkça büyür!') + chalk.yellow('  ║'));
console.log(chalk.yellow('  ╚════════════════════╝\n'));
