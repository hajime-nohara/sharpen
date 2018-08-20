import { h } from 'hyperapp'
//import s from './index.styl'

import progress         from './progress_semantic'
import dates            from './dates'
import utils            from '../classes/utils'
//import redoUndoActions  from '../actions/hyperapp-undo'
import inspector        from './inspector_semantic';
import footer           from './footer';
import detailModal from './detailModal_semantic'

export default (state, actions) => {

  const tasksComponents = []
  const detailModalComponents = []
  
  Object.keys(state.tasks).sort((a,b)=>{
                                        if( Number(a) > Number(b) ) return -1;
                                        if( Number(a) < Number(b) ) return 1;
                                        return 0;
                                       }).forEach(
    function(key) {
      tasksComponents.push(progress(state, actions, this[key]))
      detailModalComponents.push(detailModal(state, actions, this[key]))
    }, 
    state.tasks
  );

  const dateCount = utils.getDateDiff(state.tableStartDate, state.tableEndDate)
console.log("dateCount", dateCount)

  return (

    <main className="bg-light">
      {detailModalComponents}
      {inspector(state, actions)}
      <div style={{ position: "relative", width: "98%", overflow: "scroll", border: "solid 1px #8080803b", margin: "auto", height: "88%", marginBottom: "2%"}}>
        <div oncreate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} onupdate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} style={{backgroundImage: "url(/assets/division.jpg)", width: dateCount * state.globalCellWidth + "px", height: "100%"}}>
        {dates(state, actions)}
        {tasksComponents}
        </div>
      </div>
      {footer}
    </main>
  )
}
