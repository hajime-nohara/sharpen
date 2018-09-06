import utils from '../classes/utils'
import table from './table'

export default {

  // this action does not update state
  saveToLocalStorage: () => (state, actions) => {
    /* local storage layout
        sharpen: {
          memberId:   "xxxxx",
          memberName: "xxxxx",
          projects: {
            xxxxx: {id: "xxxxx", name: "xxxxx"},
            xxxxx: {id: "xxxxx", name: "xxxxx"}
          },
          currentProject: "xxxxx" 
        }
    */
    let sharpenLocalStorage = localStorage.getItem('sharpen')
    if (sharpenLocalStorage) {
      sharpenLocalStorage = JSON.parse(sharpenLocalStorage)
      sharpenLocalStorage.projects[state.projectId] = {id: state.projectId, name: state.projectName, state: state}
      localStorage.setItem('sharpen', JSON.stringify(sharpenLocalStorage))
    } else {
      // first regist
      if (!state.projectId) {
        state.projectId = utils.random()
      }
      const sharpenLocalStorage = {}
      const memberId            = utils.random()
      sharpenLocalStorage["currentProject"]            = state.projectId
      sharpenLocalStorage["memberId"]                  = memberId
//      sharpenLocalStorage["memberName"]                = memberId
      sharpenLocalStorage["projects"]                  = {}
      sharpenLocalStorage["projects"][state.projectId] = {id: state.projectId, name: state.projectId, state: state}
      localStorage.setItem('sharpen', JSON.stringify(sharpenLocalStorage))
    }
  },

  changeMemberName: (memberName) => (state, actions) => {
    let sharpenLocalStorage        = localStorage.getItem('sharpen')
    sharpenLocalStorage            = JSON.parse(sharpenLocalStorage)
    sharpenLocalStorage.memberName = memberName
    localStorage.setItem('sharpen', JSON.stringify(sharpenLocalStorage))
    Object.assign(state.member, {[sharpenLocalStorage.memberId]: sharpenLocalStorage.memberName})
    //return {}
  },
  changeProjectName: (projectName) => (state, actions) => {
    Object.assign(state, {projectName: projectName})
    //return {}
  },

  ...table(),

  changeLanguage: (locale)=>(state, actions)=>{
    Object.assign(state, {locale: locale})
    return {}
  },

  historyWrapper: ()=>(state, actions)=>{
    actions.history(JSON.parse(JSON.stringify(state))) 
  },

  onload: ()=>(state, actions)=>{
    //parent.window.init(state)
    // semantic ui
    //$('.ui.dropdown').dropdown()
  },

  // master member
  changeMasterMember: (params)=>(state)=>{
    Object.assign(state.member, {[params.id]: params.value})
    return {}
  },
  deleteMasterMember: (id)=>(state)=>{
    delete(state.member[id])
    return {}
  },

  save: () => (state) => {

    const firstSave = (state.sharpenId == null)
    const formData = new FormData();
    if (firstSave) {
      Object.assign(state, {sharpenId: utils.random()})
    }
    formData.append("id", state.sharpenId)
    formData.append("state", JSON.stringify(state))
    const request = new XMLHttpRequest();
    request.open(firstSave ? "POST": "PUT", state.apiEndPoint + (firstSave ? "" : state.sharpenId), true);
    request.onload = function () {
      alert("sucess!")
    }
    request.send(formData);
    localStorage.setItem('state', JSON.stringify(state))
  },

  tasks: { 

    // tasks
    changeTodo: (params)=>(state)=>{
      globalUpdateId = params.id;
      let updatedTodo = Object.assign(state[globalUpdateId].todo, {[params.value.id]: params.value})
      // update progress
      let total   = Object.keys(state[globalUpdateId].todo).length
      let checked = 0
      Object.keys(state[globalUpdateId].todo).forEach(
        function(index,val,arr) {
          if (state[globalUpdateId].todo[index].done) {
            checked++
          }
        }
      );
      state[globalUpdateId].progress = parseInt((checked.toFixed(2) / total.toFixed(2)) * 100)
      return {}
    },

    changeStartDateFromCalendar: (params) => (state) => {
      const [id, startDate, globalState] = params
      state[id].startDate     = startDate
      state[id].startPosition = utils.getWidthOfStartPoint(globalState.tableStartDate, startDate, globalState.globalCellWidth)
      state[id].width         = utils.getWidthFromTerm(startDate, state[id].endDate, globalState.globalCellWidth)
      return {}
    },

    changeEndDateFromCalendar: (params) => (state) => {
      const [id, endDate, globalState] = params
      state[id].endDate = endDate
      state[id].width   = utils.getWidthFromTerm(state[id].startDate, endDate, globalState.globalCellWidth)
      return {}
    },

    changeTodoTitle: (params)=>(state)=>{
      globalUpdateId = params.id;
      state[globalUpdateId].todo[params.value.id].title = params.value.title
      return {}
    },

    changeTodoStatus: (params)=>(state)=>{
      globalUpdateId = params.id;
      state[globalUpdateId].todo[params.value.id].done = params.value.status
      let total   = Object.keys(state[globalUpdateId].todo).length
      let checked = 0
      Object.keys(state[globalUpdateId].todo).forEach(
        function(index,val,arr) {
          if (state[globalUpdateId].todo[index].done) {
            checked++
          }
        }
      );
      state[globalUpdateId].progress = parseInt((checked.toFixed(2) / total.toFixed(2)) * 100)
      return {}
    },

    deleteTodo: (params)=>(state)=>{
      globalUpdateId = params.id;
      delete(state[globalUpdateId].todo[params.value])
      let total   = Object.keys(state[globalUpdateId].todo).length
      let checked = 0
      Object.keys(state[globalUpdateId].todo).forEach(
        function(index,val,arr) {
          if (state[globalUpdateId].todo[index].done) {
            checked++
          }
        }
      );
      state[globalUpdateId].progress = parseInt((checked.toFixed(2) / total.toFixed(2)) * 100)
      return {}
    },

    // comment
    changeComment: (params)=>(state)=>{
      globalUpdateId = params.id;
      let updatedComment = Object.assign(state[globalUpdateId].comment, {[params.value.id]: params.value})
      return {}
    },

    deleteComment: (params)=>(state)=>{
      globalUpdateId = params.id;
      delete(state[globalUpdateId].comment[params.value])
      return {}
    },

    changeMember: (params) => (state, actions) => {
      const [id, member] = params
      globalUpdateId = id
      state[globalUpdateId].member = member 
      return {}
    },

    changeDescription: (params) => (state, actions) => {
      globalUpdateId = params.id;
      state[globalUpdateId].description = params.description
      return {}
    },

    changeTitle: (params) => (state, actions) => {
      state[params.id].title = params.title
      return {}
    },

    add: (globalState) => (state) => {

      //window.his() くそ重くなるので一旦はずす

      let id = Number(Object.keys(state)[Object.keys(state).length -1]) + 1

      let tempDate     = new Date()
      let start        = Math.abs(utils.getTermFromDate(utils.getDateStr(tempDate), utils.getDateStr(window.startDate))) + 1
      let addStartDate = window.startDate.getDate()

      state[id] = 
      { 
          id:             id,
          display:        "",
          title:          "Added task",
          description:    "",
          member:         [],
          todo:           {},
          comment:        {},
          progress:       0,
          startPosition:  start * globalState.globalCellWidth,
          endPosition:    (start * globalState.globalCellWidth) + (2*globalState.globalCellWidth),
          width:          2 * globalState.globalCellWidth-1,
          pageX:          0,
          startDate:      utils.get_date(start * globalState.globalCellWidth, globalState.globalCellWidth, window.startDate),
          endDate:        utils.get_date((start * globalState.globalCellWidth)+(2 * globalState.globalCellWidth-1), globalState.globalCellWidth, window.startDate),
      }
      utils.smoothScroll()
      return {}
    }, 

    del: (id) => (state, actions) => {
      delete(state[id])
      return {}
    }, 

    changePosition: (params) => (state, actions) => {
      const [id, sourceId] = params
      const source   = JSON.parse(JSON.stringify(state[sourceId]))
      const target   = JSON.parse(JSON.stringify(state[id]))
      source.id      = id
      source.display = ""
      state[id]      = source
      target.id      = sourceId
      state[sourceId]= target
      return {}
    },

    dragEnd: (params) => (state, actions) => {

      const [pageX, globalState, globalUpdateId, pageXPoint] = params

      let startPosition = 0
      if (pageX > pageXPoint) {
        startPosition = utils.widthResized((pageX - pageXPoint), globalState.globalCellWidth) + state[globalUpdateId].startPosition
      } else {
        startPosition = state[globalUpdateId].startPosition - utils.widthResized((pageXPoint - pageX), globalState.globalCellWidth)
      }
      state[globalUpdateId].startPosition = startPosition
      state[globalUpdateId].endPosition   = startPosition + state[globalUpdateId].width
      state[globalUpdateId].startDate     = utils.get_date(startPosition, globalState.globalCellWidth, window.startDate)
      state[globalUpdateId].endDate       = utils.get_date(startPosition + state[globalUpdateId].width, globalState.globalCellWidth, window.startDate)
      return {}
    },

    startPointResizeEnd: (params) => (state, actions) => {

      const [e, globalState, globalUpdateId, pageXPoint] = params

        e.preventDefault();
        let pageX = e.pageX;

        resizeStartingPoint = ""
        let startPosition = 0
        if (e.pageX > pageXPoint) {
          startPosition = utils.widthResized((e.pageX - pageXPoint), globalState.globalCellWidth) + state[globalUpdateId].startPosition
        } else {
          startPosition = state[globalUpdateId].startPosition - utils.widthResized((pageXPoint - e.pageX), globalState.globalCellWidth)
        }

        let width         = state[globalUpdateId].endPosition - startPosition
        let endPosition   = width + startPosition

        // 1日分よりは小さくならない様にする
        if ((state[globalUpdateId].endPosition - (pageX-pageXPoint)) <= globalState.globalCellWidth || width <= 0) {
          startPosition = state[globalUpdateId].endPosition - globalState.globalCellWidth
          width         = globalState.globalCellWidth
        }

        state[globalUpdateId].startPosition = startPosition
        state[globalUpdateId].startDate     = utils.get_date(startPosition, globalState.globalCellWidth, window.startDate)
        state[globalUpdateId].endDate       = utils.get_date(startPosition + width -1, globalState.globalCellWidth, window.startDate)
        state[globalUpdateId].width         = width -1
        return {}

    },


    endPointResizeEnd: (params) => (state, actions) => {

      const [e, globalState, globalUpdateId, pageXPoint] = params

        e.preventDefault();
        let pageX = e.pageX;

        resizeStartingPoint = ""

        let width = 0
        if (e.pageX > pageXPoint) {
          width = utils.widthResized((e.pageX - pageXPoint), globalState.globalCellWidth) + state[globalUpdateId].width
        } else {
          width = state[globalUpdateId].width - utils.widthResized((pageXPoint - e.pageX), globalState.globalCellWidth)
        }

        // 1日分よりは小さくならない様にする
        if (width == 0) {
          width = globalState.globalCellWidth
        }

        state[globalUpdateId].width       = width
        state[globalUpdateId].endPosition = state[globalUpdateId]["startPosition"] + width
        state[globalUpdateId].endDate     = utils.get_date(state[globalUpdateId]["startPosition"] + width -1, globalState.globalCellWidth, window.startDate)
        return {}

    }
  },
}
