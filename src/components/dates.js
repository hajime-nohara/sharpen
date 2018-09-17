import { h }      from "hyperapp"
import utils      from '../classes/utils'
import styl       from './styles/dates.styl'
import dateformat from 'dateformat'
import flatpickr  from "flatpickr";

export default (state, actions) => {

  const dates             = Array()
  const numberOfDays      = utils.getTermFromDate(state.tableStartDate, state.tableEndDate)
  const globalCellWidthPx = utils.parsePx(state.globalCellWidth)
  const today             = new Date

  utils.range(numberOfDays).forEach(
    function(key) {
      const dateObj          = new Date(state.tableStartDate);
      dateObj.setDate(dateObj.getDate() + key);
      const isFirstOrLastDay = key == 0 || dateObj.getDate() == 1 || key == numberOfDays-1
      const isStartOrEnd     = key == 0 || key == numberOfDays-1
      const dayId            = "day_" + key
      const isToday          = (dateObj.getFullYear() === today.getFullYear() && dateObj.getMonth() === today.getMonth() && dateObj.getDate() === today.getDate())
      const attributes = {class: (isToday ? styl.today : styl.statistic) + " ui statistic", id: dayId, key: utils.random()}
      if (isStartOrEnd) {
        const actionName = key == 0 ? "changeStartDate" : "changeEndDate"
        const bindCalendar = () => {
          const options = {

                            disableMobile: true,
                            defaultDate: dateformat(dateObj, 'yyyy-mm-dd'),
                            locale: state.i18n[state.locale].flatpickr,
                            onChange: function (date, text, mode) {
                              actions[actionName]([dateformat(date, 'yyyy-mm-dd'), state])
                            }
                         }
          flatpickr(document.getElementById(dayId), options)
        }
        attributes["oncreate"] = bindCalendar
        attributes["onupdate"] = bindCalendar
      }

      const day = h(isStartOrEnd ? "a" : "div", attributes, [
          <div style={{width: globalCellWidthPx}} class={styl.value}>
            {isFirstOrLastDay ? dateformat(dateObj, 'm/d') : dateformat(dateObj, 'd')}
          </div>,
          <div style={{color: state.i18n[state.locale].calendar.dayColorsHash[dateObj.getDay()] || ""}} class={styl.label + " label"}>
            {state.i18n[state.locale].calendar.text.days[dateObj.getDay()]}
          </div>
      ])
      dates.push(day)
    } 
  )
  
  return (
    <div class={styl.dates} style={{backgroundSize: globalCellWidthPx}}>
      {dates}
    </div>
  )

}
