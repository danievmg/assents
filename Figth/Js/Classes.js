//Guerreiro ou mago - Barra de vida
//Monstro - Barra de vida

class Personagem{
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }
    get life(){
        return this._life ;

    }
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife
    }

}

class Cavaleiro extends Personagem{
    constructor(name){
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}


class Mago extends Personagem{
    constructor(name){
        super(name);
        this.life = 80;
        this.attack = 14;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class Monstro extends Personagem{
    constructor(){
        super('Monstro');
        this.life = 40;
        this.attack = 4;
        this.defense =4;
        this.maxLife = this.life

    }
}

class boos extends Personagem{
    constructor(){
        super('Megalodon');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life
    }
}

class Stage {
    constructor(lutador1, lutador2, lutador1El, lutador2El, logObject){
        this.lutador1 = lutador1;
        this.lutador2 = lutador2;
        this.lutador1El = lutador1El;
        this.lutador2El = lutador2El;
        this.log = logObject;
    }
    start(){
        //Colocando ação no botão
        this.update();
        this.lutador1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.lutador1,this.lutador2));
        this.lutador2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.lutador2,this.lutador1));
    }

    update(){
        // Lutador1
        this.lutador1El.querySelector('.name').innerHTML = `${this.lutador1.name} - ${this.lutador1._life} HP`  ;
        let pct = (this.lutador1.life / this.lutador1.maxLife) *100;
        this.lutador1El.querySelector('.bar').style.width = `${pct}%`;
        
        //Lutador2
        this.lutador2El.querySelector('.name').innerHTML = `${this.lutador2.name} - ${this.lutador2._life} HP`;
        let pct2 = (this.lutador2.life / this.lutador2.maxLife) *100;
        this.lutador2El.querySelector('.bar').style.width = `${pct2}%`;



    }
    doAttack(attacking, attacked){
        
        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() *2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.attack * defenseFactor;

        if(actualAttack > actualDefense && ((attacked._life - actualAttack) < 0)){
            attacked._life = 0;
        }else if(actualAttack > actualDefense){

           if (attacked._life > 0 && attacking._life > 0) {
                attacked._life = (attacked._life - actualAttack).toFixed(2)
                this.log.addMessage(`${attacking.name} está atacando ${attacked.name}`)
           }
        }else if(attacked._life == 0){
            this.log.addMessage(`${attacked.name} está morto`)
        }else if(attacking._life == 0){
            this.log.addMessage(`${attacking.name} está morto`)
        }else if(actualAttack < actualDefense ){
            this.log.addMessage(`${attacked.name} defendeu`);
        }
        


        
        this.update();
    }
   
}
class Log {
    list  = [];
    constructor(listaEL){
        this.listaEL = listaEL;
    }

    addMessage(msg){
        this.list.push(msg);
        this.render();
    }
    render(){
        this.listaEL.innerHTML = '';
        for(let i in this.list){
            this.listaEL.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}
