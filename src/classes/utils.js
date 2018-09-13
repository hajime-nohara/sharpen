import dateformat from 'dateformat'
import i18n       from '../state/i18n'


export default new class {

  getCurrentProjectState (defaultState) {
    if (localStorage.getItem('sharpen_data') && localStorage.getItem('sharpen_user')) {
      const sharpenUserLS = JSON.parse(localStorage.getItem('sharpen_user'))
      const sharpenDataLS = JSON.parse(localStorage.getItem('sharpen_data'))
      const currentProjectState = sharpenDataLS[sharpenUserLS.currentProjectId]
      if (currentProjectState) {
        // updated by new source 
        currentProjectState.i18n = i18n 
        return currentProjectState
      } else {
        localStorage.setItem('sharpen_data', "")
      }
    }
    return defaultState
  }

  isMobile () {
    return (typeof window.orientation !== 'undefined')
  }

  range (range) {
    return Array.apply(null, {length: range}).map(Number.call, Number)
  }

  /* date to position */
  getWidthFromTerm (startDate, endDate, globalCellWidth) {
    return (this.getTermFromDate(startDate, endDate)) * globalCellWidth
  }

  getWidthOfStartPoint (startDate, endDate, globalCellWidth) {
    return (this.getTermFromDate(startDate, endDate)-1) * globalCellWidth
  }

  /* int to something unit */
  parsePx(value) {
    return value + "px"
  }

  parsePercent(value) {
    return value + "%"
  }

  /* pageX value to sharpen's unit */
  widthResized (widthResized, cellWidth) {
    const halfCellWidth = (cellWidth / 2)
    let count           = parseInt(widthResized / cellWidth)
    if (count === 0 && widthResized < halfCellWidth) {
      return 0
    }
    let more = widthResized - (cellWidth * count)
    if (halfCellWidth <= more){
      count += 1
    }
    return count * cellWidth
  }

  /*
   * リサイズ時の開始日、終了日を位置情報からの計算してyyyy-mm-ddの文字列で返却
   */
  get_date(leftPositioin, cellWidth, tableStartDate) {
    var cellCount = parseInt(leftPositioin / cellWidth);
    var dt        = new Date(tableStartDate);
    dt.setDate(dt.getDate() + cellCount);
    return dateformat(dt, 'yyyy-mm-dd');
  }

  smoothScroll () {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
           window.requestAnimationFrame(()=>this.smoothScroll())
           window.scrollTo(0, currentScroll - (currentScroll/5))
      }
  }

  getDateStr (date) {
    return date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + (("0" + date.getDate()).slice(-2));
  }

  getTermFromDate (date1Str, date2Str) {
    var date1 = new Date(date1Str);
    var date2 = new Date(date2Str);

    // getTimeメソッドで経過ミリ秒を取得し、２つの日付の差を求める
    var msDiff = date2.getTime() - date1.getTime();

    // 求めた差分（ミリ秒）を日付へ変換します（経過ミリ秒÷(1000ミリ秒×60秒×60分×24時間)。端数切り捨て）
    var daysDiff = Math.floor(msDiff / (1000 * 60 * 60 *24));

    // 差分へ1日分加算して返却します
    return ++daysDiff;
  }

  getUrlVars (){
      var vars = {}; 
      var param = location.search.substring(1).split('&');
      for(var i = 0; i < param.length; i++) {
          var keySearch = param[i].search(/=/);
          var key = '';
          if(keySearch != -1) key = param[i].slice(0, keySearch);
          var val = param[i].slice(param[i].indexOf('=', 0) + 1);
          if(key != '') vars[key] = decodeURI(val);
      } 
      return vars; 
  }

  random (){
    var l = 16;
    // 生成する文字列に含める文字セット
    var c = "abcdefghijklmnopqrstuvwxyz";
    var cl = c.length;
    var r = "";
    for(var i=0; i<l; i++){
        r += c[Math.floor(Math.random()*cl)];
    }
    return r
  }
}
