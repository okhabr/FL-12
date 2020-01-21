function Fighter(obj) {
    const name = obj.name;
    const damage = obj.damage;
    const strength = obj.strength;
    const agility = obj.agility;
    let hp = obj.hp;
    let wins = 0;
    let loses = 0;
    const totalHP = obj.hp;
    return {
        getName: function() {
            return name;
        },
        getDamage: function() {
            return damage;
        },
        getStrength: function() {
            return strength;
        },
        getAgility: function() {
            return agility;
        },
        getHealth: function() {
            return hp;
        },
        attack: function(defender) {
            let dStrength = defender.getStrength();
            let dAgility = defender.getAgility();
            const LIMIT = 100;
            let probabilityIndex = LIMIT-(dStrength + dAgility);
            let successChance = Math.ceil(Math.random()*LIMIT);
            let message;
            if (successChance <= probabilityIndex){
                defender.dealDamage(damage);
                message = `${name} makes ${damage} damage to ${defender.getName()}`;
            } else {
                message = `${name} attack missed`;
            }
            console.log(message);
        },
        logCombatHistory: function() {
            console.log(`Name: ${name}, Wins: ${wins}, Looses: ${loses}`)
        },
        dealDamage: function(decrease) {
            hp = hp - decrease < 0 ? 0 : hp - decrease;
            return hp;
        },
        heal: function(healPoints){
            hp = healPoints + hp > totalHP ? totalHP : hp + healPoints;
        },
        addWin: function() {
            wins++;
        },
        addLoss: function() {
            loses++;
        }
    }
}

function battle(fighter1,fighter2) {
    let attacker;
    let defender;
    let counter = 0;
    const CHECKODD = 2;
    while (fighter1.getHealth() > 0 & fighter2.getHealth() > 0) {
        attacker = counter%CHECKODD ? fighter1 : fighter2;
        defender = counter%CHECKODD ? fighter2 : fighter1;
        attacker.attack(defender);
        counter++;
    }
    let dead = fighter1.getHealth() > 0 ? fighter2 : fighter1;
    if (counter) {
        let winner = fighter1.getHealth() > 0 ? fighter1 : fighter2;
        winner.addWin();
        dead.addLoss();
        console.log(`${winner.getName()} has won`);
    } else {
        console.log(`${dead.getName()} is dead and cannot fight`);
    }
}
