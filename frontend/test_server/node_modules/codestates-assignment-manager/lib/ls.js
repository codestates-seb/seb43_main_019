const { existsSync, readFileSync } = require("fs");
const { requestDevice, getUser } = require('./github')
const path = require('path')
const homedir = require('os').homedir();
const endpoint =  'https://submit.api.codestates-seb.link/sprint/ls';
const { get } = require("axios")

const ls = (user) => {
  return get(`${endpoint}?user=${user}`)
  .then(({ data }) => {
    if (data.responseTrial.length === 0) {
      console.log('제출 기록이 없습니다.')
      return;
    }

    const result = data.responseTrial.reduce((arr, record) => {
      return record.assessments.reduce((arr, asmt) => {
        return [...arr, {
          name: record.name,
          // user: record.user,
          timestamp: asmt.timestamp,
          // result: asmt.result
        }]
      }, arr)
    }, [])

    console.log(result)
  })
}

const entryPoint = () => {
  const location = path.join(homedir, '.codestates-token')
  if (existsSync(location)) {
    const token = readFileSync(location).toString()
    getUser(token.split('\n')[0], ({ data }) => {
      console.log(data.login + '님의 제출 기록입니다.')
      ls(data.id)
    })
  }
  else {
    requestDevice(({ data }) => {
      console.log(data.login + '님의 제출 기록입니다.')
      ls(data.id)
    })
  }
}

module.exports = entryPoint
// entryPoint()