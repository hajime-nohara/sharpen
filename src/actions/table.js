import utils from '../classes/utils'

const cellMinWidth = 50
const cellMaxWidth = 100

export default () => {
  return {
    changeTalbeCellWidth: (params) => (state) => {
      const [width, globalState] = params
      if (width >= cellMinWidth && width <= cellMaxWidth) {
        Object.keys(state.tasks).forEach(
          function (key, val) {
            const value = state.tasks[key]
            const widthCount = utils.getTermFromDate(value.startDate, value.endDate)
            value.width = widthCount * width - 1
            value.startPosition = (utils.getTermFromDate(globalState.tableStartDate, value.startDate) - 1) * width
            value.endPosition = value.startPosition + value.width
          }
        )
        Object.assign(state, {globalCellWidth: width})
        return {}
      }
    },

    changeStartDate: (params) => (state) => {
      const [date, globalState] = params
      const startDate = new Date(date)
      const endDate = new Date(globalState.tableEndDate)
      if (startDate > endDate) {
        return
      }
      state.tableStartDate = utils.getDateStr(new Date(date))
      Object.keys(state.tasks).forEach(
        function (index, val) {
          state.tasks[index].startPosition = (utils.getTermFromDate(globalState.tableStartDate, state.tasks[index].startDate) - 1) * state.globalCellWidth
          state.tasks[index].endPosition = state.tasks[index].startPosition + state.tasks[index].width
        }
      )
      Object.assign(state, {tableStartDate: date})
      return {}
    },

    changeEndDate: (params) => (state) => {
      const [date, globalState] = params
      const endDate = new Date(date)
      const startDate = new Date(globalState.tableStartDate)
      if (startDate > endDate) {
        return
      }
      globalState.tableEndDate = utils.getDateStr(new Date(date))
      Object.assign(state, {tableEndDate: date})
      return {}
    }
  }
}
