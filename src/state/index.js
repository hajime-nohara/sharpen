import { h } from "hyperapp"
import utils from '../classes/utils'
import i18n  from './i18n'

// default endDate is 1 month later for table
const startDate = new Date 
const endDate   = new Date
endDate.setMonth(endDate.getMonth() + 1)
endDate.setDate(startDate.getDate() - 1)

export default {
  // common value
  version: Date(),
  // common state value for api
  //apiEndPointState:     "http://localhost:3000/states/",
  //apiEndPointMember:    "http://localhost:3000/members/",
  apiEndPointState:     "https://sharpen-213302.appspot.com/states/",
  apiEndPointMember:    "https://sharpen-213302.appspot.com/members/",

  projectId:            null,  
  projectOwner:         null,  
  published:            false,
  statusCode:           null,

  // common state value for table
  projectName:          null,  
  pageXStartPoint:      0,
  globalCellWidth:      70,
  tableStartDate:       utils.getDateStr(startDate),
  tableEndDate:         utils.getDateStr(endDate),

  // common state value for locale
  locale:               "en",

  // common state value for task
  member:               {},

  // task data sample
  tasks: 
    {
      format: { 
          id:             1,
          title:          "This is first task of 'sharpen'. Please check detail.",
          description:    "This site is made by just only html and javascript as sample tool.",
          member:         [],
          todo:           {},
          comment:        {1: 
                              {
                                comment: 'We are developing implement now.',
                                timestamp:  '1980-01-01 00:00:00',
                                memberId:   'sharpen',
                                memberName: 'sharpen',
                              }
          },
          watched:        [],
          progress:       0,
          startPosition:  0,
          endPosition:    0,
          width:          0,
          startDate:      '1980-01-01',
          endDate:        '1980-01-01'
         },
    },
}
