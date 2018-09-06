import { app } from 'hyperapp'
import actions from './actions'
import state   from './state'
import view    from './components'
import utils   from './classes/utils'
import 'normalize.css'

// first regist to local storage
//if (!localStorage.getItem('sharpen')) {
//  const projectId           = utils.random()
//  state.projectId           = projectId
//  const sharpenLocalStorage = {}
//  const memberId            = utils.random()
//  sharpenLocalStorage["currentProject"]            = state.projectId
//  sharpenLocalStorage["memberId"]                  = memberId
//  sharpenLocalStorage["memberName"]                = memberId
//  sharpenLocalStorage["projects"]                  = {}
//  sharpenLocalStorage["projects"][state.projectId] = {id: state.projectId, name: state.projectId, state: state}
//  localStorage.setItem('sharpen', JSON.stringify(sharpenLocalStorage))
//}

const getPrams = utils.getUrlVars()

const start = (state) => app(state, actions, view, document.getElementById('sharpen'))

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
} else if (localStorage.getItem('sharpen')) {
  const sharpenLocalStorage = JSON.parse(localStorage.getItem('sharpen'))
  const currentProjectState = sharpenLocalStorage.projects[sharpenLocalStorage.currentProject].state
  start(currentProjectState)
} else {
  start(state)
}
