import { h } from 'hyperapp'
import styl from '../styles/index.styl'
import _ganttBar from './ganttBar'
import _ganttDateHeader from './ganttDateHeader'
import utils from '../classes/utils'
import _inspector from './inspector'
import _detailModal from './detailModal'
import _signUpModal from './signUpModal'
import _messageModal from './messageModal'
import _shareUrlModal from './shareUrlModal'
import _memberIdModal from './memberIdModal'
import _verticalMenu from './verticalMenu'
import moize from "moize/mjs"
import i18n from '../i18n'

import _card from './card'

// moize
const ganttBar = moize(_ganttBar)
const ganttDateHeader = moize(_ganttDateHeader)
const inspector = moize(_inspector)
const detailModal = moize(_detailModal)
const signUpModal = moize(_signUpModal)
const messageModal = moize(_messageModal)
const shareUrlModal = moize(_shareUrlModal)
const memberIdModal = moize(_memberIdModal)
const verticalMenu = moize(_verticalMenu)

const card = moize(_card)

const rowHeight = 51.5
const dateHeaderHeight = 100

export default (state, actions) => {
  const tasksComponents = []
  const detailModalComponents = []

  Object.keys(state.tasks).sort((a, b) => {
    if (Number(a) > Number(b)) return -1
    if (Number(a) < Number(b)) return 1
    return 0
  }).forEach(
    function (key) {
      tasksComponents.push(card(state, actions, this[key]))
      detailModalComponents.push(detailModal(state, actions, this[key]))
    },
    state.tasks
  )

  const dateCount = utils.getTermFromDate(state.tableStartDate, state.tableEndDate)

  actions.saveToLocalStorage()

  const setBackgroundSize = (e) => {
    e.style.backgroundSize = utils.parsePx(state.globalCellWidth)
  }

  return (
            <div
              id='example1' 
              class='main ui container'
              oncreate={setBackgroundSize}
              onupdate={setBackgroundSize}>
                <div class="ui dividing right rail" style="">
                  <div class="ui sticky" style="width: 272px !important; height: 262.531px !important; left: 1124.5px;">
                    <h3 class="ui header">Stuck Content</h3>
                    <h3 class="ui header">Stuck Content</h3>
                    <h3 class="ui header">Stuck Content</h3>
                    <h3 class="ui header">Stuck Content</h3>
                    <img/>
                  </div>
                </div>
                {tasksComponents}
            </div>
  )
}
