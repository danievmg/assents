
let log = new Log(document.querySelector('.log'));
let char = new Cavaleiro('Daniel');
let monster = new Monstro();


const stage = new Stage (
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log

);

stage.start();