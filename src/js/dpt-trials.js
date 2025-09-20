
let numberPrompts =[0,1,2]

function constructTrial(colorPrompt, numberPrompt, dotN,dotColor, id){
    return {colorPrompt, numberPrompt, dotN, dotColor, id}
}


// matching trials
let trials = [

["red",	1,	1,"red"],
["red",	2,	2,"red"],

["blue",	1,	1, "blue"],
["blue",	2,	2, "blue"]

]

// mismatched_trials
let mismatched_trials = [
["red",	0,	1, "red"],
["red",	0,	2 ,"red"],
["red",	1,	2 ,"red"],
["red",	1,	1 ,"blue"],
["red",	1,	2 ,"blue"],
["red",	2,	1 ,"red"],
["red",	2,	1 ,"blue"],
["red",	2,	2 ,"blue"],
["blue",	0,	1, "blue"],
["blue", 0,	2, "blue"],
["blue",	1,	2, "blue"],
["blue",	1,	1, "red"],
["blue",	1,	2, "red"],
["blue",	2,	1, "blue"],
["blue",	2,	1, "red"],
["blue",	2,	2, "red"],
]

let matching_fillers =[

    // matching fillers
    {colorPrompt:"red", numberPrompt:0, dots:[] },
    {colorPrompt:"red", numberPrompt:0, dots:[] },
    {colorPrompt:"red", numberPrompt:0, dots:[] },
    {colorPrompt:"red", numberPrompt:0, dots:[] },
    {colorPrompt:"blue", numberPrompt:0, dots:[] },
    {colorPrompt:"blue", numberPrompt:0, dots:[] },
    {colorPrompt:"blue", numberPrompt:0, dots:[] },
    {colorPrompt:"blue", numberPrompt:0, dots:[] },
]
    // double amount!!
    // mismatching trials with 0 prompt (note: for each variant there is 2x trials when two dots are the same color)
let mismatch_fillers_prompt_zero = [
    {colorPrompt:"red", numberPrompt:0, dots:[{side:"left", color:"blue"}, {side:"right", color:"red"}] },
    {colorPrompt:"red", numberPrompt:0, dots:[{side:"left", color:"red"}, {side:"right", color:"red"}] },
    {colorPrompt:"red", numberPrompt:0, dots:[{side:"left", color:"blue"}, {side:"right", color:"red"}] },
    {colorPrompt:"red", numberPrompt:0, dots:[{side:"left", color:"red"}, {side:"right", color:"blue"}] },
    {colorPrompt:"blue", numberPrompt:0, dots:[{side:"left", color:"blue"}, {side:"right", color:"blue"}] },
    {colorPrompt:"blue", numberPrompt:0, dots:[{side:"left", color:"blue"}, {side:"right", color:"blue"}] },
    {colorPrompt:"blue", numberPrompt:0, dots:[{side:"left", color:"blue"}, {side:"right", color:"red"}] },
    {colorPrompt:"blue", numberPrompt:0, dots:[{side:"left", color:"red"}, {side:"right", color:"blue"}] }
]
    //
l
    // mismatching trials with 1 as prompt (note two no dot conditions)
let mismatch_fillers_prompt_one =[
    {colorPrompt:"red", numberPrompt:1, dots:[{side:"left", color:"red"}, {side:"right", color:"red"}] },
    {colorPrompt:"red", numberPrompt:1, dots:[{side:"left", color:"blue"}, {side:"right", color:"blue"}] },
    {colorPrompt:"red", numberPrompt:1, dots:[] },
    {colorPrompt:"red", numberPrompt:1, dots:[] },
    {colorPrompt:"blue", numberPrompt:1, dots:[{side:"left", color:"red"}, {side:"right", color:"red"}] },
    {colorPrompt:"blue", numberPrompt:1, dots:[{side:"left", color:"blue"}, {side:"right", color:"blue"}] },
    {colorPrompt:"blue", numberPrompt:1, dots:[] },
    {colorPrompt:"blue", numberPrompt:1, dots:[] },
]
    // mismatching trials with 2 as prompt
  let  mismatch_fillers_prompt_two = [
    {colorPrompt:"red", numberPrompt:2, dots:[{side:"left", color:"red"}, {side:"right", color:"blue"}] },
    {colorPrompt:"red", numberPrompt:2, dots:[{side:"left", color:"blue"}, {side:"right", color:"red"}] },
    {colorPrompt:"red", numberPrompt:2, dots:[{side:"left", color:"blue"}, {side:"right", color:"blue"}] },
    {colorPrompt:"red", numberPrompt:2, dots:[] },
    {colorPrompt:"blue", numberPrompt:2, dots:[{side:"left", color:"red"}, {side:"right", color:"red"}] },
    {colorPrompt:"blue", numberPrompt:2, dots:[{side:"left", color:"red"}, {side:"right", color:"blue"}] },
    {colorPrompt:"blue", numberPrompt:2, dots:[{side:"left", color:"blue"}, {side:"right", color:"red"}] },
    {colorPrompt:"blue", numberPrompt:2, dots:[] },

]

let variants = [
    {avatarSide:"left", dotSide:"left", soa:"short"},
    {avatarSide:"right", dotSide:"right", soa:"short"},
    {avatarSide:"left", dotSide:"right", soa:"short"},
    {avatarSide:"right", dotSide:"left", soa:"short"},
    {avatarSide:"left", dotSide:"left", soa:"long"},
    {avatarSide:"right", dotSide:"right", soa:"long"},
    {avatarSide:"left", dotSide:"right", soa:"long"},
    {avatarSide:"right", dotSide:"left", soa:"long"}
]


class TrialSequenceFactory{
    constructor(matched_trials, mismatched_trials, fillers, variants){
        this.matched_template = matched_trials
        this.mismatched_template = mismatched_trials
        this.variants=variants
        this.fillers = fillers
        this.id = "0"
        this.prompt=null
    }

    setPrompt(x){
        this.prompt = x
    }


    constructSingleTrial(colorPrompt, numberPrompt, dotN,dotColor, id, opts){

        return {colorPrompt, numberPrompt, dotN, dotColor, id, ...opts, dots:this.createDots(dotN, dotColor, opts), prompt:this.prompt}
    }

    createDots(dotN, dotColor, opts){
        let basePos = opts.dotSide=="right" ? 0  : 3
        let dots = []
        
        while (dotN > dots.length){
            let rand = Math.random()*2
           let i =  Math.floor(rand)

           if(!dots.length){
                dots.push({color:dotColor, id:i+basePos})
           }
           else if (dots[dots.length-1].id !==i+basePos){
            dots.push({color:dotColor, id:i+basePos})


           }
        }


        
        for(let i =0; i<dotN;i++){
            dots.push({color:dotColor, id:i+basePos})
        }

        
        return dots
    }

    randomiseDotPosition(dot){
        let basePos = dot.side=="right" ? 0  : 3

        let rand = Math.floor(Math.random()*3)

        return {color:dot.color, id:rand+basePos}



    }


    constructFillers(){

        let avatarSide = ["left", "right"]
        let soas = ["long", "short"]

        let av_index = 0
        let soa_index = 0

        let ts = []

        while(true){


        for(let i =0; i<this.fillers.length; i++){

            ts.push({...this.fillers[i], dots:this.fillers[i].dots.map(d=>this.randomiseDotPosition(d)), soa:soas[soa_index], avatarSide:avatarSide[av_index], id:this.id})
            this.incrementId()
            

        }

        if(soa_index < soas.length){
            soa_index++
            continue
        }

        if(av_index <avatarSide.length){
            av_index++
            soa_index = 0
            continue
        }

        break


    }

    return ts
    }

    constructTrials(type, template, variants){

        let trials = []
        for(let i =0; i<this.variants.length;i++){

            let currentVariant = variants[i]

            for(let j =0; j<template.length;j++){
                
                let curr = template[j]
                
                trials.push({...this.constructSingleTrial(...curr, this.id, currentVariant), ...currentVariant, type:type})
                this.incrementId()


            }

        }

        return trials
    }

    incrementId(){
        this.id = `${parseInt(this.id)+1}`
    }


    constructAll(){
        return this.constructTrials("mismatch", this.mismatched_template, this.variants ).concat(this.constructTrials("match", this.matched_template, this.variants ))
    }

    shuffle(array) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array
      }

  
}


export let tsf = new TrialSequenceFactory(trials, mismatched_trials, fillers, variants)

tsf.setPrompt("NOW")
console.log(tsf.constructFillers().map(x=>x.dots))




class Sampler{
    constructor(array){
        this.array = array
    }

    multiple(x){

        let out = []
        for(let i = 0; i <x; i++){
           out = out.concat(this.array)

        }
        return new Sampler(out)

    }

    sampleWithReplacement(x){

        let res =[]
        for(let i =0;i<x;i++){
            let idx = Math.floor(Math.random()*this.array.length)

            res.push(this.array[idx])
        }


        return res
    }

    sampleWithoutReplacement(x){


        let used = new Set()
        let res =[]


        while(res.length<x){
            let idx = Math.floor(Math.random()*this.array.length)

            if(!used.has(idx)){
                res.push(this.array[idx])
                used.add(idx)
            }
        }

        return res

    }

    maxRepeating(max, isRepeatTest){

        let shuffled = this.sampleWithoutReplacement(this.array.length)
        let items = shuffled.map((_,i)=>i)

        let unhandled = []

        let res =[]

        while(items.length || unhandled.length){

            if(items.length<=0){
                items = res.concat(unhandled)
                unhandled =[]
                res=[]
            }
            
            let idx = items.pop()

            let repeats = 0

            let previousNToCheck = max < res.length ? max : res.length
            for(let i =0; i<previousNToCheck ;i++){
                let prev_item = res[res.length-(i+1)]

                if(isRepeatTest(shuffled[prev_item], shuffled[idx])){
                    repeats+=1
                }
            }

            if(repeats >=max){
                unhandled.push(idx)

                continue

            } else{

                res.push(idx)
            }

        }

        return res.map(idx=>shuffled[idx])

    }
}

let s = new Sampler( [{type:"a"},{type:"a"},{type:"a"},{type:"b"},{type:"b"},{type:"b"}])




console.log(s.maxRepeating(1, (a, b)=>a.type===b.type))


console.log(s.multiple(2))
/*

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array
  }
  


console.log(shuffle(new Array(30).fill(0).map((_,i)=>i %3)))
*/
/*
he trials will be presented in random order across four blocks of 80 trials. 
There will be 32 matching trials and 32 mismatching trials in each of the four within-subject experimental conditions (SOA of 300 ms versus 0 ms x consistent trials versus inconsistent trials). 
For example, the number prompts in the mismatching trials do not correspond to either the number of red, green, or total number of dots. 
Furthermore, 64 filler trials without dots or with dots on the two lateral walls will be added to balance the occurrences of number prompts across conditions.
 In each condition, an equal number of trials will present the avatar oriented to the left or right
 */

 // 128 +64 filler trials ?