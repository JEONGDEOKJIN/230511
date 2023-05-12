

// 🔷 전역 변수 모음 

    // [서버 인스턴스] 모듈 가져오기
        const express = require("express");
    // [서버 인스턴스] 인스턴스 만들기 
        const app = express();
    // '대기 상태' 포트 설정
        const PORT = 8070; 

    // [View] view 엔진 사용위해 path 받기 
        const path = require("path")

    // post 붙이기 위해 postRoute 객체 받아오기
        const postRoute = ("./routes/posts")
            // 'routes 폴더' 에서 posts.js 파일에 접근 > 그 파일을 postRoute 에 담는다. ❓❓ 
            // 'routes 폴더' 에서 posts.js 파일에 접근 > posts.js 파일 안에 있는 module.exports = router; 를 담는다. ❓❓ | 이렇게 하려면, require 아니야? 


    // [view]
        // view 엔진으로 보여줄 파일들의 '⭐디렉토리⭐ 경로' 설정
            app.set("views" , path.join(__dirname, "page"));

            // 스크립트가 "/home/user/myapp/server.js"에 있는 경우 
                // __dirname은 "/home/user/myapp"이고 
                // path.join(__dirname, "page")는 당신은 "/home/user/myapp/page".

            // 기존 path 경로값을 '문자열' 로 가져와서, page 폴더가 기본 경로가 되게 함. 

            // __dirname은 "page" 디렉토리에 대한 절대 경로를 생성하는 데 사용

        // view 엔진으로 ejs 사용
            app.set("view engine" , "ejs");



    // [미들웨어 추가] --> controller?❓❓❓ 관련 없음.
        // [질문 : 미들웨어는 controller 기능의 일부?]
            //  controller 는 모델과 view 사이에서 할 뿐, 미들웨어는 controller 의 일부가 아님 

        // [미들웨어 기능] 
            // 요청 응답 사이 기능 추가 ⭐⭐⭐
        
        // [미들웨어 작동하는 코드 흐름] ⭐⭐⭐⭐⭐
            // 1. '요청' 이 들어온다 
            // 2. '요청' 과 응답 사이에 기능을 추가할건데 
                // 2.1 '요청' 에 대해서, (postRoute 폴더에 있는 모든 경로) 앞에 '/posts url' 을 넣어 
                    // 그래서, http://servername/posts/posts.js 이렇게 해야 실행이 되나❓❓❓
                // 2.2 '요청' 에 대해서, body 객체를 사용할지, static 파일을 사용할 건지, 등등. 

            // 3. 그 다음에, routes > posts.js 로 넘어가서 > '어떤 경로' 에서 '어떤 종류의 요청'이 왔는지 파악
                // 해당 경로에서, 해당 종류의 요청이 오면 > 해당 콜백함수를 실행


        // [추가한 미들웨어]
            // 'body 객체' 를 사용하기 위해서 urlencoded 추가
                app.use(express.urlencoded({extended : false}))
                    // extended : false === 사용 안함. 사용할 일이 없다.
                    // extended : true === 깊은 객체 탐색, 사용할 일이 거의 없음. 
                    // ex) req.body 를 사용할 수 있음. 

            // '정적인 파일 ex) css, html, javascript 파일' 을 사용하기 위해, 미들웨어, 추가
                app.use(express.static(path.join(__dirname, "public")))
                    // 정적인 파일을 모아놓은 경로를 '지정 public 폴더' 로 지정. 
                    
                    // 1) /css 지정한 경우
                        // ejs 단에, /css/파일명 으로 접근 할 수 있음. 
                        // app.use("/css", express.static(path.join(__dirname, "public")));
                        // 정적 파일 경로도 나눌 수 있다.   
                        // ex) public/style.css 파일이 있는 경우, http://servername/css/style.css의 애플리케이션에서 사용

                    // 2) 지정하지 않고, 루트경로로 설정한 경우
                        // 매개변수로 지정하지 않으면, 기본적으로, / 경로로 지정됨. 
                        // app.use(express.static(path.join(__dirname, "public")));
                        // ex) 예를 들어 public/style.css 파일이 있는 경우, http://servername/style.css의 애플리케이션에서 사용

                    // '정적' vs '동적' 
                        // '정적' 
                            // 서버에 변경하거나, 처리하지 않고, 저장된 그대로, 클라이언트에 전달되는 파일 
                        // '동적' 
                            // PHP 스크립트, 서버 사이드 렌더링, 그러면 ejs❓❓❓ 
                            // 같은 url 에 요청했을 때, 다른 값이 나오는거

                        // 그러면, 지금 '정적' 폴더를 따로 만드는 이유는❓❓❓ 
                        // 저번에는, ejs 로 서버사이드 렌더링을 했는데, 이번에는 그게 아니라, 클라이언트 사이드 렌더링 하는 건가?


    // 라우터 파일에 /posts 추가  
        app.use("/posts" , postRoute)

            // [질문] 
                // controller와는 관련없음.
                // 그냥, 라우터, 기능과 관련, 

            // [교수님 필기]
                // postRoute객체에 get메서드로 / 루트경로 지정했을때
                // "/posts"이 경로도 추가되어서 라우팅 된다.
                // 게시글은 /posts 붙어야 루트경로로 요청이된다.

            // "/posts" | 미들웨어 기능이 실행될 경로 
                //  | 이 경우 미들웨어는 "/posts"로 시작하는 모든 경로에 사용됨. 
                // ex) postRoute에서 "/new"로 정의된 경로는 애플리케이션에서 "/posts/new"로 액세스0
                // app.use("/css", express.static(path.join(__dirname, "public"))); 이거랑 같은 기능? 
                    // http://servername/css/style.css 이렇게 해야, 접근할 수 있는것 처럼, 
                    // http://servername/posts/파일이름이되는거지?

            // ❓❓❓❓❓❓
                // postRoute 는 어디서 나온거고, 객체인가? 어떤 기능을 하는거지? 
                // postRoute 는 그냥, 이름을 지어준건가? 
                // 라우터 가 무슨 의미지? 
            
            // 해석
                // Here, any path that starts with /posts will use the postRoute router. 
                // This is a way to modularize your routes.
                // /posts 로 시작되는 path 면, 'postRoute router 객체' 를 이용할 거다~ 라는 거지? 



    // [대기 상태 설정]
        app.listen( PORT, () => {
            console.log(`${PORT} 에서 서버 열렸어~🥪🥪🥪`)
        })


