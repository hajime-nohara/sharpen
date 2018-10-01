import { h } from 'hyperapp'
import utils from '../classes/utils'
import styl from '../styles/ganttBar.styl'
// for mobile D&D
import {polyfill} from 'mobile-drag-drop'
import {scrollBehaviourDragImageTranslateOverride} from 'mobile-drag-drop/scroll-behaviour'
polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
})

export default (state, actions, data) => {
  let isResizing = false
  let pageX = 0
  let pageXStartPoint = 0
  let sourceId = 0

  /* row */
  const numberOfDays = utils.getTermFromDate(state.tableStartDate, state.tableEndDate)
  const rowStyle = {width: numberOfDays * utils.parsePx(state.globalCellWidth)}
  const ondragover = (e) => {
    e.preventDefault()
  }

  const ondrop = (e) => {
    pageX = e.pageX
    sourceId = parseInt(e.dataTransfer.getData('text/plain'))
    if (e.stopPropagation) {
      e.stopPropagation()
    }
    e.preventDefault()
    if (sourceId !== data.id) {
      actions.tasks.changePosition([data.id, sourceId])
    } else {
      // when sourceId is Zero it's mobile device.
      if (sourceId === 0) {
        sourceId = e.target.id
        pageX = e.pageX
      }
      if (sourceId === data.id) {
        actions.tasks.dragEnd([pageX, state, data.id, pageXStartPoint])
      }
    }
  }
  const setBackgroundSize = (e) => {
    e.style.backgroundSize = utils.parsePx(state.globalCellWidth)
  }
  const resizeStartPoint = (e) => {
    e.preventDefault()
    const progress = document.getElementById(data.id)
    if ((data.width + (pageXStartPoint - e.pageX)) <= state.globalCellWidth) {
      // keep to least a globalCellWidth
      return
    }
    progress.style.left = utils.parsePx(data.startPosition - (pageXStartPoint - e.pageX))
    progress.style.width = utils.parsePx(data.width + (pageXStartPoint - e.pageX))
  }
  const resizeEndPoint = (e) => {
    e.preventDefault()
    const progress = document.getElementById(data.id)
    if ((data.width - (pageXStartPoint - e.pageX)) <= state.globalCellWidth) {
      // keep to least a globalCellWidth
      return
    }
    progress.style.width = utils.parsePx(data.width - (pageXStartPoint - e.pageX))
  }

  /* progress */
  const draggableOn = (e) => { e.target.draggable = true }
  // const draggableOff = (e) => { e.target.draggable = false }
  const progressStyle = {
    left: utils.parsePx(data.startPosition),
    width: utils.parsePx(data.width)
  }
  const detailModalOpenId = 'detailModalOpen_' + data.id
  // const detailModalId = 'detailModal_' + data.id
  const openModal = () => {
    if (!isResizing) {
      document.getElementById(detailModalOpenId).click()
    }
  }
  const onDragEnd = (e) => {
    e.target.style.opacity = '1'
  }

  const onDragStart = (e) => {
    if (isResizing) {
      return
    }
    pageXStartPoint = e.pageX
    e.target.style.opacity = '0.3'
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', e.target.id)
  }

  /* resizer start */
  const startPointResizeEnd = (e) => {
    document.removeEventListener('mousemove', resizeStartPoint)
    document.removeEventListener('touchmove', resizeStartPoint)
    document.removeEventListener('mouseup', startPointResizeEnd)
    document.removeEventListener('mouseleave', startPointResizeEnd)
    document.removeEventListener('touchend', startPointResizeEnd)
    actions.tasks.startPointResizeEnd([e, state, data.id, pageXStartPoint])
  }
  const resizeOnStart = (e) => {
    isResizing = true
    pageXStartPoint = e.pageX
    e.preventDefault()
    document.addEventListener('mousemove', resizeStartPoint)
    document.addEventListener('touchmove', resizeStartPoint)
    document.addEventListener('mouseup', startPointResizeEnd)
    document.addEventListener('mouseleave', startPointResizeEnd)
    document.addEventListener('touchend', startPointResizeEnd)
  }
  /* resizer end */
  const endPointResizeEnd = (e) => {
    document.removeEventListener('mousemove', resizeEndPoint)
    document.removeEventListener('touchmove', resizeEndPoint)
    document.removeEventListener('mouseup', endPointResizeEnd)
    document.removeEventListener('mouseleave', endPointResizeEnd)
    document.removeEventListener('touchend', endPointResizeEnd)
    actions.tasks.endPointResizeEnd([e, state, data.id, pageXStartPoint])
  }
  const resizeOnEnd = (e) => {
    isResizing = true
    pageXStartPoint = e.pageX
    e.preventDefault()
    document.addEventListener('mousemove', resizeEndPoint)
    document.addEventListener('touchmove', resizeEndPoint)
    document.addEventListener('mouseup', endPointResizeEnd)
    document.addEventListener('mouseleave', endPointResizeEnd)
    document.addEventListener('touchend', endPointResizeEnd)
  }

  /* progress-bar */

  const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
  const progressBarStyle = {width: utils.parsePercent(data.progress)}
  const badge = data.watched.includes(sharpenUserLS.memberId) ? null : <div class={styl.badge + ' ui blue empty circular label'} />

  return (
    <div key={utils.random()}>
      {/* row */}
      <div class={styl.row}
        style={rowStyle}
        oncreate={setBackgroundSize}
        onupdate={setBackgroundSize}
        ondrop={ondrop}
        ondragover={ondragover}
        ondragenter={ondragover}>
        <div class={styl.progress + ' ui indicating progress active'}
          id={data.id}
          onmousedown={draggableOn}
          ontouchstart={draggableOn}
          onclick={openModal}
          ondragstart={onDragStart}
          ondragend={onDragEnd}
          style={progressStyle}>
          <div class={styl.bar + ' bar'} style={progressBarStyle}>
            <div class='progress'>{utils.parsePercent(data.progress)}</div>
          </div>
          {/* resizer start */}
          <div class={styl.resizerStart} onmousedown={resizeOnStart} ontouchstart={resizeOnStart} />
          {/* resizer end */}
          <div class={styl.resizerEnd} onmousedown={resizeOnEnd} ontouchstart={resizeOnEnd}>
            {badge}
          </div>
          {/* progress-bar */}
          <div class={styl.progressBarStyle + ' progress-bar bg-faded'} style={progressBarStyle} />
          <div class={styl.title + ' label'}>{data.title}</div>
        </div>
      </div>
    </div>
  )
}
