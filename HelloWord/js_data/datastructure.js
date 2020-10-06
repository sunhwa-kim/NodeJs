'use strict'

const arr = [2,3,4]

// every(arr, Object.keys, Object.values 등 가능) 
const isBiggerThenOne = arr.every(key => key>2);
console.log(isBiggerThenOne);

// some() 최소 한개 이상 만족시 true 반환
console.log(arr.some(key => key<3));


// 바로 사용할게 아니라면, 꼭 변수에 할당해서 사용해야 함 (객체 통해 새로운 데이터로 반환되기 때문)
// 해당 값만 return, 없으면 undefined
// console.log(arr.find( key => key === 2));
const ret = arr.find(key => key === 2);  // 해당 값 찾고, 값을 return 할 때
const res = arr.includes(3)  // 값 포함 여부 조건만 수행시  // 필요하지 않은 데이터 반환은 메모리 leak 누수
console.log(ret);
console.log(res);
// ex
for (const item of arr) {
    if(arr.includes(item)){
        console.log(item);
    }
}

// 가독성 좋음, 비동기 코드에는 주의
arr.forEach(item => console.log(item))

const newArr = [];  // clone은 다른게 더 좋음
// 함수와 더 많이 사용
arr.forEach(item => {
    newArr.push(item);
})
console.log(newArr);

// 배열 전체에 대한 함수 결과 반환 map, 배열에 대해 조건 통과한 배열 반환 filter
const b = arr.map(X => X+2)
console.log(b);
const c = b.filter(X => X > 4)
console.log(c);

const obj = {
    title : 'node.js practice'
}

const newObj = {
    name : 'add text'
}

// global method Object
const obj_ret = Object.assign( {}, obj, newObj );  // 2 object 통합
console.log(obj_ret);

const obj2_ret = {  // 직관석인 코드
    ...obj,
    ...newObj
}
console.log(obj2_ret);

const arr_ret = [
    ...arr,
    ...b
]
console.log(arr_ret);

const obj3_ret = {
    ...arr,
    ...b
}
console.log(obj3_ret);


const test = new Set();
test.add(1);
test.add(1);
test.add(2);

console.log(test.has(0)) // true,false
// set은 'for of' iteration
for(const item of test){
    console.log(item);
}

