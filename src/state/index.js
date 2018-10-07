import { h } from 'hyperapp'
import utils from '../classes/utils'

export default {

  version: 'abe6fc79efda563be12d20e0773b5f3b51aaca92',

  // common state value for project
  projectId: null,
  projectName: null,
  projectOwner: null,
  published: false,
  statusCode: null,
  locale: 'en',

  // common state value for table
  pageXStartPoint: 0,
  globalCellWidth: 70,
  tableStartDate: utils.getDateStr(new Date()),
  tableEndDate: utils.getDateStr(new Date((new Date()).setMonth((new Date()).getMonth() + 1))),

  // common state value for task
  member: {},

  // task data format
  tasks: {
    /* This is format data. This will not be rendered. */
    format: {
      id: 1,
      title: 'Test title',
      description: 'Test description',
      member: [],
      todo: {},
      comment: {
        1: {
          comment: 'Test comment',
          timestamp: '1980-01-01 00:00:00',
          memberId: 'TestId',
          memberName: 'Test member'
        }
      },
      watched: [],
      progress: 0,
      startPosition: 0,
      endPosition: 0,
      width: 0,
      startDate: '1980-01-01',
      endDate: '1980-01-01'
    }
  }
}
