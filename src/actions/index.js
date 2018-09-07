import utils from '../classes/utils'
import table from './table'

export default {

  reRender: () => ({}),

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
    let sharpenDataLS = localStorage.getItem('sharpen_data')
    if (sharpenDataLS) {
      sharpenDataLS = JSON.parse(sharpenDataLS)
      sharpenDataLS[state.projectId] = state
      localStorage.setItem('sharpen_data', JSON.stringify(sharpenDataLS))
    } else {
      // first regist
      if (!state.projectId) {
        state.projectId = utils.random()
      }
      const sharpenUserLS = {}
      const memberId            = utils.random()
      sharpenUserLS["currentProject"]            = state.projectId
      sharpenUserLS["memberId"]                  = memberId
      sharpenUserLS["memberName"]                = null
      sharpenUserLS["projects"]                  = {}
      sharpenUserLS["projects"][state.projectId] = {id: state.projectId, name: state.projectId}
      localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))

      const sharpenDataLS = {}
      sharpenDataLS[state.projectId] = JSON.parse(JSON.stringify(state))
      localStorage.setItem('sharpen_data', JSON.stringify(sharpenDataLS))
    }
  },

  addProject: (projectName) => (state, actions) => {
    console.log(projectName)
    // store to sharpen_user, sharpen_data (local storage)
    // return default state updated project name, id
    return {}
  },

  changeMemberName: (memberName) => (state, actions) => {
    let sharpenUserLS        = localStorage.getItem('sharpen_user')
    sharpenUserLS            = JSON.parse(sharpenUserLS)
    sharpenUserLS.memberName = memberName
    localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))
    Object.assign(state.member, {[sharpenUserLS.memberId]: sharpenUserLS.memberName})
    return {}
  },

  changeProjectName: (projectName) => (state, actions) => {
    let sharpenUserLS        = localStorage.getItem('sharpen_user')
    sharpenUserLS            = JSON.parse(sharpenUserLS)
    Object.assign(sharpenUserLS.projects[sharpenUserLS.currentProject], {name: projectName})
    localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))
    Object.assign(state, {projectName: projectName})
    return {}
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
      const taskIds    = Object.keys(state)
      const id         = taskIds.length ? (Number(Object.keys(state)[Object.keys(state).length -1]) + 1) : 1
      const startDate  = new Date(globalState.tableStartDate)
      let tempDate     = new Date(id==1 ? new Date : state[Object.keys(state).length].endDate)
      let start        = Math.abs(utils.getTermFromDate(utils.getDateStr(tempDate), globalState.tableStartDate)) + 1
      let addStartDate = startDate.getDate()

      state[id] = 
      { 
          id:             id,
          display:        "",
          title:          globalState.i18n[globalState.locale].newTask,
          description:    globalState.i18n[globalState.locale].newTask,
          member:         [],
          todo:           {},
          comment:        {},
          progress:       0,
          startPosition:  start * globalState.globalCellWidth,
          endPosition:    (start * globalState.globalCellWidth) + (2*globalState.globalCellWidth),
          width:          2 * globalState.globalCellWidth-1,
          pageX:          0,
          startDate:      utils.get_date(start * globalState.globalCellWidth, globalState.globalCellWidth, startDate),
          endDate:        utils.get_date((start * globalState.globalCellWidth)+(2 * globalState.globalCellWidth-1), globalState.globalCellWidth, startDate),
      }
      //utils.smoothScroll()
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
      const tableStartDate = new Date(globalState.tableStartDate)

      let startPosition = 0
      if (pageX > pageXPoint) {
        startPosition = utils.widthResized((pageX - pageXPoint), globalState.globalCellWidth) + state[globalUpdateId].startPosition
      } else {
        startPosition = state[globalUpdateId].startPosition - utils.widthResized((pageXPoint - pageX), globalState.globalCellWidth)
      }
      state[globalUpdateId].startPosition = startPosition
      state[globalUpdateId].endPosition   = startPosition + state[globalUpdateId].width
      state[globalUpdateId].startDate     = utils.get_date(startPosition, globalState.globalCellWidth, tableStartDate)
      state[globalUpdateId].endDate       = utils.get_date(startPosition + state[globalUpdateId].width, globalState.globalCellWidth, tableStartDate)
      return {}
    },

    startPointResizeEnd: (params) => (state, actions) => {

      const [e, globalState, globalUpdateId, pageXPoint] = params

        e.preventDefault();
        let pageX = e.pageX;

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

        const tableStartDate = new Date(globalState.tableStartDate)

        state[globalUpdateId].startPosition = startPosition
        state[globalUpdateId].startDate     = utils.get_date(startPosition, globalState.globalCellWidth, tableStartDate)
        state[globalUpdateId].endDate       = utils.get_date(startPosition + width -1, globalState.globalCellWidth, tableStartDate)
        state[globalUpdateId].width         = width -1
        return {}

    },


    endPointResizeEnd: (params) => (state, actions) => {

      const [e, globalState, globalUpdateId, pageXPoint] = params

        e.preventDefault();
        let pageX = e.pageX;


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

        const tableStartDate = new Date(globalState.tableStartDate)

        state[globalUpdateId].width       = width
        state[globalUpdateId].endPosition = state[globalUpdateId]["startPosition"] + width
        state[globalUpdateId].endDate     = utils.get_date(state[globalUpdateId]["startPosition"] + width -1, globalState.globalCellWidth, tableStartDate)
        return {}

    }
  },
}
