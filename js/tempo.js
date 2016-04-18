var beatHistory = []; // stores the times the drum was kicked betwen beats
var canvas = document.querySelector('#canvas');
const ESC = 27; //press ESC to reset the bpm

function init() {
    window.addEventListener('keydown', keyEventHandler, false);
    window.addEventListener('mousedown', kickDrum, false);
}

function keyEventHandler(e) {
    if (e.keyCode === ESC) {
        beatHistory = [];
        console.log('Cleared beats');
    } else {
        kickDrum();
        bpm = calcBPM(beatHistory);
        console.log(bpm);
    }
}

function kickDrum() {
    beatHistory.push(Date.now());
    // TODO: playSoundEffect();
    // TODO: doAnimation();
}

function calcBPM(beatHistory, useAtMost=3) {
    if (!beatHistory || beatHistory.length < 2) {
        return undefined;
    } else {
        var len = beatHistory.length;
        var use = Math.min(useAtMost, len - 1);
        var timePerBeat = (beatHistory[len - 1] - beatHistory[len - 1 - use]) / use;
        return (1 / timePerBeat) * 1000 * 60;
    }
}
