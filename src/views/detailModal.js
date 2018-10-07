import { h } from 'hyperapp'
import utils from '../classes/utils'
import flatpickr from 'flatpickr'
import dateformat from 'dateformat'
import styl from '../styles/detailModal.styl'
import ad from '../ad'
import i18n from '../i18n'

// input view
export default (state, actions, params) => {
  let actionAd = null
  let actionButtons = null
  let actionButtonsDiv = null

  const numberOfAsp = ad.asp.length
  if (numberOfAsp > 0) {
    const aspIndex = Math.floor(Math.random() * (numberOfAsp - 0) + 0)
    const allSizeBanners = ad.asp[aspIndex].banners
    const sizeArr = Object.keys(allSizeBanners)
    const size = Math.floor(Math.random() * (sizeArr.length - 0) + 0)
    const banners = allSizeBanners[sizeArr[size]][state.locale]
    const bannerIndex = Math.floor(Math.random() * (banners.length - 0) + 0)
    const banner = banners[bannerIndex]

    actionAd = <div class={styl.actions + ' actions'}>
      <div class={styl.adFrame}>
        <div class={styl.adCard + ' ui card'}>
          {banner}
          <div class={styl.adMeta}>
            <div class='meta'>
              {i18n[state.locale].ad}
            </div>
          </div>
        </div>
      </div>
    </div>

    actionButtons = <div class='actions'>
      <div class={styl.deleteButton + ' ui black deny button'}>
        {i18n[state.locale].del}
      </div>
      <div class='ui positive icon button right floated'>
        {i18n[state.locale].close}
      </div>
    </div>

    actionButtonsDiv = <h4 class='ui dividing header' />
  } else {
    actionAd = <div class='actions'>
      <div class={styl.deleteButton + ' ui black deny button'}>
        {i18n[state.locale].del}
      </div>
      <div class='ui positive icon button right floated'>
        {i18n[state.locale].close}
      </div>
    </div>
  }

  /* member */
  const onChangeMemberSelect = (e) => {
    const selectedValue = []
    const select = e.target
    for (let i = 0; i < select.childNodes.length; i++) {
      if (select.childNodes[i].selected) {
        selectedValue.push(select.childNodes[i].value)
      }
    }
    actions.tasks.changeMember([params.id, selectedValue])
  }

  const assignedMember = []
  Object.keys(state.member).forEach(
    function (index) {
      const isSelected = ((params.member || params.member !== undefined) && params.member.includes(index))
      const assignedMemberOptionOncreate = (e) => { e.selected = isSelected }
      assignedMember.push(<option
        key={utils.random()}
        value={index}
        oncreate={assignedMemberOptionOncreate}
        onupdate={assignedMemberOptionOncreate}
        ondblclick={() => actions.deleteMasterMember(index)}
      >@{state.member[index]}</option>
      )
    }
  )

  /* todo */
  const todo = []
  if (!params.todo || params.todo === undefined) {
    params.todo = {}
  }

  Object.keys(params.todo).forEach(
    function (index) {
      const todoId = params.id + '_' + index
      const todoOnclick = () => {
        actions.tasks.changeTodoStatus({id: params.id, value: {id: index, status: document.getElementById(todoId).checked}})
      }

      // This code is not used now. But mybe we will need this code.
      /*
      const todoTitleOnFocusout = (e) => actions.tasks.changeTodoTitle({id: params.id, value: {id: index, title: e.target.value}})

      const todoTitleOnKeydown = (e) => {
        if (e.keyCode === 13) {
            e.target.blur()
            actions.tasks.changeTodoTitle({id: params.id, value: {id: index, title: e.target.value}})
          }
      }

      const todoDeleteOnClick = () => {
        actions.tasks.deleteTodo({id: params.id, value: index})
      }
      */

      todo.push(
        <div class='item'>
          <div class={styl.todoCheckbox + ' ui checkbox'}
            oncreate={(e) => $(e).checkbox()}
          >
            <input type='checkbox' id={todoId} checked={params.todo[index].done} onchange={todoOnclick} />
            <label>{params.todo[index].title}</label>
          </div>
          <i class={styl.iconClick + ' trash icon'} onclick={() => actions.tasks.deleteTodo({id: params.id, value: index})} />
        </div>
      )
    }
  )

  // comment data
  const comment = []
  if (!params.comment || params.comment === undefined) {
    params.comment = {}
  }

  const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))

  Object.keys(params.comment).forEach(
    function (index) {
      const commentEditOnFocusout = (e) => {
        actions.tasks.changeComment({
          id: params.id,
          value: {
            id: index,
            comment: e.target.innerHTML,
            timestamp: params.comment[index].timestamp,
            memberId: sharpenUserLS.memberId,
            memberName: sharpenUserLS.memberName
          }
        })
      }

      const commentEditOnKeydown = (e) => {
        if ((e.keyCode === 13 && !utils.isMobile()) && !(e.shiftKey === true || e.ctrlKey === true || e.altKey === true)) {
          e.target.blur()
          actions.tasks.changeComment({
            id: params.id,
            value: {
              id: index,
              comment: e.target.innerHTML,
              timestamp: params.comment[index].timestamp,
              memberId: sharpenUserLS.memberId,
              memberName: sharpenUserLS.memberName
            }
          })
        }
      }

      const isMember = params.comment[index].memberId === sharpenUserLS.memberId
      const deleteButton = isMember
        ? <i class={styl.iconClick + ' trash icon'} onclick={() => actions.tasks.deleteComment({id: params.id, value: index})} /> : null

      const commentOnupdate = (e) => { e.innerHTML = params.comment[index].comment }

      comment.push(
        <div class='comment'>
          <a class='avatar'>
            <i class={styl.avatarIcon + ' user circle icon'} />
          </a>
          <div class='content'>
            <a class='author'>{params.comment[index].memberName}</a>
            <div class='metadata'>
              <span class='date'>{params.comment[index].timestamp}</span>
            </div>
            <div class={styl.comment + ' text'} contentEditable={isMember ? 'true' : 'false'} key={utils.random()}
              onfocusout={commentEditOnFocusout}
              onkeydown={commentEditOnKeydown}
              onupdate={commentOnupdate}
              oncreate={commentOnupdate}
            />
            <div class='actions'>
              {deleteButton}
            </div>
          </div>
        </div>
      )
    }
  )

  const commentOnFocusout = (e) => {
    if (e.target.innerHTML.length > 0) {
      const id = (Object.keys(params.comment).length > 0) ? Number(Object.keys(params.comment)[Object.keys(params.comment).length - 1]) + 1 : 1

      actions.tasks.changeComment({
        id: params.id,
        value: {
          id: id,
          comment: e.target.innerHTML,
          timestamp: dateformat(new Date(), 'yyyy-mm-dd hh:mm:ss'),
          memberId: sharpenUserLS.memberId,
          memberName: sharpenUserLS.memberName
        }
      })
    }
    e.target.innerHTML = ''
  }

  const commentOnKeydown = (e) => {
    if ((e.keyCode === 13 && !utils.isMobile()) && !(e.shiftKey === true || e.ctrlKey === true || e.altKey === true)) {
      e.target.blur()
      if (e.target.innerHTML.length > 0) {
        const id = (Object.keys(params.comment).length > 0) ? Number(Object.keys(params.comment)[Object.keys(params.comment).length - 1]) + 1 : 1
        actions.tasks.changeComment({
          id: params.id,
          value: {
            id: id,
            comment: e.target.innerHTML,
            timestamp: dateformat(new Date(), 'yyyy-mm-dd hh:mm:ss'),
            memberId: sharpenUserLS.memberId,
            memberName: sharpenUserLS.memberName
          }
        })
      }
      e.target.innerHTML = ''
    }
  }

  const detailModalId = 'detailModal_' + params.id
  const detailModalOpenId = 'detailModalOpen_' + params.id

  /* title */
  const titleOnFocusout = (e) => {
    if (e.target.childNodes.length > 0) {
      actions.tasks.changeTitle({id: params.id, title: e.target.childNodes[0].data})
    }
  }
  const titleOnKeydown = (e) => {
    if (e.keyCode === 13) {
      e.target.blur()
      actions.tasks.changeTitle({id: params.id, title: e.target.childNodes[0].data})
    }
  }

  /* date */
  const bindCalendar = (e) => {
    const options = {
      disableMobile: true,
      defaultDate: e.getAttribute('value'),
      locale: i18n[state.locale].flatpickr,
      onChange: function (date) {
        actions.tasks[e.getAttribute('actionName')]([params.id, dateformat(date, 'yyyy-mm-dd'), state])
      }
    }
    flatpickr(e, options)
  }

  /* description */
  const descriptionOnFocusout = (e) => {
    actions.tasks.changeDescription({id: params.id, description: e.target.value})
  }

  const descriptionOnKeydown = (e) => {
    if ((e.keyCode === 13 && !utils.isMobile()) && !(e.shiftKey === true || e.ctrlKey === true || e.altKey === true)) {
      e.target.blur()
      actions.tasks.changeDescription({id: params.id, description: e.target.value})
    }
  }

  /* add member input */
  // when semantic moda close it's will actioin with animation so we need  update state after finish amimation perfectly.
  /*
  const addMemberOnfocusout = (e) => {
    let id = 1
      if (Object.keys(state.member).length > 0) {
        id = Number(Object.keys(state.member)[Object.keys(state.member).length - 1]) + 1
      }
    if (e.target.value.length > 0) {
      actions.changeMasterMember({id: id, value: e.target.value})
    }
    e.target.value = ''
  }
  const addMemberOnKeydown = (e) => {
    if (e.keyCode === 13) {
      e.target.blur()
        let id = 1
        if (Object.keys(state.member).length > 0) {
          id = Number(Object.keys(state.member)[Object.keys(state.member).length- 1]) + 1
        }
      if (e.target.value.length > 0) {
        actions.changeMasterMember({id: id, value: e.target.value})
      }
      e.target.value = ''
    }
  }
  */
  const todoRegistOnfocusout = (e) => {
    let id = 1
    if (Object.keys(params.todo).length > 0) {
      id = Number(Object.keys(params.todo)[Object.keys(params.todo).length - 1]) + 1
    }
    if (e.target.value.length > 0) {
      actions.tasks.changeTodo({id: params.id, value: {id: id, title: e.target.value, done: false}})
    }
    e.target.value = ''
  }

  const todoRegistOnKeydown = (e) => {
    if (e.keyCode === 13) {
      e.target.blur()
      let id = 1
      if (Object.keys(params.todo).length > 0) {
        id = Number(Object.keys(params.todo)[Object.keys(params.todo).length - 1]) + 1
      }
      if (e.target.value.length > 0) {
        actions.tasks.changeTodo({id: params.id, value: {id: id, title: e.target.value, done: false}})
      }
      e.target.value = ''
    }
  }

  const deleteTask = () => {
    actions.tasks.del(params.id)
  }

  const deleteTaskWrap = () => {
    // when semantic moda close it's will actioin with animation so we need  update state after finish amimation perfectly.
    document.getElementById(params.id).style.display = 'none'
    setTimeout(deleteTask, 1000)
  }

  const watched = () => actions.tasks.watched(params.id)
  const titleOnupdate = (e) => { e.innerHTML = params.title }
  const descriptionOnupdate = (e) => { e.innerHTML = params.description }
  return (

    <div class='ui longer modal transition scrolling' id={detailModalId}>

      <div id={detailModalOpenId} onclick={() => $('#' + detailModalId).modal({detachable: false, onDeny: deleteTaskWrap, onVisible: watched}).modal('show')} />
      <div class={styl.header + ' header'}>
        <div class='header' contentEditable='true' key={utils.random()}
          onfocusout={titleOnFocusout}
          onkeydown={titleOnKeydown}
          onupdate={titleOnupdate}
          oncreate={titleOnupdate}
        />
        <i class={styl.close + ' close icon'} onclick={() => $('#' + detailModalId).modal('hide', null, null)} />
      </div>

      <div class='scrolling content'>
        <div class='ui form'>
          <h4 class='ui dividing header'>{i18n[state.locale].date}</h4>
          <div class='field'>
            <div class='two fields'>
              <div class='field'>
                <div class='ui calendar' value={params.startDate} actionName='changeStartDateFromCalendar' oncreate={bindCalendar} key={utils.random()}>
                  <div class='ui input left icon'>
                    <i class='calendar icon' />
                    <input type='text' placeholder='StartDate' value={params.startDate} />
                  </div>
                </div>
              </div>
              <div class='field'>
                <div class='ui calendar' value={params.endDate} actionName='changeEndDateFromCalendar' oncreate={bindCalendar} key={utils.random()}>
                  <div class='ui input left icon'>
                    <i class='calendar icon' />
                    <input type='text' placeholder='EndDate' value={params.endDate} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h4 class='ui dividing header'>{i18n[state.locale].description}</h4>
          <div class='field'>
            <textarea contentEditable='true' key={utils.random()}
              onfocusout={descriptionOnFocusout}
              onkeydown={descriptionOnKeydown}
              onupdate={descriptionOnupdate}
              oncreate={descriptionOnupdate}
            />
          </div>

          <h4 class='ui dividing header'>{i18n[state.locale].member}</h4>

          <div class='field'>
            <div class='fields'>
              <div class='sixteen wide field'>
                <select class='ui search selection' multiple key={utils.random()} onchange={onChangeMemberSelect}>
                  {assignedMember}
                </select>
              </div>
              {/* Right now this function is no required.
              <div class='field'>
                <div class='ui left icon input'>
                  <input type='text' placeholder={i18n[state.locale].addMember}
                    onfocusout={addMemberOnfocusout}
                    onkeydown={addMemberOnKeydown}
                  />
                  <i class='user plus icon' />
                </div>
              </div>
              */}
            </div>
          </div>

          <h4 class='ui dividing header'>{i18n[state.locale].todo}</h4>
          <div class='ui large vertical menu sixteen wide field'>
            {todo}
            <div class='item'>
              <div class='ui icon input'>
                <input type='text' placeholder=''
                  onfocusout={todoRegistOnfocusout}
                  onkeydown={todoRegistOnKeydown}
                />
                <i class='plus circle link icon' />
              </div>
            </div>
          </div>

          <h4 class='ui dividing header'>{i18n[state.locale].comment}</h4>
          <div class='ui comments'>
            {comment}
          </div>

          <form class='ui reply form'>
            <div class='field'>
              <div class='ui segment' contentEditable='true' key={utils.random()}
                onfocusout={commentOnFocusout}
                onkeydown={commentOnKeydown}
              />
            </div>
          </form>

          {actionButtonsDiv}
          {actionButtons}

        </div>

      </div>

      {actionAd}

    </div>
  )
}
