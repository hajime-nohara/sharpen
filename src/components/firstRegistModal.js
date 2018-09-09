import { h, app } from "hyperapp"
import utils      from '../classes/utils'
import styl       from './styles/firstRegistModal.styl'

// input view
export default (state, actions) => {

  const show = (e) => {
    const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
    if (!sharpenUserLS.memberName) {
      $(e).modal({detachable: false}).modal('show')
    }
  }

  const onFocusoutMemberName = (e) => {
    actions.changeMemberName(e.target.value)
  }

  const onFocusoutProjectName = (e) => {
    actions.changeProjectName(e.target.value)
  }

  return (
    <div class="ui basic modal" oncreate={show} key={utils.random()}>
      <div class={styl.firstDialogHeader + " ui icon header"}>
        <i class="archive icon"></i>
        {state.i18n[state.locale].welcomToSharpen}
      </div>
      <div class="content">

        <div class="ui center aligned page grid">
          <div class={styl.description}>
            {state.i18n[state.locale].sharpenDescription}
          </div>
        </div>

        <div class="ui center aligned page grid">
          <div class="ui big form">
            <div class="field">
              <div class="field">
                {state.i18n[state.locale].nickname}
                <input placeholder={state.i18n[state.locale].nickname}type="text" onfocusout={onFocusoutMemberName}/>
              </div>
              <div class="field">
                {state.i18n[state.locale].projectName}
                <input placeholder={state.i18n[state.locale].projectName} type="text" onfocusout={onFocusoutProjectName}/>
              </div>
            </div>
            <div class="field">
              <div class="actions">
                <div class="ui right floated green ok inverted button" onclick={actions.reRender}>
                  <i class="checkmark icon"></i>
                  {state.i18n[state.locale].getStarted}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
