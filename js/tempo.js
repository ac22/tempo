var beatHistory = [];       // stores the times the drum was kicked betwen beats
var bpm = 0;                // stores beats per minute estimate
var BPM_INDICATOR;
var ESC = 27;               //press ESC to reset the bpm
var USE_AT_MOST = 2;        // the max number of past beats to consider for bpm calculation

function init() {
    window.addEventListener('keydown', keyEventHandler);
    window.addEventListener('mousedown', addBeat);
    BPM_INDICATOR = document.querySelector('#bpm');
}

function keyEventHandler(e) {
    if (e.keyCode === ESC) {
        beatHistory = [];
        console.log('Cleared beats');
        BPM_INDICATOR.innerHTML = 'Tap Tap Tap';
    } else {
        addBeat();
    }
}

function addBeat() {
    kickDrum();
    beatHistory.push(Date.now());
    bpm = calcBPM(beatHistory, USE_AT_MOST);
    if (bpm) {
        bpm = Math.round(bpm);
        BPM_INDICATOR.innerHTML = bpm + ' bpm';
    }
}

function kickDrum() {
    // TODO: playSoundEffect();
    // TODO: doAnimation();
}

/**
 * Calculates beats per minute
 * The calculation will use only useAtMost of the last inputs for the calculation
 * Figure out the total time elapsed, divide by beats, convert milliseconds to minutes
 */
function calcBPM(beatHistory, useAtMost) {
    if (!beatHistory || beatHistory.length < 2) {
        return undefined;
    } else {
        var len = beatHistory.length;
        var use = Math.min(useAtMost, len - 1);
        var timePerBeat = (beatHistory[len - 1] - beatHistory[len - 1 - use]) / use;
        return (1 / timePerBeat) * 1000 * 60;
    }
}
