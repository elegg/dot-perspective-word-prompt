import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'




export let numberPromptRoutine = ({jsPsych})=> ( {
    type: htmlKeyboardResponse,
    stimulus: () => {
        let numberPrompt = jsPsych.evaluateTimelineVariable("numberPrompt")

        return `<p class='trial-prompt'>${numberPrompt}</p>`
    },
    choices: "NO_KEYS",
    trial_duration: 750
})
