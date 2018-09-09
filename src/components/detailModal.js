import { h, app } from "hyperapp"
import utils      from '../classes/utils'
import flatpickr  from "flatpickr";
import dateformat from 'dateformat'
import styl       from './styles/edit.styl'

// input view
export default (state, actions, params) => {

      /* member */
      const onChangeMemberSelect = (e) => {
        const selectedValue = []
        const select = e.target
        for (let i = 0; i < select.childNodes.length; i++) {
          if (select.childNodes[i].selected) {
            selectedValue.push(Number(select.childNodes[i].value))
          }
        }
        actions.tasks.changeMember([params.id, selectedValue])
      }

      const assignedMember = []
      Object.keys(state.member).forEach(
        function(index,val,arr) {
          const isSelected = ((params.member || params.member != undefined) && params.member.includes(Number(index)))
          assignedMember.push(<option 
                                    key={utils.random()} 
                                    value={index}
                                    oncreate={(e)=>e.selected=isSelected}
                                    onupdate={(e)=>e.selected=isSelected}
                                    ondblclick={()=>actions.deleteMasterMember(index)}
                              >@{state.member[index]}</option>
          )
        }
      )

      /* todo */
      let todo = []
      if (!params.todo || params.todo == undefined) {
        params.todo = {}
      }

      Object.keys(params.todo).forEach(
        function(index,val,arr) {
          const todoId = params.id + "_" + index
          const todoOnclick = (e) => {
            actions.tasks.changeTodoStatus({id: params.id, value: {id: index, status: document.getElementById(todoId).checked}})
          }

          const todoTitleOnFocusout = (e) => actions.tasks.changeTodoTitle({id: params.id, value: {id: index, title: e.target.value}})

          const todoTitleOnKeydown = (e) => {
            if (e.keyCode === 13) {
                e.target.blur();
                actions.tasks.changeTodoTitle({id: params.id, value: {id: index, title: e.target.value}})
              }
          }

          const todoDeleteOnClick   = (e)=>{
            actions.tasks.deleteTodo({id: params.id, value: index})
          }

          todo.push(
            <div class="item">
              <div class="ui checkbox" 
                oncreate={(e)=>$(e).checkbox()}
                >
                <input type="checkbox" id={todoId} checked={params.todo[index].done} onchange={todoOnclick}/>
                <label>{params.todo[index].title}</label>
              </div>
              <i class={styl.iconClick + " trash icon"} onclick={(e)=>actions.tasks.deleteTodo({id: params.id, value: index})}></i>
            </div>
          )
        }
      )

      // comment data
      let comment = []
      if (!params.comment || params.comment == undefined) {
        params.comment = {}
      }

      const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
    
      Object.keys(params.comment).forEach(
        function(index,val,arr) {
          const commentEditOnFocusout = (e)=>{
            actions.tasks.changeComment({
              id: params.id,
              value: {
                id: index,
                comment: e.target.innerHTML,
                timestamp: params.comment[index].timestamp,
                memberId:   sharpenUserLS.memberId,
                memberName: sharpenUserLS.memberName
              }
            })
          }

          const commentEditOnKeydown = (e)=>{
            if( (e.keyCode === 13 && !utils.isMobile()) && !(e.shiftKey === true || e.ctrlKey === true || e.altKey === true) ) {
              e.target.blur();
              actions.tasks.changeComment({
                id: params.id,
                value: {
                  id: index,
                  comment: e.target.innerHTML,
                  timestamp: params.comment[index].timestamp,
                  memberId:   sharpenUserLS.memberId,
                  memberName: sharpenUserLS.memberName
                }
              })
            }
          }
          
          const isMember     = params.comment[index].memberId == sharpenUserLS.memberId 
          const deleteButton = isMember ?
            <i class={styl.iconClick + " trash icon"} onclick={(e)=>actions.tasks.deleteComment({id: params.id, value: index})}></i> : null
  
          comment.push(
            <div class="comment">
              <a class="avatar">
                <i class={styl.avatarIcon + " user circle icon"}></i>
              </a>
              <div class="content">
                <a class="author">{params.comment[index].memberName}</a>
                <div class="metadata">
                  <span class="date">{params.comment[index].timestamp}</span>
                </div>
                <div class={styl.comment + " text"} contentEditable={isMember ? "true" : "false"} key={utils.random()} 
                  onfocusout={commentEditOnFocusout}
                  onkeydown={commentEditOnKeydown}
                  onupdate={(e)=>e.innerHTML=params.comment[index].comment}
                  oncreate={(e)=>e.innerHTML=params.comment[index].comment}
                >
                </div>
                <div class="actions">
                  {/*<a class="reply">Reply</a>*/}
                  {deleteButton}
                </div>
              </div>
            </div>
          )
        }
      )

      const commentOnFocusout = (e)=>{
        if (e.target.innerHTML.length > 0) {

          const id = (Object.keys(params.comment).length > 0) ? Number(Object.keys(params.comment)[Object.keys(params.comment).length -1]) + 1 : 1

          actions.tasks.changeComment({
            id: params.id,
            value: {
              id:         id,
              comment:    e.target.innerHTML,
              timestamp:  dateformat(new Date, 'yyyy-mm-dd hh:mm:ss'),
              memberId:   sharpenUserLS.memberId,
              memberName: sharpenUserLS.memberName
            }
          })
        }
        e.target.innerHTML = ''
      }

      const commentOnKeydown = (e)=>{
        if( (e.keyCode === 13 && !utils.isMobile()) && !(e.shiftKey === true || e.ctrlKey === true || e.altKey === true) ) {
          
            e.target.blur();

            if (e.target.innerHTML.length > 0) {

              const id = (Object.keys(params.comment).length > 0) ? Number(Object.keys(params.comment)[Object.keys(params.comment).length -1]) + 1 : 1
              actions.tasks.changeComment({
                id: params.id,
                value: {
                  id: id,
                  comment: e.target.innerHTML,
                  timestamp: dateformat(new Date, 'yyyy-mm-dd hh:mm:ss'),
                  memberId:   sharpenUserLS.memberId,
                  memberName: sharpenUserLS.memberName
                }
              })
            }
            e.target.innerHTML = ''
          }
      }



      const selectId = "select_" + params.id
      const detailModalId = "detailModal_" + params.id
      const detailModalOpenId = "detailModalOpen_" + params.id



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
                          defaultDate: e.getAttribute("value"),
                          locale: state.i18n[state.locale].flatpickr,
                          onChange: function (date) {
                            actions.tasks[e.getAttribute("actionName")]([params.id, dateformat(date, 'yyyy-mm-dd'), state])
                          }
                        }
        flatpickr(e, options)
      }


      /* description */
      const descriptionOnFocusout = (e) => {
        actions.tasks.changeDescription({id: params.id, description: e.target.value})
      }

      const descriptionOnKeydown = (e)=> {
        if( (e.keyCode === 13 && !utils.isMobile()) && !(e.shiftKey === true || e.ctrlKey === true || e.altKey === true) ) {
            e.target.blur();
            actions.tasks.changeDescription({id: params.id, description: e.target.value});
          }
      }
      /* add member input */
      const addMemberOnfocusout = (e) => {
        let id = 1
        if (Object.keys(state.member).length > 0) {
          id = Number(Object.keys(state.member)[Object.keys(state.member).length -1]) + 1
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
                id = Number(Object.keys(state.member)[Object.keys(state.member).length-1]) + 1
              }
            if (e.target.value.length > 0) {
              actions.changeMasterMember({id: id, value: e.target.value})
            }
            e.target.value = ''
          }
      }


      const todoRegistOnfocusout = (e) => {
        let id = 1
        if (Object.keys(params.todo).length > 0) {
          id = Number(Object.keys(params.todo)[Object.keys(params.todo).length -1]) + 1
        }
        if (e.target.value.length > 0) {
          actions.tasks.changeTodo({id: params.id, value: {id: id, title: e.target.value, done: false}})
        }
        e.target.value = ''
      }

      const todoRegistOnKeydown = (e) => {
        if (e.keyCode === 13) {
          e.target.blur();
          let id = 1
            if (Object.keys(params.todo).length > 0) {
              id = Number(Object.keys(params.todo)[Object.keys(params.todo).length-1]) + 1
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
        document.getElementById(params.id).style.display = "none"
        setTimeout(deleteTask, 1000)
      }

      return (

        <div class="ui longer modal transition scrolling" id={detailModalId}>

          <div id={detailModalOpenId} onclick={()=>$('#'+detailModalId).modal({detachable: false, onDeny: deleteTaskWrap}).modal('show')}/>
          <div class="header">
            <div class="header" contentEditable="true" key={utils.random()} 
              onfocusout={titleOnFocusout}
              onkeydown={titleOnKeydown}
              onupdate={(e)=>e.innerHTML=params.title}
              oncreate={(e)=>e.innerHTML=params.title}
            />
          </div>

          <div class="scrolling content">
            <div class="ui form">
              <h4 class="ui dividing header">{state.i18n[state.locale].date}</h4>
              <div class="field">
                <div class="two fields">
                  <div class="field">
                    <div class="ui calendar" value={params.startDate} actionName="changeStartDateFromCalendar" oncreate={bindCalendar} key={utils.random()}>
                      <div class="ui input left icon">
                        <i class="calendar icon"></i>
                        <input type="text" placeholder="StartDate" value={params.startDate}/>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <div class="ui calendar" value={params.endDate} actionName="changeEndDateFromCalendar" oncreate={bindCalendar} key={utils.random()}>
                      <div class="ui input left icon">
                        <i class="calendar icon"></i>
                        <input type="text" placeholder="EndDate" value={params.endDate}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 class="ui dividing header">{state.i18n[state.locale].description}</h4>
              <div class="field">
                <textarea contentEditable="true" key={utils.random()} 
                  onfocusout={descriptionOnFocusout}
                  onkeydown={descriptionOnKeydown}
                  onupdate={(e)=>e.innerHTML=params.description}
                  oncreate={(e)=>e.innerHTML=params.description}
                />
              </div>

              <h4 class="ui dividing header">{state.i18n[state.locale].member}</h4>

              <div class="field">
                <div class="fields">
                  <div class="sixteen wide field">
                    <select class="ui search selection" multiple key={utils.random()} onchange={onChangeMemberSelect}>
                      {assignedMember}
                    </select>
                  </div>
                  {/* Right now this function is no required.
                  <div class="field">
                    <div class="ui left icon input">
                      <input type="text" placeholder={state.i18n[state.locale].addMember}
                        onfocusout={addMemberOnfocusout}
                        onkeydown={addMemberOnKeydown}
                      />
                      <i class="user plus icon"></i>
                    </div>
                  </div>
                  */}
                </div>
              </div>

              <h4 class="ui dividing header">{state.i18n[state.locale].todo}</h4>
              <div class="ui large vertical menu sixteen wide field">
                {todo}
                <div class="item">
                  <div class="ui icon input">
                    <input type="text" placeholder=""
                      onfocusout={todoRegistOnfocusout}
                      onkeydown={todoRegistOnKeydown}
                    />
                    <i class="plus circle icon"></i>
                  </div>
                </div>
              </div>

              <h4 class="ui dividing header">{state.i18n[state.locale].comment}</h4>
              <div class="ui comments">
                    {comment}
                    <form class="ui reply form">
                      <div class="field">
                        <div class="ui segment" contentEditable="true" key={utils.random()} 
                          onfocusout={commentOnFocusout}
                          onkeydown={commentOnKeydown}
                        ></div>
                      </div>
                    </form>
              </div>
            </div>

          </div>

          <div class="actions">
            <div class="ui black deny button">
              {state.i18n[state.locale].del}
            </div>
            <div class="ui positive icon button">
              {state.i18n[state.locale].close}
            </div>
          </div>

        </div>
      )
}
