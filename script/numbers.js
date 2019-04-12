// GENERATE RANDOM NUMBER
const bingoYorN = () => {
    let r2 = Math.floor(Math.random()*2);
    return r2;
}

const bingoDirection = () => {
    let r3 = Math.floor(Math.random()*3);
    return r3;
}

// TROPHY POSITION
const bingoTrophyX = () => {
    let rtx = Math.floor(Math.random()*15);
    let mult25x = rtx * 50 + 525;
    return mult25x;
}

const bingoTrophyY = () => {
    let rty = Math.floor(Math.random()*7);
    let mult25y = rty * 50 + 500;
    return mult25y;
}

// HERO START POSTION
const bingoHeroX = () => {
    let rtx = Math.floor(Math.random()*5);
    let mult25x = rtx * 50 + 25;
    return mult25x;
}

const bingoHeroY = () => {
    let rty = Math.floor(Math.random()*7);
    let mult25y = rty * 50 + 25;
    return mult25y;
}

// MINOS START POSTION
const bingoMinosX = () => {
    let rtx = Math.floor(Math.random()*15);
    let mult25x = rtx * 50 + 500;
    return mult25x;
}

const bingoMinosY = () => {
    let rty = Math.floor(Math.random()*7);
    let mult25y = rty * 50 + 500;
    return mult25y;
}

// SET TIME INTERVAL
const timeBingo = () => {
    if(frames === 15 && bingoYorN() === 1){
        arrMinos.forEach(rand =>{
            rand.randDirection();
        })
        frames = 0;
    }else if(frames === 30 && bingoYorN() ===1) {
        arrMinos.forEach(rands =>{
            rands.randDirection();
        })
        frames = 0;
    } else if (frames > 30) {
        frames = 0
    }
}