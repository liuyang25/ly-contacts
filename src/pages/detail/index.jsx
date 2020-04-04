import * as React from 'react'
import { contactsApi } from '@/api/index.js'
import { inject, observer } from 'mobx-react'
import Loading from '@/components/loading'
import message from 'vanilla-antd-message'
import './style.less'


const defaultAvatar = require('@/assets/images/default_avatar.png')
const callImg = require('@/assets/images/call.png')
const emailImg = require('@/assets/images/email.png')
const messageImg = require('@/assets/images/message.png')
const noteImg = require('@/assets/images/note.png')
const attachmentImg = require('@/assets/images/attachment.png')

const statusType = {
  '0': { style: 'open', text: 'Open' },
  '1': { style: 'progress', text: 'In Progress' },
  '2': { style: 'nohired', text: '???' },
  '3': { style: 'hired', text: 'Hired' },
}
const activityType = {
  '0': 'Form filled',
  '1': 'New contact created',
  '2': 'Call',
  '3': 'Email',
  '10': 'Hired'
}
const icon = {
  '0': require('@/assets/images/op-form.png'),
  '1': require('@/assets/images/op-new.png'),
  '2': require('@/assets/images/op-call.png'),
  '10': require('@/assets/images/op-hired.png'),
}

@inject('dataStore', 'navigatorStore')
class Detail extends React.PureComponent<Props> {
  state = {
    loading: false,
    operating: false,
    currentTime: new Date().format('MM/dd/yyyy hh:mm:ssapm'),
    inputValue: '',
    modalOperateStatus: false,
  }
  handleCall() {
    this.setState({
      operating: true,
      currentTime: new Date().format('MM/dd/yyyy hh:mm:ssapm')
    })

  }
  handleEmail() {
    message.info('todo')
  }
  onInput(e) {
    this.setState({
      inputValue:e.target.value
    })
  }
  handleLog(){
    const {inputValue, currentTime} = this.state
    const {dataStore} = this.props
    if (!inputValue || inputValue == '') {
      return
    }
    // api.updateActivities().then(res => {
      dataStore.updateActivities({
        type: 2,
        desc: inputValue,
        time: currentTime
      })
      this.setState({
        inputValue: '',
        operating: false,
      })
    //})
  }
  handleStatus(){
    const { current } = this.props.dataStore
    if (current.status != 1) {
      return
    }
    this.setState({
      modalOperateStatus: true
    })
  }
  handleHired(){
    const {dataStore} = this.props
    const { current } = dataStore
    // api.updateActivities().then(res => {
      dataStore.updateActivities({
        type: 10,
        desc: 'A quick win!',
        time: new Date().format('MM/dd/yyyy hh:mm:ssapm'),
      })
      this.setState({
        modalOperateStatus: false
      })
    //})
  }

  componentDidMount() {
    const { navigatorStore, dataStore } = this.props
    const { current } = dataStore
    let self = this
    navigatorStore.setNavigator({
      title: current.name,
      fnL:()=>{
        let {operating} = self.state
        if (operating) {
          self.setState({
            operating: false
          })
        } else {
          window.history.back()
        }
      }
    })
    if (!current.activities) {
      this.setState({
        loading: true
      })
      contactsApi.detail(dataStore.current.id).then(res => {
        dataStore.setCurrent({
          ...current,
          ...res.data
        })
        this.setState({
          loading: false
        })
      }).catch(err => {
        console.log(err)
        this.setState({
          loading: false
        })
      })
    }
  }
  renderDetail() {
    const { current } = this.props.dataStore
    const status = statusType[current.status]
    return (
      <div id="detail" key="detail">
        <div className="info-block base-info">
          <div className="info-box">
            <div className="avatar">
              <img src={current.avatar || defaultAvatar} />
            </div>
            <div className="info">
              <div className="name">
                {current.name}
                {current.status == 0 && <span className="new-flag">
                  New
                  </span>}
              </div>
              {status && <span className={`status ${status.style}`} onClick={()=>this.handleStatus()}>
                {status.text}
              </span>}
            </div>
          </div>
          <div className="info-btns">
            <img src={callImg} onClick={() => this.handleCall()} />
            <img src={emailImg} onClick={() => this.handleEmail()} />
            <img src={messageImg} />
            <img src={noteImg} />
            <img src={attachmentImg} />
          </div>
        </div>
        <div className="block-title">
          Contact Detail
          <span onClick={() => this.handleCall()}>Edit</span>
        </div>
        <div className="info-block contact-info">
          <div className="info-item">
            <span className="label">Email</span>
            <span className="content">{current.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone</span>
            <span className="content">{current.phone}</span>
          </div>
        </div>
        <div className="block-title">Activities</div>
        <div className="info-block activities">
          {current.activities && current.activities.map((item, index) => {
            return <div className="activity" key={index}>
              <div className="step">
                {index != current.activities.length - 1 && <div className="tail" />}
                <img src={icon[item.type]} />
              </div>
              <div className="content">
                <div className="type">{activityType[item.type]}</div>
                <div className="time">{item.time}</div>
                {item.desc && <div className="desc">{item.desc}</div>}
              </div>
            </div>
          })}
        </div>
      </div>
    )
  }
  renderOperating() {
    const { current } = this.props.dataStore
    const { currentTime, inputValue } = this.state
    return (
      <div id="detail-operating" key="detail-operating">
        <div className="operation-title">
          <div className="move-rt">
            <img src={callImg}></img>
            <span>Log Call</span>
          </div>
        </div>
        <div className="operation-info">
          Call Detail
          <span>{currentTime}</span>
        </div>
        <div className="operation-input">
          <textarea placeholder="what have you discussed?" value={inputValue} onChange={value=>this.onInput(value)}></textarea>
          <div>
            <button className={inputValue && 'enable'} onClick={()=>this.handleLog()}>Log</button>
          </div>
        </div>
      </div>
    )
  }
  renderModal() {
    return (
      <div id="modal" key="modal" onClick={()=>this.setState({modalOperateStatus: false})}>
        <div className="options">
          <div onClick={()=>this.handleHired()}>Mark as Hired</div>
          <div>Follow Up</div>
        </div>
        <div className="cancel">
          Cancel
        </div>
      </div>
    )
  }
  render() {
    const { operating, modalOperateStatus } = this.state
    return ([
      operating ? this.renderOperating() : this.renderDetail(),
      modalOperateStatus && this.renderModal()
    ])
  }
}
export default Detail
