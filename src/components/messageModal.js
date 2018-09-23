import { h, app } from "hyperapp"
import utils      from '../classes/utils'
import styl       from './styles/firstRegistModal.styl'
import i18n       from '../i18n'

// input view
export default (state, actions) => {

  const show = (e) => {
    if (state.statusCode == 404) {
      $(e).modal({detachable: false}).modal('show')
      state.statusCode = null
    }
  }

  return (

    <div class="ui tiny modal" oncreate={show}>
      <div class="ui negative message image content">
        <div class="description">
          <div class="ui header">{i18n[state.locale].notFound}</div>
          <p>{i18n[state.locale].contactYourMember}</p>
          <p></p>
        </div>
      </div>
    </div>
  )
}
