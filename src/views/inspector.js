import { h } from 'hyperapp'
import utils from '../classes/utils'
import i18n from '../i18n'

export default (state, actions) => {
  const projects = []

  const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
  if (localStorage.getItem('sharpen_user')) {
    Object.keys(sharpenUserLS.projects).forEach(
      function (index) {
        const id = sharpenUserLS.projects[index].id
        const name = sharpenUserLS.projects[index].name
        projects.push(
          <div class='item' id={id} data-value={id}>
            {name}
          </div>
        )
      }
    )
  }

  const addProject = () => {
    document.querySelector('.scrolling.menu').click()
    const projectName = document.querySelector('.project.menu.transition.visible input[type=\'text\']')
    actions.addProject(projectName.value)
  }

  let setTimeoutAddProject = null
  const projectSearchOnChange = () => {
    const addProjectElement = document.querySelector('.project.menu.transition.visible div[class=\'message\']')
    if (addProjectElement) {
      clearTimeout(setTimeoutAddProject)
      const addProjectTimer = () => {
        addProjectElement.innerHTML = i18n[state.locale].addProject
        addProjectElement.addEventListener('click', addProject)
      }
      setTimeoutAddProject = setTimeout(addProjectTimer, 600)
    }
  }

  const changeProject = (val1, val2, el) => {
    actions.changeProject(el[0].id)
  }
  const sharedProjectMenuItem = state.published ? <div class='item' onclick={() => document.getElementById('sharedUrlModalTrigger').click()}>{i18n[state.locale].projectUrl}</div> : null
  const urlForChangeDeviceMenuItem = <div class='item' onclick={() => document.getElementById('urlForChangeDeviceModalTrigger').click()}>{i18n[state.locale].urlForChangeDevice}</div>

  return (
    <div class='ui secondary pointing menu'>
      <div class='item' onclick={() => $('.sidebar').sidebar({context: $('.ui.card.sb'), dimPage: false, mobileTransition: 'overlay', transition: 'overlay'}).sidebar('toggle')}>
        <i class='bars icon' />
      </div>

      <div class='item'>
        <div class='ui floating dropdown icon' tabindex='0' oncreate={(e) => $(e).dropdown({onChange: changeProject})} key={utils.random()}>
          <input type='hidden' name={state.projectName} value={state.projectId} />
          <span class='text' />
          <div class='project menu transition hidden'>
            <div class='ui icon search input'>
              <i class='search icon' />
              <input type='text' placeholder={i18n[state.locale].searchProject} onkeyup={projectSearchOnChange} />
            </div>
            <div class='scrolling menu'>
              {projects}
            </div>
          </div>
        </div>
      </div>

      <div class='right menu'>
        <a class='item' onclick={() => actions.tasks.add(state)}>
          {/* i18n[state.locale].addTask */}
          <i class='plus icon' />
        </a>
      </div>
    </div>
  )
}
