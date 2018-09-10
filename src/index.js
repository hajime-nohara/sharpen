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
    let sharpenIdListStr = localStorage.getItem('sharpenIdList') 
    if ( sharpenIdListStr ) {
        const sharpenIdList = JSON.parse(sharpenIdListStr)
        if (sharpenIdList.length > 0 && sharpenIdList.indexOf(getPrams.id.toString()) == -1) {
          sharpenIdList.push(getPrams.id.toString())
          localStorage.setItem('sharpenIdList', JSON.stringify(sharpenIdList))
        }
    } else {
      const sharpenIdList = []
      sharpenIdList.push(getPrams.id)
      localStorage.setItem('sharpenIdList', JSON.stringify(sharpenIdList))
    }
    start(JSON.parse(JSON.parse(request.response).state))
  }
  request.send()
} else if (localStorage.getItem('sharpen_data') && localStorage.getItem('sharpen_user')) {
  const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
  const sharpenDataLS = JSON.parse(localStorage.getItem('sharpen_data'))
  const currentProjectState = sharpenDataLS[sharpenUserLS.currentProjectId]
  // updated by new source 
  currentProjectState.i18n = i18n 
  start(currentProjectState)
} else {
  start(state)
}
