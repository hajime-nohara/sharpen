import { h } from 'hyperapp'
import utils from '../classes/utils'
import styl from '../styles/ganttBar.styl'

export default (state, actions, data) => {

  return (
        <div class=''>
          <h2 class="ui dividing header">コンテンツ<a class="anchor" id=""></a></h2>
          <div class="example">
            <h4 class="ui header">コンテンツブロック</h4><i class="fitted icon code"></i><a class="anchor" id=""></a>
            <p>複数のコンテンツブロックを含むカードを作れます。</p>
            <div class="ui card">
              <div class="content">
                <div class="header">プロジェクト・タイムライン</div>
              </div>
              <div class="content">
                <h4 class="ui sub header">アクティビティ</h4>
                <div class="ui small feed">
                  <div class="event">
                    <div class="content">
                      <div class="summary"><a>Elliot Fu</a> added <a>Jenny Hess</a> to the project </div>
                    </div>
                  </div>
                  <div class="event">
                    <div class="content">
                      <div class="summary"><a>Stevie Feliciano</a> was added as an <a>Administrator</a> </div>
                    </div>
                  </div>
                  <div class="event">
                    <div class="content">
                      <div class="summary"><a>Helen Troy</a> added two pictures </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extra content">
                <button class="ui button">プロジェクトに参加する</button>
              </div>
            </div>
          </div>
            {/* row
            <div class={styl.row}
              style={rowStyle}
              oncreate={setBackgroundSize}
              onupdate={setBackgroundSize}
              ondrop={ondrop}
              ondragover={ondragover}
              ondragenter={ondragover}>
              <div class={styl.progress + ' ui indicating progress active'}
                id={data.id}
                onmousedown={draggableOn}
                ontouchstart={draggableOn}
                onclick={openModal}
                ondragstart={onDragStart}
                ondragend={onDragEnd}
                style={progressStyle}>
                <div class={styl.bar + ' bar'} style={progressBarStyle}>
                  <div class='progress'>{utils.parsePercent(data.progress)}</div>
                </div>
                <div class={styl.resizerStart} onmousedown={resizeOnStart} ontouchstart={resizeOnStart} />
                <div class={styl.resizerEnd} onmousedown={resizeOnEnd} ontouchstart={resizeOnEnd}>
                  {badge}
                </div>
                <div class={styl.progressBarStyle + ' progress-bar bg-faded'} style={progressBarStyle} />
                <div class={styl.title + ' label'}>{data.title}</div>
              </div>
            </div>
            */}
        </div>
  )
}
