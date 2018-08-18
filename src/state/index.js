import utils from '../classes/utils'

// default data
const globalCellWidth     = 70;

window.resizeStartingPoint     = "";
window.globalUpdateId     = 0;
window.clickCancel     = false

// default endDate is 1 month later for table
window.startDate = new Date 
window.endDate   = new Date
window.endDate.setMonth(endDate.getMonth() + 1)
window.endDate.setDate(startDate.getDate() - 1)

window.defaultTaskStartDate = new Date()
var sd = defaultTaskStartDate.getDate()
window.defaultTaskEndDate   = new Date()
window.defaultTaskEndDate.setDate(sd+1)

export default {
  pageXStartPoint: 0,
  resizeStartingPoint: "",
  globalCellWidth: globalCellWidth,

  member: {},
  tableStartDate: utils.getDateStr(window.startDate),
  tableEndDate:   utils.getDateStr(window.endDate),
  tasks: 
    {
      1: { 
          id:             1,
          title:          "This is first task of 'sharpen'. Please check detail.",
          description:    "This site is made by just only html and javascript as sample tool. You can use this as stand alone tool.",
          member:         [],
          todo:           {},
          comment:        {1: {comment: 'We are developing implement now.'}, 2: {comment: 'It will connect server and you will can share your data for many people.'} },
          progress:       0,
          startPosition:  globalCellWidth*2,
          endPosition:    (globalCellWidth*2) + (4*globalCellWidth),
          width:          4 * globalCellWidth-1,
          startDate:      utils.get_date(globalCellWidth*2, globalCellWidth, window.startDate),
          endDate:        utils.get_date((globalCellWidth*2)+(4 * globalCellWidth-1), globalCellWidth, window.startDate),
         },
      2: { 
          id:             2,
          title:          "This is attention.",
          description:    "This site work on pc chrome. Honestly, other browser is not good.",
          member:         [],
          todo:           {},
          comment:        { 1: {comment: 'We are developing implement now.'},
                            2: {comment: 'It will be good on other device browser.'},
                            3: {comment: 'To keep the data properly will not be guaranteed.'},
                            4: {comment: 'Your data is stored local storage of browser. If you clear local storage, data is cleared.'},
                          },
          progress:       0,
          startPosition:  globalCellWidth,
          endPosition:    (globalCellWidth) + (2*globalCellWidth),
          width:          2 * globalCellWidth-1,
          startDate:      utils.get_date(globalCellWidth, globalCellWidth, window.startDate),
          endDate:        utils.get_date((globalCellWidth)+(2 * globalCellWidth-1), globalCellWidth, window.startDate),
         },
      3: { 
          id:             3,
          title:          "How to use.",
          description:    "It's simple operation. There is nothing to difficult.",
          member:         [],
          todo:           {},
          comment:        {
                            1: {comment: 'Add todo task.'},
                            2: {comment: 'Click task bar.'},
                            3: {comment: 'Edit title, description'},
                            4: {comment: 'Add member you want to assign'},
                            5: {comment: 'Add todo.'},
                            6: {comment: 'Add comment.'},
                            7: {comment: 'Check todo checkbox. And then you can see progress.'},
                            8: {comment: 'Change date by D&D or extending start or end.'},
                            9: {comment: 'Repcale task position by D&D.'},
                            10:{comment: 'Chage table date.'},
                            11:{comment: 'Chage cell width.'}
                          },
          progress:       0,
          startPosition:  globalCellWidth*2,
          endPosition:    (globalCellWidth*2) + (3* globalCellWidth),
          width:          3 * globalCellWidth-1,
          startDate:      utils.get_date(globalCellWidth*2, globalCellWidth, window.startDate),
          endDate:        utils.get_date((globalCellWidth*2)+(3 * globalCellWidth-1), globalCellWidth, window.startDate),
         },
      4: { 
          id:             4,
          title:          "Contact",
          description:    "If you want to ask us, please mail to sharepn.tokyo@gmail.com.",
          member:         [],
          todo:           {},
          comment:        {
                            1: {comment: 'Hope you enjoy shaping your task and success!'},
                          },
          progress:       0,
          startPosition:  globalCellWidth*3,
          endPosition:    (globalCellWidth*3) + (4 * globalCellWidth),
          width:          4 * globalCellWidth-1,
          startDate:      utils.get_date(globalCellWidth*3, globalCellWidth, window.startDate),
          endDate:        utils.get_date((globalCellWidth*3)+(4 * globalCellWidth-1), globalCellWidth, window.startDate),
         },


    },

}
