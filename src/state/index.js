import utils from '../classes/utils'
import i18n  from './i18n'

// default data
const globalCellWidth = 70;

// default endDate is 1 month later for table
const startDate = new Date 
const endDate   = new Date
endDate.setMonth(endDate.getMonth() + 1)
endDate.setDate(startDate.getDate() - 1)

export default {
  // common state value for api
  apiEndPoint:          "http://localhost:3000/sharpen",
  projectId:            null,  
  projectOwner:         null,  

  // common state value for table
  projectName:          null,  
  pageXStartPoint:      0,
  globalCellWidth:      globalCellWidth,
  tableStartDate:       utils.getDateStr(startDate),
  tableEndDate:         utils.getDateStr(endDate),

  // common state value for locale
  locale:               "en",
  i18n:                 i18n,

  // common state value for task
  member:               {},

  // task data sample
  tasks: 
    {
      /*
      1: { 
          id:             1,
          title:          "This is first task of 'sharpen'. Please check detail.",
          description:    "This site is made by just only html and javascript as sample tool.",
          member:         [],
          todo:           {},
          comment:        {1: {comment: 'We are developing implement now.'}, 2: {comment: 'It will connect server and you will can share your data for many people.'} },
          progress:       0,
          startPosition:  globalCellWidth*2,
          endPosition:    (globalCellWidth*2) + (4*globalCellWidth),
          width:          4 * globalCellWidth-1,
          startDate:      utils.get_date(globalCellWidth*2, globalCellWidth, startDate),
          endDate:        utils.get_date((globalCellWidth*2)+(4 * globalCellWidth-1), globalCellWidth, startDate),
         },
      */
    },
}
