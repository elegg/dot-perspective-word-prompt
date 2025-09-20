import * as Plot from "@observablehq/plot";
import { debriefText, dataExplanationText, furtherInfo } from "./js/trialRoutines/debrief.js";
import "../src/main.css";
import "../src/jspsych.css";



function redirectLink(){

   let div = document.createElement("div")
   div.className = "redirect-widget"
   let text = document.createElement("p").innerText = "Clicking will return you to Prolific"

   let button =  document.createElement("button")
   button.className="redirect-link"
   button.innerText = "Confirm Completion"

   button.onclick=()=>{
      window.onbeforeunload = function() { }

      jatos.endStudyAndRedirect("https://app.prolific.com/submissions/complete?cc=CKSZRF87");
   }

   div.append(button)
   div.append(text)
   document.body.append(div)


}

function textRender(text, el){
   const div = document.createElement("div")
   div.innerHTML =text
   el.append(div)


}

export default function createPlot(data){

   document.body.click()
   window.onbeforeunload = function() { return "Are you sure you want to leave?"; }


let responses =  data.results ? data.results : [{version:"consistent", rt:512},{ version:"inconsistent", rt:538}]


let visTypeText = data.results ? "The graph below represents your response times during this experiment" : "We were unable to create a graph based on your data. The graph below reflects one possible outcome."

let visTypeEl = document.createElement("p").innerText = visTypeText

let plot = Plot.barY(responses, {x: "version", y: "rt"}).plot()

const div = document.createElement("div")
div.className="instructions"
textRender(debriefText, div)
div.append(visTypeEl)
div.append(plot);
textRender(dataExplanationText, div)
textRender(furtherInfo, div)

document.body.append(div)




redirectLink()






}


