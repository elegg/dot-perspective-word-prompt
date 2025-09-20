import {initJsPsych} from 'jspsych'
import { instructionUI } from './js/instructionExampleTask.js';

import { SoundEffect } from './js/audioPlayer.js';

import beepUrl from './assets/beep.mov'
import selectAvatar from './js/selectAvatar.js';

import "../src/main.css";
import "../src/jspsych.css";


export default function run(jatos=null, options){

    let {gender, prompt} = options

   

// setup audio player
let audio = new SoundEffect(beepUrl)
audio.init()

// select avatars based on gender
let avatars = selectAvatar(gender)

let settings = { on_finish: function() {
    if(jatos){

       jatos.setStudySessionData({"gender":gender, prompt, volume:audio.volume}, jatos.startNextComponent)

    }
}
}
const jsPsych = initJsPsych(settings);


jsPsych.run({ timeline:[instructionUI(audio, avatars, prompt),
    
    
    ]})
}