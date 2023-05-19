/**
 * @module CodestatesMochaRepoter
 */
/**
 * Module dependencies.
 */

var Base = require("mocha").reporters.Base;
var constants = require("mocha").Runner.constants;
var EVENT_TEST_PASS = constants.EVENT_TEST_PASS;
var EVENT_TEST_FAIL = constants.EVENT_TEST_FAIL;
var EVENT_RUN_BEGIN = constants.EVENT_RUN_BEGIN;
var EVENT_RUN_END = constants.EVENT_RUN_END;

const { existsSync, readFileSync } = require("fs");
const { getUser } = require('../lib/github')
const path = require('path')
const homedir = require('os').homedir();
const API_ENDPOINT = 'https://api.codestates-seb.link';
const { default: axios } = require("axios")
const _buf = [];

/**
 * Expose `CodestatesMochaRepoter`.
 */

exports = module.exports = CodestatesMochaRepoter;

/**
 * Constructs a new `CodestatesMochaRepoter` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */
function CodestatesMochaRepoter(runner, options) {
  Base.call(this, runner, options);

  var self = this;
  var total = runner.total;

  const packageName = JSON.parse(readFileSync('./package.json').toString('utf-8')).name
  const location = path.join(homedir, '.codestates-token')

  runner.on(EVENT_TEST_PASS, function (test) {
    writeEvent(
      {is_pass: true, testcase_fullname: test.fullTitle()}
    );
  });

  runner.on(EVENT_TEST_FAIL, function (test, err) {
    writeEvent({is_pass: false, testcase_fullname: test.fullTitle()});
  });

  runner.once(EVENT_RUN_END, function () {
    if (!existsSync(location)) {
      console.log("\n\nCodestates : GitHub 로그인을 완료해주세요. 아래 명령어를 실행해주세요. \n\n $ codestates login \n---------------------\n")
    }else{
      const token = readFileSync(location).toString()
      console.log("\n\nCodestates : imposter-repoter ");
      console.log("Package Name :", packageName)

      getUser(token.split('\n')[0], ({ data }) => {
        console.log('githubId ', data.id)
        axios({
          method:'post',
          url: `${API_ENDPOINT}/imposter/bulk-report`, 
          data:{
            "github_id": data.id,
            "repo_name": packageName,
            "tests": JSON.stringify(_buf),
            "at": new Date().toISOString()
          },
          headers: {
            "x-api-key": "5LvrWvSIME8Z7Qop9Sng55B3JOlcdiUC5Z3TCQcl" // cli-user
          }})
          .then(res => {
            console.log(`과제 진행이 추적관리 되고있습니다.`)
          })
          .catch(err => {
            console.log(`과제 진행 추적관리 에러 : ${err.response.status? err.response.status : -99}`)
          })
      })
    }
  });
}

/**
 * Mocha event to be written to the output stream.
 * @typedef {Array} CodestatesMochaRepoter~MochaEvent
 */

/**
 * Writes Mocha event to reporter output stream.
 *
 * @private
 * @param {CodestatesMochaRepoter~MochaEvent} event - Mocha event to be output.
 */
function writeEvent(event) {
  _buf.push(event);
  // process.stdout.write(JSON.stringify(event) + '\n');
}