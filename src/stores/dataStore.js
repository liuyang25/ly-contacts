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
  updateCurrent(){

  }
}

export default new DataStore();