const puppeteer = require('puppeteer');

//입력 할 텍스트
const insert_name =  "insert_" + Math.random().toString(36).substring(2, 15);
const insert_description = "insert_" + Math.random().toString(36).substring(2, 15);

//수정 할 텍스트
const modi_name = "update_" + Math.random().toString(36).substring(2, 15);
const modi_description = "update_" + Math.random().toString(36).substring(2, 15);

async function run (){

    // 브라우저 열기
    // const browser = await puppeteer.launch({
    //     headless : false   // flase : webbroser 띄우기 , true : 리눅스 등 
    // });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();  

    // alert, confirm 모두 yes 처리 
    page.on("dialog", (dialog)=> {
        dialog.accept();
    })
    

    // 웹사이트 로딩 - 네이버 코스피 테스트
    // await page.goto('https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%EC%BD%94%EC%8A%A4%ED%94%BC', {timeout: 0, waitUntil: 'domcontentloaded'});
    // const tdName = await page.$eval('.stock_price strong', strong => strong.textContent.trim() );
    // console.log(tdName);

    await page.goto('http://localhost:3000/', {timeout: 0, waitUntil: 'domcontentloaded'});
    // 첫 화면 작성하기 버튼 대기
    await page.waitForSelector('.btn-default');
    await page.click('.btn-default');

    // write 페이지 이동 후 버튼 
    await page.waitForSelector('.btn-primary');
    await page.evaluate( (a,b) => {
        document.querySelector('input[name=name]').value = a;
        document.querySelector('textarea[name=description]').value = b;
        document.querySelector('.btn-primary').click();
    }, insert_name, insert_description );  //a,b

    // 첫화면 버튼 대기 -> 테이블 정보 가져와서 수정하기 (첫번째 td 링크)
    await page.waitForSelector('.btn-default');
    // table class 부여한 작업 추천
    // nth-child() : css
    await page.click('table tr:nth-child(2) td:nth-child(1) a');  // 첫번째 tr 은 (thead니까) 두번째로
    // detail에서 수정버튼 대기, 클릭 후 -> 작성하기 버튼 대기 
    await page.waitForSelector('.btn-primary');
    await page.click('.btn-primary');
    await page.waitForSelector('.btn-primary');
        // text 
    await page.evaluate((a,b) => {
        document.querySelector('input[name=name]').value = a;
        document.querySelector('textarea[name=description]').value = b;
        document.querySelector('.btn-primary').click();
    },modi_name, modi_description);

    // 수정 후, 목록 보기 버튼 대기 -> 목록 버튼 -> 목록
    await page.waitForSelector('.btn-default');
    await page.click('.btn-default');
    await page.waitForSelector('.btn-default');

    // 삭제 하기
    await page.click('.btn-danger');


    // 브라우저 닫기
    await browser.close();
}

run();
