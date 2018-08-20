import { h }       from "hyperapp"
import utils       from '../classes/utils'
import detailModal from './detailModal_semantic'
import progress    from './styles/progress_semantic.styl'

export default (state, actions, data) => {

  let openModalFlg    = true
  let pageXStartPoint = 0

  /* row */
  const dateCount = utils.getDateDiff(state.tableStartDate, state.tableEndDate)
  const rowId     = "row_" + data.id
  const rowStyle  = {width: dateCount * utils.parsePx(state.globalCellWidth)}
  const ondragover = (e) => {
    actions.tasks.changePositioning({id: data.id, e: e})
  }
  const ondrop = (e) => {
    actions.tasks.changePosition({id: data.id, e: e})
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
  const progressStyle = {
    left:  utils.parsePx(data.startPosition),
    width: utils.parsePx(data.width),
  }
  const detailModalOpenId = "detailModalOpen_" + data.id
  const detailModalId     = "detailModal_" + data.id
  const openModal = () => {
    if (openModalFlg) {
      document.getElementById(detailModalOpenId).click()
    }
  }
  const onDragEnd   = (e) => actions.tasks.dragEnd([e, state, data.id, pageXStartPoint])
  const ondragstart = (e) => {
    pageXStartPoint        = e.pageX
    e.target.style.opacity = '0.1'
    e.target.style.border  = "dashed 0.5px"
    e.dataTransfer.setData("text/plain", e.target.id)
  }

  /* resizer start */
  const startPointResizeEnd = (e)=>actions.tasks.startPointResizeEnd([e, state, data.id, pageXStartPoint]) 
  const resizeOnStart = (e) => {
    openModalFlg     = false
    pageXStartPoint  = e.pageX
    const row        = document.getElementById(rowId)
    row.addEventListener('mousemove', resizeStartPoint)
    row.addEventListener('touchmove', resizeStartPoint)
    row.addEventListener('mouseup', startPointResizeEnd)
    row.addEventListener('mouseleave', startPointResizeEnd)
  }

  /* resizer end */
  const endPointResizeEnd = (e)=>actions.tasks.endPointResizeEnd([e, state, data.id, pageXStartPoint])
  const resizeOnEnd = (e) => {
    openModalFlg     = false
    pageXStartPoint  = e.pageX
    const row        = document.getElementById(rowId)
    row.addEventListener('mousemove', resizeEndPoint)
    row.addEventListener('touchmove', resizeEndPoint)
    row.addEventListener('mouseup', endPointResizeEnd)
    row.addEventListener('mouseleave', endPointResizeEnd)
  }

  /* progress-bar */
  const progressBarStyle = {width: utils.parsePercent(data.progress)}

  return (
    <div>
      {/* row */}
      <div class={progress.row} key={utils.random()} id={rowId} oncreate={setBackgroundSize} onupdate={setBackgroundSize} ondrop={ondrop} style={rowStyle} ondragover={ondragover}>
        <div class={progress.progress + " ui indicating progress active"} draggable="true" id={data.id} onclick={openModal} ondragstart ={ondragstart} ondragend={onDragEnd} style={progressStyle}>
          <div class="bar" style={progressBarStyle}>
            <div class="progress">{utils.parsePercent(data.progress)}</div>
          </div>
          {/* resizer start */}
          <div class={progress.resizerStart} onmousedown={(e)=>resizeOnStart(e)} ontouchstart={(e)=>resizeOnStart(e)} />
          {/* resizer end */}
          <div class={progress.resizerEnd} onmousedown={(e)=>resizeOnEnd(e)} ontouchstart={(e)=>resizeOnEnd(e)} />
          {/* progress-bar */}
          <div class={progress.progressBarStyle + " progress-bar bg-faded"} style={progressBarStyle}/>
          <div class={progress.title + " label"}>{data.title}</div>
        </div>
      </div>
    </div>
  )
}
