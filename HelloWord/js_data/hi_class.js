'use strict'

// JS는 multi paradigm - OOP, 함수형 프로그래밍, prototype 언어 (언어 자유도 높다)
// cash manager의 singleton pattern 코드에, DB manager 등 query manager 등 design pattern에 좋음
//  class + singleton pattern 으로 한번만 생성할 수 있다. (여러번 요청에도 불필요한 작업 생략)
class cacheManager {
    constructor() {
        // 생성자는 동기화된 코드로만 작업 가능 = 비동기 문법 쓸 수 없음(async, await)
        this.config = []
    }

    addConfig (obj = {}){
        this.config.push(obj)
    }

    getConfig () {
        return this.config
    }
}




const CacheManager = new cacheManager();
CacheManager.addConfig({
    prot : 8000
})
CacheManager.addConfig({
    cert:'../../test.crt'
})
const config = CacheManager.getConfig()
console.log(config);


class Robot {
    constructor(name) {  // 생성자(초기값)
        this.name = name
    }
    speak() {
        console.log(`${this.name}`);
    }
}
// class's Extends
class Ai extends Robot {
    constructor(name){
        super(name)  // extends 통해  상위 클래스의 기능 호출
    }

    walk() {
        console.log(`walk: ${this.name}`);
    }
}

const r = new Robot('hiro')
r.speak();

const a = new Ai('hi')
a.speak();
a.walk();