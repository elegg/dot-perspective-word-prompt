

// type: matching | mismatching
// category: filler | test



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


let matching_trials = trials.flatMap(r=>{

    let right =[]
    let left = []
    for(let i =0; i<r[2]; i++){
        left.push({side:"left", color:r[3]}),
        right.push({side:"right", color:r[3]})
    }
    
    return [
    {colorPrompt:r[0], numberPrompt:r[1], dotN:r[2], dotColor:r[3], dots:left, type:"match", category:"test"},
    {colorPrompt:r[0], numberPrompt:r[1], dotN:r[2], dotColor:r[3], dots:right, type:"match", category:"test"}
    ]}
    )
let mismatching_trials = mismatched_trials.flatMap(r=>{
    let right =[]
    let left = []
    for(let i =0; i<r[2]; i++){
        left.push({side:"left", color:r[3]}),
        right.push({side:"right", color:r[3]})
    }
    
    
  return  [
    {colorPrompt:r[0], numberPrompt:r[1], dotN:r[2], dotColor:r[3], dots:left, type:"mismatch", category:"test"},
    {colorPrompt:r[0], numberPrompt:r[1], dotN:r[2], dotColor:r[3], dots:right, type:"mismatch", category:"test"}


]
})



let matching_fillers =[

    // matching fillers
    {colorPrompt:"red", numberPrompt:0, dots:[] },
    {colorPrompt:"blue", numberPrompt:0, dots:[] }
].map(r=>({...r, type:"match", category:"filler"}))

let mismatching_fillers=[
    // double amount!!
    // mismatching trials with 0 prompt (note: for each variant there is 2x trials when two dots are the same color)
    {colorPrompt:"red", numberPrompt:0, dots:[{side:"left", color:"blue"}, {side:"right", color:"red"}] },
    {colorPrompt:"red", numberPrompt:0, dots:[{side:"left", color:"red"}, {side:"right", color:"red"}] },
    {colorPrompt:"red", numberPrompt:0, dots:[{side:"left", color:"blue"}, {side:"right", color:"red"}] },
    {colorPrompt:"red", numberPrompt:0, dots:[{side:"left", color:"red"}, {side:"right", color:"blue"}] },
    {colorPrompt:"blue", numberPrompt:0, dots:[{side:"left", color:"blue"}, {side:"right", color:"blue"}] },
    {colorPrompt:"blue", numberPrompt:0, dots:[{side:"left", color:"blue"}, {side:"right", color:"blue"}] },
    {colorPrompt:"blue", numberPrompt:0, dots:[{side:"left", color:"blue"}, {side:"right", color:"red"}] },
    {colorPrompt:"blue", numberPrompt:0, dots:[{side:"left", color:"red"}, {side:"right", color:"blue"}] },

    //

    // mismatching trials with 1 as prompt (note two no dot conditions)
    {colorPrompt:"red", numberPrompt:1, dots:[{side:"left", color:"red"}, {side:"right", color:"red"}] },
    {colorPrompt:"red", numberPrompt:1, dots:[{side:"left", color:"blue"}, {side:"right", color:"blue"}] },
    {colorPrompt:"red", numberPrompt:1, dots:[] },
    {colorPrompt:"red", numberPrompt:1, dots:[] },
    {colorPrompt:"blue", numberPrompt:1, dots:[{side:"left", color:"red"}, {side:"right", color:"red"}] },
    {colorPrompt:"blue", numberPrompt:1, dots:[{side:"left", color:"blue"}, {side:"right", color:"blue"}] },
    {colorPrompt:"blue", numberPrompt:1, dots:[] },
    {colorPrompt:"blue", numberPrompt:1, dots:[] },

    // mismatching trials with 2 as prompt
    {colorPrompt:"red", numberPrompt:2, dots:[{side:"left", color:"red"}, {side:"right", color:"blue"}] },
    {colorPrompt:"red", numberPrompt:2, dots:[{side:"left", color:"blue"}, {side:"right", color:"red"}] },
    {colorPrompt:"red", numberPrompt:2, dots:[{side:"left", color:"blue"}, {side:"right", color:"blue"}] },
    {colorPrompt:"red", numberPrompt:2, dots:[] },
    {colorPrompt:"blue", numberPrompt:2, dots:[{side:"left", color:"red"}, {side:"right", color:"red"}] },
    {colorPrompt:"blue", numberPrompt:2, dots:[{side:"left", color:"red"}, {side:"right", color:"blue"}] },
    {colorPrompt:"blue", numberPrompt:2, dots:[{side:"left", color:"blue"}, {side:"right", color:"red"}] },
    {colorPrompt:"blue", numberPrompt:2, dots:[] },

].map(r=>({...r, type:"mismatch", category:"filler"}))

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

// blocks consist of 80 trials: 64 (2 matching * 2 avSide, * 2 soa * 16 variants)
// total = 256 test trials 256 / 8 = 32

// multiply mismatchedTrialsBy 32 *  2 *2 = 128 -> so * 0.5 in each block (so half per block)
// multiply matching trials by 4(*8) * 2 *2 = 128 -> so * 2 in each block

//want same number of promptTypes per block ??? shuffle then select into block?

//constructAllOptions // block1 is first selectionFromEach

// batch based on prompt number

let config = {
    matching:{
        test:{0:0, 1:4, 2:4}, // 8 * 2 soas * 2 directions = 32 [0, 16, 16] * 
        filler:{0:4, 1:0, 2:0}, // 4 * 2 dictr
    mismatching:{
        test:{0:2, 1:3, 2:3}, // 8 * 2 soas * 2 directions = 32 [8, 12, 12]
        filler:{0:2, 1:1, 2:1} // 4 * 2 directions + 2 soas [4, 0, 0] 
    } // total = 16
    }
}
/*
function batch(versions){

    let groups = {}

    for(let i= 0; i<versions.length;i++){

       let prompt=  versions[i].numberPrompt
       if(groups[prompt]){
           groups[prompt].push(versions[i])
       }
       else {
           groups[prompt] = [versions[i]]
       }

    }

    return groups
}


class TrialSequenceFactory{
    constructor(matched_trials, mismatched_trials, fillers =[], variants){
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


export let tsf = new TrialSequenceFactory(trials, mismatched_trials, [], variants)

//tsf.setPrompt("NOW")
//console.log(tsf.constructFillers().map(x=>x.dots))

*/


export class Sampler{
    constructor(array){
        this.array = array
        this.stateArray = []
    }

    length(){
        return this.array.length
    }

    multiple(x){

        let out = []
        for(let i = 0; i <x; i++){
           out = out.concat(this.array)

        }
        return new Sampler(out)

    }

    _generateLoopingSample(){

       this.stateArray = this._sampleWithoutReplacementIndex(this.length())
    }

    nextLoopSample(){

        if(this.stateArray.length){
            return this.array[this.stateArray.pop()]

        }
        else{
            this._generateLoopingSample()
            return this.array[this.stateArray.pop()]
        }
    }




    sampleWithReplacement(x){

        let res =[]
        for(let i =0;i<x;i++){
            let idx = Math.floor(Math.random()*this.array.length)

            res.push(this.array[idx])
        }


        return res
    }
    _sampleWithoutReplacementIndex(x){
        let res =[]


        while(res.length<x){
            let idx = Math.floor(Math.random()*this.array.length)

            if(!res.includes(idx)){
                res.push(idx)
            }
        }

        return res

    }


    sampleWithoutReplacement(x){

/*
        let used = new Set()
        let res =[]


        while(res.length<x){
            let idx = Math.floor(Math.random()*this.array.length)

            if(!used.has(idx)){
                res.push(this.array[idx])
                used.add(idx)
            }
        }*/

        let res = []
        let shuffled_idxs = this._sampleWithoutReplacementIndex(x)

        for(let i = 0; i <shuffled_idxs.length;i++){
            res.push(this.array[shuffled_idxs[i]])
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


function permutations(arrs){

    //let dims = arrs.map(arr=>arr.length-1)

    let pos = new Array(arrs.length).fill(0)

    let outputs = []

    let isAtEnd = false

    while(!isAtEnd){
        let output = []


        for(let i =0; i <pos.length;i++){
            output.push(arrs[i][pos[i]])
        }

        outputs.push(output)
        

    let finished = 0
        for(let i =0; i<pos.length;i++){
            if(pos[i] <arrs[i].length-1){
                pos[i]+=1
                for(let j =0; j<i;j++){
                    pos[j]=0
                }
                isAtEnd = false
                break

            }
            else{
                finished+=1
            }
        }

        if (finished>=arrs.length){
            break
        }
    }


    return outputs
    

}




let cfg = {
    'filler.mismatching.0':0,
    'filler.mismatching.1':1,
    'filler.mismatching.2':1,
    'filler.matching.0':2,
    'test.matching.0':0,
    'test.matching.1':4,
    'test.matching.2':4,
    'test.mismatching.0':2,
    'test.mismatching.1':3,
    'test.mismatching.2':3
}

let cats = {
    'filler.mismatching.0':(a)=>a.numberPrompt===0 && a.category==="filler" && a.type==="mismatch",
    'filler.mismatching.1':(a)=>a.numberPrompt===1 && a.category==="filler" && a.type==="mismatch",
    'filler.mismatching.2':(a)=>a.numberPrompt===2 && a.category==="filler" && a.type==="mismatch",
    'test.matching.0':(a)=>a.numberPrompt===0 && a.type==="match" && a.category==="test",
    'test.matching.1':(a)=>a.numberPrompt===1 && a.type==="match" && a.category==="test",
    'test.matching.2':(a)=>a.numberPrompt===2 && a.type==="match" && a.category==="test",
    'test.mismatching.0':(a)=>a.numberPrompt===0 && a.type==="mismatch" && a.category==="test",
    'test.mismatching.1':(a)=>a.numberPrompt===1 && a.type==="mismatch" && a.category==="test",
    'test.mismatching.2':(a)=>a.numberPrompt===2 && a.type==="mismatch" && a.category==="test",
    'filler.matching.0':a=>a.numberPrompt===0 && a.category==="filler" && a.type==="match"

}



class ExperimentFactory{
    constructor(soas, avatarDirections, prompts,config){
        this.soas = soas
        this.avatarDirections = avatarDirections
        this.prompts = prompts
        this.promptCategories ={},
        this.dotPositions={
            left: new Sampler([0,1,2]),
            right: new Sampler([3,4,5])
        }
        this.config=config

        this.prompt = null


    }

    setPrompt(x){
        this.prompt=x
    }



    categorise(){
        this.prompts.forEach(p=>{

            for(let k in cats){
                if(cats[k](p)){
                    this.promptCategories[k] ? this.promptCategories[k].push(p) : this.promptCategories[k]=[p]
                }

            }
            
        })



        for(let k in this.promptCategories){
            this.promptCategories[k] = new Sampler(this.promptCategories[k])

        }
    }


    createBlock(){

        let outputs = []


        for(let key in this.config ){

            for(let i =0; i< this.config[key];i++){
                if(this.promptCategories[key]){

                    let trial = this.promptCategories[key].nextLoopSample()
                
                outputs.push({...trial, dots:this.randomiseDotPosition(trial.dots), dotN:trial.dots.length, prompt:this.prompt})
                }
            }

        }

        let trials = new Sampler(this._permutations([this.soas, this.avatarDirections, outputs]).map(a=>({...a[2], soa:a[0], avatarSide:a[1]})))
        
        return trials.sampleWithoutReplacement(trials.length())

    }


    randomiseDotPosition(dots){

        let positions ={left:[], right:[]}

        let dotOutput = []
        
        for(let i=0; i <dots.length;i++){
           positions[dots[i].side].push(dots[i])

        }

        if(positions["left"].length){

            let leftPositions = this.dotPositions.left.sampleWithoutReplacement(positions["left"].length)
            for(let i =0; i <positions["left"].length;i++){
                dotOutput.push({...positions["left"][i], id:leftPositions[i]})
            }
        }

        if(positions["right"].length){

            let rightPositions = this.dotPositions.right.sampleWithoutReplacement(positions["right"].length)
            for(let i =0; i <positions["right"].length;i++){
                dotOutput.push({...positions["right"][i], id:rightPositions[i]})
            }
        }

        return dotOutput


    }


    

    _permutations(arrs){

        //let dims = arrs.map(arr=>arr.length-1)
    
        let pos = new Array(arrs.length).fill(0)
    
        let outputs = []
    
        let isAtEnd = false
    
        while(!isAtEnd){
            let output = []
    
    
            for(let i =0; i <pos.length;i++){
                output.push(arrs[i][pos[i]])
            }
    
            outputs.push(output)
            
    
        let finished = 0
            for(let i =0; i<pos.length;i++){
                if(pos[i] <arrs[i].length-1){
                    pos[i]+=1
                    for(let j =0; j<i;j++){
                        pos[j]=0
                    }
                    isAtEnd = false
                    break
    
                }
                else{
                    finished+=1
                }
            }
    
            if (finished>=arrs.length){
                break
            }
        }
    
    
        return outputs
        
    
    }


    createExperiment(){
    this.categorise()
     return   {
            block1:e.createBlock(),
            block2:e.createBlock(),
            block3:e.createBlock(),
            block4:e.createBlock(),
            practice:e.createBlock().slice(0, 40)
        }

    }

}

let e = new ExperimentFactory(["long", "short"],["left", "right"], matching_fillers.concat(mismatching_fillers, matching_trials, mismatching_trials), cfg)

export default e





// all soas
// all directions
// 4 prompts of 0, 4 prompts 1



//console.log(s.maxRepeating(1, (a, b)=>a.type===b.type))


//console.log(s.multiple(2))
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