'use strict'

const utils = require('./utils');
// const assert = require('assert');  // 검증-node 기본 모듈
const should = require('should');  // 검증하는 써드파티 라이브러리

// 테스트 요구사항 느낌~ test code
describe('utils.js모듈_ capitalize()', () => {
    it('첫번째 문자를 대문자로 반환', () => {
        const result = utils.capitalize('hello');
        // assert.equal(result,'Hello');
        result.should.be.equal('Hello');
    })
})
