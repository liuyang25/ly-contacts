import { observable, action, computed } from 'mobx';

export class DataStore {
  @observable contacts: Array
  @observable current: Object

  constructor() {
    this.contacts = []
    this.current = JSON.parse(sessionStorage.getItem('contacts.current') || '{}')
  }
  updateContacts(datas) {
    this.contacts = datas
  }
  setCurrent(data) {
    this.current = data
    sessionStorage.setItem('contacts.current', JSON.stringify(data))
  }
  updateActivities(activity){
    if (!this.current.activities) {
      this.current.activities = {}
    }
    this.current.activities.unshift(activity)
    this.current.status = activity.type == 10 ? 3 : 1 // it may has other status
    sessionStorage.setItem('contacts.current', JSON.stringify(this.current))
  }
}

export default new DataStore();