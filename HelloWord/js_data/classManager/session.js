'use strict'

const cacheManager = require('./cache')


// sessionManager 가 cacheManager를 확장 한다.
// cacheManager 기능들 모두가 여기로 옮겨진다
class sessionManager extends cacheManager {
    // 기능 분리, 재활용 해서 중요 OOP
}

const SessionManager = new sessionManager();
SessionManager.addConfig({
    token : 'random'
})

const config = SessionManager.getConfig();
console.log(config);