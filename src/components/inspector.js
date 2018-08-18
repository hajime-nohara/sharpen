import { h }      from "hyperapp"
//import flatpickr  from "flatpickr";

export default (state, actions) => {

            //<li className="nav-item ">
            //  <a className="nav-link" href="#" onclick={(e)=>document.getElementById('child-frame').contentWindow.undo()}><i class="fas fa-arrow-alt-circle-left"></i></a>
            //</li>
            //<li className="nav-item">
            //  <a className="nav-link" href="#" onclick={(e)=>document.getElementById('child-frame').contentWindow.redo()}><i class="fas fa-arrow-alt-circle-right"></i></a>
            //</li>

          //<input oncreate={(e)=>flatpickr(e, {})} onchange={(e)=>actions.changeStartDate(e.target.value)} class="form-control form-control-sm mr-sm-2" type="search" placeholder="start date" id="startDate" aria-label="Search"/>
          //<input oncreate={(e)=>flatpickr(e, {})} onchange={(e)=>actions.changeEndDate(e.target.value)} class="form-control form-control-sm mr-sm-2" type="search" placeholder="end date" id="endDate" aria-label="Search"/>

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand"><img style={{width: "40px"}}src="/assets/logo.png"></img>sharpen</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav form-inline">
            <li className="nav-item">
              <a className="nav-link" href="#" onclick={()=>actions.save()}>Save</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onclick={()=>actions.tasks.add(state)}>Add</a>
            </li>
          </ul>
        </div>
        <form class="form-inline my-2 my-lg-0">
          <input type="number" min="50" max="100" value={state.globalCellWidth} onchange={(e)=>actions.changeTalbeCellWidth(e.target.value)} class="form-control form-control-sm mr-sm-2" placeholder="width each day" id="width" aria-label="Search"/>
        </form>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
      </nav>
    )
}
