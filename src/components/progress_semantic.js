import { h }       from "hyperapp"
import utils       from '../classes/utils'
import detailModal from './detailModal_semantic'
import progress    from './styles/progress_semantic.styl'

export default (state, actions, data) => {

  let isResizing      = false
  let pageX           = 0
  let pageXStartPoint = 0
  let sourceId        = 0

  /* row */
  const dateCount = utils.getDateDiff(state.tableStartDate, state.tableEndDate)
  const rowStyle  = {width: dateCount * utils.parsePx(state.globalCellWidth)}
  const ondragover = (e) => {
    actions.tasks.changePositioning({id: data.id, e: e})
  }
  const ondrop = (e) => {
    pageX    = e.pageX
    sourceId = parseInt(e.dataTransfer.getData("text"))
    if (e.stopPropagation) {
      e.stopPropagation()
    }
    e.preventDefault();
    if (sourceId != data.id) {
      actions.tasks.changePosition([data.id, sourceId])
    }
  }
  const setBackgroundSize = (e) => {
    e.style.backgroundSize=utils.parsePx(state.globalCellWidth)
  }
  const resizeStartPoint = (e) => {
    e.preventDefault()
    const progress = document.getElementById(data.id)
    if ((data.width + (pageXStartPoint - e.pageX)) <= state.globalCellWidth) {
      // keep to least a globalCellWidth
      return
    }
    progress.style.left  = utils.parsePx(data.startPosition - (pageXStartPoint - e.pageX))
    progress.style.width = utils.parsePx(data.width + (pageXStartPoint - e.pageX))
  }
  const resizeEndPoint = (e) => {
    e.preventDefault()
    const progress        = document.getElementById(data.id)
    if ((data.width - (pageXStartPoint - e.pageX)) <= state.globalCellWidth) {
      // keep to least a globalCellWidth
      return
    }
    progress.style.width = utils.parsePx(data.width - (pageXStartPoint - e.pageX))
  }

  /* progress */
  const draggableOn  = (e)=>e.target.draggable=true
  const draggableOff = (e)=>e.target.draggable=false
  const progressStyle = {
    left:  utils.parsePx(data.startPosition),
    width: utils.parsePx(data.width),
  }
  const detailModalOpenId = "detailModalOpen_" + data.id
  const detailModalId     = "detailModal_" + data.id
  const openModal = () => {
    if (!isResizing) {
      document.getElementById(detailModalOpenId).click()
    }
  }
  const onDragEnd = (e) => {
    if (sourceId == data.id) {
      actions.tasks.dragEnd([pageX, state, data.id, pageXStartPoint])
    }
  }

  const ondragstart = (e) => {
    if (isResizing) {
      return
    }
    pageXStartPoint        = e.pageX
    e.target.style.opacity = '0.3'
    e.target.style.border  = "dashed 0.5px"
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/plain", e.target.id)
  }

  /* resizer start */
  const startPointResizeEnd = (e)=>{
    document.removeEventListener('mousemove', resizeStartPoint)
    document.removeEventListener('touchmove', resizeStartPoint)
    document.removeEventListener('mouseup', startPointResizeEnd)
    document.removeEventListener('mouseleave', startPointResizeEnd)
    actions.tasks.startPointResizeEnd([e, state, data.id, pageXStartPoint])
  }
  const resizeOnStart = (e) => {
    isResizing      = true
    pageXStartPoint = e.pageX
    e.preventDefault()
    document.addEventListener('mousemove', resizeStartPoint)
    document.addEventListener('touchmove', resizeStartPoint)
    document.addEventListener('mouseup', startPointResizeEnd)
    document.addEventListener('mouseleave', startPointResizeEnd)
  }

  /* resizer end */
  const endPointResizeEnd = (e) => {
    document.removeEventListener('mousemove', resizeEndPoint)
    document.removeEventListener('touchmove', resizeEndPoint)
    document.removeEventListener('mouseup', endPointResizeEnd)
    document.removeEventListener('mouseleave', endPointResizeEnd)
    actions.tasks.endPointResizeEnd([e, state, data.id, pageXStartPoint])
  }
  const resizeOnEnd = (e) => {
    isResizing      = true
    pageXStartPoint = e.pageX
    e.preventDefault()
    document.addEventListener('mousemove', resizeEndPoint)
    document.addEventListener('touchmove', resizeEndPoint)
    document.addEventListener('mouseup', endPointResizeEnd)
    document.addEventListener('mouseleave', endPointResizeEnd)
  }

  /* progress-bar */
  const progressBarStyle = {width: utils.parsePercent(data.progress)}

  return (
    <div>
      {/* row */}
      <div class={progress.row} key={utils.random()} oncreate={setBackgroundSize} onupdate={setBackgroundSize} ondrop={ondrop} style={rowStyle} ondragover={ondragover}>
        <div class={progress.progress + " ui indicating progress active"} onmouseup={draggableOff} onmousedown={draggableOn} ontouchstart={draggableOn} id={data.id} onclick={openModal} ondragstart={ondragstart} ondragend={onDragEnd} style={progressStyle}>
          <div class="bar" style={progressBarStyle}>
            <div class="progress">{utils.parsePercent(data.progress)}</div>
          </div>
          {/* resizer start */}
          <div class={progress.resizerStart} onmousedown={resizeOnStart} ontouchstart={resizeOnStart} />
          {/* resizer end */}
          <div class={progress.resizerEnd} onmousedown={resizeOnEnd} ontouchstart={resizeOnEnd} />
          {/* progress-bar */}
          <div class={progress.progressBarStyle + " progress-bar bg-faded"} style={progressBarStyle}/>
          <div class={progress.title + " label"}>{data.title}</div>
        </div>
      </div>
    </div>
  )
}
