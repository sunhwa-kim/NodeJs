// 비동기 예제로 setTimer

const pA = new Promise( (resolve,reject) => {
    setTimeout( () => {
        resolve({pA_text : "1초, pA의 텍스트 "})
    },1000)  // 1초
});

const pB = new Promise( (resolve,reject) => {
    setTimeout( () => {
        resolve({pB_text : "3초, pB의 텍스트 "})
    },3000)  // 3초
});

const pC = new Promise( (resolve, reject) => {
    setTimeout( () => {
        reject(" error - reject test ")
    },3000)
})
// promise chaining -> 4초
pA.then((resultA) => {
    console.log("pA = "+ resultA.pA_text);
    return pB;
}).then((resultB) => {
    console.log("pB = "+resultB.pB_text);
})

// promise all -> no 4초 but 순차적이 아닌 분기점 갖고 실행,1초 후 3초가 아닌, 끝나는 시간은 보장
Promise.all([pA,pB]).then((result) => {
    console.log("pA = " + result[0].pA_text);
    console.log("pB = " + result[1].pB_text);
})

// reject
Promise.all([pA,pB,pC]).then( (result) => {
    console.log("pA : " + result[0].pA_text);
    console.log("pB = " + result[1].pB_text);
    console.log("pC = " + result[2].pC_text);
}).catch(err => {
    console.log(err);
});