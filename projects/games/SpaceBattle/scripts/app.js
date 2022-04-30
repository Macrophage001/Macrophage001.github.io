const shipDiv = document.querySelector('.player-ship');
const alienShipDivs = document.getElementsByClassName('alien-ship');
const alienStats = document.getElementsByClassName('alien-stats');

const playerScore = document.getElementById('player-score');
const playerStats = document.querySelector('.player-stats');

const attackBtn = document.getElementById('attack-btn');
const retreatBtn = document.getElementById('retreat-btn');

const currentTurn = document.getElementById('current-turn');
const actionsDisplay = document.querySelector('.current-actions');
const actionsList = [];

const playerScoreTemplate = (score) =>
    `USS Assembly: <span>${score}</span>`;
const playerStatsTemplate = (currentHull, maxHull, firepower, accuracy) =>
    `
            <p>HP: ${currentHull}/${maxHull}</p>
            <p>FP: ${firepower}</p>
            <p>Acc: ${accuracy}%</p>
`;

const range = (min, max) => Math.random() * (max - min) + min;

const alienStatsTemplate = (currentHull, maxHull, firepower, accuracy) => `<div class="alien-stats"><p>HP:${currentHull}/${maxHull}</p><p>FP:${firepower}</p><p>A: ${accuracy}%</p></div>`

class Ship {
    constructor(name, maxHull, firepower, accuracy) {
        this.name = name;
        this.maxHull = maxHull;
        this.currentHull = this.maxHull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.score = 0;
    }

    DoDamage(target) {
        actionsList.push(`${this.name} Attacking ${target.name}`);
        let chance = Math.random();
        if (chance <= this.accuracy) {
            target.currentHull -= this.firepower;
            actionsList.push(`${this.name} hit ${target.name} for ${this.firepower} damage!`);

            if (target.currentHull <= 0)
                onAlienDestroyed();
        } else {
            actionsList.push(`${this.name} missed!`);
        }
    }

    Animate(element, className) {
        element.classList.add(className);
    }

    OnAnimationCompleted(element, className, callback) {
        element.classList.remove(className);
        this.DoDamage(aliens[CurrentAlienIndex]);
        callback();
    }
}

class USSAssembly extends Ship {
    constructor() {
        super('USS Assembly', 20, 5, 0.7);
    }
}
class Alien extends Ship {
    constructor(name) {
        super(name, Math.trunc(range(8, 12)), Math.trunc(range(2, 4)), range(0.6, 0.8));
    }
}

// class Ship {
//     constructor() {
//         this.name = 'USS Assembly';
//         this.maxHull = 20;
//         this.currentHull = this.maxHull;
//         this.firepower = 5;
//         this.accuracy = 0.7;
//         this.score = 0;
//     }

//     DoDamage() {
//         let target = Aliens[CurrentAlienIndex];
//         actionsList.push(`${this.name} Attacking ${target.name}`);
//         let chance = Math.random();
//         if (chance <= this.accuracy) {
//             target.currentHull -= this.firepower;
//             actionsList.push(`${this.name} hit ${target.name} for ${this.firepower} damage!`);

//             if (target.currentHull <= 0)
//                 onAlienDestroyed();
//         } else {
//             actionsList.push(`${this.name} missed!`);
//         }
//     }

//     Animate(element, className) {
//         element.classList.add(className);
//     }

//     OnAnimationCompleted(element, className, callback) {
//         element.classList.remove(className);
//         this.DoDamage(Aliens[CurrentAlienIndex]);
//         callback();
//     }
// }
// class Alien {
//     constructor(name) {
//         this.name = name;
//         this.maxHull = Math.trunc(range(8, 12));
//         this.currentHull = this.maxHull;
//         this.firepower = Math.trunc(range(2, 4));
//         this.accuracy = range(.6, .8);
//     }

//     DoDamage() {
//         let target = USSAssembly;
//         let chance = Math.random();
//         if (chance <= this.accuracy) {
//             target.currentHull -= this.firepower;
//             actionsList.push(`${this.name} hit ${target.name} for ${this.firepower} damage!`);

//             if (target.currentHull <= 0)
//                 onPlayerDestroyed();
//         } else {
//             actionsList.push(`${this.name} missed!`);
//         }
//     }

//     Animate(element, className) {
//         element.classList.add(className);
//     }

//     OnAnimationCompleted(element, className, callback) {
//         element.classList.remove(className);
//         this.DoDamage(Aliens[CurrentAlienIndex]);
//         callback();
//     }
// }

let CurrentAlienIndex = 0;
let ussAssembly = new USSAssembly();
let aliens = [];

const animationCompletedMap = {
    'player-ship': (element) => ussAssembly.OnAnimationCompleted(element, 'player-ship-attack-animation', () => {
        ussAssembly.DoDamage(aliens[0]);

        updateAlienStats();
        if (aliens[CurrentAlienIndex].currentHull > 0)
            onAlienAttack();
    }),
    'alien-ship': (element) => aliens[CurrentAlienIndex].OnAnimationCompleted(element, 'alien-ship-attack-animation', () => {
        aliens[0].DoDamage(ussAssembly);
        updatePlayerStats();
        attackBtn.disabled = false;
    })
}
const onAnimationCompleted = (element) => {
    if (element.classList.contains('player-ship-attack-animation') ||
        element.classList.contains('alien-ship-attack-animation')) {
        let className = element.classList[0];
        animationCompletedMap[className](element);
    } else if (element.classList.contains('alien-ship') && element.classList.contains('player-ship-destroyed-animation')) {
        alienShipDivs[CurrentAlienIndex].remove();
        aliens.splice(CurrentAlienIndex, 1);
        console.log(aliens);
        ussAssembly.score++;
        updatePlayerScore();

        if (alienShipDivs.length === 0) {
            ussAssembly.Animate(shipDiv, 'player-ship-leave-animation');
        }

        attackBtn.disabled = false;
    }
}

const onAlienDestroyed = () => {
    let alienShipDiv = alienShipDivs[0];
    alienShipDiv.classList.add('player-ship-destroyed-animation');
    alienShipDiv.classList.add('destroyed');
}
const onPlayerDestroyed = () => {
    shipDiv.classList.add('player-ship-destroyed-animation');
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

const Init = () => {
    CurrentAlienIndex = 0;
}

const loop = (callback, interval) => {
    let repeat = () => {
        callback();
        let t = setTimeout(() => {
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

        let currentHull = alien.currentHull;
        let maxHull = alien.maxHull;
        let firepower = alien.firepower;
        let accuracy = Math.trunc(alien.accuracy * 100);

        alienShipDiv.innerHTML = alienStatsTemplate(currentHull, maxHull, firepower, accuracy);
    }
}
const updatePlayerStats = () => {
    playerStats.innerHTML = playerStatsTemplate(ussAssembly.currentHull, ussAssembly.maxHull, ussAssembly.firepower, ussAssembly.accuracy * 100);
}
const updateActionsDisplay = () => {
    loop(() => {
        let actionsString = '';
        actionsList.forEach(action => actionsString += `<p>${action}</p>`);
        actionsDisplay.innerHTML = actionsString;

        actionsDisplay.scroll(0, 1000);
    }, 10);
}
const updatePlayerScore = () => {
    playerScore.innerHTML = playerScoreTemplate(ussAssembly.score);
}


window.onload = function () {
    Init();

    for (let i = 0; i < 6; i++) {
        aliens.push(new Alien('Alien-0' + i));
    }

    updateAlienStats();
    updatePlayerStats();
    updateActionsDisplay();
};