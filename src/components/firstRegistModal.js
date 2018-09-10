import { h, app } from "hyperapp"
import utils      from '../classes/utils'
import styl       from './styles/firstRegistModal.styl'

// input view
export default (state, actions) => {

  const reRender = () => {
    setTimeout(actions.reRender, 300)
  }
  const show = (e) => {
    const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
    if (!sharpenUserLS.memberName) {
      $(e).modal({detachable: false, onHide: reRender}).modal('show')
    }
  }

  const onFocusoutMemberName = (e) => {
    actions.changeMemberName(e.target.value)
  }

  const onFocusoutProjectName = (e) => {
    actions.changeProjectName(e.target.value)
  }

  const changeLanguage = (val1, val2, el) => {
    actions.changeLanguage(el[0].id)
  }

  return (
    <div class="ui basic modal" oncreate={show}>

      <div class="ui floating dropdown labeled search icon button" oncreate={(e)=>$(e).dropdown({onChange: changeLanguage})}>
        <i class="world icon"></i>
        <input class="search" autocomplete="off" tabindex="0"/><span class="text">{state.i18n[state.locale].languageName}</span>
        <div class="menu">
          <div class="item" id="en">{state.i18n[state.locale].english}</div>
          <div class="item" id="ja">{state.i18n[state.locale].japanese}</div>
        </div>
      </div>

      <div class={styl.firstDialogHeader + " ui icon header"}>
        <img class={styl.firstDialogHeaderLogo} src="assets/images/logo.svg"/><br/><br/>
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
                <div class="ui right floated green ok inverted button">
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
