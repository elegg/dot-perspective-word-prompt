//import * as Survey from 'survey-core'
import * as  Survey  from 'survey-js-ui';
import "survey-core/survey-core.min.css";



const surveyJson = {
    pages:[{
        name:'page1',
        elements:[{
        type:"panel",
       

    elements: [{
name: "funnel1",
title: "What do you think the purpose of the experiment was?",
type: "comment",
isRequired:true,

"enableIf": "{check-1} empty",
required:"true",
"checkErrorsMode": "onValueChanged",
"textUpdateMode": "onTyping",


},
{
"type": "boolean",
"name": "check-1",
isRequired:true,

title:" ",
"description": "Confirm Response (you will not be able to change your answer once selected)",
"valueTrue": "Yes",
"valueFalse": "No",
"renderAs": "checkbox",
"enableIf": "{funnel1} notempty and {check-1} empty",

},



{
name: "funnel2",
isRequired:true,

title: "What were you trying to do during the task? Did you have any particular strategy or goal?",
type: "comment",
visibleIf:"{check-1} notempty",
enableIf:"{check-2} empty"
},
{
    "type": "boolean",
    "name": "check-2",
    title:" ",
    "description": "Confirm Response (you will not be able to change your answer once selected)",
    "valueTrue": "Yes",
    "valueFalse": "No",
    "renderAs": "checkbox",
    visibleIf:"{check-1} notempty",
    "enableIf": "{funnel2} notempty and {check-1} notempty",
    
    },

    {
        name: "funnel3",
        isRequired:true,

        title: "Did anything about the experiment seem strange or unusual?",
        type: "comment",
        visibleIf:"{check-2} notempty",
        enableIf:"{check-3} empty"


    },
    {
        "type": "boolean",
        "name": "check-3",

        title:" ",
        "description": "Confirm Response (you will not be able to change your answer once selected)",
        "valueTrue": "Yes",
        "valueFalse": "No",
        "renderAs": "checkbox",
        visibleIf:"{check-2} notempty",
        "enableIf": "{funnel3} notempty and {check-2} notempty"
        
        
        },
       
        {
            "type": "boolean",
            "name": "funnel4",
            isRequired:true,

            title:"Were you focusing on the number of dots the person could “see“ from their point of view?",
            
            type:"radiogroup",
            visibleIf:"{check-3} notempty",
            "enableIf": "{check-3} notempty",
            "colCount": 2,
            "choices":["Yes", "No"],
            enableIf:"{funnel5} empty"

            
            },

            {
                name: "funnel5",
                title: "Why did you do that? Did something lead you to do that?",
                type: "comment",
                visibleIf:"{funnel4} = 'Yes' and {funnel4} notempty and {check-3} notempty",
                "enableIf": "{funnel4} = 'Yes'",
        
            },


            


]
}]

}
],  "completeText": "Continue",
}

export default function run(jatos){
    window.onbeforeunload = function() { return "Are you sure you want to leave?"; }


let s = new Survey.Model(surveyJson)
//s.applyTheme(LayeredDarkPanelless);

s.completedHtml = ""

//s.showCompleteButton = false
s.onComplete.add((survey)=>{
    window.onbeforeunload = function() { }

    jatos.submitResultData(survey.data, jatos.startNextComponent)
})

let x= document.createElement("div")

    s.render(x);



    document.body.append(x)
}