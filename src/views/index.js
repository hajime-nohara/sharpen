import { h } from 'hyperapp'
import styl from '../styles/index.styl'
import _ganttBar from './ganttBar'
import _ganttDateHeader from './ganttDateHeader'
import utils from '../classes/utils'
import _inspector from './inspector'
import _detailModal from './detailModal'
import _signUpModal from './signUpModal'
import _messageModal from './messageModal'
import _shareUrlModal from './shareUrlModal'
import _memberIdModal from './memberIdModal'
import _verticalMenu from './verticalMenu'
import moize from "moize/mjs"
import i18n from '../i18n'

import _card from './card'

// moize
const ganttBar = moize(_ganttBar)
const ganttDateHeader = moize(_ganttDateHeader)
const inspector = moize(_inspector)
const detailModal = moize(_detailModal)
const signUpModal = moize(_signUpModal)
const messageModal = moize(_messageModal)
const shareUrlModal = moize(_shareUrlModal)
const memberIdModal = moize(_memberIdModal)
const verticalMenu = moize(_verticalMenu)

const card = moize(_card)

const rowHeight = 51.5
const dateHeaderHeight = 100

export default (state, actions) => {
  const tasksComponents = []
  const detailModalComponents = []

  Object.keys(state.tasks).sort((a, b) => {
    if (Number(a) > Number(b)) return -1
    if (Number(a) < Number(b)) return 1
    return 0
  }).forEach(
    function (key) {
      tasksComponents.push(card(state, actions, this[key]))
      detailModalComponents.push(detailModal(state, actions, this[key]))
    },
    state.tasks
  )

  const dateCount = utils.getTermFromDate(state.tableStartDate, state.tableEndDate)

  actions.saveToLocalStorage()

  const setBackgroundSize = (e) => {
    e.style.backgroundSize = utils.parsePx(state.globalCellWidth)
  }

  return (
<div class="pusher">
    <div class="full height">
      <div class="toc">
        <div class="ui vertical inverted menu">
          








<div class="item">
  <a class="ui logo icon image" href="/">
    <img src="/images/logo.png"/>
  </a>
  <a href="/"><b>UIドキュメント</b></a>
</div>
<a class="item" href="/introduction/getting-started.html">
  <b>はじめに</b>
</a>
<a class="item" href="/introduction/new.html">
  <b>New in 2.4</b>
</a>
<div class="item">
  <div class="header">はじめに</div>
  <div class="menu">
    
      <a class="item" href="/introduction/integrations.html">連携 </a>
    
      <a class="item" href="/introduction/build-tools.html">ビルドツール </a>
    
      <a class="item" href="/introduction/advanced-usage.html">レシピ </a>
    
      <a class="item" href="/introduction/glossary.html">用語集 </a>
    
  </div>
</div>
<div class="item">
  <div class="header">使用方法</div>
  <div class="menu">
    
      <a class="item" href="/usage/theming.html">テーマ設定 </a>
    
      <a class="item" href="/usage/layout.html">レイアウト </a>
    
  </div>
</div>
<div class="item">
  <div class=" header">グローバル</div>
  <div class="menu">
    
      <a class="item" href="/globals/reset.html">リセット </a>
    
      <a class="item" href="/globals/site.html">サイト </a>
    
  </div>
</div>
<div class="item">
  <div class=" header">属性
</div>
  <div class="menu">
    
      <a class="item" href="/elements/button.html">ボタン </a>
    
      <a class="item" href="/elements/container.html">コンテナ </a>
    
      <a class="item" href="/elements/divider.html">区切り </a>
    
      <a class="item" href="/elements/flag.html">フラグ </a>
    
      <a class="item" href="/elements/header.html">見出し </a>
    
      <a class="item" href="/elements/icon.html">アイコン </a>
    
      <a class="item" href="/elements/image.html">画像 </a>
    
      <a class="item" href="/elements/input.html">入力 </a>
    
      <a class="item" href="/elements/label.html">ラベル </a>
    
      <a class="item" href="/elements/list.html">リスト </a>
    
      <a class="item" href="/elements/loader.html">読み込み表示 </a>
    
      <a class="item" href="/elements/placeholder.html">Placeholder </a>
    
      <a class="item" href="/elements/rail.html">Rail </a>
    
      <a class="item" href="/elements/reveal.html">画像の開始効果 </a>
    
      <a class="item" href="/elements/segment.html">分割 </a>
    
      <a class="item" href="/elements/step.html">ステップ </a>
    
  </div>
</div>
<div class="item">
  <div class=" header">コレクション</div>
  <div class="menu">
    
      <a class="item" href="/collections/breadcrumb.html">パンくず </a>
    
      <a class="item" href="/collections/form.html">フォーム </a>
    
      <a class="item" href="/collections/grid.html">グリッド </a>
    
      <a class="item" href="/collections/menu.html">メニュー </a>
    
      <a class="item" href="/collections/message.html">メッセージ </a>
    
      <a class="item" href="/collections/table.html">表 </a>
    
  </div>
</div>
<div class="item">
  <div class=" header">ビュー</div>
  <div class="menu">
    
      <a class="item" href="/views/advertisement.html">広告 </a>
    
      <a class="item" href="/views/card.html">カード
 </a>
    
      <a class="item" href="/views/comment.html">コメント </a>
    
      <a class="item" href="/views/feed.html">フィード </a>
    
      <a class="item" href="/views/item.html">要素 </a>
    
      <a class="item" href="/views/statistic.html">統計値 </a>
    
  </div>
</div>
<div class="item">
  <div class="active  header">モジュール</div>
  <div class="menu">
    
      <a class="item" href="/modules/accordion.html">アコーディオン </a>
  
      <a class="item" href="/modules/checkbox.html">チェックボックス </a>
  
      <a class="item" href="/modules/dimmer.html">ディマー </a>
  
      <a class="item" href="/modules/dropdown.html">ドロップダウン </a>
  
      <a class="item" href="/modules/embed.html">埋め込み </a>
  
      <a class="item" href="/modules/modal.html">モーダルウィンドウ </a>
  
      <a class="item" href="/modules/popup.html">ポップアップ </a>
  
      <a class="item" href="/modules/progress.html">進捗 </a>
  
      <a class="item" href="/modules/rating.html">評価 </a>
  
      <a class="item" href="/modules/search.html">検索 </a>
  
      <a class="active item" href="/modules/shape.html">シェイプ </a>
  
      <a class="item" href="/modules/sidebar.html">サイドバー </a>
  
      <a class="item" href="/modules/sticky.html">スティッキー </a>
  
      <a class="item" href="/modules/tab.html">タブ </a>
  
      <a class="item" href="/modules/transition.html">トランジション </a>
  
  </div>
</div>
<div class="item">
  <div class=" header">ビヘイビア</div>
  <div class="menu">
    
      <a class="item" href="/behaviors/api.html">API </a>
    
      <a class="item" href="/behaviors/form.html">フォームの検証 </a>
    
      <a class="item" href="/behaviors/visibility.html">Visibility </a>
    
  </div>
</div>

        </div>
      </div>
      <div class="article">




<div class="ui masthead vertical tab segment">
  <div class="ui container">
    <div class="introduction">

      <h1 class="ui header">シェイプ <div class="sub header">
          
          <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" class="twitter-share-button twitter-share-button-rendered twitter-tweet-button" style="position: static; visibility: visible; width: 75px; height: 20px;" title="Twitter Tweet Button" src="https://platform.twitter.com/widgets/tweet_button.9a52e80b2027b7ab835b0e968a612a25.ja.html#dnt=false&amp;id=twitter-widget-0&amp;lang=ja&amp;original_referer=https%3A%2F%2Fsemantic-ui.com%2Fmodules%2Fshape.html&amp;size=m&amp;text=Semantic%20UI%20is%20a%20next%20generation%20UI%20framework&amp;time=1540030827101&amp;type=share&amp;url=http%3A%2F%2Fsemantic-ui.com&amp;via=semanticui" data-url="http://semantic-ui.com"></iframe>
          <iframe class="github" src="//ghbtns.com/github-btn.html?user=semantic-org&amp;repo=semantic-ui&amp;type=watch&amp;count=true" allowtransparency="true" frameborder="0" scrolling="0" width="100" height="20"></iframe>A shape is a three dimensional object displayed on a two dimensional plane </div>
      </h1>

      <div class="ui hidden divider"></div>

      <div class="ui right floated main menu">
        <a class="bug popup icon item" data-content="このページを編集する" href="https://github.com/Semantic-Org/Semantic-UI-Docs/edit/master/server/documents/modules/shape.html.eco">
          <i class="edit icon"></i>
        </a>
        
        <a class="bug popup icon item" data-content="Submit Bug Report" href="https://github.com/Semantic-Org/Semantic-UI/issues/new?title=[Shape] - Your Bug Name&amp;body=**Steps to Reproduce**%0A1. Do something%0A2. Do something else.%0A3. Do one last thing.%0A%0A**Expected**%0AThe Shape should do this%0A%0A**Result**%0AThe Shape does not do this%0A%0A**Testcase**%0A(fork this to get started)%0Ahttp://jsfiddle.net/rduvhn8u/1/">
          <i class="bug icon"></i>
        </a>
        
        <a class="github popup icon item" data-content="GitHubプロジェクトを見る" href="https://github.com/Semantic-Org/Semantic-UI">
          <i class="alternate github icon"></i>
        </a>
      </div>
      <div class="ui right floated main menu">
        <a class="music popup icon item" data-content="音楽を再生">
          <i class="music icon"></i>
        </a>
        <div class="ui language dropdown right floating icon item" id="languages" data-content="言語を選択">
          <i class="world icon"></i>
          <div class="menu">
            <div class="header">言語を選択</div>
            <div class="ui icon search input">
              <i class="search icon"></i>
              <input type="text" placeholder="言語を検索する"/>
            </div>
            <div class="scrolling menu">
  <div class="item" data-percent="100" data-value="en" data-english="English"><span class="description">English</span> English </div>
  <div class="item" data-percent="94" data-value="da" data-english="Danish"><span class="description">dansk</span> Danish </div>
  <div class="item" data-percent="94" data-value="es" data-english="Spanish"><span class="description">Español</span> Spanish </div>
  <div class="item" data-percent="34" data-value="zh" data-english="Chinese"><span class="description">简体中文</span> Chinese </div>
  <div class="item" data-percent="54" data-value="zh_TW" data-english="Chinese (Taiwan)"><span class="description">中文 (臺灣)</span> Chinese (Taiwan) </div>
  <div class="item" data-percent="79" data-value="fa" data-english="Persian"><span class="description">پارسی</span> Persian </div>
  <div class="item" data-percent="41" data-value="fr" data-english="French"><span class="description">Français</span> French </div>
  <div class="item" data-percent="37" data-value="el" data-english="Greek"><span class="description">ελληνικά</span> Greek </div>
  <div class="item" data-percent="37" data-value="ru" data-english="Russian"><span class="description">Русский</span> Russian </div>
  <div class="item" data-percent="36" data-value="de" data-english="German"><span class="description">Deutsch</span> German </div>
  <div class="item" data-percent="23" data-value="it" data-english="Italian"><span class="description">Italiano</span> Italian </div>
  <div class="item" data-percent="21" data-value="nl" data-english="Dutch"><span class="description">Nederlands</span> Dutch </div>
  <div class="item" data-percent="19" data-value="pt_BR" data-english="Portuguese"><span class="description">Português(BR)</span> Portuguese </div>
  <div class="item" data-percent="17" data-value="id" data-english="Indonesian"><span class="description">Indonesian</span> Indonesian </div>
  <div class="item" data-percent="12" data-value="lt" data-english="Lithuanian"><span class="description">Lietuvių</span> Lithuanian </div>
  <div class="item" data-percent="11" data-value="tr" data-english="Turkish"><span class="description">Türkçe</span> Turkish </div>
  <div class="item" data-percent="10" data-value="kr" data-english="Korean"><span class="description">한국어</span> Korean </div>
  <div class="item" data-percent="7" data-value="ar" data-english="Arabic"><span class="description">العربية</span> Arabic </div>
  <div class="item" data-percent="6" data-value="hu" data-english="Hungarian"><span class="description">Magyar</span> Hungarian </div>
  <div class="item" data-percent="6" data-value="vi" data-english="Vietnamese"><span class="description">tiếng Việt</span> Vietnamese </div>
  <div class="item" data-percent="5" data-value="sv" data-english="Swedish"><span class="description">svenska</span> Swedish </div>
  <div class="item" data-precent="4" data-value="pl" data-english="Polish"><span class="description">polski</span> Polish </div>
  <div class="item" data-percent="6" data-value="ja" data-english="Japanese"><span class="description">日本語</span> Japanese </div>
  <div class="item" data-percent="0" data-value="ro" data-english="Romanian"><span class="description">românește</span> Romanian </div>
</div>

          </div>
        </div>
      </div>

      <div class="ui download primary button">ダウンロード </div>
      <div class="ui flowing download basic popup">
        <div class="ui divided equal width relaxed center aligned choice grid">
          <div class="framework column">
            <h4 class="ui center aligned header">UI Framework</h4>
            <div class="ui list">
              <div class="item"><i class="green check icon"></i> Themable</div>
              <div class="item"><i class="green check icon"></i> Build Tools</div>
            </div>
            <div class="ui primary fluid button">選ぶ</div>
          </div>
          <div class="standalone column">
            <h4 class="ui center aligned header">Standalone</h4>
            <div class="ui list">
              <div class="item">デフォルトテーマ</div>
              <div class="item">Precompiled</div>
            </div>
            <div class="ui fluid button basic">選ぶ</div>
          </div>
        </div>
        <div class="ui divided equal height relaxed center aligned framework grid">
          <div class="column">
            <div class="ui header">Semantic UI</div>
            <a class="ui primary button" href="https://github.com/Semantic-Org/Semantic-UI/archive/master.zip">Download ZIP </a>
            <a class="ui button" href="/introduction/getting-started.html">はじめに</a>
            <h4 class="ui header">Package Managers</h4>
            <div class="ui form">
              <div class="field">
                <label>NPM</label>
                <div class="ui fluid input">
                  <input type="text" readonly="readonly" placeholder="Copy Link" value="npm install semantic-ui"/>
                </div>
              </div>
              <div class="field">
                <label>Git</label>
                <div class="ui fluid input">
                  <input type="text" readonly="readonly" placeholder="Copy Link" value="https://github.com/Semantic-Org/Semantic-UI.git"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ui divided equal height relaxed center aligned standalone grid">
          <div class="column">
            <div class="ui header">Standalone Shape</div>
            <a class="ui primary button" href="https://github.com/Semantic-Org/UI-Shape/archive/master.zip">Download ZIP </a>
            <a class="ui button" href="https://github.com/Semantic-Org/UI-Shape/">View GitHub </a>
            <h4 class="ui header">Package Managers</h4>
            <div class="ui form">
              <div class="field">
                <label>Bower</label>
                <div class="ui fluid input">
                  <input type="text" readonly="readonly" placeholder="Copy Link" value="bower install semantic-ui-shape"/>
                </div>
              </div>
              <div class="field">
                <label>NPM</label>
                <div class="ui fluid input">
                  <input type="text" readonly="readonly" placeholder="Copy Link" value="npm install semantic-ui-shape"/>
                </div>
              </div>
              <div class="field">
                <label>Git</label>
                <div class="ui fluid input">
                  <input type="text" readonly="readonly" placeholder="Copy Link" value="https://github.com/Semantic-Org/UI-Shape.git"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <div class="advertisement">
      
      <div id="carbonads"><span><span class="carbon-wrap"><a href="//srv.carbonads.net/ads/click/x/GTND42QIF6AIL5QMCKALYKQMCEYDT27YCKBILZ3JCW7IL53MCVBIP27KC6BIVK3ECVAIKK3EHJNCLSIZ?segment=placement:semanticuicom;" class="carbon-img" target="_blank" rel="noopener"><img src="https://cdn4.buysellads.net/uu/1/4823/1532447428-1524760431-CircleCI.jpeg" alt="" border="0" height="100" width="130" style="max-width: 130px;"/></a><a href="//srv.carbonads.net/ads/click/x/GTND42QIF6AIL5QMCKALYKQMCEYDT27YCKBILZ3JCW7IL53MCVBIP27KC6BIVK3ECVAIKK3EHJNCLSIZ?segment=placement:semanticuicom;" class="carbon-text" target="_blank" rel="noopener">Join over 300,000 developers using CircleCI's integration with GitHub.</a></span><a href="http://carbonads.net/?utm_source=semanticuicom&amp;utm_medium=ad_via_link&amp;utm_campaign=in_unit&amp;utm_term=carbon" class="carbon-poweredby" target="_blank" rel="noopener">ads via Carbon</a></span></div>
      
    </div>
    
    
    
    
    
      
        
      
        
      
        
      
        
      
      <div class="ui four item stackable tabs menu">
        
          <a class="item" data-tab="definition">Definition</a>
          
        
          <a class="item" data-tab="examples">サンプル</a>
          
        
          <a class="item active" data-tab="usage">使用方法</a>
          
        
          <a class="item" data-tab="settings">Settings</a>
          
        
      </div>
    
  </div>
</div>

  <div class="bsa-cpc"></div>
  <div class="ui vertical beg transition hidden segment">
    <i class="large red delete link icon"></i>
    <div class="ui red header">
      <i class="disabled warning sign icon"></i>
      <div class="content">Want to Support Open Source? Whitelist Your Ad-Blocker. <div class="sub header">We promise to not show more than one small ad per page. Dont worry, hiding this message will make sure you won't get nagged again. </div>
      </div>
    </div>
  </div>



<div class="main ui container">

  <div class="ui tab" data-tab="definition" style=""><div class="ui dividing right rail"><div class="ui sticky" style="left: 790px;"><h4 class="ui header">シェイプ</h4><div class="ui vertical following fluid accordion text menu"><div class="item active"><a class="active title"><i class="dropdown icon"></i> <b>Types</b></a><div class="active content menu"><a class="item active" href="#">シェイプ</a><a class="item" href="#cube">Cube</a><a class="item" href="#text">Text</a></div></div></div></div></div>

    <h2 class="ui dividing header">Types</h2>

    <div class="example">
      <h4 class="ui header">シェイプ</h4><i class="fitted icon code"></i><a class="anchor" id=""></a>
      <p>A shape is a three dimensional object including any flat content as a side.</p>

      <div class="ui people shape">
        <div class="sides">
          <div class="active side">
            <div class="ui card">
              <div class="image">
                <img src="/images/avatar/large/steve.jpg"/>
              </div>
              <div class="content">
                <div class="header">Steve Jobes</div>
                <div class="meta">
                  <a>Acquaintances</a>
                </div>
                <div class="description">Steve Jobes is a fictional character designed to resemble someone familiar to readers. </div>
              </div>
              <div class="extra content">
                <span class="right floated">2014年にジョイン </span>
                <span><i class="user icon"></i> 151人の友達 </span>
              </div>
            </div>
          </div>
          <div class="side">
            <div class="ui card">
              <div class="image">
                <img src="/images/avatar/large/stevie.jpg"/>
              </div>
              <div class="content">
                <a class="header">Stevie Feliciano</a>
                <div class="meta">
                  <span class="date">2014年にジョイン</span>
                </div>
                <div class="description">Stevie Feliciano is a library scientist living in New York City. She likes to spend her time reading, running, and writing. </div>
              </div>
              <div class="extra content">
                <a><i class="user icon"></i> 22 Friends </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui ignored divider"></div>
      <div class="ui ignored icon direction buttons">
        <div class="ui button" data-animation="flip" title="Flip Left" data-direction="left"><i class="left long arrow icon"></i></div>
        <div class="ui button" data-animation="flip" title="Flip Up" data-direction="up"><i class="up long arrow icon"></i></div>
        <div class="ui icon button" data-animation="flip" title="Flip Down" data-direction="down"><i class="down long arrow icon"></i></div>
        <div class="ui icon button" data-animation="flip" title="Flip Right" data-direction="right"><i class="right long arrow icon"></i></div>
      </div>
      <div class="ui ignored icon direction buttons">
        <div class="ui button" title="Flip Over" data-animation="flip" data-direction="over"><i class="retweet icon"></i></div>
        <div class="ui button" title="Flip Back" data-animation="flip" data-direction="back"><i class="flipped retweet icon"></i></div>
      </div>
    </div>

    <div class="example">
      <h4 class="ui header">Cube</h4><i class="fitted icon code"></i><a class="anchor" id="cube"></a>
      <p>A cube shape is formatted so that each side is the face of a cube</p>
      <div class="ui cube shape">
        <div class="sides">
          <div class="active side">
            <div class="content">
              <div class="center">
                1
              </div>
            </div>
          </div>
          <div class="side">
            <div class="content">
              <div class="center">
                2
              </div>
            </div>
          </div>
          <div class="side">
            <div class="content">
              <div class="center">
                3
              </div>
            </div>
          </div>
          <div class="side">
            <div class="content">
              <div class="center">
                4
              </div>
            </div>
          </div>
          <div class="side">
            <div class="content">
              <div class="center">
                5
              </div>
            </div>
          </div>
          <div class="side">
            <div class="content">
              <div class="center">
                6
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ui ignored divider"></div>
      <div class="ui ignored icon direction buttons">
        <div class="ui button" data-animation="flip" title="Flip Left" data-direction="left"><i class="left long arrow icon"></i></div>
        <div class="ui button" data-animation="flip" title="Flip Up" data-direction="up"><i class="up long arrow icon"></i></div>
        <div class="ui icon button" data-animation="flip" title="Flip Down" data-direction="down"><i class="down long arrow icon"></i></div>
        <div class="ui icon button" data-animation="flip" title="Flip Right" data-direction="right"><i class="right long arrow icon"></i></div>
      </div>
      <div class="ui ignored icon direction buttons">
        <div class="ui button" title="Flip Over" data-animation="flip" data-direction="over"><i class="retweet icon"></i></div>
        <div class="ui button" title="Flip Back" data-animation="flip" data-direction="back"><i class="flipped retweet icon"></i></div>
      </div>

    </div>

    <div class="example">
      <h4 class="ui header">Text</h4><i class="fitted icon code"></i><a class="anchor" id="text"></a>
      <p>A text shape is formatted to allow for sides of text to be displayed</p>

      <div class="ui info ignored icon message">
        <i class="info letter icon"></i>
        <div class="content">
          <div class="header">Using Shapes</div>
          <ul class="list">
            <li>A shape must have defined width and heights for each side or else text flow may change during animation</li>
            <li>The module uses 3D transformations which are currently only supported in modern versions of Chrome, Safari, and Firefox.</li>
          </ul>
        </div>
      </div>

      <div class="ui text shape">
        <div class="sides">
          <div class="active ui header side">Did you know? This side starts visible.</div>
          <div class="ui header side">Help, its another side!</div>
          <div class="ui header side">This is the last side</div>
        </div>
      </div>

      <div class="ui ignored divider"></div>
      <div class="ui ignored icon direction buttons">
        <div class="ui button" data-animation="flip" title="Flip Left" data-direction="left"><i class="left long arrow icon"></i></div>
        <div class="ui button" data-animation="flip" title="Flip Up" data-direction="up"><i class="up long arrow icon"></i></div>
        <div class="ui icon button" data-animation="flip" title="Flip Down" data-direction="down"><i class="down long arrow icon"></i></div>
        <div class="ui icon button" data-animation="flip" title="Flip Right" data-direction="right"><i class="right long arrow icon"></i></div>
      </div>
      <div class="ui ignored icon direction buttons">
        <div class="ui button" title="Flip Over" data-animation="flip" data-direction="over"><i class="retweet icon"></i></div>
        <div class="ui button" title="Flip Back" data-animation="flip" data-direction="back"><i class="flipped retweet icon"></i></div>
      </div>
    </div>
  </div>

  <div class="ui tab" data-tab="examples" style=""><div class="ui dividing right rail"><div class="ui sticky" style="left: 790px;"><h4 class="ui header">シェイプ</h4><div class="ui vertical following fluid accordion text menu"><div class="item active"><a class="active title"><i class="dropdown icon"></i> <b>サンプル</b></a><div class="active content menu"><a class="item active" href="#shape-types">Shape Types</a></div></div></div></div></div>

    <h2 class="ui dividing header">サンプル<a class="anchor" id=""></a></h2>

    <div class="no example">
      <h4 class="ui header">Shape Types</h4><i class="fitted icon code"></i><a class="anchor" id="shape-types"></a>
      <p>Shapes do not have to be regular or have its sides match up in length and width to animate correctly.</p>

      <h3 class="ui header">シェイプ</h3>
      <div class="ui type buttons">
        <div class="active ui button" data-shape="auto">Auto</div>
        <div class="ui button" data-shape="square">正方形</div>
        <div class="ui button" data-shape="irregular">Irregular</div>
      </div>
      <div class="ui divider"></div>
      <div class="demo auto ui shape">
        <div class="sides">
          <div class="active first side">
            <img src="/images/leaves/1.png" class="ui medium image"/>
          </div>
          <div class="second side">
            <img src="/images/leaves/3.png" class="ui medium image"/>
          </div>
          <div class="third side">
            <img src="/images/leaves/5.png" class="ui medium image"/>
          </div>
        </div>
      </div>

      <div class="ui ignored divider"></div>
      <div class="ui ignored icon direction buttons">
        <div class="ui button" data-animation="flip" title="Flip Left" data-direction="left"><i class="left long arrow icon"></i></div>
        <div class="ui button" data-animation="flip" title="Flip Up" data-direction="up"><i class="up long arrow icon"></i></div>
        <div class="ui icon button" data-animation="flip" title="Flip Down" data-direction="down"><i class="down long arrow icon"></i></div>
        <div class="ui icon button" data-animation="flip" title="Flip Right" data-direction="right"><i class="right long arrow icon"></i></div>
      </div>
      <div class="ui ignored icon direction buttons">
        <div class="ui button" title="Flip Over" data-animation="flip" data-direction="over"><i class="retweet icon"></i></div>
        <div class="ui button" title="Flip Back" data-animation="flip" data-direction="back"><i class="flipped retweet icon"></i></div>
      </div>
    </div>
  </div>

  <div class="ui tab active" data-tab="usage"><div class="ui dividing right rail"><div class="ui sticky" style="left: 790px;"><h4 class="ui header">シェイプ</h4><div class="ui vertical following fluid accordion text menu"><div class="item active"><a class="active title"><i class="dropdown icon"></i> <b>はじめに</b></a><div class="active content menu"><a class="item active" href="#required-markup">Required Markup</a><a class="item" href="#javascript">JavaScriptによるアニメーション</a></div></div><div class="item"><a class="title active"><i class="dropdown icon"></i> <b>Behavior</b></a><div class="content menu active"></div></div></div></div></div>

    <h2 class="ui dividing header">はじめに<a class="anchor" id=""></a></h2>

    <div class="no example">
      <h4 class="ui header">Required Markup</h4><i class="fitted icon code"></i><a class="anchor" id="required-markup"></a>
      <p>Shapes can have any arbitrary content, just wrap each side in <code>side</code></p>
      <div class="ui existing segment"><pre><code class="code xml"><span class="tag">&lt;<span class="title">div</span> <span class="attribute">class</span>=<span class="value class">"<a href="/modules/shape.html">ui shape</a>"</span>&gt;</span>
  <span class="tag">&lt;<span class="title">div</span> <span class="attribute">class</span>=<span class="value">"sides"</span>&gt;</span>
    <span class="tag">&lt;<span class="title">div</span> <span class="attribute">class</span>=<span class="value">"active side"</span>&gt;</span>This side starts visible.<span class="tag">&lt;/<span class="title">div</span>&gt;</span>
    <span class="tag">&lt;<span class="title">div</span> <span class="attribute">class</span>=<span class="value">"side"</span>&gt;</span>This is yet another side<span class="tag">&lt;/<span class="title">div</span>&gt;</span>
    <span class="tag">&lt;<span class="title">div</span> <span class="attribute">class</span>=<span class="value">"side"</span>&gt;</span>This is the last side<span class="tag">&lt;/<span class="title">div</span>&gt;</span>
  <span class="tag">&lt;/<span class="title">div</span>&gt;</span>
<span class="tag">&lt;/<span class="title">div</span>&gt;</span></code></pre></div>
    </div>

    <div class="no example">

      <h4 class="ui header">JavaScriptによるアニメーション</h4><i class="fitted icon code"></i><a class="anchor" id="javascript"></a>
      <p>Animations use CSS3 transitions and Javascript to set-up the correct conditions.</p>

      <p>Initializing a shape</p>
      <div class="ui existing segment"><pre><code class="code javascript">$(<span class="string">'.shape'</span>).shape();</code></pre></div>

      <p>Transitions automatically assume next side is the next sibling (or first if last element)</p>
      <div class="ui existing segment"><pre><code class="code javascript">$(<span class="string">'.shape'</span>).shape(<span class="string">'flip up'</span>);</code></pre></div>

      <p>To manually set the next side to appear use a selector or jQuery object</p>
      <div class="ui existing segment"><pre><code class="code javascript">$(<span class="string">'.shape'</span>)
  .shape(<span class="string">'set next side'</span>, <span class="string">'.second.side'</span>)
  .shape(<span class="string">'flip up'</span>)
;</code></pre></div>

      <p>Any internal method can be invoked programmatically</p>
      <div class="ui existing segment"><pre><code class="code javascript">$(<span class="string">'.shape'</span>).shape(<span class="string">'repaint'</span>);</code></pre></div>

    </div>

    <h2 class="ui dividing header">Behavior</h2>

    <div class="no example">
      <p>All the following behaviors can be called using the syntax:</p>
      <i class="fitted icon code"></i><div class="ui existing segment"><pre><code class="code javascript">$(<span class="string">'.your.element'</span>)
  .shape(<span class="string">'behavior name'</span>, argumentOne, argumentTwo)
;</code></pre></div>
    </div>

    <table class="ui definition sortable celled table segment">
      <thead>
        <tr><th>Behavior</th>
        <th>Description</th>
      </tr></thead>
      <tbody>
        <tr>
          <td>flip up</td>
          <td>Flips the shape upward</td>
        </tr>
        <tr>
          <td>flip down</td>
          <td>Flips the shape downward</td>
        </tr>
        <tr>
          <td>flip right</td>
          <td>Flips the shape right</td>
        </tr>
        <tr>
          <td>flip left</td>
          <td>Flips the shape left</td>
        </tr>
        <tr>
          <td>flip over</td>
          <td>Flips the shape over clock-wise</td>
        </tr>
        <tr>
          <td>flip back</td>
          <td>Flips the shape over counter-clockwise</td>
        </tr>
        <tr>
          <td>set next side(selector)</td>
          <td>Set the next side to a specific selector</td>
        </tr>
        <tr>
          <td>is animating</td>
          <td>Returns whether shape is currently animating</td>
        </tr>
        <tr>
          <td>リセット</td>
          <td>Removes all inline styles</td>
        </tr>
        <tr>
          <td>queue(animation)</td>
          <td>Queues an animationtill after current animation</td>
        </tr>
        <tr>
          <td>repaint</td>
          <td>Forces a reflow on element</td>
        </tr>
        <tr>
          <td>set default side</td>
          <td>Set the next side to next sibling to active element</td>
        </tr>
        <tr>
          <td>set stage size</td>
          <td>Sets shape to the content size of the next side</td>
        </tr>
        <tr>
          <td>リフレッシュ</td>
          <td>Refreshes the selector cache for element sides</td>
        </tr>
        <tr>
          <td>get transform down</td>
          <td>Returns translation for next side staged below</td>
        </tr>
        <tr>
          <td>get transform left</td>
          <td>Returns translation for next side staged left</td>
        </tr>
        <tr>
          <td>get transform right</td>
          <td>Returns translation for next side staged right</td>
        </tr>
        <tr>
          <td>get transform up</td>
          <td>Returns translation for next side staged up</td>
        </tr>
        <tr>
          <td>get transform down</td>
          <td>Returns translation for next side staged down</td>
        </tr>
      </tbody>
    </table>

  </div>

  <div class="ui tab" data-tab="settings" style=""><div class="ui dividing right rail"><div class="ui sticky" style="left: 790px;"><h4 class="ui header">シェイプ</h4><div class="ui vertical following fluid accordion text menu"></div></div></div>

    <h3 class="ui header">Shape Settings <div class="sub header">Shape settings modify the shape's behavior</div>
    </h3>

    <table class="ui celled sortable definition table segment">
      <thead>
        <tr><th>Setting</th>
        <th class="four wide">Default</th>
        <th>Description</th>
      </tr></thead>
      <tbody>
        <tr>
          <td>duration</td>
          <td>700ミリ秒</td>
          <td>Duration of side change animation</td>
        </tr>
        <tr>
          <td>width <div class="ui horizontal teal label">2.2</div></td>
          <td>initial</td>
          <td>
            <div class="ui bulleted list">
              <div class="item">When set to <code>next</code> will use the width of the next <code>side</code> during the shape's animation.</div>
              <div class="item">When set to <code>initial</code> it will use the width of the shape at initialization.</div>
              <div class="item">When set to a specifix pixel height, will force the width to that height.</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>height <div class="ui horizontal teal label">2.2</div></td>
          <td>initial</td>
          <td>
            <div class="ui bulleted list">
              <div class="item">When set to <code>next</code> will use the height of the next <code>side</code> during the shape's animation.</div>
              <div class="item">When set to <code>initial</code> it will use the height of the shape at initialization.</div>
              <div class="item">When set to a specifix pixel height, will force the height to that height.</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="ui horizontal section divider"><i class="icon setting"></i></div>

    <h3 class="ui header">Callbacks <div class="sub header">Callbacks specify a function to occur after a specific behavior.</div>
    </h3>


    <table class="ui celled sortable definition table segment">
      <thead>
        <tr><th class="four wide">Setting</th>
        <th>Context</th>
        <th>Description</th>
      </tr></thead>
      <tbody>
        <tr>
          <td>beforeChange</td>
          <td>Next Side</td>
          <td>Is called before side change</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>Active Side</td>
          <td>Is called after visible side change</td>
        </tr>
      </tbody>
    </table>

    <div class="ui horizontal section divider"><i class="icon setting"></i></div>

    <h3 class="ui header">DOM Settings <div class="sub header">DOM settings specify how this module should interface with the DOM</div>
    </h3>

    <table class="ui celled sortable definition table segment">
      <thead>
        <tr><th>Setting</th>
        <th class="four wide">Default</th>
        <th>Description</th>
      </tr></thead>
      <tbody>
        <tr>
          <td>namespace</td>
          <td>shape</td>
          <td>Event namespace. Makes sure module teardown does not effect other events attached to an element.</td>
        </tr>
        <tr>
          <td>selector</td>
          <td colspan="2">
            <div class="ui existing segment"><pre><code class="code less"><span class="tag">selector</span></code></pre></div>
          </td>
        </tr>
        <tr>
          <td>className</td>
          <td colspan="2">
            <div class="ui existing segment"><pre><code class="code less"><span class="tag">className</span></code></pre></div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="ui horizontal section divider"><i class="icon setting"></i></div>

    <h3 class="ui header">Debug Settings <div class="sub header">Debug settings controls debug output to the console</div>
    </h3>

    <table class="ui celled sortable definition table segment">
      <thead>
        <tr><th>Setting</th>
        <th class="four wide">Default</th>
        <th>Description</th>
      </tr></thead>
      <tbody>
        <tr>
          <td>name</td>
          <td>シェイプ</td>
          <td>Name used in debug logs</td>
        </tr>
        <tr>
          <td>silent</td>
          <td>False</td>
          <td>Silences all console output including error messages, regardless of other debug settings.</td>
        </tr>
        <tr>
          <td>debug</td>
          <td>False</td>
          <td>Provides standard debug output to console</td>
        </tr>
        <tr>
          <td>performance</td>
          <td>True</td>
          <td>Provides standard debug output to console</td>
        </tr>
        <tr>
          <td>verbose</td>
          <td>True</td>
          <td>Provides ancillary debug output to console</td>
        </tr>
        <tr>
          <td>error</td>
          <td colspan="2">
            <div class="ui existing segment"><pre><code class="code less"><span class="tag">error</span></code></pre></div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>

</div>
        <div class="ui  vertical footer segment">
  <div class="ui center aligned container">
    <div class="ui stackable grid">
      <div class="three wide column">
        <h4 class="ui header">コミュニティ</h4>
        <div class="ui link list">
          <a class="item" href="https://www.transifex.com/organization/semantic-org/" target="_blank">翻訳を手伝う</a>
          <a class="item" href="https://github.com/Semantic-Org/Semantic-UI/issues" target="_blank">意見を送る</a>
          <a class="item" href="https://gitter.im/Semantic-Org/Semantic-UI" target="_blank">チャットに参加</a>
          <a class="item" href="/cla.html" target="_blank">CLA</a>
        </div>
      </div>
      <div class="three wide column">
        <h4 class="ui header">ネットワーク</h4>
        <div class="ui link list">
          <a class="item" href="https://github.com/Semantic-Org/Semantic-UI" target="_blank">GitHub Repo</a>
          <a class="item" href="http://forums.semantic-ui.com" target="_blank">フォーラム</a>
          <a class="item" href="http://1.semantic-ui.com">1.x Docs</a>
          <a class="item" href="http://legacy.semantic-ui.com">0.x Docs</a>
        </div>
      </div>
      <div class="seven wide right floated column">
        <h4 class="ui header">このプロジェクトを助ける</h4>
        <p> コミュニティに入って、Semantic UIの継続的な開発サポートをお願いします。</p>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick"/>
          <input type="hidden" name="hosted_button_id" value="7ZAF2Q8DBZAQL"/>
          <button type="submit" class="ui large teal button">寄付する</button>
        </form>
      </div>
    </div>
    <div class="ui section divider"></div>
    <img src="/images/logo.png" class="ui centered mini image"/>
    <div class="ui horizontal small divided link list">
      <a class="item" href="http://semantic-ui.mit-license.org/" target="_blank">Free &amp; Open Source (MIT)</a>
    </div>
  </div>
</div>

      </div>
    </div>
  </div>
)
}
