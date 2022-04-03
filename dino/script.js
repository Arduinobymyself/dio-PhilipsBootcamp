


const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isDinoJumping = false;
let dinoPosition = 0;

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isDinoJumping){
           jump(); 
        }
    }
}

function jump(){
    isDinoJumping = true
    let dinoUpInterval = setInterval(() => {
        if(dinoPosition >= 150){
            clearInterval(dinoUpInterval);
            // descendo
            let dinoDownInterval = setInterval(() => {
                if(dinoPosition <= 0){
                    clearInterval(dinoDownInterval);
                    isDinoJumping = false;
                }else{
                    dinoPosition -= 20;
                    dino.style.bottom = dinoPosition + 'px';
                }  
            }, 20)
        }else{
            // subindo
            dinoPosition += 20;
            dino.style.bottom = dinoPosition + 'px';
        } 
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;


    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let cactusLeftInterval = setInterval(() => {
        if(cactusPosition < -60){
            clearInterval(cactusLeftInterval);
            background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60){
            //GAME OVER
            clearInterval(cactusLeftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo!</h1>';
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}


createCactus();
document.addEventListener('keyup', handleKeyUp)