

// mysql 모듈 가져오기
    const mysql2 = require('mysql2/promise');
        // mysql2/promise | mysql2 모듈을 가져올 수 있는 이유는, npm i mysql2 이렇게 설치 해줬기 때문에? 


// mysql 과 연결하기 
    const mysql = mysql2.createPool( {
        user : "root", 
        password : "mysqlpwdj", 

        // 다중 쿼리문 사용 예정
        multipleStatements : true, 
            // 다중 쿼리문 사용 설정 

        // test11 이름으로, 벤치마크에서, '스키마' 생성
            // [질문] 
                // 1) 내가 생성? 2) 아니면 생성된 걸 연결? ❓❓❓ 
            // [테스트 결과]
                // 1) 벤치마크에서 test11 로 스키마 만들고 연결해야 함. 
                // 2) 정상연결되면, 아무런 에러도 안 뜸.  
            
        database : "test11"

    })



// 연결 확인 메소드 
    mysql.getConnection( (err, res) => {
        // 연결 안 되면 > err 에 내용이 들어옴
            console.log(err)
        // 연결 되면 > res 에 연결 인스턴스가 넘어옴 
            console.log(res)
    })


// 모듈로 내보내기 
    module.exports = mysql;
        // [기능]
            // 다른 파일에서 현재 반환하는 mysql 반환값을 사용할 수 있음.  
        
        // [예시]
            // posts.js 에서 const mysql = require("./config")
            // config 파일을 가져오면 > 그 파일에 있는 반환값인 mysql 이 들어온다. ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 

        // [궁금한 것]
            // 이렇게 내보내면, 어디에서, 어떻게 받는거지❓❓❓❓❓❓❓❓❓❓ 
            // 이게, app.js 랑 어떤 관련이 있는거지❓❓❓❓❓❓❓❓❓❓ 
            // 




// 수업을 듣고, 수업을 따라가는 것과 관련이 된다. 
// 내일 수업이 어떻게 되는건지 
// 오후 2시 까지