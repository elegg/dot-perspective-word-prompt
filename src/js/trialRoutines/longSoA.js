import {fixationRoutine} from './fixation.js'
import {numberPromptRoutine} from './numberPrompt.js'
import {wordPromptRoutine} from './wordPrompt.js'
import {roomRoutine} from './room.js'
import {feedbackRoutine} from './feedback.js'
import { blankRoutine } from './blank.js'

export let longSOAProcedure =({jsPsych, audio, avatars, block})=>  [
                fixationRoutine,
                blankRoutine,
                wordPromptRoutine({jsPsych}),
                blankRoutine,
                numberPromptRoutine({jsPsych}),
                blankRoutine,
                roomRoutine({jsPsych, audio, avatars, block}),
                feedbackRoutine({jsPsych, audio})
            ]
        
