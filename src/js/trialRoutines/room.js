import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response'

export function renderAvatarRoom(dots, avatar) {
    return ` <svg width="100%" height="100%" class="room" viewBox="0 0 435 284" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="435" height="284" rx="6" fill="lightgrey" />
        <rect x="124" y="63" width="188" height="138" fill="url(#paint0_linear_0_1)" />
        <path d="M352.801 72.0286V221L311.801 200.937V63L352.801 72.0286Z" fill="white" />
        <path d="M83 72.0286V221L124 200.937V63L83 72.0286Z" fill="white" />
        <path d="M312 200.5L353 221H83L124 200.5H312Z" fill="url(#paint1_linear_0_1)" />
        ${renderDots(dots)}
        <defs>
        <use xlink:href="#image_person" transform="matrix(0.0019802 0 0 0.000456621 -1.73861 -0.469406)"/>

            <linearGradient id="paint0_linear_0_1" x1="218" y1="63" x2="218" y2="201" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F4F4F4" />
                <stop offset="1" stop-color="#F2EFEF" />
            </linearGradient>
            <linearGradient id="paint1_linear_0_1" x1="218" y1="221" x2="218" y2="200.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFF6F6" />
                <stop offset="0.898025" stop-color="#DED9D9" />
            </linearGradient>


        </defs>
       ${avatar}

    </svg>`
}

export function selectAvatar(avatar, options) {
    return avatar === "right" ?
        `<image href=${options[1]} width="168" height="100" x="134" y="115" />` :
        `<image href=${options[0]} width="168" height="100" x="134" y="115" />`

}


function renderDots(selected) {
    let dots = {
        0: (fill) => `<ellipse cx="320.372" cy="118.574" rx="4.277" ry="5.5" transform="rotate(0.997167 320.372 118.574)" fill="${fill}" />`,
        1: (fill) => `<ellipse cx="332.315" cy="120.81" rx="4.277" ry="5.5" transform="rotate(0.997167 332.315 120.81)" fill="${fill}" />`,
        2: (fill) => `<ellipse cx="344.315" cy="123.81" rx="4.277" ry="5.5" transform="rotate(0.997167 344.315 123.81)" fill="${fill}" />`,
        3: (fill) => `<ellipse cx="4.277" cy="5.5" rx="4.277" ry="5.5" transform="matrix(-0.999849 0.017403 0.017403 0.999849 120.496 113)" fill="${fill}" />`,
        4: (fill) => `<ellipse cx="4.277" cy="5.5" rx="4.277" ry="5.5" transform="matrix(-0.999849 0.017403 0.017403 0.999849 108.553 115.236)" fill="${fill}" />`,
        5: (fill) => `<ellipse cx="4.277" cy="5.5" rx="4.277" ry="5.5" transform="matrix(-0.999849 0.017403 0.017403 0.999849 96.5527 118.236)" fill="${fill}" />`
    }

    return selected.map(el => dots[el.id](el.color)).join("")

}

// routine where svg room has no dots but avatar faces in appropriate direction 
export let blankRoomRoutine = ({jsPsych,  avatars})=> ( {
    type: htmlKeyboardResponse,
    stimulus: () => {
        let dots = []
        let avatar = jsPsych.evaluateTimelineVariable("avatarSide")

        return renderAvatarRoom(dots, selectAvatar(avatar, avatars) )
    },
    choices: "NO KEYS",
    trial_duration: 300,
})

// routine where svg room has approporiate number of dots but avatar faces in appropriate direction 
export let filledRoomRoutine = ({jsPsych, audio, avatars, block})=> ({
    type: htmlKeyboardResponse,
    stimulus: () => {
        //audio.playSound()
        let dots = jsPsych.evaluateTimelineVariable("dots")
        let avatar = jsPsych.evaluateTimelineVariable("avatarSide")

        return renderAvatarRoom(dots, selectAvatar(avatar, avatars) )
    },
    on_load: () => { audio.playSound() },
    choices: ["ArrowUp", "ArrowDown"],
    //trial_duration: 2000,
    data: () => ({
        screen: 'dot_room',
        dots: jsPsych.evaluateTimelineVariable("dots"),
        avatarDirection: jsPsych.evaluateTimelineVariable("avatarSide"),
        dotN: jsPsych.evaluateTimelineVariable("dotN"),
        block:block,
        colorPrompt:jsPsych.evaluateTimelineVariable("colorPrompt"),
        numberPrompt:jsPsych.evaluateTimelineVariable("numberPrompt"),
        wordPrompt: jsPsych.evaluateTimelineVariable("prompt") || "ERROR",

        type:jsPsych.evaluateTimelineVariable("type"),
        category:jsPsych.evaluateTimelineVariable("category"),
        soa:jsPsych.evaluateTimelineVariable("soa"),
        window:{dimensions:[window.innerHeight, window.innerWidth], isFullscreen:document.fullscreenElement?.nodeName || false}
    })

})


let longOrShortTrialNode = ({jsPsych, avatars})=>({
    timeline:[blankRoomRoutine({jsPsych, avatars})],
    conditional_function:()=>{

        return jsPsych.evaluateTimelineVariable("soa") ==="long"
    }

})

export let roomRoutine = ({jsPsych, audio, avatars, block}) =>({
    timeline:[longOrShortTrialNode({jsPsych, avatars}), filledRoomRoutine({jsPsych, audio, avatars, block})]
})
