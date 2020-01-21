alert('Incude');
class Fighter {
    constructor(obj){
        this._name = obj.name;
        this._damage = obj.damage;
        this._hp = obj.hp;
        this._strength = obj.strength;
        this._agility = obj.agility;
    }
    get getName(){
        return this._name;
    }
    get getDamage(){
        return this._damage;
    }
    get getStrength(){
        return this._strength;
    }
    get getAgility(){
        return this._agility;
    }
    get getHealth(){
        return this._hp;
    }
}