import { observable, autorun } from 'mobx'

export class NavigatorStore {
  @observable title: string
  @observable iconL: string
  @observable iconR: string
  @observable fnL: Function
  @observable fnR: Function

  setNavigator(options) {
    this.title = options.title
    this.iconL = options.iconL || 'back'
    this.fnL = options.fnL || window.history.back
    this.iconR = options.iconR
    this.fnR = options.fnR 
  }
  constructor() {
  }
}

export default new NavigatorStore()
