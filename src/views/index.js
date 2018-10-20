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
      tasksComponents.push(ganttBar(state, actions, this[key]))
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
    <main class={styl.container + ' ui fluid container'}>

      <div class={styl.dummyHeader + ' ui inverted menu'} />
      <div class='ui fixed inverted menu'>
        <div class='ui container'>
          <a href='http://www.sharpen.tokyo' class={styl.headerLogo + ' header item borderless'}>
            <img class='logo' src='assets/images/logo.svg' />
            Sharpen
          </a>
        </div>
      </div>
      {shareUrlModal}
      {memberIdModal}
      {messageModal}
      {detailModalComponents}
      {signUpModal}
      <div class={styl.card + ' ui card sb pushable'}>

        {verticalMenu}

        <div class={styl.pusher + ' pusher'}>
          <div class={styl.cardHeader + ' content'}>
            {inspector(state, actions)}
          </div>

          <div class={styl.cardMainContent + ' ui card cardMainContent pushable'}>
            <div
              class='innerRows'
              oncreate={setBackgroundSize}
              onupdate={setBackgroundSize}
              style={{backgroundImage: 'url(/assets/images/division.jpg)', width: utils.parsePx(dateCount * state.globalCellWidth), height: '100%'}}>
              {ganttDateHeader(state, actions)}
              <div class={styl.innerContent}>
                {tasksComponents}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
