import { h }          from "hyperapp"
import utils          from '../classes/utils'
import detailModal    from './detailModal';
import progress  from './styles/progress.styl'

export default (state, actions, params) => {

  let openModalFlg   = true
  let pageXPoint     = 0 

  /* progress */
  const progressStyle = {
    left:  utils.parsePx(params.startPosition),
    width: utils.parsePx(params.width),
  }

  /* resizer start */
  const resizeStartPoint = (e) => {
console.log(pageXPoint)
    e.preventDefault();
    const _this        = document.getElementById(params.id)
    window.clickCancel = true
    // 1日分よりは小さくならない様にする
    if ((params["width"] + (pageXPoint - e.pageX)) <= state.globalCellWidth) {
      return;
    }
    _this.style.left  = utils.parsePx(params["startPosition"] - (pageXPoint - e.pageX))
    _this.style.width = utils.parsePx(params["width"] + (pageXPoint - e.pageX))
  }

  /* resizer end */
  const resizeEndPoint = (e) => {
    e.preventDefault();
    const _this        = document.getElementById(params.id)
    window.clickCancel = true
    // 1日分よりは小さくならない様にする
    if ((params["width"] - (pageXPoint - e.pageX)) <= state.globalCellWidth) {
      return;
    }
    _this.style.width = utils.parsePx(params["width"] - (pageXPoint - e.pageX))
  }

  const openModal = () => {
    if (openModalFlg) {
      document.getElementById("modal" + params.id).click()
    }
  }

  const resizeOnStart = (e) => {
    openModalFlg       = false
    pageXPoint  = e.pageX
    document.getElementById(resizerId).addEventListener('mousemove', resizeStartPoint)
    document.getElementById(resizerId).addEventListener('touchmove', resizeStartPoint)
    document.getElementById(resizerId).addEventListener('mouseup', (e)=>actions.tasks.startPointResizeEnd([e, state, params.id, pageXPoint]))
  }

  const resizeOnEnd = (e) => {
    openModalFlg       = false
    pageXPoint  = e.pageX
    document.getElementById(resizerId).addEventListener('mousemove', resizeEndPoint)
    document.getElementById(resizerId).addEventListener('touchmove', resizeEndPoint)
    document.getElementById(resizerId).addEventListener('mouseup', (e)=>actions.tasks.endPointResizeEnd([e, state, params.id, pageXPoint]))
  }

  const onDragEnd   = (e) => actions.tasks.dragEnd([e, state, params.id, pageXPoint])
  const ondragstart = (e) => {
    pageXPoint                   = e.pageX
    e.target.style.opacity       = '0.1'
    e.currentTarget.style.border = "dashed 0.5px";
    e.dataTransfer.setData("text/plain", e.target.id);
  } 

  /* row */
  const dateCount = utils.getDateDiff(state.tableStartDate, state.tableEndDate)
  const resizerId = "resizer_" + params.id
  const rowStyle  = {width: dateCount * utils.parsePx(state.globalCellWidth)}
  const ondragover = (e) => {
    actions.tasks.changePositioning({id: params.id, e: e})
  }
  const ondrop = (e) => {
    actions.tasks.changePosition({id: params.id, e: e})
  }
  const setBackgroundSize = (e) => {
    e.style.backgroundSize=utils.parsePx(state.globalCellWidth)
  }

  /* progress-bar */
  const progressBarStyle = {width: params.progress + "%"}

  return (
    <div>
      {detailModal(state, actions, params)}
      {/* row */}
      <div class={progress.row} key={utils.random()} id={resizerId} oncreate={setBackgroundSize} onupdate={setBackgroundSize} ondrop={ondrop} style={rowStyle} ondragover={ondragover}>
        <div class={progress.progress + " progress"} draggable="true" id={params.id} onclick={openModal} ondragstart ={ondragstart} ondragend={onDragEnd} style={progressStyle}>
          {/* title */}
          <div class={progress.title}>
            {params.title}
          </div>
          {/* resizer start */}
          <div class={progress.resizerLeft} onmousedown={(e)=>resizeOnStart(e)} ontouchstart={(e)=>resizeOnStart(e)} />
          {/* resizer end */}
          <div class={progress.resizerRight} onmousedown={(e)=>resizeOnEnd(e)} ontouchstart={(e)=>resizeOnEnd(e)} />
          {/* progress-bar */}
          <div class={progress.progressBarStyle + " progress-bar bg-faded"} style={progressBarStyle}/>
        </div>
      </div>
    </div>
  )
}
