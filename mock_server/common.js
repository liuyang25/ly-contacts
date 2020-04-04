const idm_service = require('../utils/idm-service')
const siam_service = require('../utils/siam-service')

module.exports = {
  login(req, response) {
    let account = req.body.account
    let password = req.body.password || ''

    /* for test *
    let user = {
      id: account,
      name: 'hehe',
      dept: 'hehe'
    }
    req.session.user = user
    response.send({ success: true, code: 200, data: user })
    return
    /* for test */

    siam_service
      .post(
        '/rest/authenticate',
        {
          username: account,
          password: password
        }
      )
      .then(res => {
        if (res.status == 'true'){
          console.log('authenticate success')
          console.log(res)
          // let filter = `(usercn=${'00333038'})`
          // let filter = `(alias=${account})`
          let filter = `(&(userstatus=3)(alias=${account}))`
          let times = new Date('2016-01-01').format('yyyyMMddhhmmss') + 'Z'
          // console.log(times)

          idm_service
            .post('/rest/user/search_users', {
              filter: filter,
              returnAttributes: ['usercn', 'belongdepartment'],
              timestamp:   times          })
            .then(res => {
              if (res.success == 'true') {
                console.log('search_users success')
                // console.log(res)
                if (!res.wsUsers || res.wsUsers.length == 0) {
                  console.log('search no user')
                  response.send({success: false, msg: 'no active user found'})
                  return
                }
                let user = {
                  id: account,
                  name: '',
                  dept: '',
                }
                const attributes = res.wsUsers[0].attributes
                attributes.forEach(item => {
                  if (item.name == 'belongdepartment') {
                    user.dept = item.value
                  }
                  if (item.name == 'usercn') {
                    user.name = item.value
                  }
                })
                // console.log(res.wsUsers[0].attributes)
                req.session.user = user
                response.send({ success: true, code: 200, data: user })
              } else {
                console.log('search_users failed')
                console.log(res.message)
                response.send({ success: false, msg: res.message })
              }
            })
            .catch(err => {
              console.log('search_users error')
              console.log(err)
              response.send({ success: false, msg: err.message })
            })
        } else {
          console.log('authenticate failed')
          console.log(res.message)
          response.send({ success: false, msg: res.message })
        }
      })
      .catch(err => {
        console.log('authenticate error')
        console.log(err)
        response.send({ success: false, msg: err.message })
      })
  },
  logout(req, res) {
    req.session.user = null
    res.send({ success: true, code: 200 })
  }
}
