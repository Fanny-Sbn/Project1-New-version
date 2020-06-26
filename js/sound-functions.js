export function playSound(callback){
    callback.play();
}

export function stopSound(callback){
    callback.pause();
}

export function playLowSound(callback){
    callback.volume=0.05;
    callback.play();
}