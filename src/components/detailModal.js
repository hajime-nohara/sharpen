import { h, app } from "hyperapp"
import utils from '../classes/utils'

const style = {
    boxSizing:    "border-box",
    width:        "100%",
    marginBottom: 10,
    padding:      35,
    transform:    "translate3d(0,0,0)",
    color:        "#2b2e38",
    background:   "#fff",
    border:       "dotted"
}
// input view
export default (state, actions, params) => {

      // member data
      let assignedMember = []
      Object.keys(state.member).forEach(
        function(index,val,arr) {
          assignedMember.push(<option value={index}   
                                                    onclick={(e)=>{
                                                                    let selectedValue = []
                                                                    let multi = document.getElementById("select"+params.id)
                                                                    let multiLen = multi.options.length;
                                                                    for (let i = 0; i < multiLen; i++) {
                                                                      if (multi.options[i].selected) {
                                                                        selectedValue.push(Number(multi.options[i].value))
                                                                      }
                                                                    }
                                                                    actions.tasks.changeMember({id: params.id, member: selectedValue})
                                                                  }
                                                            }

                                                    ondblclick={(e)=>{
                                                                    actions.deleteMasterMember(index)
                                                                  }
                                                            }
                                                  >@{state.member[index]}</option>)
        }
      );

      // todo data
      let todo = []
      if (!params.todo || params.todo == undefined) {
        params.todo = {}
      }
      Object.keys(params.todo).forEach(
        function(index,val,arr) {
          todo.push(
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <input type="checkbox" aria-label="Checkbox for following text input" checked={params.todo[index].done} 
                              onclick={(e)=>{
                                              actions.tasks.changeTodoStatus({id: params.id, value: {id: index, status: e.target.checked}})
                                            }
                                      }
                            />
                          </div>
                        </div>
                        <input type="text" class="form-control" aria-label="Text input with checkbox" value={params.todo[index].title}
                          onfocusout={(e)=>actions.tasks.changeTodoTitle({id: params.id, value: {id: index, title: e.target.value}})}
                          onkeydown={
                                      (e)=>{
                                              if(
                                                  !( 
                                                    e.keyCode !== 13
                                                   )
                                                ) {
                                                    e.target.blur();
                                                    actions.tasks.changeTodoTitle({id: params.id, value: {id: index, title: e.target.value}})
                                                  }
                                           }
                                    }
                        />
                        <div class="input-group-append">
                          <label class="input-group-text" for="inputGroupSelect02"
                            onclick={(e)=>{
                                            actions.tasks.deleteTodo({id: params.id, value: index})
                                          }
                                    }
                          ><i class="far fa-times-circle"></i></label>
                        </div>
                      </div>)
        }
      );

      // comment data
      let comment = []
      if (!params.comment || params.comment == undefined) {
        params.comment = {}
      }
      Object.keys(params.comment).forEach(
        function(index,val,arr) {
          comment.push(
                        <div class="bs-callout bs-callout-info">
                          <p contentEditable="true" id={"comment_" + index + "_" + params.id}
                            onfocusout={(e)=>actions.tasks.changeComment({id: params.id, value: {id: index, comment: e.target.innerHTML, timestamp: params.comment[index].timestamp}})}
                            onkeydown={
                                        (e)=>{
                                                if(
                                                    !( 
                                                      e.keyCode !== 13 || ( e.keyCode === 13 && (e.shiftKey === true || e.ctrlKey === true || e.altKey === true) )
                                                     )
                                                  ) {
                                                      e.target.blur();
                                                      actions.tasks.changeComment({id: params.id, value: {id: index, comment: e.target.innerHTML, timestamp: params.comment[index].timestamp}})
                                                    }
                                             }
                                      }
                            onupdate={()=>document.getElementById("comment_" + index + "_" + params.id).innerHTML=params.comment[index].comment}
                            oncreate={()=>document.getElementById("comment_" + index + "_" + params.id).innerHTML=params.comment[index].comment}
                          ></p>
                          
                          <div class="carbon-wrap text-sm-right text-secondary" style={{height: "10%"}}><small>{params.comment[index].timestamp}&nbsp;  

                            <span
                              onclick={(e)=>{
                                              actions.tasks.deleteComment({id: params.id, value: index})
                                            }
                                      }
                            ><i class="far fa-times-circle" ></i></span>
</small>
                          </div>
                        </div>)
        }
      );

      return (<div className="modal fade" id={"modalTarget" + params.id} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div id={"modal" + params.id} data-target={"#modalTarget" + params.id} data-toggle="modal"/>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4" contentEditable="true" style={{width: "100%"}} id={"title_"+params.id}
                onfocusout={(e)=>{if(e.target.childNodes.length>0){actions.tasks.changeTitle({id: params.id, title: e.target.childNodes[0].data})}}}
                onkeydown={
                            (e)=>{
                                    if(
                                        !( 
                                          e.keyCode !== 13
                                         )
                                      ) {
                                          e.target.blur();
                                          actions.tasks.changeTitle({id: params.id, title: e.target.childNodes[0].data});
                                        }
                                 }
                          }

                 onupdate={()=>document.getElementById("title_" + params.id).innerHTML=params.title}
                 oncreate={()=>document.getElementById("title_" + params.id).innerHTML=params.title}
              >
              </div>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">

              <dl class="row">
                <dt class="col-sm-3">Description</dt>
                <dd class="col-sm-9">
                    <div class="card">
                      <div class="card-body" contentEditable="true" id={"description_" + params.id}
                        onfocusout={(e)=>actions.tasks.changeDescription({id: params.id, description: e.target.innerHTML})}
                        onkeydown={
                                    (e)=>{
                                            if(
                                                !( 
                                                  e.keyCode !== 13 || ( e.keyCode === 13 && (e.shiftKey === true || e.ctrlKey === true || e.altKey === true) )
                                                 )
                                              ) {
                                                  e.target.blur();
                                                  actions.tasks.changeDescription({id: params.id, description: e.target.innerHTML});
                                                }
                                         }
                                  }
                         onupdate={()=>document.getElementById("description_" + params.id).innerHTML=params.description}
                         oncreate={()=>document.getElementById("description_" + params.id).innerHTML=params.description}
                      >
                      </div>
                    </div>
                </dd>
              
                <dt class="col-sm-3">Date</dt>
                <dd class="col-sm-9">
                  {params.startDate} - {params.endDate}
                </dd>
              
                <dt class="col-sm-3">Member</dt>
                <dd class="col-sm-9">
              
                  <select class="custom-select" id={"select" + params.id} multiple
                    onchange={(e)=>console.log(e.target.selectedIndex)}
                    oncreate={()=>{
                                    let multi = document.getElementById("select"+params.id)
                                    let multiLen = multi.options.length;
                                    for (let i = 0; i < multiLen; i++) {
                                      if ((params.member || params.member != undefined) && params.member.includes(Number(multi.options[i].value))) {
                                        multi.options[i].selected = true;
                                      } else {
                                        multi.options[i].selected = false;
                                      }
                                    }
                                  }
                             }
                    onupdate={()=>{
                                    let multi = document.getElementById("select"+params.id)
                                    let multiLen = multi.options.length;
                                    for (let i = 0; i < multiLen; i++) {
                                      if (params.member.includes(Number(multi.options[i].value))) {
                                        multi.options[i].selected = true;
                                      } else {
                                        multi.options[i].selected = false;
                                      }
                                    }
                                  }
                             }
                  >
                    {assignedMember}
                  </select>
                  <div class="text-sm-right text-secondary">※ double click for delete</div>

                </dd>

                <dt class="col-sm-3"></dt>
                <dd class="col-sm-9">

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"><span id={"addMember"+params.id}><i class="fas fa-plus-circle"></i></span></span>
                    </div>
                    <input type="text" class="form-control" placeholder="type user name and press enter key" aria-label="Username" aria-describedby="basic-addon1"

                      onfocusout={(e)=>{
                                          let id = 1
                                          if (Object.keys(state.member).length > 0) {
                                            id = Number(Object.keys(state.member)[Object.keys(state.member).length -1]) + 1
                                          }
                                          if (e.target.value.length > 0) {
                                            actions.changeMasterMember({id: id, value: e.target.value})
                                          }
                                          e.target.value = ''
                                       }
                                 }

                      onkeydown={
                                  (e)=>{
                                          if(
                                              !( 
                                                e.keyCode !== 13
                                               )
                                            ) {
                                                e.target.blur();
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
                                }


                    />
                  </div>

                </dd>
              
                <dt class="col-sm-3 text-truncate">Todo</dt>
                <dd class="col-sm-9">
                  {todo}
                </dd>

                <dt class="col-sm-3"></dt>
                <dd class="col-sm-9">

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"><span id={"addMember"+params.id}><i class="fas fa-plus-circle"></i></span></span>
                    </div>
                    <input type="text" class="form-control" placeholder="type task name and press enter key" aria-label="Taskname" aria-describedby="basic-addon1"

                      onfocusout={(e)=>{
                                          let id = 1
                                          if (Object.keys(params.todo).length > 0) {
                                            id = Number(Object.keys(params.todo)[Object.keys(params.todo).length -1]) + 1
                                          }
                                          if (e.target.value.length > 0) {
                                            actions.tasks.changeTodo({id: params.id, value: {id: id, title: e.target.value, done: false}})
                                          }
                                          e.target.value = ''
                                       }
                                 }

                      onkeydown={
                                  (e)=>{
                                          if(
                                              !( 
                                                e.keyCode !== 13
                                               )
                                            ) {
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
                                }


                    />
                  </div>

                </dd>


              
                <dt class="col-sm-3">Comment</dt>

                <dd class="col-sm-9">

                  {comment}

                  <div class="card">
                    <div class="card-body" contentEditable="true" id={"description_" + params.id}

                        onfocusout={(e)=>{
                                            let id = 1
                                            if (Object.keys(params.comment).length > 0) {
                                              id = Number(Object.keys(params.comment)[Object.keys(params.comment).length -1]) + 1
                                            }
                                            if (e.target.innerHTML.length > 0) {
                                              actions.tasks.changeComment({id: params.id, value: {id: id, comment: e.target.innerHTML, timestamp: utils.get_datetime_str(new Date)}})
                                            }
                                            e.target.innerHTML = ''
                                         }
                                   }
                        onkeydown={
                                    (e)=>{
                                            if(
                                                !( 
                                                  e.keyCode !== 13 || ( e.keyCode === 13 && (e.shiftKey === true || e.ctrlKey === true || e.altKey === true) )
                                                 )
                                              ) {
                                                  e.target.blur();
                                                  let id = 1
                                                  if (Object.keys(params.comment).length > 0) {
                                                    id = Number(Object.keys(params.comment)[Object.keys(params.comment).length-1]) + 1
                                                  }

                                                  e.target.blur();
                                                  if (e.target.innerHTML.length > 0) {
                                                    actions.tasks.changeComment({id: params.id, value: {id: id, comment: e.target.innerHTML, done: false}})
                                                  }
                                                  e.target.innerHTML = ''
                                                }
                                         }
                                  }

                    >
                    </div>
                  </div>

                </dd>
              </dl>
            </div>
            <div className="modal-footer">
              <button type="button" onclick={()=>actions.tasks.del(params.id)} className="btn btn-danger btn-sm mr-auto" data-dismiss="modal">Delete</button>
              <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      )
}
