import utils from '../classes/utils'
import table from './table'
import defaultState from '../state'
import i18n from '../i18n'
import config from '../../config'

export default {
  reRender: () => ({}),

  // this action does not update state
  saveToLocalStorage: () => (state) => {
    /* local storage layout
        sharpen: {
          memberId:   'xxxxx',
          memberName: 'xxxxx',
          projects: {
            xxxxx: {id: 'xxxxx', name: 'xxxxx'},
            xxxxx: {id: 'xxxxx', name: 'xxxxx'}
          },
          currentProjectId: 'xxxxx'
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
      const sharpenUserLS = localStorage.getItem('sharpen_user') || {}
      if (Object.keys(sharpenUserLS).length === 0) {
        const memberId = utils.random()
        sharpenUserLS['currentProjectId'] = state.projectId
        sharpenUserLS['memberId'] = memberId
        sharpenUserLS['memberName'] = null
        sharpenUserLS['projects'] = {}
        sharpenUserLS['projects'][state.projectId] = {id: state.projectId, name: state.projectId}
        localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))
      }

      const sharpenDataLS = {}
      sharpenDataLS[state.projectId] = JSON.parse(JSON.stringify(state))
      localStorage.setItem('sharpen_data', JSON.stringify(sharpenDataLS))
    }
  },

  addProject: (projectName) => (state) => {
    // reset address bar
    history.replaceState('', '', 'gantt.html')
    // store to sharpen_user, sharpen_data (local storage)
    const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
    const projectId = utils.random()
    sharpenUserLS['projects'][projectId] = {id: projectId, name: projectName}
    sharpenUserLS.currentProjectId = projectId
    localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))
    const sharpenDataLS = JSON.parse(localStorage.getItem('sharpen_data'))
    defaultState.projectName = projectName
    defaultState.projectId = projectId
    defaultState.projectOwner = sharpenUserLS.memberId
    Object.assign(defaultState.member, {[sharpenUserLS.memberId]: sharpenUserLS.memberName})
    sharpenDataLS[projectId] = defaultState
    localStorage.setItem('sharpen_data', JSON.stringify(sharpenDataLS))

    // store to cloud data store
    const formData = new FormData()
    const actoin = 'PUT'
    formData.append('id', sharpenUserLS.memberId)
    formData.append('data', localStorage.getItem('sharpen_user'))
    formData.append('last_updated', Date())
    const request = new XMLHttpRequest()
    request.open(actoin, config.apiEndPointMember + sharpenUserLS.memberId, true)
    request.onerror = function () {
      state.published = false
    }
    request.onload = function () {
      if (request.readyState === 4) {
        if ([200, 201].includes(request.status)) {
        } else {
          console.error(request.statusText)
        }
      }
    }
    request.send(formData)
    // return default state updated project name, id
    // defaultState.tasks['format'] is default data for format. So delete it.
    delete (defaultState.tasks['format'])
    return defaultState
  },

  changeMemberName: (memberName) => (state) => {
    let sharpenUserLS = localStorage.getItem('sharpen_user')
    sharpenUserLS = JSON.parse(sharpenUserLS)
    sharpenUserLS.memberName = memberName
    localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))
    Object.assign(state.member, {[sharpenUserLS.memberId]: sharpenUserLS.memberName})

    // store to cloud data store
    const formData = new FormData()
    const actoin = 'POST'
    formData.append('id', sharpenUserLS.memberId)
    formData.append('data', localStorage.getItem('sharpen_user'))
    formData.append('last_updated', Date())
    const request = new XMLHttpRequest()
    request.open(actoin, config.apiEndPointMember, true)
    request.onerror = function () {
      state.published = false
    }
    request.onload = function () {
      if (request.readyState === 4) {
        if ([200, 201].includes(request.status)) {
        } else {
          console.error(request.statusText)
        }
      }
    }
    request.send(formData)
    return {}
  },

  changeProject: (projectId) => (state) => {
    // reset address bar
    history.replaceState('', '', 'gantt.html')

    // store to sharpen_user, sharpen_data (local storage)
    const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
    sharpenUserLS.currentProjectId = projectId
    localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))

    const sharpenDataLS = JSON.parse(localStorage.getItem('sharpen_data'))
    if (!sharpenDataLS[projectId]) {
      // get data by api
      const request = new XMLHttpRequest()
      request.open('GET', config.apiEndPointState + projectId)
      request.onerror = function () {
      }
      request.onload = () => {
        // no data
        if (!(JSON.parse(request.response) && JSON.parse(request.response).data)) {
          state.statusCode = 404
          return {}
        }
        const loadedState = JSON.parse(JSON.parse(request.response).data)
        loadedState.statusCode = 200
        sharpenDataLS[projectId] = loadedState
        localStorage.setItem('sharpen_data', JSON.stringify(sharpenDataLS))
        return loadedState
      }
      request.send()
    } else {
      // return default state updated project name, id
      return sharpenDataLS[projectId]
    }
  },

  changeProjectName: (projectName) => (state) => {
    let sharpenUserLS = localStorage.getItem('sharpen_user')
    sharpenUserLS = JSON.parse(sharpenUserLS)
    Object.assign(sharpenUserLS.projects[sharpenUserLS.currentProjectId], {name: projectName})
    localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))
    Object.assign(state, {projectName: projectName})
    return {}
  },

  ...table(),

  changeLanguage: (locale) => (state) => {
    Object.assign(state, {locale: locale})
    return {}
  },

  historyWrapper: () => (state, actions) => {
    actions.history(JSON.parse(JSON.stringify(state)))
  },

  onload: () => () => {
    // parent.window.init(state)
    // semantic ui
    // $('.ui.dropdown').dropdown()
  },

  // master member
  changeMasterMember: (params) => (state) => {
    Object.assign(state.member, {[params.id]: params.value})
    return {}
  },

  deleteMasterMember: () => () => {
    // Right now I am thinking do user need this function.
    // delete(state.member[id])
    // return {}
  },

  publish: () => (state) => {
    const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
    const sharpenDataLS = JSON.parse(localStorage.getItem('sharpen_data'))
    const formData = new FormData()
    const actoin = state.published ? 'PUT' : 'POST'
    const url = config.apiEndPointState + (state.published ? state.projectId : '')
    formData.append('id', state.projectId)
    formData.append('data', JSON.stringify(state))
    formData.append('memberId', sharpenUserLS.memberId)
    formData.append('last_updated', Date())
    const request = new XMLHttpRequest()
    request.open(actoin, url, true)
    request.onload = function () {
      if (request.readyState === 4) {
        if ([200, 201].includes(request.status)) {
          if (!state.published) {
            state.published = true
            document.getElementById('sharedUrlModalTrigger').click()
          } else {
            $(document.getElementById('publish')).popup('show', null, null)
            setTimeout(() => $(document.getElementById('publish')).popup('destroy', null, null), 1000)
          }
        } else {
          if (request.status === 401) {
            // if not exist memberId, reset member data.
            alert(state.i18n[state.locale].errorMessages.noMemberId)
            const memberId = utils.random()
            const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
            sharpenUserLS['currentProjectId'] = state.projectId
            sharpenUserLS['memberId'] = memberId
            sharpenUserLS['memberName'] = null
            sharpenUserLS['projects'] = {}
            sharpenUserLS['projects'][state.projectId] = {id: state.projectId, name: state.projectName}
            localStorage.setItem('sharpen_user', JSON.stringify(sharpenUserLS))
          }
          console.error(request.statusText)
        }
      }
    }
    request.send(formData)
  },

  tasks: {
    clearWatched: (id) => (state) => {
      const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
      state[id].watched = [sharpenUserLS.memberId]
    },

    watched: (id) => (state) => {
      const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
      if (!state[id].watched.includes(sharpenUserLS.memberId)) {
        state[id].watched.push(sharpenUserLS.memberId)
      }
      return {}
    },

    // tasks
    changeTodo: (params) => (state, actions) => {
      actions.clearWatched(params.id)
      Object.assign(state[params.id].todo, {[params.value.id]: params.value})
      // update progress
      const total = Object.keys(state[params.id].todo).length
      let checked = 0
      Object.keys(state[params.id].todo).forEach(
        function (index) {
          if (state[params.id].todo[index].done) {
            checked++
          }
        }
      )
      state[params.id].progress = parseInt((checked.toFixed(2) / total.toFixed(2)) * 100)
      return {}
    },

    changeStartDateFromCalendar: (params) => (state, actions) => {
      const [id, startDate, globalState] = params
      const tableStartDate = new Date(globalState.tableStartDate)
      const _startDate = new Date(startDate)
      const endDate = new Date(state[id].endDate)

      if (_startDate < tableStartDate || _startDate > endDate) {
        return
      }

      actions.clearWatched(id)
      state[id].startDate = startDate
      state[id].startPosition = utils.getWidthOfStartPoint(globalState.tableStartDate, startDate, globalState.globalCellWidth)
      state[id].width = utils.getWidthFromTerm(startDate, state[id].endDate, globalState.globalCellWidth)
      return {}
    },

    changeEndDateFromCalendar: (params) => (state, actions) => {
      const [id, endDate, globalState] = params

      const tableEndDate = new Date(globalState.tableEndDate)
      const startDate = new Date(state[id].startDate)
      const _endDate = new Date(endDate)

      if (_endDate > tableEndDate || startDate > _endDate) {
        return
      }

      actions.clearWatched(id)
      state[id].endDate = endDate
      state[id].width = utils.getWidthFromTerm(state[id].startDate, endDate, globalState.globalCellWidth)
      return {}
    },

    changeTodoTitle: (params) => (state, actions) => {
      actions.clearWatched(params.id)
      state[params.id].todo[params.value.id].title = params.value.title
      return {}
    },

    changeTodoStatus: (params) => (state, actions) => {
      actions.clearWatched(params.id)
      state[params.id].todo[params.value.id].done = params.value.status
      const total = Object.keys(state[params.id].todo).length
      let checked = 0
      Object.keys(state[params.id].todo).forEach(
        function (index) {
          if (state[params.id].todo[index].done) {
            checked++
          }
        }
      )
      state[params.id].progress = parseInt((checked.toFixed(2) / total.toFixed(2)) * 100)
      return {}
    },

    deleteTodo: (params) => (state, actions) => {
      actions.clearWatched(params.id)
      delete (state[params.id].todo[params.value])
      const total = Object.keys(state[params.id].todo).length
      let checked = 0
      Object.keys(state[params.id].todo).forEach(
        function (index) {
          if (state[params.id].todo[index].done) {
            checked++
          }
        }
      )
      state[params.id].progress = parseInt((checked.toFixed(2) / total.toFixed(2)) * 100)
      return {}
    },

    // comment
    changeComment: (params) => (state, actions) => {
      actions.clearWatched(params.id)
      Object.assign(state[params.id].comment, {[params.value.id]: params.value})
      return {}
    },

    deleteComment: (params) => (state, actions) => {
      actions.clearWatched(params.id)
      delete (state[params.id].comment[params.value])
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
      // window.his() くそ重くなるので一旦はずす
      const taskIds = Object.keys(state)
      const id = taskIds.length ? (Number(Object.keys(state)[Object.keys(state).length - 1]) + 1) : 1
      const startDate = new Date(globalState.tableStartDate)
      const tempDate = new Date(id === 1 ? new Date() : state[taskIds[Object.keys(state).length - 1]].endDate)
      const start = Math.abs(utils.getTermFromDate(utils.getDateStr(tempDate), globalState.tableStartDate)) + 1
      const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))

      state[id] =
      {
        id: id,
        display: '',
        title: i18n[globalState.locale].newTask,
        description: i18n[globalState.locale].newTask,
        member: [],
        todo: {},
        comment: {},
        watched: [sharpenUserLS.memberId],
        progress: 0,
        startPosition: start * globalState.globalCellWidth,
        endPosition: (start * globalState.globalCellWidth) + (2 * globalState.globalCellWidth),
        width: 2 * globalState.globalCellWidth - 1,
        pageX: 0,
        startDate: utils.getDate(start * globalState.globalCellWidth, globalState.globalCellWidth, startDate),
        endDate: utils.getDate((start * globalState.globalCellWidth) + (2 * globalState.globalCellWidth - 1), globalState.globalCellWidth, startDate)
      }
      // utils.smoothScroll()
      return {}
    },

    del: (id) => (state) => {
      delete (state[id])
      return {}
    },

    changePosition: (params) => (state) => {
      const [id, sourceId] = params
      const source = JSON.parse(JSON.stringify(state[sourceId]))
      const target = JSON.parse(JSON.stringify(state[id]))
      source.id = id
      source.display = ''
      state[id] = source
      target.id = sourceId
      state[sourceId] = target
      return {}
    },

    dragEnd: (params) => (state) => {
      const [pageX, globalState, globalUpdateId, pageXPoint] = params
      const tableStartDate = new Date(globalState.tableStartDate)

      let startPosition = 0
      if (pageX > pageXPoint) {
        startPosition = utils.widthResized((pageX - pageXPoint), globalState.globalCellWidth) + state[globalUpdateId].startPosition
      } else {
        startPosition = state[globalUpdateId].startPosition - utils.widthResized((pageXPoint - pageX), globalState.globalCellWidth)
      }

      const startDate = new Date(utils.getDate(startPosition, globalState.globalCellWidth, tableStartDate))
      if (startDate < tableStartDate) {
        return
      }

      state[globalUpdateId].startPosition = startPosition
      state[globalUpdateId].endPosition = startPosition + state[globalUpdateId].width
      state[globalUpdateId].startDate = utils.getDate(startPosition, globalState.globalCellWidth, tableStartDate)
      state[globalUpdateId].endDate = utils.getDate(startPosition + state[globalUpdateId].width, globalState.globalCellWidth, tableStartDate)
      return {}
    },

    startPointResizeEnd: (params) => (state) => {
      const [e, globalState, globalUpdateId, pageXPoint] = params

      e.preventDefault()
      const pageX = e.pageX

      let startPosition = 0
      if (e.pageX > pageXPoint) {
        startPosition = utils.widthResized((e.pageX - pageXPoint), globalState.globalCellWidth) + state[globalUpdateId].startPosition
      } else {
        startPosition = state[globalUpdateId].startPosition - utils.widthResized((pageXPoint - e.pageX), globalState.globalCellWidth)
      }

      let width = state[globalUpdateId].endPosition - startPosition

      // 1日分よりは小さくならない様にする
      if ((state[globalUpdateId].endPosition - (pageX - pageXPoint)) <= globalState.globalCellWidth || width <= 0) {
        startPosition = state[globalUpdateId].endPosition - globalState.globalCellWidth
        width = globalState.globalCellWidth
      }

      const tableStartDate = new Date(globalState.tableStartDate)
      const endDate = new Date(state[globalUpdateId].endDate)
      const startDateStr = utils.getDate(startPosition, globalState.globalCellWidth, tableStartDate)
      const startDate = new Date(startDateStr)
      if (!(startDate > endDate || startDate < tableStartDate)) {
        state[globalUpdateId].startPosition = startPosition
        state[globalUpdateId].startDate = utils.getDate(startPosition, globalState.globalCellWidth, tableStartDate)
        state[globalUpdateId].endDate = utils.getDate(startPosition + width - 1, globalState.globalCellWidth, tableStartDate)
        state[globalUpdateId].width = width - 1
      }
      return {}
    },

    endPointResizeEnd: (params) => (state) => {
      const [e, globalState, globalUpdateId, pageXPoint] = params

      e.preventDefault()

      let width = 0
      if (e.pageX > pageXPoint) {
        width = utils.widthResized((e.pageX - pageXPoint), globalState.globalCellWidth) + state[globalUpdateId].width
      } else {
        width = state[globalUpdateId].width - utils.widthResized((pageXPoint - e.pageX), globalState.globalCellWidth)
      }

      // 1日分よりは小さくならない様にする
      if (width === 0) {
        width = globalState.globalCellWidth
      }

      const tableStartDate = new Date(globalState.tableStartDate)
      const tableEndDate = new Date(globalState.tableEndDate)
      const startDate = new Date(state[globalUpdateId].startDate)
      const endDateStr = utils.getDate(state[globalUpdateId]['startPosition'] + width - 1, globalState.globalCellWidth, tableStartDate)
      const endDate = new Date(endDateStr)
      if (!(startDate > endDate || endDate > tableEndDate)) {
        state[globalUpdateId].width = width
        state[globalUpdateId].endPosition = state[globalUpdateId]['startPosition'] + width
        state[globalUpdateId].endDate = endDateStr
      }
      return {}
    }
  }
}
