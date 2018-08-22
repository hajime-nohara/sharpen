import { h } from "hyperapp"
import utils from '../classes/utils'
import styl  from './styles/dates_semantic.styl'

var dayOfWeekStr = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]

export default (state, actions, params) => {
  const dates     = Array()
  const dateStyle = { width: state.globalCellWidth + "px",  display: "inline-block", textAlign: "center", color: "gray"}
  const dateCount = utils.getDateDiff(state.tableStartDate, state.tableEndDate)
  const style     = Object.assign(dateStyle, {left: (idx * state.globalCellWidth) + "px"})
  let   idx       = 0 
  while (idx < dateCount) {
    let dateStr = ""
    let dt = new Date(state.tableStartDate);
    dt.setDate(dt.getDate() + idx);
    let dayStr   = dayOfWeekStr[dt.getDay()]
    let dayColor = dt.getDay() == 0 ? "#732141" : dt.getDay() == 6 ? "#74A5CF" : ""

    const dayStyle = Object.assign(JSON.parse(JSON.stringify(style)), {color: dayColor})
    if (idx == 0 || dt.getDate() == 1) {
      dateStr = (("" + (dt.getMonth() + 1)).slice(-2)) + "/" + (("" + dt.getDate()).slice(-2))
    } else {
      dateStr = (("" + dt.getDate()).slice(-2))
    }
    dates.push(
                <div class={styl.statistic + " ui statistic"}>
                  <div style={{width: utils.parsePx(state.globalCellWidth)}} class={styl.value}>
                  {dateStr}
                  </div>
                  <div style={dayStyle} class={styl.label + " label"}>
                    {dayStr}
                  </div>
                </div>
    )

    idx = idx + 1
  }
  return (
      <div oncreate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} onupdate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} style={{backgroundSize: state.globalCellWidth + "px", position: "sticky", top: "0px", zIndex: 9, background: "url(/assets/division.jpg)top left / " + state.globalCellWidth + "px " + Object.keys(state.tasks).length * state.globalCellWidth + "px repeat-x", width: dateCount * state.globalCellWidth + "px", borderBottom: "dotted 1px #e9ecef", marginBottom: "5px"}}>
        {dates}
      </div>
  )
}
