const { exec } = require("child_process");
const { post } = require("axios")
const { existsSync, readFileSync } = require("fs");
const { requestDevice, getUser } = require('./github')
const path = require('path')
const prompt = require('prompt');

const endpoint = 'https://submit.api.codestates-seb.link/';
const homedir = require('os').homedir();
const packageName = JSON.parse(readFileSync('./package.json').toString('utf-8')).name
const payload = {
  "name": packageName,
  "assessments": [{
    "type": "mocha",
    "timestamp": new Date().toISOString()
  }]
}

prompt.message = ''
prompt.delimiter = '\n>'
prompt.start({ noHandleSIGINT: true });
process.on('SIGINT', () => {
  console.log('과제 제출을 중단합니다.')
  process.exit()
})

const entryPoint = () => {
  const location = path.join(homedir, '.codestates-token')
  if (existsSync(location)) {
    const token = readFileSync(location).toString()
    getUser(token.split('\n')[0], ({ data }) => {
      getEndpoint(data.id)
    })
  }
  else {
    requestDevice(({ data }) => {
      getEndpoint(data.id)
    })
  }
}

const getEndpoint = (id) => {
  post(endpoint + 'auth', {
    id
  })
    .then(res => {
      console.log(`${res.data.users[0].name}님의 과제를 제출합니다`)
      runReport(async result => await submit(result, res.data))
    })
    .catch(err => {
      if (err.response.status === 404) {
        console.log("UrClass에 해당 사용자가 존재하지 않습니다. 제출에 실패하였습니다.")
        return;
      }
      else {
        console.log(err)
      }
    })
}

const runReport = (callback) => {
  exec("npm run report", (err, stdout, stderr) => {

    if (existsSync('./report.json')) {
      let result = readFileSync('./report.json').toString()
      result = JSON.parse(result)
      callback(result.stats)
    }
    else if (existsSync('./report.jest.json')) {
      payload.assessments[0].type = 'jest'
      let result = readFileSync('./report.jest.json').toString()
      result = JSON.parse(result)
      result = {
        stats: {
          numFailedTestSuites: result.numFailedTestSuites,
          numFailedTests: result.numFailedTests,
          numPassedTestSuites: result.numPassedTestSuites,
          numPassedTests: result.numPassedTests,
          numPendingTestSuites: result.numPendingTestSuites,
          numPendingTests: result.numPendingTests,
          numRuntimeErrorTestSuites: result.numRuntimeErrorTestSuites,
          numTodoTests: result.numTodoTests,
          numTotalTestSuites: result.numTotalTestSuites,
          numTotalTests: result.numTotalTests
        }
      }
      callback(result.stats)
    }
    else {
      throw new Error('결과를 전송할 수 없습니다. 테스트가 먼저 통과하는지 확인하세요.')
    }

  })
}

const submit = async (result, auth) => {
  payload.user = auth.users[0]
  payload.assessments[0].result = { ...result }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  post(auth.endpoint_submit, payload, config)
    .then(resp => {
      console.log('제출에 성공하였습니다.')
    })
    .catch(err => {
      console.log(err)
      throw new Error('제출에 실패하였습니다.')
    })
}

module.exports = entryPoint;