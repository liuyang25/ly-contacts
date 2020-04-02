import * as React from 'react'
import { contactsApi } from '@/api/index.js'
import { inject, observer } from 'mobx-react'
import Loading from '@/components/loading'

@inject('dataStore', 'navigatorStore')
@observer
class Home extends React.PureComponent<Props> {
  state = {
    searchValue: '',
    loading: false,
  }

  handleSearch(value) {
    // filter personList
    this.setState({
      searchValue: value
    })
  }

  componentDidMount() {
    const { navigatorStore, dataStore } = this.props
    navigatorStore.setNavigator({title: 'CONTACTS'})

    if (dataStore.contacts.length == 0) {
      this.setState({
        loading: true
      })
      contactsApi.list().then(res => {
        dataStore.updateContacts(res.data)
        this.setState({
          loading: false
        })
      }).catch(err => {
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
        {loading && <Loading/>}
        <div className="header">
          <input
          placeholder="input search text"
          onChange={value => this.handleSearch(value)}
          style={{ width: '100%' }}
          />
        </div>
        <div className="contact-list">
        {
          dataStore.contacts.map(item => {
            return (
              <div className="contact-item">
                <div className="name">{item.name}</div>
                <div className="email">{item.email}</div>
                <button></button>
                <button></button>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}
export default Home
