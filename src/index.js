import { app }        from 'hyperapp'
import actions        from './actions'
import state          from './state'
import view           from './components'
import utils          from './classes/utils'
import i18n           from './state/i18n'
import { withLogger } from "@hyperapp/logger"
import 'normalize.css'

const getPrams = utils.getUrlVars()

const start = (state) => withLogger(app)(state, actions, view, document.getElementById('sharpen'))

if (getPrams.id != undefined && getPrams.id.length > 0) {
  // when there is project id, load data.
  const request = new XMLHttpRequest()
  request.open("GET", state.apiEndPoint + "/" + getPrams.id)
  request.onload = () => {

    const loadedState = JSON.parse(JSON.parse(request.response).state)

    const sharpenUserLS = localStorage.getItem('sharpen_user') ? JSON.parse(localStorage.getItem('sharpen_user')) : {}
    sharpenUserLS['currentProjectId'] = getPrams.id

    if (!localStorage.getItem('sharpen_user')) {
      const memberId                                   = utils.random()
      sharpenUserLS['memberId']                        = memberId
      sharpenUserLS['memberName']                      = null
      sharpenUserLS['projects']                        = {}
    }

    Object.assign(loadedState.member, {[sharpenUserLS.memberId]: sharpenUserLS.memberName})
    sharpenUserLS['projects'][loadedState.projectId] = {id: loadedState.projectId, name: loadedState.projectName}
    localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))

    const sharpenDataLS = localStorage.getItem('sharpen_data') ? JSON.parse(localStorage.getItem('sharpen_data')) : {}
    sharpenDataLS[loadedState.projectId] = JSON.parse(JSON.stringify(loadedState))
    localStorage.setItem('sharpen_data', JSON.stringify(sharpenDataLS))

    start(loadedState)

  }
  request.send()

} else if (localStorage.getItem('sharpen_data') && localStorage.getItem('sharpen_user')) {
  const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
  const sharpenDataLS = JSON.parse(localStorage.getItem('sharpen_data'))
  const currentProjectState = sharpenDataLS[sharpenUserLS.currentProjectId]
  if (currentProjectState) {
    // updated by new source 
    currentProjectState.i18n = i18n 
    start(currentProjectState)
  } else {
    localStorage.setItem('sharpen_data', "")
    start(state)
  }
} else {
  start(state)
}
