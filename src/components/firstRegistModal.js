import { h, app } from "hyperapp"
import utils      from '../classes/utils'
import styl       from './styles/firstRegistModal.styl'
import i18n       from '../i18n'

// input view
export default (state, actions) => {

  const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))

console.log('sharpenUserLS =', sharpenUserLS)
  const reRender = () => {
    setTimeout(actions.reRender, 300)
  }

  const show = (e) => {
    if (state.statusCode != 404 && !(sharpenUserLS.memberName && state.projectName)) {
      $(e).modal({detachable: false, onHide: reRender}).modal('setting', 'closable', false).modal('show')
    }
  }

  const onFocusoutMemberName = (e) => {
    if (e.target.value.length > 0) {
      actions.changeMemberName(e.target.value)
    }
  }

  const onFocusoutProjectName = (e) => {
    if (e.target.value.length > 0) {
      actions.changeProjectName(e.target.value)
    }
  }

  const changeLanguage = (val1, val2, el) => {
    actions.changeLanguage(el[0].id)
  }

  const checkAbled = (e) => {
    if (sharpenUserLS.memberName && (state.projectName || state.published)) {
      e.classList.remove("disabled");
    }
  }

  const checkPublised = (e) => {
    if (state.published) {
      e.classList.add("disabled");
    }
  }

  const blur = (e) => {
    if (e.keyCode === 13) {
      e.target.blur()
    }
  }

  return (
    <div class="ui basic modal" oncreate={show}>
      <input class={styl.dummyInput} type="text" placeholder="dummy"/>
      <div class="ui floating dropdown labeled icon button" tabindex="0" oncreate={(e)=>$(e).dropdown({onChange: changeLanguage})}>
        <i class="world icon"></i>
        <span class="text">{i18n[state.locale].languageName}</span>
        <div class="menu" tabindex="-1">
          <div class="ui icon search input">
            <i class="search icon"></i>
            <input type="text" placeholder={i18n[state.locale].searchLanguage}/>
          </div>
          <div class="scrolling menu">
            <div class="item" id="en">{i18n[state.locale].english}</div>
            <div class="item" id="ja">{i18n[state.locale].japanese}</div>
          </div>
        </div>
      </div>

      <div class={styl.firstDialogHeader + " ui icon header"}>
        <img class={styl.firstDialogHeaderLogo} src="assets/images/logo.svg"/><br/><br/>
        {i18n[state.locale].welcomToSharpen}
      </div>


      <div class="content">

        <div class="ui center aligned page grid">
          <div class={styl.description}>
            {i18n[state.locale].sharpenDescription}
          </div>
        </div>

        <div class="ui center aligned page grid">
          <div class="ui big form">
            <div class="field">
              <div class="field">
                {i18n[state.locale].nickname}
                <input placeholder={i18n[state.locale].nickname} type="text" onfocusout={onFocusoutMemberName}/>
              </div>
              <div class="field" oncreate={checkPublised}>
                {i18n[state.locale].projectName}
                <input placeholder={i18n[state.locale].projectName} type="text" onfocusout={onFocusoutProjectName} onkeydown={blur}
                  value={state.projectName}
                />
              </div>
            </div>
            <div class="field">
              <div class="actions">
                <div class="ui right floated green ok inverted button disabled" onupdate={checkAbled}>
                  <i class="checkmark icon"></i>
                  {i18n[state.locale].getStarted}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
