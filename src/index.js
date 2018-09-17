import { app }        from 'hyperapp'
import actions        from './actions'
import state          from './state'
import view           from './components'
import utils          from './classes/utils'
import { withLogger } from "@hyperapp/logger"
import 'normalize.css'

const getPrams = utils.getUrlVars()

const start = (currentState) => withLogger(app)(utils.stateVersionUp(state, currentState), actions, view, document.getElementById('sharpen'))

if (getPrams.id != undefined && getPrams.id.length > 0) {
  // when there is project id, load data.
  const request = new XMLHttpRequest()
  request.open("GET", state.apiEndPointState + getPrams.id)
  request.onerror = function() {
  }
  request.onload = () => {

    // no data
    if (!(JSON.parse(request.response) && JSON.parse(request.response).data)) {
      const defaultState      = utils.getCurrentProjectState(state)
      defaultState.statusCode = 404
      start(defaultState)
      return
    }

    const loadedState = JSON.parse(JSON.parse(request.response).data)
    loadedState.statusCode = 200   

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
} else {

  const defaultState = utils.getCurrentProjectState(state)

  // load latest data if project was published.
  if (defaultState.published) {
    const request = new XMLHttpRequest()
    request.open("GET", state.apiEndPointState + defaultState.projectId)
    request.onerror = function() {
    }
    request.onload = () => {
      // no data
      if (!(JSON.parse(request.response) && JSON.parse(request.response).data)) {
        start(defaultState)
        return
      }
      const loadedState = JSON.parse(JSON.parse(request.response).data)
      loadedState.statusCode = 200   
      start(loadedState)
    }
    request.send()
  } else {
    defaultState.statusCode = null
    // defaultState.tasks['format'] is default data for format. So delete it.
    delete(defaultState.tasks['format'])
    start(defaultState)
  }
}
