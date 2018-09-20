import { h } from "hyperapp"
import utils from '../classes/utils'

export default (state, actions) => {

  const projects = []

  const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
  if (localStorage.getItem('sharpen_user')) {
    Object.keys(sharpenUserLS.projects).forEach(
      function(index,val,arr) {
        const id   = sharpenUserLS.projects[index].id
        const name = sharpenUserLS.projects[index].name
        projects.push(
          <div class="item" id={id} data-value={id}>
            {name}
          </div>
        )
      }
    )
  }

  const addProject = () => {
    document.querySelector(".scrolling.menu").click()
    const projectName = document.querySelector(".project.menu.transition.visible input[type='text']")
    actions.addProject(projectName.value)
  }

  let setTimeoutAddProject = null
  const projectSearchOnChange = () => {
    const addProjectElement = document.querySelector(".project.menu.transition.visible div[class='message']")
    if (addProjectElement) {
      clearTimeout(setTimeoutAddProject)
      const addProjectTimer = () => {
        addProjectElement.innerHTML = state.i18n[state.locale].addProject
        addProjectElement.addEventListener('click', addProject)
      }
      setTimeoutAddProject = setTimeout(addProjectTimer, 600)
    }
  }

  const changeProject = (val1, val2, el) => {
    actions.changeProject(el[0].id)
  }
  const sharedProjectMenuItem = state.published ? <div class="item" onclick={()=>document.getElementById('sharedUrlModalTrigger').click()}>{state.i18n[state.locale].projectUrl}</div> : null
  const urlForChangeDeviceMenuItem = <div class="item" onclick={()=>document.getElementById('urlForChangeDeviceModalTrigger').click()}>{state.i18n[state.locale].urlForChangeDevice}</div>
  return (
    <div class="ui secondary menu">
      <div class="item">
        <div class="ui floating dropdown icon" tabindex="0" oncreate={(e)=>$(e).dropdown({onChange: changeProject})} key={utils.random()}>
          <input type="hidden" name={state.projectName} value={state.projectId}/>
          <span class="text"></span>
          <div class="project menu transition hidden">
            <div class="ui icon search input">
              <i class="search icon"></i>
              <input type="text" placeholder="Search Project" onkeyup={projectSearchOnChange}/>
            </div>
            <div class="scrolling menu">
              {projects}
            </div>
          </div>
        </div>
      </div>

      <a class="item" id="publish" onclick={()=>actions.publish()} data-content={state.published ? state.i18n[state.locale].updated : state.i18n[state.locale].published} data-variation="basic">
        {state.published ? state.i18n[state.locale].update : state.i18n[state.locale].publish}
      </a>
      <a class="item" onclick={()=>actions.tasks.add(state)}>{state.i18n[state.locale].addTask}</a>

      <div class="item">
        <div class="ui dropdown link" oncreate={(e)=>$(e).dropdown()} key={utils.random()}>
          <i class="wrench icon"></i>
          <i class="dropdown icon"></i>
          <div class="menu"> 
            {sharedProjectMenuItem}
            <div class="item">
              <i class="dropdown icon"></i>
              <span class="text">{state.i18n[state.locale].language}</span>
              <div class="menu">
                <div class="header">{state.i18n[state.locale].western}</div>
                <div class="item" onclick={()=>actions.changeLanguage("en")}>{state.i18n[state.locale].english}</div>
                <div class="divider"></div>
                <div class="header">{state.i18n[state.locale].asia}</div>
                <div class="item" onclick={()=>actions.changeLanguage("ja")}>{state.i18n[state.locale].japanese}</div>
              </div>
            </div>
            <div class="item">
              <i class="dropdown icon"></i>
              <span class="text">{state.i18n[state.locale].dayWidth}</span>
              <div class="menu">
                <div class="item" onclick={()=>actions.changeTalbeCellWidth([50, state])}>1</div>
                <div class="item" onclick={()=>actions.changeTalbeCellWidth([60, state])}>2</div>
                <div class="item" onclick={()=>actions.changeTalbeCellWidth([70, state])}>3</div>
                <div class="item" onclick={()=>actions.changeTalbeCellWidth([80, state])}>4</div>
                <div class="item" onclick={()=>actions.changeTalbeCellWidth([90, state])}>5</div>
                <div class="item" onclick={()=>actions.changeTalbeCellWidth([100, state])}>6</div>
              </div>
            </div>
            {urlForChangeDeviceMenuItem}
          </div>
        </div>
      </div>

    </div>
  )
}
