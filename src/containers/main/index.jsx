import * as React from 'react'
import { mainIndex } from '@/router/pages'
import { inject, observer } from 'mobx-react'

@inject('navigatorStore')
@observer
class Main extends React.PureComponent<Props> {
  state = {}
  componentDidMount() {}
  render() {
    const { navigatorStore } = this.props
    return (
      <div id="main">
        <div className="navigator">
          <button
            className={navigatorStore.iconL}
            onClick={navigatorStore.fnL}
          />
          {navigatorStore.title}
          {navigatorStore.iconR && (
            <button
              className={navigatorStore.iconR}
              onClick={navigatorStore.fnR}
            />
          )}
        </div>
        { // main pages routerView
          mainIndex()
        }
      </div>
    )
  }
}
export default Main
