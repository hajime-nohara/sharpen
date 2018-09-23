import { h }                    from 'hyperapp'
import styl                     from './styles/index.styl'
import progress                 from './progress'
import dates                    from './dates'
import utils                    from '../classes/utils'
import inspector                from './inspector';
import detailModal              from './detailModal'
import firstRegistModal         from './firstRegistModal'
import messageModal             from './messageModal'
import sharedModal              from './sharedModal'
import urlForChangeDeviceModal  from './urlForChangeDeviceModal'
import i18n                     from '../i18n'

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
    actions.changeMemberName(e.target.value)
  }

  const onFocusoutProjectName = (e) => {
    actions.changeProjectName(e.target.value)
  }

  actions.saveToLocalStorage()


  const sharedProjectMenuItem = state.published ? <a class="item" onclick={()=>document.getElementById('sharedUrlModalTrigger').click()}><i class="share square icon"></i>{i18n[state.locale].projectUrl}</a> : null

  const sidebarOncreate = (e) => {
    //$(e).sidebar({
    //  dimPage:    false,
    //  transition: 'overlay',
    //  exclusive:  false,
    //  closable:   false
    //})
    // force change because semantic ui defined as important
    e.style.cssText = 'border-radius: 0 !important'
  }

  return (
    <main class={styl.container + " ui fluid container"}>

      <div class={styl.dummyHeader + " ui inverted menu"}/>
      <div class="ui fixed inverted menu">
        <div class="ui container">
          <a href="http://www.sharpen.tokyo" class={styl.headerLogo + " header item borderless"}>
            <img class="logo" src="assets/images/logo.svg"/>
            Sharpen
          </a>
        </div>
      </div>
      {sharedModal}
      {urlForChangeDeviceModal}
      {messageModal}
      {detailModalComponents}
      {firstRegistModal}
      <div class={styl.card + " ui card sb"}>

        <div class="ui sidebar left vertical inverted menu" oncreate={sidebarOncreate}>
          <a class="item" id="publish" onclick={()=>actions.publish()} data-content={state.published ? i18n[state.locale].updated : i18n[state.locale].published} data-variation="basic">
            {state.published ? <i class="check circle icon"></i> : <i class="share square icon"></i>}
            {state.published ? i18n[state.locale].update : i18n[state.locale].publish}
          </a>
          {sharedProjectMenuItem}
          <a class="item" onclick={()=>document.getElementById('urlForChangeDeviceModalTrigger').click()}>
            <i class="window maximize outline icon"></i>{i18n[state.locale].urlForChangeDevice}
          </a>
          <a class="item">
            <div class="ui dropdown link" oncreate={(e)=>$(e).dropdown()} key={utils.random()}>
              <i class="wrench icon"></i>{i18n[state.locale].systemPreferences}
              <i class="dropdown icon"></i>
              <div class="menu"> 
                <div class="item">
                  <i class="dropdown icon"></i>
                  <span class="text">{i18n[state.locale].language}</span>
                  <div class="menu">
                    <div class="header">{i18n[state.locale].western}</div>
                    <div class="item" onclick={()=>actions.changeLanguage("en")}>{i18n[state.locale].english}</div>
                    <div class="divider"></div>
                    <div class="header">{i18n[state.locale].asia}</div>
                    <div class="item" onclick={()=>actions.changeLanguage("ja")}>{i18n[state.locale].japanese}</div>
                  </div>
                </div>
                <div class="item">
                  <i class="dropdown icon"></i>
                  <span class="text">{i18n[state.locale].dayWidth}</span>
                  <div class="menu">
                    <div class="item" onclick={()=>actions.changeTalbeCellWidth([50, state])}>1</div>
                    <div class="item" onclick={()=>actions.changeTalbeCellWidth([60, state])}>2</div>
                    <div class="item" onclick={()=>actions.changeTalbeCellWidth([70, state])}>3</div>
                    <div class="item" onclick={()=>actions.changeTalbeCellWidth([80, state])}>4</div>
                    <div class="item" onclick={()=>actions.changeTalbeCellWidth([90, state])}>5</div>
                    <div class="item" onclick={()=>actions.changeTalbeCellWidth([100, state])}>6</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>

<div class={styl.pusher + " pusher"}>
        <div class={styl.cardHeader + " content"}>
          {inspector(state, actions)}
        </div>

        <div class={styl.cardMainContent + " ui card"}>
        <div oncreate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} onupdate={(e)=>e.style.backgroundSize=state.globalCellWidth+"px"} style={{backgroundImage: "url(/assets/images/division.jpg)", width: dateCount * state.globalCellWidth + "px", height: "100%"}}>
        {dates(state, actions)}
        {tasksComponents}
        </div>
        </div>
</div>

      </div>
    </main>
  )
}
