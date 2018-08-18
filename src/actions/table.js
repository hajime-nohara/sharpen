import utils from '../classes/utils'

let cellMinWidth = 50 
let cellMaxWidth = 100

export default () => {

  return {

    changeTalbeCellWidth: (width) => (state, actions) => {

      if (width >= cellMinWidth && width <= cellMaxWidth) {

        Object.keys(state.tasks).forEach(
          function(key, val, arr) {
            const value         = state.tasks[key]
            const widthCount    = utils.getDateDiff(value.startDate, value.endDate)
            value.width         = widthCount * width -1
            value.startPosition = (utils.getDateDiff(utils.getDateStr(window.startDate), value.startDate)-1) * width
            value.endPosition   = value.startPosition + value.width
          }
        )
        window.globalCellWidth = width // todo まだ使用している箇所あり
        Object.assign(state, {globalCellWidth: width})
        return {}
      }
    },

    changeStartDate: (date)=>(state, actions)=>{

      window.startDate = new Date(date) 

        window.defaultTaskEndDate = new Date(window.startDate)
        var sd = startDate.getDate()
        window.defaultTaskEndDate.setDate(sd+2)

        Object.keys(state.tasks).forEach(
            function(index,val,arr) {
              state.tasks[index].startPosition = (utils.getDateDiff(utils.getDateStr(window.startDate), state.tasks[index].startDate)-1) * state.globalCellWidth
          state.tasks[index].endPosition = state.tasks[index].startPosition + state.tasks[index].width
            }
            );

      Object.assign(state, {tableStartDate: date})
        return {}
    },

    changeEndDate: (date)=>(state, actions)=>{
      window.endDate   = new Date(date)
        Object.assign(state, {tableEndDate: date})
        return {}
    },
  }
}
