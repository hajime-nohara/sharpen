//import { h, app }       from "hyperapp"
//import { withLogger }   from "@hyperapp/logger"
//import progress         from './progress'
//import dates            from './dates'
//import util             from './util'
//import redoUndoActions  from '../actions/hyperapp-undo'
//import inspector        from './inspector';
//import footer           from './footer';
//
//// default data
//let globalResizeOn     = "";
//let globalUpdateId     = 0;
//window.globalCellWidth = 70;
//window.pageXPoint           = 0; // D&Dの移動時に使用するD開始位置
//window.clickCancel     = false
//
//// default endDate is 1 month later for table
//window.startDate = new Date 
//window.endDate   = new Date
//window.endDate.setMonth(endDate.getMonth() + 1)
//window.endDate.setDate(startDate.getDate() - 1)
//
//window.defaultTaskStartDate = new Date()
//var sd = defaultTaskStartDate.getDate()
//window.defaultTaskEndDate   = new Date()
//window.defaultTaskEndDate.setDate(sd+1)
//
//const state = {
//  globalCellWidth: 70,
//  redo: [],
//  undo: [],
//  member: {},
//  tableStartDate: util.getDateStr(window.startDate),
//  tableEndDate:   util.getDateStr(window.endDate),
//  tasks: 
//    {
//      1: { 
//          id:             1,
//          display:        "",
//          title:          "This is first task of 'sharpen'. Please check detail.",
//          description:    "This site is made by just only html and javascript as sample tool. You can use this as stand alone tool.",
//          member:         [],
//          todo:           {},
//          comment:        {1: {comment: 'We are developing implement now.'}, 2: {comment: 'It will connect server and you will can share your data for many people.'} },
//          progress:       0,
//          startPosition:  window.globalCellWidth*2,
//          endPosition:    (window.globalCellWidth*2) + (4*window.globalCellWidth),
//          width:          4 * window.globalCellWidth-1,
//          startDate:      util.get_date(window.globalCellWidth*2),
//          endDate:        util.get_date((window.globalCellWidth*2)+(4 * window.globalCellWidth-1)),
//         },
//      2: { 
//          id:             2,
//          display:        "",
//          title:          "This is attention.",
//          description:    "This site work on pc chrome. Honestly, other browser is not good.",
//          member:         [],
//          todo:           {},
//          comment:        { 1: {comment: 'We are developing implement now.'},
//                            2: {comment: 'It will be good on other device browser.'},
//                            3: {comment: 'To keep the data properly will not be guaranteed.'},
//                            4: {comment: 'Your data is stored local storage of browser. If you clear local storage, data is cleared.'},
//                          },
//          progress:       0,
//          startPosition:  window.globalCellWidth,
//          endPosition:    (window.globalCellWidth) + (2*window.globalCellWidth),
//          width:          2 * window.globalCellWidth-1,
//          startDate:      util.get_date(window.globalCellWidth),
//          endDate:        util.get_date((window.globalCellWidth)+(2 * window.globalCellWidth-1)),
//         },
//      3: { 
//          id:             3,
//          display:        "",
//          title:          "How to use.",
//          description:    "It's simple operation. There is nothing to difficult.",
//          member:         [],
//          todo:           {},
//          comment:        {
//                            1: {comment: 'Add todo task.'},
//                            2: {comment: 'Click task bar.'},
//                            3: {comment: 'Edit title, description'},
//                            4: {comment: 'Add member you want to assign'},
//                            5: {comment: 'Add todo.'},
//                            6: {comment: 'Add comment.'},
//                            7: {comment: 'Check todo checkbox. And then you can see progress.'},
//                            8: {comment: 'Change date by D&D or extending start or end.'},
//                            9: {comment: 'Repcale task position by D&D.'},
//                            10:{comment: 'Chage table date.'},
//                            11:{comment: 'Chage cell width.'}
//                          },
//          progress:       0,
//          startPosition:  window.globalCellWidth*2,
//          endPosition:    (window.globalCellWidth*2) + (3* window.globalCellWidth),
//          width:          3 * window.globalCellWidth-1,
//          startDate:      util.get_date(window.globalCellWidth*2),
//          endDate:        util.get_date((window.globalCellWidth*2)+(3 * window.globalCellWidth-1)),
//         },
//      4: { 
//          id:             4,
//          display:        "",
//          title:          "Contact",
//          description:    "If you want to ask us, please mail to sharepn.tokyo@gmail.com.",
//          member:         [],
//          todo:           {},
//          comment:        {
//                            1: {comment: 'Hope you enjoy shaping your task and success!'},
//                          },
//          progress:       0,
//          startPosition:  window.globalCellWidth*3,
//          endPosition:    (window.globalCellWidth*3) + (4 * window.globalCellWidth),
//          width:          4 * window.globalCellWidth-1,
//          startDate:      util.get_date(window.globalCellWidth*3),
//          endDate:        util.get_date((window.globalCellWidth*3)+(4 * window.globalCellWidth-1)),
//         },
//
//
//    },
//}
//
///*
// * 終了日付リサイズ時のバーの吸着のためwidthから日数計算する
// */
//const get_days_from_width = (width, single_day_width) => {
//    let days = parseInt(width / single_day_width);
//    let more = width - (single_day_width * days);
//    // のびしろが次の日に近い位置まで伸ばした場合は終了日を+1日する
//    if ((single_day_width / 2) <= more){
//      days += 1;
//    }
//    return days;
//}
//
///*
// * 開始日付リサイズ時のバーの吸着のためleftから開始日位置を計算する
// */
//const getDays = (pageX, single_day_width) => {
//    const halfSize = (single_day_width / 2)
//    let days       = parseInt(pageX / single_day_width);
//    if (days == 0 && pageX < halfSize) {
//      return 0;
//    }
//    let more       = pageX - (single_day_width * days);
//    // のびしろが次の日に近い位置まで伸ばした場合は開始日を+1日する
//    if (halfSize <= more){
//      days += 1;
//    }
//    return days;
//}
//
//const adjust = (pageX) => {
//  return pageX
//}
//
//const actions = {
//
//  ...redoUndoActions(),  // redo undo
//
//  changeWidth: (width)=>(state, actions)=>{
//    if (width >= 50 && width <= 100) {
//      state.globalCellWidth  = width
//      window.globalCellWidth = width
//      Object.keys(state.tasks).forEach(
//        function(index,val,arr) {
//          var widthCount = util.getDateDiff(state.tasks[index].startDate, state.tasks[index].endDate)
//          state.tasks[index].width = widthCount * window.globalCellWidth -1
//          state.tasks[index].startPosition = (util.getDateDiff(util.getDateStr(window.startDate), state.tasks[index].startDate)-1) * window.globalCellWidth
//          state.tasks[index].endPosition = state.tasks[index].startPosition + state.tasks[index].width
//        }
//      );
//      return {}
//    }
//  },
//
//  changeStartDate: (date)=>(state, actions)=>{
//
//    window.startDate = new Date(date) 
//
//    window.defaultTaskEndDate = new Date(window.startDate)
//    var sd = startDate.getDate()
//    window.defaultTaskEndDate.setDate(sd+2)
//
//    Object.keys(state.tasks).forEach(
//      function(index,val,arr) {
//        state.tasks[index].startPosition = (util.getDateDiff(util.getDateStr(window.startDate), state.tasks[index].startDate)-1) * window.globalCellWidth
//        state.tasks[index].endPosition = state.tasks[index].startPosition + state.tasks[index].width
//      }
//    );
//
//    Object.assign(state, {tableStartDate: date})
//    return {}
//  },
//  changeEndDate: (date)=>(state, actions)=>{
//    window.endDate   = new Date(date)
//    Object.assign(state, {tableEndDate: date})
//    return {}
//  },
//  historyWrapper: ()=>(state, actions)=>{
//    actions.history(JSON.parse(JSON.stringify(state))) 
//  },
//  onload: ()=>(state, actions)=>{
//    console.log("onload gantt")
//    parent.window.init(state)
//  },
//
//  // master member
//  changeMasterMember: (params)=>(state)=>{
//    console.log("changeMasterMember")
//    Object.assign(state.member, {[params.id]: params.value})
//    return {}
//  },
//  deleteMasterMember: (id)=>(state)=>{
//    delete(state.member[id])
//    return {}
//  },
//
//  save: () => (state) => {
//    localStorage.setItem('state', JSON.stringify(state))
//  },
//
//  tasks: { 
//
//    // tasks
//    changeTodo: (params)=>(state)=>{
//      globalUpdateId = params.id;
//      let updatedTodo = Object.assign(state[globalUpdateId].todo, {[params.value.id]: params.value})
//      // update progress
//      let total   = Object.keys(state[globalUpdateId].todo).length
//      let checked = 0
//      Object.keys(state[globalUpdateId].todo).forEach(
//        function(index,val,arr) {
//          if (state[globalUpdateId].todo[index].done) {
//            checked++
//          }
//        }
//      );
//      state[globalUpdateId].progress = (checked.toFixed(2) / total.toFixed(2)) * 100
//      return {}
//    },
//
//    changeTodoTitle: (params)=>(state)=>{
//      globalUpdateId = params.id;
//      state[globalUpdateId].todo[params.value.id].title = params.value.title
//      return {}
//    },
//
//    changeTodoStatus: (params)=>(state)=>{
//      globalUpdateId = params.id;
//      state[globalUpdateId].todo[params.value.id].done = params.value.status
//      let total   = Object.keys(state[globalUpdateId].todo).length
//      let checked = 0
//      Object.keys(state[globalUpdateId].todo).forEach(
//        function(index,val,arr) {
//          if (state[globalUpdateId].todo[index].done) {
//            checked++
//          }
//        }
//      );
//      state[globalUpdateId].progress = (checked.toFixed(2) / total.toFixed(2)) * 100
//      return {}
//    },
//
//    deleteTodo: (params)=>(state)=>{
//      globalUpdateId = params.id;
//      delete(state[globalUpdateId].todo[params.value])
//      let total   = Object.keys(state[globalUpdateId].todo).length
//      let checked = 0
//      Object.keys(state[globalUpdateId].todo).forEach(
//        function(index,val,arr) {
//          if (state[globalUpdateId].todo[index].done) {
//            checked++
//          }
//        }
//      );
//      state[globalUpdateId].progress = (checked.toFixed(2) / total.toFixed(2)) * 100
//      return {}
//    },
//
//    // comment
//    changeComment: (params)=>(state)=>{
//      globalUpdateId = params.id;
//      let updatedComment = Object.assign(state[globalUpdateId].comment, {[params.value.id]: params.value})
//      return {}
//    },
//
//    deleteComment: (params)=>(state)=>{
//      globalUpdateId = params.id;
//      delete(state[globalUpdateId].comment[params.value])
//      return {}
//    },
//
//    changeMember: (params) => (state, actions) => {
//      globalUpdateId = params.id;
//      state[globalUpdateId].member = params.member 
//      return {}
//    },
//
//    changeDescription: (params) => (state, actions) => {
//      globalUpdateId = params.id;
//      state[globalUpdateId].description = params.description
//      return {}
//    },
//
//    changeTitle: (params) => (state, actions) => {
//      state[params.id].title = params.title
//      return {}
//    },
//
//    add: () => (state) => {
//
//      //window.his() くそ重くなるので一旦はずす
//
//      let id = Number(Object.keys(state)[Object.keys(state).length -1]) + 1
//
//      let tempDate     = new Date()
//      let start        = Math.abs(util.getDateDiff(util.getDateStr(tempDate), util.getDateStr(window.startDate))) + 1
//      let addStartDate = window.startDate.getDate()
//
//      state[id] = 
//      { 
//          id:             id,
//          display:        "",
//          title:          "Added task",
//          description:    "",
//          member:         [],
//          todo:           {},
//          comment:        {},
//          progress:       0,
//          startPosition:  start * window.globalCellWidth,
//          endPosition:    (start * window.globalCellWidth) + (2*window.globalCellWidth),
//          width:          2 * window.globalCellWidth-1,
//          pageX:          0,
//          startDate:      util.get_date(start * window.globalCellWidth),
//          endDate:        util.get_date((start * window.globalCellWidth)+(2 * window.globalCellWidth-1)),
//      }
//      util.smoothScroll()
//      return {}
//    }, 
//
//    del: (id) => (state, actions) => {
//      delete(state[id])
//      return {}
//    }, 
//
//    changePositioning: (params) => (state, actions) => {
//      if (globalUpdateId != params.id) {
//        params.e.preventDefault()
//      }
//    },
//
//    changePosition: (params) => (state, actions) => {
//      if (params.e.dataTransfer.getData("text") != params.id) {
//        const sourceId = parseInt(params.e.dataTransfer.getData("text"))
//        const source   = JSON.parse(JSON.stringify(state[sourceId]))
//        const target   = JSON.parse(JSON.stringify(state[params.id]))
//        source.id      = params.id
//        source.display = ""
//        state[params.id] = source
//        target.id = sourceId
//        state[sourceId] = target
//        return {}
//      }
//    },
//
//    dragOn: (params) => (state, actions) => {
//      console.log("dragOn")
//      params.e.currentTarget.style.border = "dashed 0.5px";
//      params.e.dataTransfer.setData("text/plain", params.e.target.id);
//      globalUpdateId = params.id;
//      window.pageXPoint = params.e.pageX
//    },
//
//    dragEnd: (e) => (state, actions) => {
//      console.log("dragEnd")
//      e.preventDefault();
//      let startPosition = 0
//      if (e.pageX > window.pageXPoint) {
//        startPosition = globalCellWidth * getDays(adjust(e.pageX - window.pageXPoint), globalCellWidth) + state[globalUpdateId].startPosition
//      } else {
//        startPosition = state[globalUpdateId].startPosition - (globalCellWidth * getDays(adjust(window.pageXPoint - e.pageX), globalCellWidth))
//      }
//      state[globalUpdateId].startPosition = startPosition
//      state[globalUpdateId].endPosition   = startPosition + state[globalUpdateId].width
//      state[globalUpdateId].startDate     = util.get_date(startPosition)
//      state[globalUpdateId].endDate       = util.get_date(startPosition + state[globalUpdateId].width)
//      return {}
//    },
//
//    resizeOn: (params) => (state, actions) => {
//      console.log("resizeOn")
//      globalResizeOn = params.type;
//      globalUpdateId = params.id;
//      if (params.e) {
//        window.pageXPoint = params.e.pageX
//      }
//    },
//
//    // partial state 更新時にglobal stateの値が参照したい。
//    resize: (e) => (state, action) => {
//
//      window.clickCancel = true
//
//      if (globalResizeOn == "start") {
//        e.preventDefault();
//        let pageX = adjust(e.pageX);
//        // 1日分よりは小さくならない様にする
//        if ((state[globalUpdateId]["width"] + (window.pageXPoint - pageX)) <= globalCellWidth) {
//          return;
//        }
//        document.getElementById(globalUpdateId).style.left  = parsePx(state[globalUpdateId]["startPosition"] - (window.pageXPoint - pageX))
//        document.getElementById(globalUpdateId).style.width = parsePx(state[globalUpdateId]["width"] + (window.pageXPoint - pageX))
//      } else if (globalResizeOn == "end") {
//        e.preventDefault();
//        let pageX = adjust(e.pageX);
//
//        // 1日分よりは小さくならない様にする
//        if ((state[globalUpdateId]["width"] - (window.pageXPoint - pageX)) <= globalCellWidth) {
//          return;
//        }
//        document.getElementById(globalUpdateId).style.width = parsePx(state[globalUpdateId]["width"] - (window.pageXPoint - pageX))
//      }
//    },
//
//    resizeEnd: (e) => (state, actions) => {
//
//      if (globalResizeOn == "start") {
//
//        e.preventDefault();
//        let pageX = adjust(e.pageX);
//
//        globalResizeOn = ""
//        let startPosition = 0
//        if (e.pageX > window.pageXPoint) {
//          startPosition = globalCellWidth * getDays(adjust(e.pageX - window.pageXPoint), globalCellWidth) + state[globalUpdateId].startPosition
//        } else {
//          startPosition = state[globalUpdateId].startPosition - (globalCellWidth * getDays(adjust(window.pageXPoint - e.pageX), globalCellWidth))
//        }
//
//        let width         = state[globalUpdateId].endPosition - startPosition
//        let endPosition   = width + startPosition
//
//        // 1日分よりは小さくならない様にする
//        if ((state[globalUpdateId].endPosition - pageX) <= globalCellWidth) {
//          startPosition = state[globalUpdateId].endPosition - globalCellWidth
//          width         = globalCellWidth
//          endPosition   = width + startPosition
//        }
//
//        state[globalUpdateId].startPosition = startPosition
//        state[globalUpdateId].endPosition   = endPosition
//        state[globalUpdateId].startDate     = util.get_date(startPosition)
//        state[globalUpdateId].endDate       = util.get_date(startPosition + width -1)
//        state[globalUpdateId].width         = width -1
//        return {}
//      } else if (globalResizeOn == "end") {
//
//        e.preventDefault();
//        let pageX = adjust(e.pageX);
//
//        globalResizeOn = ""
//
//        let width = 0
//        if (e.pageX > window.pageXPoint) {
//          width = globalCellWidth * getDays(adjust(e.pageX - window.pageXPoint), globalCellWidth) + state[globalUpdateId].width
//        } else {
//          width = state[globalUpdateId].width - (globalCellWidth * getDays(adjust(window.pageXPoint - e.pageX), globalCellWidth))
//        }
//
//        // 1日分よりは小さくならない様にする
//        if (width == 0) {
//          width = globalCellWidth
//        }
//
//        state[globalUpdateId].width       = width
//        state[globalUpdateId].endPosition = state[globalUpdateId]["startPosition"] + width
//        state[globalUpdateId].endDate     = util.get_date(state[globalUpdateId]["startPosition"] + width -1)
//        return {}
//      }
//
//      window.clickCancel = false 
//    }
//  },
//}
//
//const resizerStartStyle = {position: "absolute",  left: 0,  height: "100px",  width: "30px", cursor: "col-resize"} 
//const resizerEndStyle   = {position: "absolute",  right: 0,  height: "100px",  width: "30px", cursor: "col-resize"} 
//const parsePx = (value) => {
//  return value + "px"
//}
//
//const view = (state, actions) => {
//  
//  const tasksComponents = []
//  
//  Object.keys(state.tasks).sort((a,b)=>{
//                                        if( Number(a) > Number(b) ) return -1;
//                                        if( Number(a) < Number(b) ) return 1;
//                                        return 0;
//                                       }).forEach(
//    function(key) {
//      tasksComponents.push(progress(state, actions, this[key]))
//    }, 
//    state.tasks
//  );
//
//  const dateCount = util.getDateDiff(state.tableStartDate, state.tableEndDate)
//console.log("dateCount", dateCount)
//
//  return (
//
//    <main className="bg-light">
//      {inspector(state, actions)}
//      <div style={{ position: "relative", width: "98%", overflow: "scroll", border: "solid 1px #8080803b", margin: "auto", height: "88%", marginBottom: "2%"}}>
//        <div oncreate={(e)=>e.style.backgroundSize=globalCellWidth+"px"} onupdate={(e)=>e.style.backgroundSize=globalCellWidth+"px"} style={{backgroundImage: "url(/assets/division.jpg)", width: dateCount * window.globalCellWidth + "px", height: "100%"}}>
//        {dates(state, actions)}
//        {tasksComponents}
//        </div>
//      </div>
//      {footer}
//    </main>
//  )
//}
//
//
//let getPrams   = util.getUrlVars()
//let stateParam = getPrams.state
//
//if (stateParam != undefined && stateParam.length > 0) {
//  Object.assign(state, JSON.parse(stateParam))
//} else if (localStorage.getItem('state') && localStorage.getItem('state').length > 0) {
//  let localStrageState = JSON.parse(localStorage.getItem('state')) 
//  window.globalCellWidth = localStrageState.globalCellWidth
//  window.startDate = new Date(localStrageState.tableStartDate)
//  window.endDate   = new Date(localStrageState.tableEndDate)
//  Object.assign(state, localStrageState)
//}
//
////if (localStorage.getItem('state') && localStorage.getItem('state').length > 0) {
////  console.log("localStorage", JSON.parse(localStorage.getItem('state')))
////  Object.assign(state, JSON.parse(localStorage.getItem('state')))
////} else if (stateParam != undefined) {
////  console.log("stateParam", stateParam)
////  Object.assign(state, JSON.parse(stateParam))
////}
//
////let _actions = withLogger(app)(state, actions, view, document.body)
//let _actions = app(state, actions, view, document.body)
//window.add              = _actions.tasks.add
//window.save             = _actions.save
//window.redo             = _actions.redo
//window.undo             = _actions.undo
//window.his              = _actions.historyWrapper
//window.changeStartDate  = _actions.changeStartDate
//window.changeEndDate    = _actions.changeEndDate
//window.changeWidth      = _actions.changeWidth
