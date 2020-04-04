import * as React from 'react'
import { contactsApi } from '@/api/index.js'
import { inject, observer } from 'mobx-react'
import Loading from '@/components/loading'
import message from 'vanilla-antd-message'
import './style.less'


const imgCall = require('@/assets/images/call.png') 
const imgEmail = require('@/assets/images/email.png') 
const status = [
  'new',
  'in progress',
  'hired',
  //'others'
]

@inject('dataStore', 'navigatorStore')
@observer
class Home extends React.PureComponent<Props> {
  state = {
    searchValue: '',
    loading: false
  }

  handleSearch(value) {
    // filter personList
    this.setState({
      searchValue: value
    })
  }
  handleDetail(item) {
    const { dataStore } = this.props
    dataStore.setCurrent(item)
    this.props.history.push('/detail')
  }
  handleCall() {
    message.info('todo')
  }
  handleEmail() {
    message.info('todo')
  }

  componentDidMount() {
    const { navigatorStore, dataStore } = this.props
    navigatorStore.setNavigator({
      title: 'CONTACTS',
      iconL: 'menu',
      iconR: 'add',
      fnL: ()=>{message.info('todo')},
      fnR: ()=>{message.info('todo')},
    })

    if (dataStore.contacts.length == 0) {
      this.setState({
        loading: true
      })
      contactsApi
        .list()
        .then(res => {
          dataStore.updateContacts(res.data)
          this.setState({
            loading: false
          })
        })
        .catch(err => {
          this.setState({
            loading: false
          })
        })
    }
  }
  render() {
    const { dataStore } = this.props
    const { loading } = this.state
    return (
      <div id="home">
        {loading && <Loading />}
        <div className="header">
          <input
            placeholder="input search text"
            onChange={value => this.handleSearch(value)}
          />
        </div>
        <div className="contact-list">
          {dataStore.contacts.map(item => {
            let { id } = item
            return <div className="contact-item" key={id} onClick={()=>this.handleDetail(item)}>
                <div className="name">
                  {item.name}
                  { item.status == 0 && <span className="new-flag">New</span> }
                </div>
                <div className="email">{item.email}</div>
                <button className="op-call" onClick={this.handleCall.bind(this)}>
                  <img src={imgCall} />
                </button>
                <button className="op-email" onClick={this.handleEmail.bind(this)}>
                  <img src={imgEmail} />
                </button>
              </div>
          })}
        </div>
      </div>
    )
  }
}
export default Home
