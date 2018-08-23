import { h } from "hyperapp"
import utils from '../classes/utils'
import styl  from './styles/dates_semantic.styl'
import dateformat  from 'dateformat'

export default (state, actions, params) => {
  const dates        = Array()
  const numberOfDays = utils.getDateDiff(state.tableStartDate, state.tableEndDate)
  const dt           = new Date(state.tableStartDate);
  let   idx          = 0 

  while (idx < numberOfDays) {
    dt.setDate(dt.getDate() + idx);
    const day = state.i18n[state.locale].dayOfWeekArr[dt.getDay()]

    const dayColorStyle = {
      color: state.i18n[state.locale].dayColorsHash[dt.getDay()] ||  ""
    }

    const date = (idx == 0 || dt.getDate() == 1) ? dateformat(dt, 'm/d') : dateformat(dt, 'd')

    dates.push(
                <div class={styl.statistic + " ui statistic"}>
                  <div style={{width: utils.parsePx(state.globalCellWidth)}} class={styl.value}>
                  {date}
                  </div>
                  <div style={dayColorStyle} class={styl.label + " label"}>
                    {day}
                  </div>
                </div>
    )
    idx++
  }
  return (
      <div oncreate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} onupdate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} style={{backgroundSize: state.globalCellWidth + "px", position: "sticky", top: "0px", zIndex: 9, background: "url(/assets/division.jpg)top left / " + state.globalCellWidth + "px " + Object.keys(state.tasks).length * state.globalCellWidth + "px repeat-x", width: numberOfDays * state.globalCellWidth + "px", borderBottom: "dotted 1px #e9ecef", marginBottom: "5px"}}>
        {dates}
      </div>
  )
}
