import { h } from 'hyperapp'
import styl from '../styles/sharedModal.styl'
import Clipboard from 'clipboard'
import i18n from '../i18n'

// input view
export default (state, actions) => {
  const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))

  const copyShaaredUrl = () => {
    const h = Clipboard('.clipboard')
  }

  const reRender = () => {
    setTimeout(actions.reRender, 300)
  }

  return (
    <div class='ui basic modal' id='memberIdModal'>
      <div id='memberIdModalTrigger' onclick={() => $('#memberIdModal').modal({detachable: false, onHide: reRender}).modal('show')} />

      <div class='ui grid center aligned page'>
        <div class={styl.input + ' ui action input'}>
          <input type='text' id='sharedMemberUrlStr' value={location.href.split('?')[0] + '?memberId=' + sharpenUserLS.memberId} />
          <button class='ui teal right labeled icon button clipboard' data-clipboard-target='#sharedMemberUrlStr' oncreate={copyShaaredUrl}>
            <i class='copy icon' />{i18n[state.locale].copy}
          </button>
        </div>

      </div>

      <div class='ui grid center aligned page'>

        <div class='ui center aligned page grid'>
          <div class={styl.description}>
            {i18n[state.locale].urlForChangeDeviceDescription}
          </div>
        </div>

      </div>

    </div>
  )
}
