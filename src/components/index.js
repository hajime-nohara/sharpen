import { h }       from 'hyperapp'
import styl        from './styles/index.styl'
import progress    from './progress'
import dates       from './dates'
import utils       from '../classes/utils'
import inspector   from './inspector';
import detailModal from './detailModal'

export default (state, actions) => {

  const tasksComponents       = []
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

  const onFocusoutMemberName = (e) => {
    console.log(e)
//    actions.changeMemberName(e.val)
  }

  const onFocusoutProjectName = (e) => {
    console.log(e.val)
    actions.changeProjectName(e.val)
  }

  actions.saveToLocalStorage()

  return (
    <main class={styl.container + " ui fluid container"}>

      <div class="ui inverted menu dummy"/>
      <div class="ui fixed inverted menu">
        <div class="ui container">
          <a href="http://www.sharpen.tokyo" class={styl.headerLogo + " header item borderless"}>
            <img class="logo" src="assets/images/logo.png"/>
            Sharpen
          </a>
        </div>
      </div>

      {detailModalComponents}

      <div class="ui basic modal" oncreate={(e)=>$(e).modal({detachable: false}).modal('show')}>
        <div class={styl.firstDialogHeader + " ui icon header"}>
          <i class="archive icon"></i>
          {state.i18n[state.locale].welcomToSharpen}
        </div>
        <div class="content">

          <div class="ui center aligned page grid">
            <div class={styl.description}>
              {state.i18n[state.locale].sharpenDescription}
            </div>
          </div>

          <div class="ui center aligned page grid">
            <div class="ui big form">
              <div class="field">
                <div class="field">
                  {state.i18n[state.locale].nickname}
                  <input placeholder={state.i18n[state.locale].nickname}type="text" onfocusout={onFocusoutMemberName}/>
                </div>
                <div class="field">
                  {state.i18n[state.locale].projectName}
                  <input placeholder={state.i18n[state.locale].projectName} type="text" onfocusout={onFocusoutProjectName}/>
                </div>
              </div>
              <div class="field">
                <div class="actions">
                  <div class="ui right floated green ok inverted button">
                    <i class="checkmark icon"></i>
                    {state.i18n[state.locale].getStarted}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>



      <div class={styl.card + " ui card"}>
        <div class={styl.cardHeader + " content"}>
          {inspector(state, actions)}
        </div>

        <div class={styl.cardMainContent + " ui card"} style={{ overflow: "scroll", width: "100%"}} >
        <div oncreate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} onupdate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} style={{backgroundImage: "url(/assets/images/division.jpg)", width: dateCount * state.globalCellWidth + "px", height: "100%"}}>
        {dates(state, actions)}
        {tasksComponents}
        </div>
        </div>
      </div>
    </main>
  )
}
