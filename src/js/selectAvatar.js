import womanLeftUrl from '../assets/woman-left-greyed.png'
import womanRightUrl from '../assets/woman-right-greyed.png'
import manLeftUrl from '../assets/man-left-greyed.png'
import manRightUrl from '../assets/man-right-greyed.png'

export default function avatarGenderSelection(gender){


    switch(gender){
        case "male":
            return [manLeftUrl, manRightUrl]
        
        case "female":
                return [womanLeftUrl, womanRightUrl]


        default:
            return Math.random() >0.5 ? [womanLeftUrl, womanRightUrl] : [manLeftUrl, manRightUrl]
    }

}