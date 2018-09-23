import { h } from "hyperapp"
import utils from '../classes/utils'

export default {

  version:              (new Date()).getTime(),

  // common state value for project
  projectId:            null,  
  projectName:          null,  
  projectOwner:         null,  
  published:            false,
  statusCode:           null,
  locale:               "en",

  // common state value for table
  pageXStartPoint:      0,
  globalCellWidth:      70,
  tableStartDate:       utils.getDateStr(new Date()),
  tableEndDate:         utils.getDateStr(new Date((new Date()).setMonth((new Date()).getMonth()+1))),

  // common state value for task
  member:               {},

  // task data format
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
