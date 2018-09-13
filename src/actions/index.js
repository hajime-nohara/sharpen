import utils        from '../classes/utils'
import table        from './table'
import defaultState from '../state'

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
          currentProjectId: "xxxxx" 
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
      sharpenUserLS["currentProjectId"]            = state.projectId
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
    // store to sharpen_user, sharpen_data (local storage)
    const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
    const projectId     = utils.random()
    sharpenUserLS["projects"][projectId] = {id: projectId, name: projectName}
    sharpenUserLS.currentProjectId = projectId
    localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))
    const sharpenDataLS = JSON.parse(localStorage.getItem('sharpen_data'))
    defaultState.projectName = projectName
    defaultState.projectId   = projectId
    defaultState.projectOwner= sharpenUserLS.memberId
    Object.assign(defaultState.member, {[sharpenUserLS.memberId]: sharpenUserLS.memberName})
    sharpenDataLS[projectId] = defaultState
    localStorage.setItem('sharpen_data', JSON.stringify(sharpenDataLS))

    // store to cloud data store
    // todo

    // return default state updated project name, id
    return defaultState
  },

  changeMemberName: (memberName) => (state, actions) => {

    let sharpenUserLS        = localStorage.getItem('sharpen_user')
    sharpenUserLS            = JSON.parse(sharpenUserLS)
    sharpenUserLS.memberName = memberName
    localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))
    Object.assign(state.member, {[sharpenUserLS.memberId]: sharpenUserLS.memberName})

    // store to cloud data store
    const formData = new FormData();
    const actoin   = "POST"
    formData.append("id",   sharpenUserLS.memberId)
    formData.append("data", localStorage.getItem('sharpen_user'))
    formData.append("timestamp", Date.now())
    const request = new XMLHttpRequest();
    request.open(actoin, state.apiEndPointMember, true);
    request.onload = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
        } else {
          console.error(request.statusText);
        }
      }
    }
    request.send(formData);
    return {}
  },

  changeProject: (projectId) => (state, actions) => {
    // store to sharpen_user, sharpen_data (local storage)
    const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
    sharpenUserLS.currentProjectId = projectId
    localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))

    const sharpenDataLS = JSON.parse(localStorage.getItem('sharpen_data'))
    if (!sharpenDataLS[projectId]) {
      // get data by api
      localStorage.setItem('sharpen_data', JSON.stringify(sharpenDataLS))
    } else {
      // return default state updated project name, id
      return sharpenDataLS[projectId]
    }
  },

  changeProjectName: (projectName) => (state, actions) => {
    let sharpenUserLS        = localStorage.getItem('sharpen_user')
    sharpenUserLS            = JSON.parse(sharpenUserLS)
    Object.assign(sharpenUserLS.projects[sharpenUserLS.currentProjectId], {name: projectName})
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
    // Right now I am thinking do user need this function.
    //delete(state.member[id])
    //return {}
  },

  publish: () => (state) => {

    const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
    const sharpenDataLS = JSON.parse(localStorage.getItem('sharpen_data'))

    const formData = new FormData();
    const actoin   = state.published ? "POST" : "POST"
    formData.append("id",       state.projectId)
    formData.append("data",    JSON.stringify(state))
    formData.append("memberId", sharpenUserLS.memberId)
    const request = new XMLHttpRequest();
    request.open(actoin, state.apiEndPointState + (state.published ? state.projectId : ''), true);
    request.onload = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.response)
//          console.log(JSON.parse(request.response))
//          state.published = true
        } else {
          console.error(request.statusText);
        }
      }
    }
    request.send(formData);
  },

  tasks: { 

    clearWatched: (id) => (state, actions) => {
      const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
      state[id].watched = [sharpenUserLS.memberId]
    },

    watched: (id) => (state, actions) => {
      const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
      if (!state[id].watched.includes(sharpenUserLS.memberId)) {
        state[id].watched.push(sharpenUserLS.memberId)
      }
      return {}
    },

    // tasks
    changeTodo: (params)=>(state, actions)=>{
      actions.clearWatched(params.id)
      let updatedTodo = Object.assign(state[params.id].todo, {[params.value.id]: params.value})
      // update progress
      let total   = Object.keys(state[params.id].todo).length
      let checked = 0
      Object.keys(state[params.id].todo).forEach(
        function(index,val,arr) {
          if (state[params.id].todo[index].done) {
            checked++
          }
        }
      );
      state[params.id].progress = parseInt((checked.toFixed(2) / total.toFixed(2)) * 100)
      return {}
    },

    changeStartDateFromCalendar: (params) => (state, actions) => {
      const [id, startDate, globalState] = params
      actions.clearWatched(id)
      state[id].startDate     = startDate
      state[id].startPosition = utils.getWidthOfStartPoint(globalState.tableStartDate, startDate, globalState.globalCellWidth)
      state[id].width         = utils.getWidthFromTerm(startDate, state[id].endDate, globalState.globalCellWidth)
      return {}
    },

    changeEndDateFromCalendar: (params) => (state, actions) => {
      const [id, endDate, globalState] = params
      actions.clearWatched(id)
      state[id].endDate = endDate
      state[id].width   = utils.getWidthFromTerm(state[id].startDate, endDate, globalState.globalCellWidth)
      return {}
    },

    changeTodoTitle: (params)=>(state, actions)=>{
      actions.clearWatched(params.id)
      state[params.id].todo[params.value.id].title = params.value.title
      return {}
    },

    changeTodoStatus: (params)=>(state, actions)=>{
      actions.clearWatched(params.id)
      state[params.id].todo[params.value.id].done = params.value.status
      let total   = Object.keys(state[params.id].todo).length
      let checked = 0
      Object.keys(state[params.id].todo).forEach(
        function(index,val,arr) {
          if (state[params.id].todo[index].done) {
            checked++
          }
        }
      );
      state[params.id].progress = parseInt((checked.toFixed(2) / total.toFixed(2)) * 100)
      return {}
    },

    deleteTodo: (params)=>(state, actions)=>{
      actions.clearWatched(params.id)
      delete(state[params.id].todo[params.value])
      let total   = Object.keys(state[params.id].todo).length
      let checked = 0
      Object.keys(state[params.id].todo).forEach(
        function(index,val,arr) {
          if (state[params.id].todo[index].done) {
            checked++
          }
        }
      );
      state[params.id].progress = parseInt((checked.toFixed(2) / total.toFixed(2)) * 100)
      return {}
    },

    // comment
    changeComment: (params)=>(state, actions)=>{
      actions.clearWatched(params.id)
      let updatedComment = Object.assign(state[params.id].comment, {[params.value.id]: params.value})
      return {}
    },

    deleteComment: (params)=>(state, actions)=>{
      actions.clearWatched(params.id)
      delete(state[params.id].comment[params.value])
      return {}
    },

    changeMember: (params) => (state, actions) => {
      const [id, member] = params
      actions.clearWatched(id)
      state[id].member = member 
      return {}
    },

    changeDescription: (params) => (state, actions) => {
      actions.clearWatched(params.id)
      state[params.id].description = params.description
      return {}
    },

    changeTitle: (params) => (state, actions) => {
      actions.clearWatched(params.id)
      state[params.id].title = params.title
      return {}
    },

    add: (globalState) => (state) => {

      //window.his() くそ重くなるので一旦はずす
      const taskIds    = Object.keys(state)
      const id         = taskIds.length ? (Number(Object.keys(state)[Object.keys(state).length -1]) + 1) : 1
      const startDate  = new Date(globalState.tableStartDate)
      let tempDate     = new Date(id==1 ? new Date : state[taskIds[Object.keys(state).length-1]].endDate)
      let start        = Math.abs(utils.getTermFromDate(utils.getDateStr(tempDate), globalState.tableStartDate)) + 1
      let addStartDate = startDate.getDate()

      const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))

      state[id] = 
      { 
          id:             id,
          display:        "",
          title:          globalState.i18n[globalState.locale].newTask,
          description:    globalState.i18n[globalState.locale].newTask,
          member:         [],
          todo:           {},
          comment:        {},
          watched:        [sharpenUserLS.memberId],
          progress:       0,
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
