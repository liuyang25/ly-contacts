import { observable, action, computed } from 'mobx';

export class DataStore {
  @observable contacts: Array
  @observable current: Object

  constructor() {
    this.contacts = []
    this.current = {}
  }
  updateContacts(datas) {
    this.contacts = datas
  }
  setCurrent(data) {
    this.current = data
  }
  updateCurrent(){

  }
}

export default new DataStore();