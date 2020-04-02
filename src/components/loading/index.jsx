import * as React from 'react'
import style from './style.less'

const loading = require('@/assets/icons/loading.svg')
class Loading extends React.PureComponent<Props> {
  state = {
  }
  componentDidMount() {}
  render() {
    return (
      <div class={style.loading}>
        <img src={loading}/>
      </div>
    )
  }
}
export default Loading
