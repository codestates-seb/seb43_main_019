const { get, post } = require("axios")
const { writeFileSync } = require('fs')
const homedir = require('os').homedir();
const path = require('path')
const prompt = require('prompt')
const open = require('open')
const headers = {
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
}

const client_id = '494998e15b36dd73531a'
const description = (user_code) => `코드스테이츠에 과제를 제출합니다.
===================================

GitHub 인증을 통해 사용자를 확인하는 과정을 진행합니다.
다음 여덟자리 코드를 웹브라우저에 입력하세요.

+-------------------+
|     ${user_code}     |
+-------------------+

이후 진행되는 로그인 과정이 완료되면 "Congratulations, you're all set!" 메시지가 나옵니다.
이후에, 다시 제출 CLI로 돌아와서 엔터를 누르세요. 미리 엔터를 누르면, 제출이 되지 않습니다.`

const schema = {
  properties: {
    y: {
      description: '로그인 완료 후 엔터를 누르세요.'
    }
  }
}

const requestDevice = (callback) => {
  return post('https://github.com/login/device/code', {
    client_id,
    scope: 'user'
  }, headers)
  .then(res => {
    const { device_code, user_code, verification_uri } = res.data

    open(verification_uri)

    console.log(description(user_code))
    prompt.get(schema, (err) => {
      if (err) {
        console.log('과제 제출을 중단합니다.')
        return
      }
      accessToken(device_code, callback)
    })

  })
  .catch(handleError)
}

const accessToken = (device_code, callback) => {
  return post('https://github.com/login/oauth/access_token', {
    client_id,
    device_code,
    grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
  }, headers)
  .then(({ data }) => {
    if (data.error) {
      if (data.error === 'authorization_pending') {
        console.log('\nGitHub 로그인 과정을 마치지 않았습니다. 완료 후에 다시 엔터를 누르세요.');
        prompt.get(schema, (err) => {
          if (err) {
            console.log('과제 제출을 중단합니다.')
            return
          }
          accessToken(device_code, callback)
        })
        return;
      }
      if (data.error === 'slow_down') {
        console.log(`\n${data.interval}초 이후에 다시 시도하세요. 짧은 시간동안 여러 번 요청할 수 없습니다.`)
        prompt.get(schema, (err) => {
          if (err) {
            console.log('과제 제출을 중단합니다.')
            return
          }
          accessToken(device_code, callback)
        })
        return;
      }

      console.log(data)
      return;
    }

    if (data.access_token) {
      getUser(data.access_token, callback)
    }
    else {
      console.log(data)
    }
  })
  .catch(handleError)
}

const getUser = (access_token, callback) => {
  return get('https://api.github.com/user', {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${access_token}`
    }
  })
  .then(resp => {
    writeFileSync(path.join(homedir, '.codestates-token'), `${access_token}\n${resp.data.id}`, 'utf8')
    callback(resp)
  })
  .catch(handleError)
}

const handleError = err => {
  console.log('알 수 없는 에러가 발생했습니다. 아래 에러코드와 함께 제보해주세요.')
  console.log(err)
}

module.exports = {
  requestDevice,
  getUser
};
