export const isResponseCorrect = trialData =>{

    let {type, response } = trialData
    
    if(type==="match"){
        return response ==="ArrowUp"
    }

    return response ==="ArrowDown"
 
/*
     // if prompt matches dots check if response is up
    if(dotN===numberPrompt && dotColor === colorPrompt){
 
     return response ==="ArrowUp"
    }

    // check for case of 0s
    if(numberPrompt===0 && dotColor!==colorPrompt){
        return response ==="ArrowUp"

    }
   
 
    // otherwise check if response is down
    return response==="ArrowDown"
 
 
     */
 }


 export function evaluateTrialResponses(data){

    let correct = 0

    let rtSum = 0

    for(let i =0; i<data.length;i++){
        i
        if(isResponseCorrect(data[i])){
            correct+=1
            if(data[i].rt){
                rtSum+=data[i].rt
            }


        }
    }


    return {meanRT:rtSum/correct, correctProp:correct/data.length}

 }