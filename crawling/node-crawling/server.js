const express = require('express');

// 모듈선언
const request = require('request-promise');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

// express setting
app.set('json spaces', 2);

// 대한통운 가서 배송위치 요청해서 crawling으로 가져와서 localhost에서 보여지게 webserver
//  /shipping/송장번호
app.get('/shipping/:invc_no', async (req,res) => {
    try{

        //대한통운의 현재 배송위치 크롤링 주소
        const url = `https://www.doortodoor.co.kr/parcel/ \
        doortodoor.do?fsp_action=PARC_ACT_002&fsp_cmd=retrieveInvNoACT&invc_no=${req.params.invc_no}` ;
        let result = []; //최종 보내는 데이터
        
        // request 모듈로 html 가져오고,
        // cheerio 모듈로 원하는 정보의 부분을 가져오기

        const html = await request(url);
        const $ = cheerio.load( html , 
            { decodeEntities: false } //한글 변환
        );
 
        // request 가져와서 class나 id의 unique한 부분만 가져와야 해 : .find(table.mb15)
        const tdElements = $(".board_area").find("table.mb15 tbody tr td"); //td의 데이터를 전부 긁어온다
        // console.log(tdElements) 
        
        let temp = {};  // 임시로 row 한줄
        for (let i=0; i<tdElements.length;i++) {
            if (i%4===0){
                temp = {}  // 시작지점, 초기화
                temp["step"] = tdElements[i].children[0].data.trim();
            }else if (i%4===1){
                temp["date"] = tdElements[i].children[0].data;
            }else if (i%4===2){
                // br로 나눠진 곳
                // 0 번째 배송상태, 1 : br 2: 담당자 이름
                temp["status"] = tdElements[i].children[0].data;
                if(tdElements[i].children.length > 1){
                    temp["status"] += tdElements[i].children[2].data;
                }
            }else if(i%4===3){
                temp["location"] = tdElements[i].children[1].children[0].data;
                result.push(temp);  
            }
        }

    res.json(result);

    }catch(e){
        console.log(e)
    }    
});

app.listen( port, function(){
    console.log('Express listening on port', port);
});