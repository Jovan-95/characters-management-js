const charNameInput = document.querySelector('#name');
const select = document.querySelector('#type');
const createBtn = document.querySelector('#createBtn');
const charList = document.querySelector('#character-list');
const startBattle = document.querySelector('#start-battle');
const resetBattle = document.querySelector('#reset-battle');
const battleLog = document.querySelector('#battle-log');

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
    }

    specialAttack(target) {
        let interval = setInterval(() => {
            this.attack(target);

            console.log('special attack!');
            console.log('Target', target);
            if (target.health <= 0) {
                console.log('Target destroyed!!!')
                clearInterval(interval)
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
    }

    castSpell(target) {
        let interval = setInterval(() => {
            this.attack(target);
            console.log('spell casted!');
            console.log('Target', target);
            if (target.health <= 0) {
                console.log('Target destroyed!!!')
                clearInterval(interval)
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
    }

    shootArrow(target) {
        let interval = setInterval(() => {
            this.attack(target);
            console.log('shot arrow!');
            console.log('Target', target);
            if (target.health <= 0) {
                console.log('Target destroyed!!!')
                clearInterval(interval)
            }
        }, this.attackSpeed);
    }
}


///////////////////// temporary
// console.log('----------- attacks testing OOP logic -----------')

// const jovan = new Warrior('Jovan');
// const boris = new Mage('Boris');
// const tomica = new Archer('Tomica');

// console.log(jovan);
// console.log(boris);
// console.log(tomica)

// jovan.specialAttack(boris);


console.log('----------- DOM -----------')
//////////// DOM
function createCharacter(event) {
    // Stopping the submission
    event.preventDefault();

    let character;

    // Card creation for all classes
    function cardCreation() {
        ////
        let card = document.createElement('div');
        card.classList.add('character-card');
        charList.appendChild(card);

        let cardName = document.createElement('h3');
        card.appendChild(cardName)
        cardName.innerHTML = `${character.name}`;

        let cardProps = document.createElement('div');
        card.appendChild(cardProps)
        cardProps.innerHTML = `<div class="card-prop">Health: ${character.health}</div>
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

    if (select.value === 'warrior') {
        character = new Warrior(charNameInput.value);
        console.log(character)
        cardCreation();

    } else if (select.value === 'mage') {
        character = new Mage(charNameInput.value);
        console.log(character);
        cardCreation();
    } else if (select.value === 'archer') {
        character = new Archer(charNameInput.value);
        console.log(character)
        cardCreation();
    }

}
createBtn.addEventListener('click', createCharacter)

git remote add origin https://github.com/Jovan-95/characters-management-js.git
