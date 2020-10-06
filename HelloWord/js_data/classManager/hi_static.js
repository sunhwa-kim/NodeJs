'use strict'

class test {
    /*
    constructor() {
        this.config = {}
    }
    */

    fn () {

    }

    static call() {
        // constructor에 접근 할 수 없음 - static만 쓴다면 생성자 필요 없음
        //this.config
        console.log('static method');
    }
}

// class 생성
// const Test = new test();

// static은 class 생성 없이 바로 호출 가능
test.call()