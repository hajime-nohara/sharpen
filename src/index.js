import { app } from 'hyperapp'
import actions from './actions'
import state   from './state'
import view    from './components'
import utils from   './classes/utils'
import              'normalize.css'

let getPrams   = utils.getUrlVars()
let stateParam = getPrams.state

if (stateParam != undefined && stateParam.length > 0) {
  Object.assign(state, JSON.parse(stateParam))
} else if (localStorage.getItem('state') && localStorage.getItem('state').length > 0) {
  let localStrageState = JSON.parse(localStorage.getItem('state')) 
  Object.assign(state, localStrageState)
}

export const main = app(
  state,
  actions,
  view,
  document.getElementById('sharpen')
)
