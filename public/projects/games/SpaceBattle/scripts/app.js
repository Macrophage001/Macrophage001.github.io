const shipDiv = document.querySelector('.player-ship');
const alienShipDivs = document.getElementsByClassName('alien-ship');
const alienStats = document.getElementsByClassName('alien-stats');

const playerScore = document.getElementById('player-score');
const playerStats = document.querySelector('.player-stats');

const attackBtn = document.getElementById('attack-btn');
const retreatBtn = document.getElementById('retreat-btn');

const currentTurn = document.getElementById('current-turn');
const actionsDisplay = document.querySelector('.current-actions');
const currentWaveH3 = document.querySelector('#current-wave');

const actionsList = [];

let currentWave = 0;

const playerScoreTemplate = (score) => `USS Assembly: <span>${score}</span>`;
const playerStatsTemplate = (ship) => `<p>Lvl: ${ship.level} - [ ${Math.trunc(ship.currentExp)} / ${Math.trunc(ship.maxExp)} ]</p><p>HP: ${ship.currentHull}/${ship.maxHull}</p><p>FP: ${ship.firepower}</p><p>Acc: ${Math.trunc(ship.accuracy * 100)}%</p>`;
const alienStatsTemplate = (currentHull, maxHull, firepower, accuracy) => `<div class="alien-stats"><p>HP:${currentHull}/${maxHull}</p><p>FP:${firepower}</p><p>A: ${accuracy}%</p></div>`

const expCalculator = (target) => target.maxHull * 1.05;
const range = (min, max) => Math.random() * (max - min) + min;
class Ship {
    constructor(element, name, maxHull, firepower, accuracy, gainsExp) {
        this.element = element;
        this.name = name;
        this.level = 0;
        this.gainsExp = gainsExp;

        this.maxHull = maxHull;
        this.currentHull = this.maxHull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.score = 0;
    }

    UpdateStats() {
        let maxHullGained = Math.trunc(range(1, 3));
        let firepowerGained = Math.trunc(range(1, 2));
        let accuracyGained = Math.trunc(range(0.001, 0.01));

        actionsList.push(`+${maxHullGained} Max Hull`);
        actionsList.push(`+${firepowerGained} Firepower`);
        actionsList.push(`+${accuracyGained * 100}% Accuracy`);

        this.maxHull += maxHullGained;
        this.firepower += firepowerGained;
        this.accuracy += accuracyGained;
    }

    UpdateExp(target) {
        let expGained = Math.trunc(expCalculator(target))
        actionsList.push(`${expGained} XP Gained!`)

        this.currentExp += expGained;
        if (this.currentExp >= this.maxExp) {
            let overflow = this.currentExp - this.maxExp;
            this.currentExp = 0;
            if (overflow > 0) {
                this.currentExp = overflow;
            }
            this.level += 1;
            this.maxExp *= 1.05;
            this.UpdateStats();

            this.currentHull = this.maxHull;

            actionsList.push('Level Up!');
        }
        updatePlayerStats();
        updateActionsDisplay();
    }

    DoDamage(target) {
        actionsList.push(`${this.name} Attacking ${target.name}`);
        let chance = Math.random();
        if (chance <= this.accuracy) {
            target.currentHull -= this.firepower;
            actionsList.push(`${this.name} hit ${target.name} for ${this.firepower} damage!`);

            if (target.currentHull <= 0) {
                target.OnDestroyed();
                if (this.gainsExp) {
                    this.UpdateExp(target);
                }
            }
        } else {
            actionsList.push(`${this.name} missed!`);
        }
        updateActionsDisplay();
    }

    OnDestroyed() {
        this.element.classList.add('ship-destroyed-animation');
        this.element.classList.add('destroyed');
    }

    Animate(element, className) {
        element.classList.add(className);
    }

    OnAnimationCompleted(element, className, callback) {
        element.classList.remove(className);
        callback();
    }
}
class USSAssembly extends Ship {
    constructor() {
        super(shipDiv, 'USS Assembly', 20, 5, 0.7, true);
        this.currentExp = 0;
        this.maxExp = 20;
    }
}
class Alien extends Ship {
    constructor(alienDiv, name, minHull=8, maxHull=12, minFirepower=2, maxFirepower=4, minAcc=0.6, maxAcc=0.8) {
        super(alienDiv, name, Math.trunc(range(minHull, maxHull)), Math.trunc(range(minFirepower, maxFirepower)), range(minAcc, maxAcc), false);
    }
}

let CurrentAlienIndex = 0;
let ussAssembly = new USSAssembly();
let aliens = [];

const animationCompletedMap = {
    'player-ship': (element) => ussAssembly.OnAnimationCompleted(element, 'player-ship-attack-animation', () => {
        ussAssembly.DoDamage(aliens[CurrentAlienIndex]);

        if (aliens[CurrentAlienIndex].currentHull > 0) {
            onAlienAttack();
            updateAlienStats();
        }
    }),
    'alien-ship': (element) => aliens[CurrentAlienIndex].OnAnimationCompleted(element, 'alien-ship-attack-animation', () => {
        aliens[CurrentAlienIndex].DoDamage(ussAssembly);
        updatePlayerStats();
        attackBtn.disabled = false;
    })
}
const onAnimationCompleted = (element) => {
    if (element.classList.contains('player-ship-attack-animation') ||
        element.classList.contains('alien-ship-attack-animation')) {
        let className = element.classList[0];
        animationCompletedMap[className](element);
    } else if (element.classList.contains('alien-ship') &&
        element.classList.contains('ship-destroyed-animation')) {

        alienShipDivs[CurrentAlienIndex].style.display = 'none';
        ussAssembly.score++;
        updatePlayerScore();

        if (checkWinState()) {
            ussAssembly.Animate(shipDiv, 'player-ship-leave-animation');
        }

        CurrentAlienIndex++;
        console.log(CurrentAlienIndex);

        attackBtn.disabled = false;
    } else if (element.classList.contains('player-ship-leave-animation')) {
        updateWaveDisplay();
        resetGame();
    }
    
    if (element.classList.contains('alien-ship-enter-animation') ||
        element.classList.contains('player-ship-enter-animation')) {
        element.classList.remove('alien-ship-enter-animation');
        element.classList.remove('player-ship-enter-animation');
    }
}

const onPlayerAttack = () => {
    ussAssembly.Animate(shipDiv, 'player-ship-attack-animation');
    attackBtn.disabled = true;
}
const onAlienAttack = () => {
    aliens[CurrentAlienIndex].Animate(alienShipDivs[CurrentAlienIndex], 'alien-ship-attack-animation');
}
const onRetreat = () => {
    shipDiv.classList.add('player-ship-retreat-animation');
}
const onRestart = () => {
    resetGame();
}

const Init = () => {
    CurrentAlienIndex = 0;
}
const InitAliens = () => {
    for (let i = 0; i < 6; i++) {
        aliens.push(new Alien(alienShipDivs[i], 'Alien-' + i));
    }
}

var t;
const loop = (callback, interval) => {
    let repeat = () => {
        clearTimeout(t);
        callback();
        t = setTimeout(() => {
            repeat();
            clearTimeout(t)
        });
    }
    repeat();
}

const updateAlienStats = () => {
    for (let i = 0; i < alienShipDivs.length; i++) {
        let alienShipDiv = alienShipDivs[i];
        let alien = aliens[i];
        if (alienShipDiv.classList.contains('destroyed'))
            continue;
        
        // console.log(`Alien Ship Divs: ${alienShipDivs.length}`);
        // console.log(`Alien Objects: ${aliens.length}`);

        let currentHull = alien.currentHull;
        let maxHull = alien.maxHull;
        let firepower = alien.firepower;
        let accuracy = Math.trunc(alien.accuracy * 100);

        alienShipDiv.innerHTML = alienStatsTemplate(currentHull, maxHull, firepower, accuracy);
    }
}
const updatePlayerStats = () => {
    playerStats.innerHTML = playerStatsTemplate(ussAssembly);
}
const updateActionsDisplay = () => {
    let actionsString = '';
    actionsList.forEach(action => actionsString += `<p>${action}</p>`);
    actionsDisplay.innerHTML = actionsString;

    actionsDisplay.scroll(0, 1000);
}
const updatePlayerScore = () => {
    playerScore.innerHTML = playerScoreTemplate(ussAssembly.score);
}
const updateWaveDisplay = () => {
    currentWave++;
    currentWaveH3.innerHTML = `Wave: <span>${currentWave}</span>`;
}

const checkWinState = () => {
    let allAliensDestroyed = true;
    for (let i = 0; i < alienShipDivs.length; i++) {
        if (!alienShipDivs[i].classList.contains('destroyed')) {
            allAliensDestroyed = false;
            break;
        }
    }
    return allAliensDestroyed;
}
const resetGame = () => {
    ussAssembly.currentHull = ussAssembly.maxHull;
    
    shipDiv.style.display = 'block';
    shipDiv.classList.remove('player-ship-leave-animation');
    shipDiv.classList.add('player-ship-enter-animation');
    
    for (let i = 0; i < aliens.length; i++) {
        if (currentWave % 3 === 0) {
            aliens[i].UpdateStats();
        }
        aliens[i].currentHull = aliens[i].maxHull;

        alienShipDivs[i].style.display = 'block';
        alienShipDivs[i].classList.remove('destroyed');
        alienShipDivs[i].classList.remove('ship-destroyed-animation');
        alienShipDivs[i].classList.add('alien-ship-enter-animation');
    }

    CurrentAlienIndex = 0;
    updatePlayerStats();
    updateAlienStats();
}


window.onload = function () {
    Init();
    InitAliens();

    updateAlienStats();
    updatePlayerStats();
};