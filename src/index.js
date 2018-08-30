import { app } from 'hyperapp'
import actions from './actions'
import state   from './state'
import view    from './components'
import utils   from './classes/utils'
import 'normalize.css'

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
    start(Object.assign(state, JSON.parse(request.response)))
  }
  request.send()
} else if (localStorage.getItem('state') && localStorage.getItem('state').length > 0) {
  start(Object.assign(state, JSON.parse(localStorage.getItem('state'))))
} else {
  start(state)
}


