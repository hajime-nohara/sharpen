import { h }     from "hyperapp"
import flatpickr from "flatpickr"

export default (state, actions) => {

          //<input oncreate={(e)=>flatpickr(e, {})} onchange={(e)=>actions.changeStartDate(e.target.value)} class="form-control form-control-sm mr-sm-2" type="search" placeholder="start date" id="startDate" aria-label="Search"/>
          //<input oncreate={(e)=>flatpickr(e, {})} onchange={(e)=>actions.changeEndDate(e.target.value)} class="form-control form-control-sm mr-sm-2" type="search" placeholder="end date" id="endDate" aria-label="Search"/>


    return (
      <div class="ui secondary  menu">
        <div class="item">
          <img src="/assets/images/logo.png"/>sharpen
        </div>
        <a class="item" onclick={()=>actions.save()}>{state.i18n[state.locale].save}</a>
        <a class="item" onclick={()=>actions.tasks.add(state)}>{state.i18n[state.locale].add}</a>
        <div class="right menu">
          <a class="item">Sign Up</a>
          <a class="item">Help</a>
        </div>
      </div>
)
}
