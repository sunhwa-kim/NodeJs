'use strict'


// destructuring 비구조화 - 객체, 배열에 이용
// 구조화 : 객체/ 배열 선언
// 비구조화 : 선언된 데이터에서 값을 가져오는 과정

const obj = {
    title : '구조화',
    value : 'structuring'
}

// 비구조화
const { title, value } = obj;
// const title = obj.title;   // es5 
console.log(title, value);


const arr = [0,1,2]
// const [0 2] = arr  // 변수등과 같이 선언은 숫자로 할 수 없어
const [,a,b] = arr;  // 할당 위한 개수만 맞춰주면 된다.
console.log(a,b);
