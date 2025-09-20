import  htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'

import "../../../src/main.css";
import "../../../src/jspsych.css";


export   let wordPromptRoutine =({jsPsych})=> ({
            type: htmlKeyboardResponse,
            stimulus: ()=>{

                let colorPrompt = jsPsych.evaluateTimelineVariable("colorPrompt")
                let word = jsPsych.evaluateTimelineVariable("prompt")


            return `<p class="trial-prompt" style='color:${colorPrompt}''>${word}<p>`
            },
            choices: "NO_KEYS",
            trial_duration: 750
        })