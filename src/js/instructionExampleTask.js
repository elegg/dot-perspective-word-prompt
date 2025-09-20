import htmlButtonResponse from '@jspsych/plugin-html-button-response';
import experimentGenerator, { Sampler } from './dptTrialGenerator.js'
import {marked} from 'marked'
import { renderAvatarRoom, selectAvatar } from './trialRoutines/room.js';


import {icons} from 'feather-icons'

function createSlides(avatars, avatar, prompt, number, dots){
let slides = [
    {
        image: `<svg width="100%" height="100%" viewBox="0 0 212 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="211" height="127" fill="#F6F6F6"/>
<rect x="0.5" y="0.5" width="211" height="127" stroke="black"/>
<path d="M105.356 70.2905V61.2393H107.644V70.2905H105.356ZM101.974 66.9091V64.6207H111.026V66.9091H101.974Z" fill="black"/>
</svg>`,
        description: "Please focus on the cross. This indicates the you are about to begin a new trial."
    },

    {
        image: `<svg width="100%" height="100%" viewBox="0 0 212 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="211" height="127" fill="#F6F6F6"/>
<rect x="0.5" y="0.5" width="211" height="127" stroke="black"/>

<text x="50%", y="50%" fill="${prompt.color}" color="black" alignment-baseline="middle" text-anchor="middle">${prompt.word}</text>
</svg>`,
        description: "The colour of this word indicates which colour of dots you need to judge."



    },
    {
        image: `<svg width="100%" height="100%" viewBox="0 0 212 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="211" height="127" fill="#F6F6F6"/>
<rect x="0.5" y="0.5" width="211" height="127" stroke="black"/>
<text x="50%", y="50%" fill="black" alignment-baseline="middle" text-anchor="middle">${number}</text>

</svg>
`,
        description: "The number used to compare to the coloured dots in the room."


    },
    {
        image: renderAvatarRoom([], selectAvatar(avatar, avatars) ),
        description: "A person will be shown standing in the room"
    },
    {
        image: renderAvatarRoom(dots, selectAvatar(avatar, avatars)),
        description: `Dots may appear on either wall of the room. A beep will indicate when you can respond (sometimes no dots will be present). If the number just presented matches the number of dots in the colour that was indicated earlier in the trial then you should press the up arrow key to indicate a match. If there is not a match press the down arrow key.`
    },
    {
        image: `<svg width="100%" height="100%" viewBox="0 0 212 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="211" height="127" fill="#F6F6F6"/>
<rect x="0.5" y="0.5" width="211" height="127" stroke="black"/>
<path d="M82.6872 62.4922H79.8875C79.8364 62.13 79.732 61.8082 79.5743 61.527C79.4166 61.2415 79.2142 60.9986 78.9671 60.7983C78.7199 60.598 78.4344 60.4446 78.1105 60.3381C77.7909 60.2315 77.4436 60.1783 77.0686 60.1783C76.3911 60.1783 75.8009 60.3466 75.298 60.6832C74.7952 61.0156 74.4053 61.5014 74.1283 62.1406C73.8513 62.7756 73.7128 63.5469 73.7128 64.4545C73.7128 65.3878 73.8513 66.1719 74.1283 66.8068C74.4095 67.4418 74.8016 67.9212 75.3044 68.245C75.8073 68.5689 76.3889 68.7308 77.0494 68.7308C77.4202 68.7308 77.7632 68.6818 78.0786 68.5838C78.3982 68.4858 78.6816 68.343 78.9287 68.1555C79.1759 67.9638 79.3804 67.7315 79.5423 67.4588C79.7085 67.1861 79.8236 66.875 79.8875 66.5256L82.6872 66.5384C82.6148 67.1392 82.4337 67.7188 82.1439 68.277C81.8584 68.831 81.4727 69.3274 80.987 69.7663C80.5054 70.201 79.9301 70.5462 79.2611 70.8018C78.5963 71.0533 77.8442 71.179 77.0047 71.179C75.8371 71.179 74.7931 70.9148 73.8726 70.3864C72.9564 69.858 72.232 69.093 71.6993 68.0916C71.1709 67.0902 70.9067 65.8778 70.9067 64.4545C70.9067 63.027 71.1752 61.8125 71.7121 60.8111C72.249 59.8097 72.9777 59.0469 73.8982 58.5227C74.8186 57.9943 75.8541 57.7301 77.0047 57.7301C77.7632 57.7301 78.4664 57.8366 79.1141 58.0497C79.7661 58.2628 80.3435 58.5739 80.8463 58.983C81.3492 59.3878 81.7583 59.8842 82.0736 60.4723C82.3932 61.0604 82.5977 61.7337 82.6872 62.4922ZM89.0569 71.1918C88.064 71.1918 87.2053 70.9808 86.4809 70.5589C85.7607 70.1328 85.2046 69.5405 84.8126 68.782C84.4205 68.0192 84.2245 67.1349 84.2245 66.1293C84.2245 65.1151 84.4205 64.2287 84.8126 63.4702C85.2046 62.7074 85.7607 62.1151 86.4809 61.6932C87.2053 61.267 88.064 61.054 89.0569 61.054C90.0498 61.054 90.9063 61.267 91.6265 61.6932C92.3509 62.1151 92.9092 62.7074 93.3012 63.4702C93.6933 64.2287 93.8893 65.1151 93.8893 66.1293C93.8893 67.1349 93.6933 68.0192 93.3012 68.782C92.9092 69.5405 92.3509 70.1328 91.6265 70.5589C90.9063 70.9808 90.0498 71.1918 89.0569 71.1918ZM89.0697 69.0824C89.5214 69.0824 89.8985 68.9545 90.2011 68.6989C90.5036 68.4389 90.7316 68.0852 90.885 67.6378C91.0427 67.1903 91.1215 66.6811 91.1215 66.1101C91.1215 65.5391 91.0427 65.0298 90.885 64.5824C90.7316 64.1349 90.5036 63.7812 90.2011 63.5213C89.8985 63.2614 89.5214 63.1314 89.0697 63.1314C88.6137 63.1314 88.2302 63.2614 87.9191 63.5213C87.6123 63.7812 87.3801 64.1349 87.2224 64.5824C87.069 65.0298 86.9923 65.5391 86.9923 66.1101C86.9923 66.6811 87.069 67.1903 87.2224 67.6378C87.3801 68.0852 87.6123 68.4389 87.9191 68.6989C88.2302 68.9545 88.6137 69.0824 89.0697 69.0824ZM95.6599 71V61.1818H98.2998V62.8949H98.4021C98.5811 62.2855 98.8815 61.8253 99.3034 61.5142C99.7252 61.1989 100.211 61.0412 100.761 61.0412C100.897 61.0412 101.044 61.0497 101.202 61.0668C101.359 61.0838 101.498 61.1072 101.617 61.1371V63.5533C101.489 63.5149 101.313 63.4808 101.087 63.451C100.861 63.4212 100.654 63.4062 100.467 63.4062C100.066 63.4062 99.7082 63.4936 99.3928 63.6683C99.0818 63.8388 98.8346 64.0774 98.6514 64.3842C98.4724 64.6911 98.3829 65.0447 98.3829 65.4453V71H95.6599ZM103.025 71V61.1818H105.665V62.8949H105.767C105.946 62.2855 106.247 61.8253 106.669 61.5142C107.09 61.1989 107.576 61.0412 108.126 61.0412C108.262 61.0412 108.409 61.0497 108.567 61.0668C108.725 61.0838 108.863 61.1072 108.983 61.1371V63.5533C108.855 63.5149 108.678 63.4808 108.452 63.451C108.226 63.4212 108.019 63.4062 107.832 63.4062C107.431 63.4062 107.073 63.4936 106.758 63.6683C106.447 63.8388 106.2 64.0774 106.017 64.3842C105.838 64.6911 105.748 65.0447 105.748 65.4453V71H103.025ZM114.408 71.1918C113.398 71.1918 112.528 70.9872 111.8 70.5781C111.075 70.1648 110.517 69.581 110.125 68.8267C109.733 68.0682 109.537 67.1712 109.537 66.1357C109.537 65.1257 109.733 64.2393 110.125 63.4766C110.517 62.7138 111.069 62.1193 111.781 61.6932C112.497 61.267 113.336 61.054 114.299 61.054C114.947 61.054 115.55 61.1584 116.108 61.3672C116.671 61.5717 117.161 61.8807 117.578 62.294C118 62.7074 118.328 63.2273 118.563 63.8537C118.797 64.4759 118.914 65.2045 118.914 66.0398V66.7876H110.624V65.1001H116.351C116.351 64.7081 116.266 64.3608 116.095 64.0582C115.925 63.7557 115.688 63.5192 115.386 63.3487C115.087 63.174 114.74 63.0866 114.344 63.0866C113.93 63.0866 113.564 63.1825 113.244 63.3743C112.929 63.5618 112.682 63.8153 112.503 64.1349C112.324 64.4503 112.232 64.8018 112.228 65.1896V66.794C112.228 67.2798 112.318 67.6996 112.497 68.0533C112.68 68.407 112.938 68.6797 113.27 68.8714C113.602 69.0632 113.997 69.1591 114.453 69.1591C114.755 69.1591 115.032 69.1165 115.283 69.0312C115.535 68.946 115.75 68.8182 115.929 68.6477C116.108 68.4773 116.244 68.2685 116.338 68.0213L118.857 68.1875C118.729 68.7926 118.467 69.321 118.07 69.7727C117.678 70.2202 117.171 70.5696 116.549 70.821C115.931 71.0682 115.217 71.1918 114.408 71.1918ZM125.127 71.1918C124.122 71.1918 123.256 70.9787 122.532 70.5526C121.812 70.1222 121.258 69.5256 120.87 68.7628C120.487 68 120.295 67.1222 120.295 66.1293C120.295 65.1236 120.489 64.2415 120.877 63.483C121.269 62.7202 121.825 62.1257 122.545 61.6996C123.265 61.2692 124.122 61.054 125.114 61.054C125.971 61.054 126.721 61.2095 127.364 61.5206C128.008 61.8317 128.517 62.2685 128.892 62.831C129.267 63.3935 129.474 64.054 129.512 64.8125H126.943C126.87 64.3224 126.678 63.9283 126.367 63.63C126.06 63.3274 125.658 63.1761 125.159 63.1761C124.737 63.1761 124.369 63.2912 124.053 63.5213C123.742 63.7472 123.499 64.0774 123.325 64.5121C123.15 64.9467 123.063 65.473 123.063 66.0909C123.063 66.7173 123.148 67.25 123.318 67.6889C123.493 68.1278 123.738 68.4624 124.053 68.6925C124.369 68.9226 124.737 69.0376 125.159 69.0376C125.47 69.0376 125.749 68.9737 125.997 68.8459C126.248 68.718 126.455 68.5327 126.617 68.2898C126.783 68.0426 126.891 67.7464 126.943 67.4013H129.512C129.47 68.1513 129.265 68.8118 128.899 69.3828C128.536 69.9496 128.036 70.3928 127.396 70.7124C126.757 71.032 126.001 71.1918 125.127 71.1918ZM136.478 61.1818V63.2273H130.565V61.1818H136.478ZM131.908 58.8295H134.631V67.983C134.631 68.2344 134.669 68.4304 134.746 68.571C134.822 68.7074 134.929 68.8033 135.065 68.8587C135.206 68.9141 135.368 68.9418 135.551 68.9418C135.679 68.9418 135.807 68.9311 135.935 68.9098C136.062 68.8842 136.16 68.8651 136.229 68.8523L136.657 70.8786C136.521 70.9212 136.329 70.9702 136.082 71.0256C135.834 71.0852 135.534 71.1214 135.18 71.1342C134.524 71.1598 133.949 71.0724 133.454 70.8722C132.964 70.6719 132.583 70.3608 132.31 69.9389C132.038 69.517 131.903 68.9844 131.908 68.3409V58.8295ZM141.505 57.9091L141.256 67.0753H138.916L138.661 57.9091H141.505ZM140.086 71.1662C139.664 71.1662 139.302 71.017 139 70.7188C138.697 70.4162 138.548 70.054 138.552 69.6321C138.548 69.2145 138.697 68.8565 139 68.5582C139.302 68.2599 139.664 68.1108 140.086 68.1108C140.491 68.1108 140.847 68.2599 141.154 68.5582C141.46 68.8565 141.616 69.2145 141.62 69.6321C141.616 69.9134 141.541 70.1712 141.397 70.4055C141.256 70.6357 141.071 70.821 140.84 70.9616C140.61 71.098 140.359 71.1662 140.086 71.1662Z" fill="black"/>
</svg>`,
        description: "You will receive feedback depending on whether you answered correctly or not."

    }



]

return slides
}


        


let timelineWidget = (item) => `
<div class="timeline-container">
<h3>Visualisation of a Trial</h3>
<button id="new-timeline-yes" data-trial="yes" class="slide-show-gen">New Example: Up Arrow Response</button>
<button id="new-timeline-no" data-trial="no" class="slide-show-gen">New Example: Down Arrow Response</button>
<p class="minor-text">Use the timeline (by clicking on a screen) or the left / right arrow keys to move through the screens you will see during each trial and to learn about what to do on each screen.</p>
<div class="focused-timeline">${item.images[item.focused]}</div>
<div class="timeline-description"><p>${item.descriptions[item.focused]}</p></div>

        <div class="timeline">${item.images.map((img, i) => `<div data-image-slide =${i} data-image-focus =${i === item.focused}>${img}</div>`).join("")}</div>
        </div>`


class Renderer {
    constructor(target, toHTML) {
        this.target = target
        this.events = {}
        this.renderCallback = () => { }
        this.globalCallback =()=>{}
        this.toHTML = toHTML
    }

    send(item) {
        this.render(item)
    }

    conversion(item) {

        return this.toHTML(item)
    }

    setRenderCallback(fn) {
        this.renderCallback = fn
    }

    setGlobalCallback(fn) {
        this.globalCallback = fn
    }
    onRender() {
       
        this.renderCallback()
        this.globalCallback()
        

    }


    render(item) {
        let el = document.getElementById(this.target)
        el.innerHTML = this.conversion(item)
        this.onRender()

    }




}

function createTaskInformation(prompt){
let lines = [
    "# Task Instructions",
    "**Welcome to this experiment.**",
    "In this experiment you will hear a sound and have to make a response with an arrow key. Please use the volume controls below to play the sounds and adjust the volume (using the slider)to ensure you can comfortably hear the sound. You may also need to adjust the volume settings on your computer.",
    "During the experiment, you will see the following sequence of events:",
    "1.	First you will see a fixation cross in the middle of the screen.",
    `2.	Next, you will see the word **"${prompt}"** written in red or blue colour. This colour indicates that when you are shown an image of a room, you should focus on dots that match the colour of the word.`,
    "3. This will be followed by a number (“0“, “1“, or “2“). This number indicates the amount of dots you need to verify.",
    "   - For example, the number “1“ indicates that you must verify whether one dot (in a previously specified colour) is visible in the room.",
    "4.	Following that, an image of a room will appear. In the center of the room, you will see a woman/man, whom you should ignore.",
    "5.	In some trials, dots will appear at the same time as the room, whereas in some trials they will appear shortly after the room.",
    "6.	Following that, you will hear an auditory signal. The signal indicates that you have to verify if the dots in the room correspond to the previously specified colour and number of dots:",
    '   -	If the dots match the colour and number prompt press the **UPWARD arrow key (“↑“)**.',
    '   -	If the dots do not match the colour and/or number prompt press the **DOWNWARD arrow key (“↓“)**.',
    '7.	After your response, you will be given feedback (**“Correct”** or **“Incorrect”**). If you do not respond within 2 seconds, a **"No response"** feedback will be presented.',
    "It is important that you try to respond **as quickly and accurately as possible**."

]
return lines}




class Presenter {
    constructor(imageDescriptions) {
        this.images = imageDescriptions.map(im => im.image)
        this.descriptions = imageDescriptions.map(im => im.description)
        this.focused = 0
        this.subscribers = { focused: [] }
    }

    updateSlide(slides){
        this.images = slides.map(im => im.image)
        this.descriptions = slides.map(im => im.description)
        this.setFocused(0)
    }

    setFocused(x) {

        if(typeof x ==="number"){
        this.focused = x
        } else{
          this.focused=  parseInt(x)
        }
        this.onFocused()

    }

    onFocused() {
        this.subscribers.focused.forEach(s => s.send(this.createMessage()))
    }

    createMessage(){
        return { images: this.images, focused: this.focused, descriptions:this.descriptions }
    }

    incrementFocus(){
        this.select(this.focused+1)
    }
    decrementFocus(){
        this.select(this.focused-1)
    }

    subscribeTo(item, callback) {
        callback.send(this.createMessage())
        this.subscribers[item].push(callback)

    }

    select(x) {
        if (x < this.images.length && x >= 0) {
            this.setFocused(x)
        }
    }



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

let Audioget = ()=>`<div class="sound-selector">
        <button class="sound-button">${icons.play.toSvg()}</button>
        <input type="range" class="volume-control"></input>
        </div>
        `



class RandomTrialFactory{
    constructor(avatars, matching, mismatching){
        this.avatars = avatars
        this.matching= matching
        this.mismatching=mismatching

        this.currentTrial ={}

    }

    randomPrompt(){

        let color = Math.random() > 0.5 ? "blue" : "red"

        return {word:this.prompt, color}

    }

    randomNumber(){
        return Math.floor(Math.random() * 3)
    }

    randomSide(){
        return Math.random() > 0.5 ? "right" :"left"
    }



    createYesTrial(){

       
        let items = this.matching.nextLoopSample()
        
        
        return createSlides(this.avatars, this.randomSide(), {word:items.prompt, color:items.colorPrompt}, items.numberPrompt, items.dots)
    
    

    }

    createNoTrial(){

        let items = this.mismatching.nextLoopSample()

        
        
        return createSlides(this.avatars, this.randomSide(),{word:items.prompt, color:items.colorPrompt} , items.numberPrompt, items.dots)
    
    

    }

    


}








export   let instructionUI =(audio, avatars, prompt)=>{

    experimentGenerator.setPrompt(prompt)

    let items = experimentGenerator.createExperiment().block1

    let matching = new Sampler(items.filter(t=>t.type==="match"))
    let mismatching = new Sampler(items.filter(t=>t.type==="mismatch"))


    let volumeChange = (e) => {
        audio.setVolume(e.target.value / 100)

    }
    
    
    return {
            type: htmlButtonResponse,
            stimulus: () => {

                return `<div class="instructions">
                ${marked.parse(createTaskInformation(prompt).slice(0,3).join("\n\n"))}
                <div id="audio"></div>
                ${marked.parse(createTaskInformation(prompt).slice(3).join("\n\n"))}

                <div id="image"></div>

                    </div>
                    `
            },
            on_load: function () {
              
                let trialGenerator = new RandomTrialFactory(avatars, matching, mismatching)

                let renderer = new Renderer("image", timelineWidget)
                let presenter = new Presenter(trialGenerator.createYesTrial())


                renderer.setRenderCallback(function(){

                    document.querySelectorAll("[data-image-slide]").forEach(
                        slide => {
                            let id = slide.dataset.imageSlide
                            slide.onclick = () => presenter.setFocused(id)

                        }
                    )

                    let parent = document.querySelector(".instructions")

                   let button =  document.getElementById("new-timeline-yes")
                   let buttonNO =  document.getElementById("new-timeline-no")

                   button.onclick= ()=>{
                       presenter.updateSlide(trialGenerator.createYesTrial())
                       parent.dataset.selected = "yes"
                       
                   }

                   buttonNO.onclick= ()=>{
                       presenter.updateSlide(trialGenerator.createNoTrial())
                       parent.dataset.selected = "no"
     
                   }
                })

            


                    
                renderer.setGlobalCallback(()=>{
                    document.onkeydown= (e)=>{
                        if(e.key==="ArrowRight" ){
                            presenter.incrementFocus()
                        }

                        if(e.key==="ArrowLeft" ){
                            presenter.decrementFocus()
                        }



                    }})


                let audioRenderer= new Renderer("audio", Audioget)


                presenter.subscribeTo('focused', renderer)

                audioRenderer.setRenderCallback(function(){
                    let button = document.querySelector(".sound-button")
                    let volume = document.querySelector(".volume-control")
                button.addEventListener("click", audio.togglePlay.bind(audio))
                volume.addEventListener('change', volumeChange)



                })

                audioRenderer.render()

                //audio.subscribeTo("sound", audioRenderer)
                
                

        },
         choices: ["Start Experiment"]

        }
    }
