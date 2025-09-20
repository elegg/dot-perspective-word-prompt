import {marked} from 'marked'
import md from '../../assets/debrief.md'
import dataText from '../../assets/dataText.md'
import furtherInformation from '../../assets/further-info.md'


export const debriefText = marked.parse(md)

export const dataExplanationText = marked.parse(dataText)
export const furtherInfo = marked.parse(furtherInformation)