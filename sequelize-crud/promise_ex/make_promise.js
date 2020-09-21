// new Promise() 만들고
// resolve와 reject 인자 가진 함수 만든다
// 내가 원하는 시점을 resolve로 받아온다 (실행 보장)

// const aa = new Promise(function( resolve, reject ){

// });

const aa = new Promise(( resolve, reject ) => {
    resolve(console.log('promise test sh'));
});
aa.then(() => {
    console.log('promise execute completed');
});


//  resolove test
const waitSecond = new Promise( (resolve, reject ) => {
    console.log('시작!!_sunhwa');
    setTimeout( ()=> {
        resolve(console.log('1초 뒤 실행 테스트 _resolove'));
    }, 1000)
});

waitSecond.then(() => {
    console.log("1초 테스트 이행 완료 ");
})


// reject test - error
const test = new Promise((reslove, reject)=>{
    console.log('reject ? 로그인, 권한 인증 등 - if resolve() /else reject() ');
    if (false) {
        resolve(console.log('pass~'));
    } else {
        reject(console.log('sunhwa test, 인증 error, reject '))
    }
});
test.then( () => {
    console.log("end");
})


const testB = new Promise((resolve, reject) => {
    console.log('reject -> catch');
    reject('sunhwa error?? -> YES! proceed catch')
})
testB.then(() => {
    console.log("no error");
}).catch( (err) => {
    console.log(err);
})