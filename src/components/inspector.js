import { h } from "hyperapp"

export default (state, actions) => {

  const projects = []
  const sharpenLocalStorage = JSON.parse(localStorage.getItem('sharpen'))
  Object.keys(sharpenLocalStorage.projects).forEach(
    function(index,val,arr) {
      const id   = sharpenLocalStorage.projects[index].id
      const name = sharpenLocalStorage.projects[index].name
      projects.push(
        <div class="item" id={id} data-value={id}>
          {name}
        </div>
      )
    }
  )

  const addProject = () => {
    document.querySelector(".scrolling.menu").click()
    const projectName = document.querySelector(".project.menu.transition.visible input[type='text']")
    actions.addProject(projectName.value)
  }

  const projectSearchOnChange = () => {
    const addProjectElement = document.querySelector(".project.menu.transition.visible div[class='message']")
    if (addProjectElement) {
      addProjectElement.innerHTML = state.i18n[state.locale].addProject
      addProjectElement.addEventListener('click', addProject)
    }
  }

  return (
    <div class="ui secondary menu">

      <div class="item">
        <div class="ui floating dropdown icon" tabindex="0" oncreate={(e)=>$(e).dropdown({onChange: (val1, val2, el)=>console.log(el[0].id)})}>
          <input type="hidden" name={state.projectName} value={state.projectId}/>
          <span class="text"></span>
          <div class="project menu transition hidden" tabindex="-1">
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

      <a class="item" onclick={()=>actions.save()}>{state.i18n[state.locale].save}</a>
      <a class="item" onclick={()=>actions.tasks.add(state)}>{state.i18n[state.locale].add}</a>

      <div class="item">
        <div class="ui dropdown link" oncreate={(e)=>$(e).dropdown()}>
          <i class="wrench icon"></i>
          <i class="dropdown icon"></i>
          <div class="menu"> 
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
                <div class="item" onclick={()=>actions.changeTalbeCellWidth(50)}>1</div>
                <div class="item" onclick={()=>actions.changeTalbeCellWidth(60)}>2</div>
                <div class="item" onclick={()=>actions.changeTalbeCellWidth(70)}>3</div>
                <div class="item" onclick={()=>actions.changeTalbeCellWidth(80)}>4</div>
                <div class="item" onclick={()=>actions.changeTalbeCellWidth(90)}>5</div>
                <div class="item" onclick={()=>actions.changeTalbeCellWidth(100)}>6</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
