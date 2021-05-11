const body = document.querySelector('body');
const keys = document.querySelectorAll('.piano-key');
const piano = document.querySelector('.piano');
const btnContainer = document.querySelector('.btn-container');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
const screenBtn = document.querySelector('.fullscreen');
let cordX = null;



//------------change tabs
function changeLettersToNotes(target, elements) {
    target.classList.add('btn-active');
    elements.classList.remove('btn-active');
    keys.forEach((elem) => {
        if(elem.classList.contains('piano-letter')) {
            elem.classList.remove('piano-letter');
        }
        else{
            elem.classList.add('piano-letter');
        }
    });
}


function changeTabs(e) {
    const {target} = e;
    if(target.classList.contains('btn-letters')){
        if(target.classList.contains('btn-active')) return;
        else changeLettersToNotes(target, btnNotes);
    }
    if(target.classList.contains('btn-notes')){
        if(target.classList.contains('btn-active')) return;
        else changeLettersToNotes(target, btnLetters);
    }
}


//------------play piano
function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}



function startTargetClick (e) {
    if(cordX !== e.pageX){
        if(e.target.classList.contains('piano-key')){
            e.target.classList.add('active');
            playAudio(`assets/audio/${e.target.dataset.note}.mp3`);
        } 
    }  
}


function stopTargetClick (e) {
    e.target.classList.remove('active'); 
}


const startCorrespondOver = (e) => {
    if(e.target.classList.contains('piano-key')){
        e.target.classList.add('active');
        playAudio(`assets/audio/${e.target.dataset.note}.mp3`);
    }

    cordX = e.pageX; 

    keys.forEach((elem) => {
        elem.addEventListener('mouseover', startTargetClick);
        elem.addEventListener('mouseout', stopTargetClick);
    });

 
};


const stopCorrespondOver = () => {
    keys.forEach((elem) => {
        elem.classList.remove('active');
        elem.removeEventListener('mouseover', startTargetClick);
        elem.removeEventListener('mouseout', stopTargetClick);
    });
};



//------------keydowns
function startTargetKey(e) {
    if(e.code){
        let letter = '';
        let code = e.code.substr(3,1);

    
        keys.forEach((elem) => {
            if(elem.classList.contains('active')){
                return;
            } else{
                if(elem.dataset.letter === code) {
                    elem.classList.add('active');
                    letter = elem.dataset.note;
            }
        } 
        });
        if(letter) playAudio(`assets/audio/${letter}.mp3`);
    }
}

function stopTargetKey() {
    keys.forEach((elem) => {
        elem.classList.remove('active');
    });
} 


//------------activate full screen
function activateFullscreen() {
    if(document.fullscreenElement === null){
        if(document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();   
        }
        else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();  
        }
        else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        }
        else if(document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen(); 
        }
    }
    else{
        if(document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } 
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }   
    }
}



//------------listeners
btnContainer.addEventListener('click', changeTabs);
piano.addEventListener('mousedown', startCorrespondOver);
body.addEventListener('mouseup', stopCorrespondOver);
window.addEventListener('keydown', startTargetKey);
window.addEventListener('keyup', stopTargetKey);
screenBtn.addEventListener('click', activateFullscreen);