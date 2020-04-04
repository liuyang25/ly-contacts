function list(req /*,res*/) {
  const list = [
    {
      id: '5',
      name: 'John Chan',
      email: 'john@gmai.com',
      phone: '09969712111',
      status: 0,
    },
    {
      id: '4',
      name: 'Amy Gee',
      email: 'Amygee@yahoo.com',
      phone: '1234567',
      status: 1,
    },
    {
      id: '3',
      name: 'John Lo',
      email: 'johnlo@hotmail.com',
      phone: '1234567',
      status: 2,
    },
    {
      id: '2',
      name: 'Tommy G',
      email: 'tomg@tommyg.com',
      phone: '1234567',
      status: 3,
    },
    {
      id: '1',
      name: 'Steve Jo',
      email: 'sjo@stevejo.com',
      phone: '1234567',
      status: 3,
    },
  ]
  return {
    success: 'true',
    code: '200',
    data: list,
  }
}
function detail(req, param){
  return {
    success: 'true',
    code: '200',
    data: {
      id: '5',
      name: 'John Chan',
      email: 'john@gmai.com',
      phone: '09969712111',
      status: 3,
      activities: [
        {
          type: 10,
          desc: 'A quick win!',
          time: '12/12/2019 10:59:30am'
        },
        {
          type: 2,
          desc: 'Asked technical questions',
          time: '12/12/2019 10:59:30am'
        },
        {
          type: 1,
          time: '12/12/2019 10:59:30am'
        },
        {
          type: 0,
          time: '12/12/2019 10:59:00am'
        },
      ]
    },
  }
}
function updateActivities(req) {

}

module.exports = function(req /*, res*/) {
  switch (req.method) {
    case 'GET':
      const pathReg = /contacts\/(.*)/
      let pathParam = req.path.match(pathReg)
      console.log(pathParam)
      if (pathParam) {
        return detail(req, pathParam[1])
      } else {
        return list(req)
      }
    case 'POST':
      return updateActivities(req)
    default:
      return list(req)
  }
}
