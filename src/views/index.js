import { h } from 'hyperapp'
import styl from '../styles/index.styl'
import ganttBar from './ganttBar'
import ganttDateHeader from './ganttDateHeader'
import utils from '../classes/utils'
import inspector from './inspector'
import detailModal from './detailModal'
import signUpModal from './signUpModal'
import messageModal from './messageModal'
import shareUrlModal from './shareUrlModal'
import memberIdModal from './memberIdModal'
import verticalMenu from './verticalMenu'
import i18n from '../i18n'

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
      <div class={styl.card + ' ui card sb'}>

        {verticalMenu}

        <div class={styl.pusher + ' pusher'}>
          <div class={styl.cardHeader + ' content'}>
            {inspector(state, actions)}
          </div>

          <div class={styl.cardMainContent + ' ui card'}>
            <div
              oncreate={setBackgroundSize}
              onupdate={setBackgroundSize}
              style={{backgroundImage: 'url(/assets/images/division.jpg)', width: dateCount * state.globalCellWidth + 'px', height: '100%'}}>
              {ganttDateHeader(state, actions)}
              {tasksComponents}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
