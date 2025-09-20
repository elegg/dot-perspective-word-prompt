import { initJsPsych } from 'jspsych'
import experimentConditionGenerator from './js/dptTrialGenerator.js'
import { longSOAProcedure } from './js/trialRoutines/longSoA.js';
import { SoundEffect } from './js/audioPlayer.js';
import { feedbackPause, pause, saveData } from './js/trialRoutines/pause.js'
import beepUrl from './assets/beep.mov'
import selectAvatar from './js/selectAvatar.js';
import { evaluateTrialResponses } from './js/evaluateResponses.js';
import { fullScreenToggle } from './js/trialRoutines/fullScreenToggle.js';

export default function run(jatos = null, options) {
    let { gender, prompt, volume } = options

    window.onbeforeunload = function() { return "Are you sure you want to leave?"; }


    document.addEventListener("fullscreenchange",(e)=>{

        if(!document.fullscreenElement){
            document.body.style.cursor="default"


        }
    } )

    document.addEventListener("keydown", (e)=>{
        e.preventDefault()
        if(e.key ==="f" && !document.fullscreenElement){
            document.body.style.cursor="none"

            document.body.requestFullscreen()
        }
        
    })

   //let sessionData =  jatos.studySessionData

    function loadResults() {

        window.onbeforeunload = function() {  }

        let matching_trials = jsPsych.data.get().filter({ screen: 'dot_room', type:"match", category:"test" }).trials

        let consistentTrials = evaluateTrialResponses(matching_trials.filter(row=>row.avatarDirection ===row.dots[0].side))
        let inconsistentTrials = evaluateTrialResponses(matching_trials.filter(row=>row.avatarDirection !==row.dots[0].side))

       let res = [ {version:"consistent",  rt:consistentTrials.meanRT}, {version:"inconsistent",  rt:inconsistentTrials.meanRT}]

        if (jatos) {
            
           return jatos.setStudySessionData({"results": res }) 
                .then(()=>jatos.uploadResultFile(jsPsych.data.get().ignore("stimulus").filter({ screen: 'dot_room'}), "dpt-log.json"))
                .then(jatos.startNextComponent)
  
        }
        
    }

    let settings = {
       // on_finish: loadResults
    }

    var jsPsych = initJsPsych(settings);

    let audio = new SoundEffect(beepUrl)
    audio.init()
    audio.setVolume(volume || 0.5)

    let avatars = selectAvatar(gender)


    const preloadImage = (item) => {
        const preloadLink = document.createElement("link");
        preloadLink.href = item;
        preloadLink.rel = "preload";
        preloadLink.as = "image";
        document.head.appendChild(preloadLink);
    }

    avatars.forEach(av => {
        preloadImage(av)
    })




    experimentConditionGenerator.setPrompt(prompt)

    let block = experimentConditionGenerator.createExperiment()

    block.practice = block.practice
    block.block1 = block.block1
        block.block2 = block.block2
        block.block3 = block.block3
        block.block4 = block.block4

        jatos.httpRetryWait = 3000;

function blockProcedure(type, timeline_variables, message=""){
    let pauseType = type==="practice" ? ()=>feedbackPause(jsPsych) :()=> pause({ message: message })

    return  {
        timeline: [
            {
                timeline: [longSOAProcedure({ jsPsych, audio, avatars, block: type })],
                timeline_variables: timeline_variables,
            },
            saveData({jatos, jsPsych, block:type}),

            pauseType()

           ,
        ], 

    }
}

function finalBlockProcedure(type, timeline_variables, callback){
    return  {
        timeline: [
            {
                timeline: [longSOAProcedure({ jsPsych, audio, avatars, block: type })],
                timeline_variables: timeline_variables,
            },
            saveData({jatos, jsPsych, block:type, callback})
        ]
    }
}


    jsPsych.run({
        timeline: [
            fullScreenToggle,
            blockProcedure("practice", block.practice),
            blockProcedure("block-1", block.block1, "You have completed 40% of the study."),
           blockProcedure("block-2", block.block2, "You have completed 60% of the study."),
           blockProcedure("block-3", block.block3, "You have completed 80% of the study."),
            finalBlockProcedure("block-4", block.block4 , loadResults),
        ]})



    }



            /*
            {
                timeline: [
                    {
                        timeline: [longSOAProcedure({ jsPsych, audio, avatars, block: "practice" })],
                        timeline_variables: block.practice,
                    },
                    saveData({jatos, jsPsych, block:"practice"}),

                    feedbackPause(jsPsych),
                ], 

            },

            /*
            {
                timeline: [
                    {
                        timeline: [longSOAProcedure({ jsPsych, audio, avatars, block: "block-1" })],
                        timeline_variables: block.block1,
                    },

                    pause({ message: "You have completed 40% of the study." }),
                ],
                on_timeline_finish: () => jatos.appendResultData(jsPsych.data.get().ignore('stimulus').filter({ "screen": "dot_room", block:"block-1" }).trials)
                //on_finish:()=>jatos.appendResultData(jsPsych.data.get().filter({"screen":"dot_room"}))
            },
            
            {
                timeline: [
                    {
                        timeline: [longSOAProcedure({ jsPsych, audio, avatars, block: "block-2", block:"block-2" })],
                        timeline_variables: block.block2,
                    },


                    pause({ message: "You have completed 60% of the study." }),
                ],
                on_timeline_finish: () => jatos.appendResultData(jsPsych.data.get().ignore('stimulus').filter({ "screen": "dot_room", block:"block-2" }).trials)
                //on_finish:()=>jatos.appendResultData(jsPsych.data.get().filter({"screen":"dot_room"}))
            },
            {
                timeline: [
                    {
                        timeline: [longSOAProcedure({ jsPsych, audio, avatars, block: "block-3" })],
                        timeline_variables: block.block3,
                    },
                    pause({ message: "You have completed 80% of the study." }),

                ],
                on_timeline_finish: () => jatos.appendResultData(jsPsych.data.get().ignore('stimulus').filter({ "screen": "dot_room", block:"block-3" }).trials)
            },
            {
                timeline: [
                    {
                        timeline: [longSOAProcedure({ jsPsych, audio, avatars, block: "block-4" })],
                        timeline_variables: block.block4,
                    },
                ],
                on_timeline_finish: () => {
                    jatos.appendResultData(jsPsych.data.get().ignore('stimulus').filter({ "screen": "dot_room", block:"block-4" }).trials)
                    loadResults()

                }

            },



        ],


    },
    )
}

*/