import * as React from 'react'
import { mainIndex } from '@/router/pages'
import { inject, observer } from 'mobx-react'
import './style.less'

@inject('navigatorStore')
@observer
class Main extends React.PureComponent<Props> {
  state = {}

  componentDidMount() {
    var initFontSize = function() {
      var n = document.getElementsByTagName('html')[0],
        e = document.documentElement.clientWidth
      console.log(e)
      n.style.fontSize = (e / 750) * 100 + 'px'
    }
    initFontSize()
    window.onresize = function() {
      initFontSize()
    }
  }
  render() {
    const { navigatorStore } = this.props
    // console.log(navigatorStore.iconL)
    const iconL = navigatorStore.iconL
      ? require(`@/assets/images/${navigatorStore.iconL}.png`)
      : null
    const iconR = navigatorStore.iconR
      ? require(`@/assets/images/${navigatorStore.iconR}.png`)
      : null
    return (
      <div id="main">
        <div className="navigator">
          <button
            className={'btn-l ' + navigatorStore.iconL}
            onClick={navigatorStore.fnL}
          >
            <img src={iconL} />
          </button>
          {navigatorStore.title}
          <button
            className={'btn-r ' + navigatorStore.iconR}
            onClick={navigatorStore.fnR}
          >
            {iconR && <img src={iconR} />}
          </button>
        </div>
        {// main pages routerView
        mainIndex()}
      </div>
    )
  }
}
export default Main
