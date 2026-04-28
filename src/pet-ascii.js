// Pixel Art Pets for Terminal Display
const chalk = require('chalk');

const PETS = {
  egg: {
    name: "Egg",
    stage: 0,
    art: [
      chalk.gray('    ████    '),
      chalk.gray('  ██░░░░██  '),
      chalk.gray(' ██░░░░░░██ '),
      chalk.gray(' ██░░░░░░██ '),
      chalk.gray('  ██░░░░██  '),
      chalk.gray('    ████    '),
    ]
  },
  baby: {
    name: "Baby Bot",
    stage: 1,
    art: [
      chalk.cyan('    🤖     '),
      chalk.cyan('   ████   '),
      chalk.cyan('  █░👀░█  '),
      chalk.cyan('  █░░░░█  '),
      chalk.cyan('   ████   '),
      chalk.cyan('   ▼▼▼▼   '),
    ]
  },
  teen: {
    name: "Teen Coder",
    stage: 2,
    art: [
      chalk.yellow('   💻     '),
      chalk.yellow('  ██████  '),
      chalk.yellow(' █░😎░█ '),
      chalk.yellow(' █░👕░█ '),
      chalk.yellow('  ████  '),
      chalk.yellow('  ▼▼▼▼  '),
    ]
  },
  adult: {
    name: "Senior Dev",
    stage: 3,
    art: [
      chalk.green('  🦖    '),
      chalk.green(' ████████ '),
      chalk.green('█░🤓░░🤓░█'),
      chalk.green('█░░👔░░👔░█'),
      chalk.green(' ██░░░░██ '),
      chalk.green('  ▼▼▼▼▼▼  '),
    ]
  },
  legend: {
    name: "10x Legend",
    stage: 4,
    art: [
      chalk.magenta(' 🔥👑🔥  '),
      chalk.magenta('██████████'),
      chalk.magenta('█░✨👑✨░█'),
      chalk.magenta('█░🦄░░🦄░█'),
      chalk.magenta(' ██░░░░██ '),
      chalk.magenta('  ▼▼▼▼▼▼  '),
    ]
  }
};

class PixelPet {
  constructor(name = 'Clawdy') {
    this.name = name;
    this.stage = 0;
    this.xp = 0;
    this.hunger = 50;
    this.happiness = 50;
    this.energy = 100;
    this.birthTime = Date.now();
    this.lastFed = Date.now();
    this.commits = 0;
    this.level = 1;
  }

  get currentPet() {
    const stages = ['egg', 'baby', 'teen', 'adult', 'legend'];
    return PETS[stages[this.stage]] || PETS.egg;
  }

  render() {
    const pet = this.currentPet;
    const boxWidth = 40;
    
    console.clear();
    console.log('\n');
    
    // Pixel Art
    pet.art.forEach(line => {
      console.log('  ' + chalk.gray('│') + '  ' + line.padEnd(20) + '  ' + chalk.gray('│'));
    });
    
    // Stats
    console.log('  ' + chalk.gray('├' + '─'.repeat(boxWidth - 2) + '┤'));
    console.log('  ' + chalk.gray('│') + '  ' + chalk.cyan(this.name) + ' - ' + chalk.yellow(pet.name) + ' '.repeat(boxWidth - 10 - this.name.length - pet.name.length) + chalk.gray('│'));
    console.log('  ' + chalk.gray('│') + '  ' + chalk.white(`Level: ${this.level}  XP: ${this.xp}/100`) + ' '.repeat(15) + chalk.gray('│'));
    console.log('  ' + chalk.gray('├' + '─'.repeat(boxWidth - 2) + '┤'));
    
    // Bars
    this.renderBar('Hunger', this.hunger, chalk.red);
    this.renderBar('Happy', this.happiness, chalk.green);
    this.renderBar('Energy', this.energy, chalk.blue);
    
    console.log('  ' + chalk.gray('└' + '─'.repeat(boxWidth - 2) + '┘'));
    console.log('\n  ' + chalk.gray('🍕 feed  🎮 play  💻 code  😴 sleep  📊 status  👋 quit'));
    console.log('');
  }

  renderBar(label, value, color) {
    const filled = Math.floor(value / 10);
    const empty = 10 - filled;
    const bar = color('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
    console.log('  ' + chalk.gray('│') + `  ${label}: ${bar} ${value}%` + ' '.repeat(8) + chalk.gray('│'));
  }

  feed() {
    this.hunger = Math.min(100, this.hunger + 20);
    this.energy = Math.max(0, this.energy - 5);
    this.lastFed = Date.now();
    console.log(chalk.green(`\n  🍕 ${this.name} fed! Yummy code!`));
    this.addXP(5);
  }

  play() {
    this.happiness = Math.min(100, this.happiness + 15);
    this.energy = Math.max(0, this.energy - 10);
    this.hunger = Math.max(0, this.hunger - 10);
    console.log(chalk.yellow(`\n  🎮 ${this.name} had fun!`));
    this.addXP(10);
  }

  code(commits = 1) {
    this.commits += commits;
    this.xp += commits * 10;
    this.energy = Math.max(0, this.energy - commits * 5);
    this.hunger = Math.max(0, this.hunger - commits * 2);
    console.log(chalk.cyan(`\n  💻 ${this.name} is proud of your ${commits} commit(s)!`));
    this.checkEvolution();
  }

  sleep() {
    this.energy = Math.min(100, this.energy + 50);
    this.hunger = Math.max(0, this.hunger - 20);
    console.log(chalk.blue(`\n  😴 ${this.name} is sleeping...`));
    this.addXP(5);
  }

  addXP(amount) {
    this.xp += amount;
    if (this.xp >= 100) {
      this.level++;
      this.xp = 0;
      console.log(chalk.magenta(`\n  ⭐ LEVEL UP! ${this.name} is now level ${this.level}!`));
      this.checkEvolution();
    }
  }

  checkEvolution() {
    const oldStage = this.stage;
    
    if (this.level >= 20 && this.commits >= 100) {
      this.stage = 4; // Legend
    } else if (this.level >= 15 && this.commits >= 50) {
      this.stage = 3; // Adult
    } else if (this.level >= 10 && this.commits >= 20) {
      this.stage = 2; // Teen
    } else if (this.level >= 5 && this.commits >= 5) {
      this.stage = 1; // Baby
    }
    
    if (this.stage > oldStage) {
      const pet = this.currentPet;
      console.log(chalk.magenta('\n  ✨✨✨ EVOLUTION! ✨✨✨'));
      console.log(chalk.yellow(`  ${this.name} evolved into ${pet.name}!`));
      console.log(chalk.cyan('  🎉 Congratulations! 🎉\n'));
    }
  }

  tick() {
    // Decay over time
    const now = Date.now();
    const hoursSinceFed = (now - this.lastFed) / (1000 * 60 * 60);
    
    if (hoursSinceFed > 1) {
      this.hunger = Math.max(0, this.hunger - 5);
      this.happiness = Math.max(0, this.happiness - 3);
      this.lastFed = now;
    }
    
    // Check if pet is sad
    if (this.hunger < 20) {
      console.log(chalk.red(`\n  ⚠️  ${this.name} is hungry! Feed them!`));
    }
    if (this.happiness < 20) {
      console.log(chalk.yellow(`\n  ⚠️  ${this.name} is sad! Play with them!`));
    }
  }
}

module.exports = { PixelPet, PETS };

// Menu Icons (like Tamagotchi)
const MENU_ICONS = {
  food: chalk.yellow('🍕'),
  play: chalk.green('🎮'),
  code: chalk.cyan('💻'),
  sleep: chalk.blue('😴'),
  status: chalk.white('📊'),
  quit: chalk.red('👋')
};

module.exports.MENU_ICONS = MENU_ICONS;
