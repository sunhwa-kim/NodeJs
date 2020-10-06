'user strict'

// 생성하는 함수 !=  class의 constructure(생성자)

// yield != return
// yield : 반환하는데 끝나지 않음, 실행 때마다 변화가 기본 전제
// return : 반환하고 끝

// generator는 명시적으로 function + * 로 선언 (arrow function 안됨)

function* log() {
    console.log(0, yield);
    console.log(1, yield);
    console.log(2, yield);
}

const gen = log();

gen.next('zero');
gen.next('first');
gen.next('second');
