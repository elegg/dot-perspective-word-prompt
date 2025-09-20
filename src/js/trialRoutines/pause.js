import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'
import htmlButtonResponse from '@jspsych/plugin-html-button-response';
//import { isResponseCorrect, evaluateTrialResponses } from '../evaluateResponses.js'
// need to change to being conditional for final block => provide message about how many trials the participant has completed



export let saveData = ({ jatos, jsPsych, block, callback = () => { } }) => ({
    type: htmlButtonResponse,
    stimulus: `Saving Data...`,
    on_load: () => {
        let button = document.getElementsByClassName("hidden-button")[0]
        let appendData = () => jatos.appendResultData(jsPsych.data.get().ignore('stimulus').filter({ "screen": "dot_room", block: block }).trials, () => { button.click() })
            .then(callback)
            .then(() => { button.click() })

        let submitData = () => jatos.submitResultData(jsPsych.data.get().ignore('stimulus').filter({ "screen": "dot_room" }).trials)
            .then(callback)
            .then(() => { button.click() })

        if (block === "practice") {

            submitData()
                .catch(() => {alert("Error in Connection to server")
                })         
        }
        else {
            appendData()
                .catch(() => {alert("Error in Connection to server")}
                )
        }
    },
    choices: ["Load"],
    button_html: (choice) => `<button class="hidden-button"${choice}</button>`

})

export let pause = ({ message }) => ({
    type: htmlKeyboardResponse,
    stimulus: `<h2>You can take a break now</h2>
            <p>${message}</p>
        
                <br>
                <h3>Remember:</h3>
                 <p>Press the up arrow key when the text (number and colour) matches the number of dots in the room that are of the indicated colour.</p>
                 <p>Press the down arrow key when the text (number and colour) does not match the number of dots in the room that are of the indicated colour.</p>
                <br>
                <p>Press "F" to make sure your are in fullscreen mode</p>
                <p>Press SPACE to continue</p>
        
        `,
    choices: [" "] // [EWL] note space key is represented by an actual space

}
)



export let feedbackPause = (jsPsych) => ({

    type: htmlKeyboardResponse,
    stimulus: () => {
        let data = jsPsych.data.get().filter({ screen: "dot_room" }).trials

        let { meanRT, correctProp } = evaluateTrialResponses(data)

        return `<h2>You completed the practice</h2>
        <p>Your average (mean) response time was ${Math.floor(meanRT)}ms</p>
                <p>You got ${correctProp ? (correctProp) * 100 : 0}% correct</p>
                <br>
                <h3>Remember:</h3>
                 <p>Press the up arrow key when the text (number and colour) matches the number of dots in the room that are of the indicated colour.</p>
                 <p>Press the down arrow key when the text (number and colour) does not match the number of dots in the room that are of the indicated colour.</p>
                <br>
                <p>Press "F" to make sure your are in fullscreen mode</p>
                <br>
                <p>Press SPACE to continue</p>
        
        `

    },
    choices: [" "] // [EWL] note space key is represented by an actual space



})