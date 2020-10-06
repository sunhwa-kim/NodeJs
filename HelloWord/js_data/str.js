'use strict'

// data type이 변할 거라면 let, != const
let string = 'node.js string practice'

// js 는 unicode 지원
let isStartWith = string.startsWith('n')
let isIncludes = string.includes('.js')
let isEndWith = string.endsWith('e')

// 함수는 안 바뀌니까
const checkIfContains = () => {
    if(isStartWith && isIncludes && isEndWith){
        return true
    }
}

const ret = checkIfContains();
console.log(ret);

console.log(typeof ret);
console.log(typeof string);


// 선언 후 실행 - 보통의 방식
function sayYo(word) {
    console.log(word);
}
sayYo('nomal')

// JS - hoisting : 선언된 변수, 함수를 메모리에 저장 특징 때문에 코드 선언 전 함수 사용 할 수 있다.
say('JS - hi hoisting')
function say(word){
    console.log(word);
}

// IIFE  
// def : ( 익명함수 )(); 구조 : 괄호안에 함수명 없는 함수(익명함수) + ():즉시실행(JS engine 통해)
(function (){
    let lang = 'js'  // 외부로부터 접근 불가능
})();

// console.log(lang);  // ReferenceError : 외부 접근 불가능하기 때문

let r = (function (){
    let lang = 'js'  // 외부로부터 접근 불가능
    return lang;
})();
console.log(r);  // IIFE가 저장된게 아니라, IIFE가 실행된 결과만 저장