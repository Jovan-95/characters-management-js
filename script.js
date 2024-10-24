const charNameInput = document.querySelector('#name');
const select = document.querySelector('#type');
const createBtn = document.querySelector('#createBtn');
const charList = document.querySelector('#character-list');
const startBattle = document.querySelector('#start-battle');
const resetBattle = document.querySelector('#reset-battle');
const battleLog = document.querySelector('#battle-log');
const turnsBtn = document.querySelector('.turns-btn');
// const turnP1 = document.querySelector('#turnP1');
// const turnP2 = document.querySelector('#turnP2');
const charCreationContainer = document.querySelector('.character-creation');
// const charactersContainer = document.querySelector('.character-creation');
const functionStatus = document.getElementById("function-status")
const timerElement = document.getElementById("timer");

const health1 = document.querySelector('#healthP1');
const health2 = document.querySelector('#healthP2');

const p1Att1 = document.querySelector('.p1-attack-1')
const p1Att2 = document.querySelector('.p1-attack-2')
const p2Att1 = document.querySelector('.p2-attack-1')
const p2Att2 = document.querySelector('.p2-attack-2')

// OOP logic
class Character {
    constructor(name, health, strength, defence) {
        this.name = name;
        this.health = 100;
        this.strength = strength;
        this.defence = defence;
    }

    attack(target) {

        if (target.health > 0) {
            target.takeDamage(this.strength - target.defence)
        }
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);

        // updating health bars
        if (this === players[0]) {
            health1.style.width = `${this.health}%`;
        } else {
            health2.style.width = `${this.health}%`;
        }
        if (players[0].health <= 0 || players[1].health <= 0) {
            clearInterval(toggleFunction)
            endGameDisableOptions();
        }

    }
}

// Class Warrior
class Warrior extends Character {
    constructor(name) {
        super(name);
        this.name = name;
        this.health = 100;
        this.strength = 30;
        this.defence = 20;
        this.attackSpeed = 2000;
        this.heroClassName = 'Warrior';
    }

    specialAttack(target) {
        let timeout = setTimeout(() => {
            this.attack(target);
            console.log('Special attack on', target.name, 'Health left', target.health);
            battleLog.innerHTML += `<div class="bl-text">Special attack on ${target.name}, Health left ${target.health}. ${target.name} has the turn</div>`;


            if (players[0].health <= 0) {
                battleLog.innerHTML = `<div class="winning-msg">${players[1].name} WON!</div>`;
            } else if (players[1].health <= 0) {
                battleLog.innerHTML = `<div class="winning-msg">${players[0].name} WON!</div> `;
            }
        }, this.attackSpeed);
    }

    swordThrow(target) {
        this.attack(target);
        // Second attack logic


        if (players[0].health <= 0) {
            battleLog.innerHTML = `<div class="winning-msg">${players[1].name} WON!</div>`;
        } else if (players[1].health <= 0) {
            battleLog.innerHTML = `<div class="winning-msg">${players[0].name} WON!</div> `;
        }
    }

}


// Class Mage
class Mage extends Character {
    constructor(name) {
        super(name);
        this.health = 100;
        this.strength = 40;
        this.defence = 10;
        this.attackSpeed = 1700;
        this.heroClassName = 'Mage';
    }

    castSpell(target) {
        let timeout = setTimeout(() => {
            this.attack(target);
            console.log('Spell casted on', target.name, 'Health left', target.health);
            battleLog.innerHTML += `<div class="bl-text">Spell casted on ${target.name}, Health left ${target.health}. ${target.name} has the turn</div>`

            if (players[0].health <= 0) {
                battleLog.innerHTML = `<div class="winning-msg">${players[1].name} WON!</div>`;
            } else if (players[1].health <= 0) {
                battleLog.innerHTML = `<div class="winning-msg">${players[0].name} WON!</div> `;
            }
        }, this.attackSpeed);
    }

    fireBall(target) {
        this.attack(target);
        // Second attack logic

        if (players[0].health <= 0) {
            battleLog.innerHTML = `<div class="winning-msg">${players[1].name} WON!</div>`;
        } else if (players[1].health <= 0) {
            battleLog.innerHTML = `<div class="winning-msg">${players[0].name} WON!</div> `;
        }
    }
}

// Class Archer
class Archer extends Character {
    constructor(name) {
        super(name)
        this.health = 100;
        this.strength = 35;
        this.defence = 12;
        this.attackSpeed = 1500;
        this.heroClassName = 'Archer';
    }

    shootArrow(target) {
        let timeout = setTimeout(() => {
            this.attack(target);
            console.log('Arrow shot on', target.name, 'Health left', target.health);
            battleLog.innerHTML += `<div class="bl-text">Arrow shot on ${target.name}, Health left ${target.health}. ${target.name} has the turn</div>`

            if (players[0].health <= 0) {
                battleLog.innerHTML = `<div class="winning-msg">${players[1].name} WON!</div>`;
            } else if (players[1].health <= 0) {
                battleLog.innerHTML = `<div class="winning-msg">${players[0].name} WON!</div> `;
            }
        }, this.attackSpeed);
    }

    fireArrow(target) {
        this.attack(target);
        // second attack logic

        if (players[0].health <= 0) {
            battleLog.innerHTML = `<div class="winning-msg">${players[1].name} WON!</div>`;
        } else if (players[1].health <= 0) {
            battleLog.innerHTML = `<div class="winning-msg">${players[0].name} WON!</div> `;
        }
    }
}

console.log('----------- DOM -----------')
//////////// DOM
let players = [];

// Character creation
function createCharacter(event) {
    // Stopping the submission
    event.preventDefault();

    let character;

    if (select.value === 'warrior') {
        character = new Warrior(charNameInput.value);
        if (players.length < 2) {
            players.push(character)
            cardCreation();
        }
        // console.log(players)

    } else if (select.value === 'mage') {
        character = new Mage(charNameInput.value);
        if (players.length < 2) {
            players.push(character)
            cardCreation();
        }
        // console.log(players)

    } else if (select.value === 'archer') {
        character = new Archer(charNameInput.value);
        if (players.length < 2) {
            players.push(character)
            cardCreation();
        }
        // console.log(players)
    }

    // Card creation for all classes
    function cardCreation() {
        ////
        let card = document.createElement('div');
        card.classList.add('character-card');
        charList.appendChild(card);

        let img = document.createElement('img');
        if (character.heroClassName === 'Warrior') {
            img.src = 'img/warrior.png';
        } else if (character.heroClassName === 'Mage') {
            img.src = 'img/mage.png';
        } else if (character.heroClassName === 'Archer') {
            img.src = 'img/archer.png';
        }

        img.classList.add('added-img');
        card.appendChild(img)

        let cardName = document.createElement('h3');
        cardName.style.padding = '10px'
        card.appendChild(cardName)
        cardName.innerHTML = `${character.name}`;

        let cardProps = document.createElement('div');
        cardProps.style.padding = '10px'
        card.appendChild(cardProps)
        cardProps.innerHTML = `
                               <div class="card-prop class-name">Class: ${character.heroClassName}</div>
                               <div class="card-prop">Health: ${character.health}</div>
                               <div class="card-prop">Strength: ${character.strength}</div>
                               <div class="card-prop">Defence: ${character.defence}</div>
                               <div class="card-prop">Speed: ${character.attackSpeed}</div>
                               `;

        //// remove card element
        let x = document.createElement('div');
        card.appendChild(x);
        x.classList.add('remove-card')
        x.innerHTML = `x`;
        // add remove logic

    }

    charNameInput.value = '';
}

createBtn.addEventListener('click', createCharacter);

// Battle start

let activeFunction = 1;
let countdown = 5;
let intervalId;

function start() {
    if (players.length === 2) {
        timerElement.classList.remove('d-none')
        charCreationContainer.classList.add('d-none')

        battleLog.innerHTML = ``;
        turnsBtn.classList.remove('d-none');

        let player1 = players[0];
        let player2 = players[1];

        console.log('PLAYER1', player1)
        console.log('PLAYER2', player2)


        // Testing auto battle with timer
        toggleFunction();

        // timer
        let tim = setInterval(() => {
            startTimer();
            countdown--;
            timerElement.textContent = `Next turn in: ${countdown}s`;
            if (countdown <= 0) {
                clearInterval(intervalId);
                toggleFunction();  // Switch turns after countdown
            }
        }, 5000);


        health1.style.width = `${player1.health}%`;
        health2.style.width = `${player2.health}%`;

    } else {
        battleLog.innerHTML = `<div class="bl-text">Players need to create characters!</div>`
    }
}

startBattle.addEventListener('click', start)


// Player 1 attack
function turn1Att() {
    let player1 = players[0];
    let player2 = players[1];

    p1Att1.classList.remove('d-none');
    p1Att2.classList.remove('d-none');

    p2Att1.classList.remove('d-none')
    p2Att2.classList.remove('d-none')

    regulateDisablingOptionsP2();


    if (player1.heroClassName === 'Warrior') {
        p1Att1.innerHTML = `SPECIAL ATTACK!`;
        p1Att2.innerHTML = `SWORD THROW!`;

        p1Att1.addEventListener('click', function () {
            player1.specialAttack(player2);
            regulateDisablingOptionsP1();
            startTimer()
        });

    } else if (player1.heroClassName === 'Mage') {
        p1Att1.innerHTML = `CAST SPELL!`;
        p1Att2.innerHTML = `FIRE BALL!`;

        p1Att1.addEventListener('click', function () {
            player1.castSpell(player2);
            regulateDisablingOptionsP1();
            startTimer()

        })

    } else if (player1.heroClassName === 'Archer') {
        p1Att1.innerHTML = `SHOOT ARROW!`;
        p1Att2.innerHTML = `FIRE ARROW!`;

        p1Att1.addEventListener('click', function () {
            player1.shootArrow(player2);
            regulateDisablingOptionsP1();
            startTimer()

        })
    }

    // turnP1.disabled = true;
    // turnP1.classList.add('disabled');
}

// Player 2 attack
function turn2Att() {
    let player1 = players[0];
    let player2 = players[1];

    // p1Att1.classList.remove('d-none');
    // p1Att2.classList.remove('d-none');
    //
    // p2Att1.classList.remove('d-none')
    // p2Att2.classList.remove('d-none')

    regulateDisablingOptionsP1();


    if (player2.heroClassName === 'Warrior') {
        p2Att1.innerHTML = `SPECIAL ATTACK!`;
        p2Att2.innerHTML = `SWORD THROW!`;

        p2Att1.addEventListener('click', function () {
            player2.specialAttack(player1);
            regulateDisablingOptionsP2();
            startTimer()
        });

    } else if (player2.heroClassName === 'Mage') {

        p2Att1.innerHTML = `CAST SPELL!`;
        p2Att2.innerHTML = `FIRE BALL!`;

        p2Att1.addEventListener('click', function () {
            player2.castSpell(player1);
            regulateDisablingOptionsP2();
            startTimer()

        })

    } else if (player2.heroClassName === 'Archer') {

        p2Att1.innerHTML = `SHOOT ARROW!`;
        p2Att2.innerHTML = `FIRE ARROW!`;

        p2Att1.addEventListener('click', function () {
            player2.shootArrow(player1);
            regulateDisablingOptionsP2();
            startTimer()

        })
    }

    // turnP2.disabled = true;
    // turnP2.classList.add('disabled');
}



// Shortens the code inside the attack btn function
function regulateDisablingOptionsP1() {
    // turnP2.disabled = false;
    // turnP2.classList.remove('disabled');

    p1Att1.disabled = true;
    p1Att2.disabled = true;
    p1Att1.classList.add('disabled');
    p1Att2.classList.add('disabled');

    p2Att1.disabled = false;
    p2Att2.disabled = false;
    p2Att1.classList.remove('disabled');
    p2Att2.classList.remove('disabled');
}

function regulateDisablingOptionsP2() {
    p1Att1.disabled = false;
    p1Att2.disabled = false;
    p1Att1.classList.remove('disabled');
    p1Att2.classList.remove('disabled');

    p2Att1.disabled = true;
    p2Att2.disabled = true;
    p2Att1.classList.add('disabled');
    p2Att2.classList.add('disabled');
}

function endGameDisableOptions() {
    p1Att1.disabled = true;
    p1Att2.disabled = true;
    p1Att1.classList.add('disabled');
    p1Att2.classList.add('disabled');

    p2Att1.disabled = true;
    p2Att2.disabled = true;
    p2Att1.classList.add('disabled');
    p2Att2.classList.add('disabled');
}

// auto battle and timer
function toggleFunction() {
    if (activeFunction === 1 && players[0].health > 0) {
        turn1Att();
        activeFunction = 2;
    } else if (activeFunction === 2 && players[1].health > 0) {
        turn2Att();
        activeFunction = 1;
    }

}

function startTimer() {

    clearInterval(intervalId);  // Clear any existing timers
    countdown = 5;
    timerElement.textContent = `Next turn in: ${countdown}s`;

    intervalId = setInterval(() => {
        countdown--;
        timerElement.textContent = `Next turn in: ${countdown}s`;

        if (countdown <= 0) {
            clearInterval(intervalId);
            toggleFunction();  // Switch turns after countdown

        }

    }, 1000);
}

//////
// Fix CSS
// add second attack

// reset
function reset() {
    // Reset players' health and character list
    players = [];
    health1.style.width = '100%';
    health2.style.width = '100%';

    // Clear battle log and other UI elements
    battleLog.innerHTML = '';
    charList.innerHTML = '';


    p1Att1.classList.add('d-none');
    p1Att2.classList.add('d-none');
    p2Att1.classList.add('d-none');
    p2Att2.classList.add('d-none');

    charCreationContainer.classList.remove('d-none'); // Show character creation again
    turnsBtn.classList.add('d-none');
    timerElement.classList.add('d-none');
    timerElement.textContent = '';

    // Reset any function intervals if necessary
    clearInterval(intervalId);
    countdown = 5;


    battleLog.innerHTML = `<div class="bl-text">Battle has been reset. Create new characters!</div>`;
}
resetBattle.addEventListener('click', reset)
