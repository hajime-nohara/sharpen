import { h }      from "hyperapp"
import utils      from '../classes/utils'
import styl       from './styles/dates_semantic.styl'
import dateformat from 'dateformat'

export default (state, actions, params) => {

  const dates             = Array()
  const numberOfDays      = utils.getDateDiff(state.tableStartDate, state.tableEndDate)
  const globalCellWidthPx = utils.parsePx(state.globalCellWidth)

  utils.range(numberOfDays).forEach(
    function(key) {
      const dateObj = new Date(state.tableStartDate);
      dateObj.setDate(dateObj.getDate() + key);
      dates.push(
        <div class={styl.statistic + " ui statistic"}>
          <div style={{width: globalCellWidthPx}} class={styl.value}>
            {(key == 0 || dateObj.getDate() == 1) ? dateformat(dateObj, 'm/d') : dateformat(dateObj, 'd')}
          </div>
          <div style={{color: state.i18n[state.locale].dayColorsHash[dateObj.getDay()] || ""}} class={styl.label + " label"}>
            {state.i18n[state.locale].dayOfWeekArr[dateObj.getDay()]}
          </div>
        </div>
      )
    } 
  )
  
  return (
    <div class={styl.dates} style={{backgroundSize: globalCellWidthPx}}>
      {dates}
    </div>
  )

}
