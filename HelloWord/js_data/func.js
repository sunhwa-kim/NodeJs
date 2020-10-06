'use strict'
console.log('애가 있어야 시작되네? 모름');

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

// setInterval  : 1번째 parameter를 2번째 ms 마다 실행
// setInterval( () => {}, 1000)  // ms 단위
let cnt = 0;
let actInterval = setInterval( () => {
    cnt += 1
    console.log('3초 후 실행');
    if (cnt == 3){
        clearInterval(actInterval);
    }
},1000)

// error handling
try {
    a  // 선언도 않고 실행하니 error 
} catch (error) {
    console.log('Err  '+error);  // ReferenceError
}

try {
    a
} catch (error) {} // error 발생해도 다음 라인 실행되게 하기 위해
console.log('a');  
// p.s 애 실행 된 후 setInterval 실행되넹

// arrow function
/*
API.prototype.get = function(resource) {
    var self = this;  // function마다 내부의 this로 받기 때문에
    return new Promise( function(resolve, reject) {
        http.get(self.uri + resource, function(data) {
            resolve(data);
        });
    });
};
    // refactoring
API.prototype.get = (resource) => {
    new Promise( (resolve, reject) => {
        http.get(this.uri + resource, (data)=> {
            resolve(data);
        });
    });
};*/



//Curried Function : 여러 함수 호출을 arrow function으로 할 수 있다. 
//  합성 함수 같은
// f(x) = x+1
// g(x) = x^2
// h(x) = f(g(x))   // g(x) 값이 f(x)로
const getDiscountA = (price, rate) => console.log(price * rate);
getDiscountA(10000, 0.1)

// rate 가 표현, 이벤트 별로 다르기 때문에 먼저 받아
// closuer 선언 : 내부적으로 접근할 수 있는 함수 선언 (price)
const getDiscount = rate => price => rate*price;  //Curried Function
const getTenpercentOff = getDiscount(0.1)(10000);  
console.log(getTenpercentOff);