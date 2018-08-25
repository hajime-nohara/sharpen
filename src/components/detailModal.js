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

      const selectId = "select_" + params.id
      const detailModalId = "detailModal_" + params.id
      const detailModalOpenId = "detailModalOpen_" + params.id
      return (

        <div class="ui longer test modal transition scrolling" id={detailModalId}>

          <div id={detailModalOpenId} onclick={()=>$('#'+detailModalId).modal({detachable: false}).modal('show')}/>

          <div class="header">
            Profile Picture
          </div>
          <div class="scrolling content">

            <div class="ui form">

              <h4 class="ui dividing header">Date</h4>
              <div class="ui labels">
                <div class="ui label">
                  2018-11-25
                </div>
                <div class="ui label">
                  2018-11-25
                </div>
              </div>


              <h4 class="ui dividing header">Description</h4>
              <div class="field">
                <textarea></textarea>
              </div>





              <h4 class="ui dividing header">Member</h4>
              <div class="ui fluid search dropdown selection multiple upward" id={selectId} oncreate={()=>{$('#' + selectId).dropdown();$(".sizer").remove()}}>
                  <select multiple="">
                      <option value="">State</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select><i class="dropdown icon"></i><input class="search" autocomplete="off" tabindex="0"/><div class="default text">State</div><div class="menu" tabindex="-1"><div class="item" data-value="AL">Alabama</div><div class="item" data-value="AK">Alaska</div><div class="item" data-value="AZ">Arizona</div><div class="item" data-value="AR">Arkansas</div><div class="item" data-value="CA">California</div><div class="item" data-value="CO">Colorado</div><div class="item" data-value="CT">Connecticut</div><div class="item" data-value="DE">Delaware</div><div class="item" data-value="DC">District Of Columbia</div><div class="item" data-value="FL">Florida</div><div class="item" data-value="GA">Georgia</div><div class="item" data-value="HI">Hawaii</div><div class="item" data-value="ID">Idaho</div><div class="item" data-value="IL">Illinois</div><div class="item" data-value="IN">Indiana</div><div class="item" data-value="IA">Iowa</div><div class="item" data-value="KS">Kansas</div><div class="item" data-value="KY">Kentucky</div><div class="item" data-value="LA">Louisiana</div><div class="item" data-value="ME">Maine</div><div class="item" data-value="MD">Maryland</div><div class="item" data-value="MA">Massachusetts</div><div class="item" data-value="MI">Michigan</div><div class="item" data-value="MN">Minnesota</div><div class="item" data-value="MS">Mississippi</div><div class="item" data-value="MO">Missouri</div><div class="item" data-value="MT">Montana</div><div class="item" data-value="NE">Nebraska</div><div class="item" data-value="NV">Nevada</div><div class="item" data-value="NH">New Hampshire</div><div class="item" data-value="NJ">New Jersey</div><div class="item" data-value="NM">New Mexico</div><div class="item" data-value="NY">New York</div><div class="item" data-value="NC">North Carolina</div><div class="item" data-value="ND">North Dakota</div><div class="item" data-value="OH">Ohio</div><div class="item" data-value="OK">Oklahoma</div><div class="item" data-value="OR">Oregon</div><div class="item" data-value="PA">Pennsylvania</div><div class="item" data-value="RI">Rhode Island</div><div class="item" data-value="SC">South Carolina</div><div class="item" data-value="SD">South Dakota</div><div class="item" data-value="TN">Tennessee</div><div class="item" data-value="TX">Texas</div><div class="item" data-value="UT">Utah</div><div class="item" data-value="VT">Vermont</div><div class="item" data-value="VA">Virginia</div><div class="item" data-value="WA">Washington</div><div class="item" data-value="WV">West Virginia</div><div class="item" data-value="WI">Wisconsin</div><div class="item" data-value="WY">Wyoming</div></div></div>



              <h4 class="ui dividing header">todo</h4>

<div class="ui large vertical menu">
  <a class="active item">
    <div class="ui small teal label">1</div>
    Inbox
  </a>
  <a class="item">
    <div class="ui small label">51</div>
    Spam
  </a>
  <a class="item">
    <div class="ui small label">1</div>
    Updates
  </a>
  <div class="item">
    <div class="ui icon input">
      <input type="text" placeholder="Search mail..."/>
      <i class="search icon"></i>
    </div>
  </div>
</div>



              <div class="ui middle aligned divided list">
                <div class="item">
                  <div class="right floated content">
                    <div class="ui button">Add</div>
                  </div>
                  <img class="ui avatar image" src="/images/avatar2/small/lena.png"/>
                  <div class="content">
                    Lena
                  </div>
                </div>
                <div class="item">
                  <div class="right floated content">
                    <div class="ui button">Add</div>
                  </div>
                  <img class="ui avatar image" src="/images/avatar2/small/lindsay.png"/>
                  <div class="content">
                    Lindsay
                  </div>
                </div>
              </div>




              <h4 class="ui dividing header">Comment</h4>
              <div class="ui comments">
                    <div class="comment">
                      <a class="avatar">
                        <img src="/images/avatar/small/matt.jpg"/>
                      </a>
                      <div class="content">
                        <a class="author">Matt</a>
                        <div class="metadata">
                          <span class="date">Today at 5:42PM</span>
                        </div>
                        <div class="text">
                          How artistic!
                        </div>
                        <div class="actions">
                          <a class="reply">Reply</a>
                        </div>
                      </div>
                    </div>
                    <div class="comment">
                      <a class="avatar">
                        <img src="/images/avatar/small/elliot.jpg"/>
                      </a>
                      <div class="content">
                        <a class="author">Elliot Fu</a>
                        <div class="metadata">
                          <span class="date">Yesterday at 12:30AM</span>
                        </div>
                        <div class="text">
                          <p>This has been very useful for my research. Thanks as well!</p>
                        </div>
                        <div class="actions">
                          <a class="reply">Reply</a>
                        </div>
                      </div>
                      <div class="comments">
                        <div class="comment">
                          <a class="avatar">
                            <img src="/images/avatar/small/jenny.jpg"/>
                          </a>
                          <div class="content">
                            <a class="author">Jenny Hess</a>
                            <div class="metadata">
                              <span class="date">Just now</span>
                            </div>
                            <div class="text">
                              Elliot you are always so right :)
                            </div>
                            <div class="actions">
                              <a class="reply">Reply</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form class="ui reply form">
                      <div class="field">
                        <textarea></textarea>
                      </div>
                      <div class="ui blue labeled submit icon button">
                        <i class="icon edit"></i> Add Reply
                      </div>
                    </form>

                  </div>





            </div>


          </div>
          <div class="actions">
            <div class="ui primary approve button">
              Proceed
              <i class="right chevron icon"></i>
            </div>
          </div>
        </div>



      )
}
