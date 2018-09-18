import { h, app } from "hyperapp"
import utils      from '../classes/utils'
import styl       from './styles/sharedModal.styl'
import Clipboard  from 'clipboard'

// input view
export default (state, actions) => {

  const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))

  const copyShaaredUrl = () => {
    new Clipboard('.clipboard');
  }

  const reRender = () => {
    setTimeout(actions.reRender, 300)
  }

  return (
    <div class="ui basic modal" id="urlForChangeDeviceModal">
      <div id="urlForChangeDeviceModalTrigger" onclick={()=>$('#urlForChangeDeviceModal').modal({detachable: false, onHide: reRender}).modal('show')}/>

      <div class="ui grid center aligned page">
        <div class={styl.input + " ui action input"}>
          <input type="text" id="sharedMemberUrlStr" value={location.href.split('?')[0] + "?memberId=" + sharpenUserLS.memberId}/>
          <button class="ui teal right labeled icon button clipboard" data-clipboard-target="#sharedMemberUrlStr" oncreate={copyShaaredUrl}>
          <i class="copy icon"></i> {state.i18n[state.locale].copy} </button>
        </div>

      </div>

      <div class="ui grid center aligned page">

        <div class="ui center aligned page grid">
          <div class={styl.description}>
            {state.i18n[state.locale].urlForChangeDeviceDescription}
          </div>
        </div>

      </div>

    </div>
  )
}
