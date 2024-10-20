const charNameInput = document.querySelector('#name');
const select = document.querySelector('#type');
const createBtn = document.querySelector('#createBtn');
const charList = document.querySelector('#character-list');
const startBattle = document.querySelector('#start-battle');
const resetBattle = document.querySelector('#reset-battle');
const battleLog = document.querySelector('#battle-log');
const turnsBtn = document.querySelector('.turns-btn');
const turnP1 = document.querySelector('#turnP1');
const turnP2 = document.querySelector('#turnP2');
const charCreationContainer = document.querySelector('.character-creation');
const innerBars = document.querySelectorAll('.inner-bar');
// const charactersContainer = document.querySelector('.character-creation');




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
        this.health = this.health - amount;
    }
}

// Class Warrior
class Warrior extends Character {
    constructor(name) {
        super(name);
        this.name = name;
        this.health = 120;
        this.strength = 25;
        this.defence = 15;
        this.attackSpeed = 2000;
        this.heroClassName = 'Warrior';
    }

    specialAttack(target) {
        let interval = setTimeout(() => {
            this.attack(target);
            console.log('Special attack on', target.name, 'Health left', target.health);
            battleLog.innerHTML += `<div>Special attack on ${target.name}, Health left ${target.health}. ${target.name} has the turn</div>`;

            if (target.health <= 0) {
                battleLog.innerHTML = `${target.name} destroyed!!!`
                console.log(target.name ,'destroyed!!!')
            }
        }, this.attackSpeed);
    }

}


// Class Mage
class Mage extends Character {
    constructor(name) {
        super(name);
        this.health = 80;
        this.strength = 20;
        this.defence = 10;
        this.attackSpeed = 1700;
        this.heroClassName = 'Mage';
    }

    castSpell(target) {
        let interval = setTimeout(() => {
            this.attack(target);
            console.log('Spell casted on', target.name, 'Health left', target.health);
            battleLog.innerHTML += `<div>Spell casted on ${target.name}, Health left ${target.health}. ${target.name} has the turn</div>`
            if (target.health <= 0) {
                console.log('Target destroyed!!!')
                battleLog.innerHTML = `${target.name} is destroyed!!!`
            }
        }, this.attackSpeed);
    }
}

// Class Archer
class Archer extends Character {
    constructor(name) {
        super(name)
        this.health = 90;
        this.strength = 16;
        this.defence = 12;
        this.attackSpeed = 1500;
        this.heroClassName = 'Archer';
    }

    shootArrow(target) {
        let interval = setTimeout(() => {
            this.attack(target);
            console.log('Arrow shot on', target.name, 'Health left', target.health);
            battleLog.innerHTML += `<div>Arrow shot on ${target.name}, Health left ${target.health}. ${target.name} has the turn</div>`
            if (target.health <= 0) {
                console.log('Target destroyed!!!')
                battleLog.innerHTML = `${target.name} is destroyed!!!`
            }
        }, this.attackSpeed);
    }
}

console.log('----------- DOM -----------')
//////////// DOM
let players = [];
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



function start() {
    if (players.length === 2) {
        charCreationContainer.classList.add('d-none')

        battleLog.innerHTML = ``;
        turnsBtn.classList.remove('d-none');

        let player1 = players[0];
        let player2 = players[1];
        console.log('PLAYER1', player1)
        console.log('PLAYER2', player2)


        turnP1.addEventListener('click', turn1Att);
        turnP2.addEventListener('click', turn2Att);

    } else {
        battleLog.innerHTML = `Players need to create characters!`
    }

}
startBattle.addEventListener('click', start)

function turn1Att() {
    turnP2.disabled = false;
    turnP2.classList.remove('disabled')

    let player1 = players[0];
    let player2 = players[1];

    if (player1.heroClassName === 'Warrior') {
        player1.specialAttack(player2)
    } else if (player1.heroClassName === 'Mage') {
        player1.castSpell(player2)
    } else if (player1.heroClassName === 'Archer') {
        player1.shootArrow(player2)
    }


turnP1.disabled = true;
turnP1.classList.add('disabled')

}

function turn2Att() {
    turnP1.disabled = false;
    turnP1.classList.remove('disabled')

    let player1 = players[0];
    let player2 = players[1];

    if (player2.heroClassName === 'Warrior') {
        player2.specialAttack(player1)
    } else if (player2.heroClassName === 'Mage') {
        player2.castSpell(player1)
    } else if (player2.heroClassName === 'Archer') {
        player2.shootArrow(player1)
    }

    turnP2.disabled = true;
    turnP2.classList.add('disabled')
}
