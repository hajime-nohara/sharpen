import { h }       from 'hyperapp'
import styl        from './styles/index.styl'
import progress    from './progress'
import dates       from './dates'
import utils       from '../classes/utils'
import inspector   from './inspector';
import detailModal from './detailModal'

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

  const dateCount = utils.getTermFromDate(state.tableStartDate, state.tableEndDate)

  return (

    <main class={styl.container + " ui container"}>
      {detailModalComponents}
      <div class="ui card" style={{height: "80%", width: "100%"}}>
        <div class={styl.cardHeader + " content"}>
          {inspector(state, actions)}
        </div>

        <div class={styl.cardMainContent + " ui card"} style={{ overflow: "scroll", width: "100%"}} >
        <div oncreate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} onupdate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} style={{backgroundImage: "url(/assets/images/division.jpg)", width: dateCount * state.globalCellWidth + "px", height: tasksComponents.length * 40 + "%"}}>
        {dates(state, actions)}
        {tasksComponents}
        </div>
        </div>
      </div>
    </main>
  )
}
