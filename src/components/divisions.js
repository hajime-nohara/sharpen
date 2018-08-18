import { h } from "hyperapp"

const divisions   = Array()
// input view
export default (state, actions, params) => {
  
  const divisionStyle = {borderRight: "solid 0.5px gray", width: globalCellWidth + 0.5 + "px", height: Object.keys(state.tasks).length * 50 + "px", position: "absolute", left: "0px"}
  let idx = 0 
  while (idx < state.terms) {
    console.log(globalCellWidth)
    divisions.push(<span style={Object.assign(JSON.parse(JSON.stringify(divisionStyle)), {left: (idx * globalCellWidth) + "px"})}></span>)
    idx = idx + 1
  }
  return divisions
}
