
// 🔷 config 에서 '연결' 하고 export 한 mysql 을 가져온다.
    const mysql = require("./config")
        // config 파일 가져오면 > 그 파일에 있는 반환값인 mysql 이 들어온다. 



// 🔷 post 객체에, 필요한 메소드를 정의
    
    const posts = {

        // 1. 테이블 초기화 함수 
        initTable : async function() {
            try {
                const [result] = await mysql.query("SELECT * FROM posts");
                // [result] | sql 에서 필요한 id, title, content 만 가져오고 싶음. 
                            // 그러려면, 배열 스프레드 연산자만 사용   
                            // 그러면, 0 1 2 3 4 이런식으로 순서대로 담긴다 ⭐⭐⭐⭐⭐⭐⭐ 

                // [해석] 
                    // 현재 스키마에 아무런 table 이 없음. 
                    // so, 이 구문은 posts 테이블을 찾는 것 이기 때문에, error 가 날 수 밖에 없음. 
                    // 따라서 catch 가 실행될 수 밖에 없고, table 이 이렇게 생성되게 됨.  
                console.log(result) 

            } catch (error) {
                await mysql.query("CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20), content VARCHAR(100))")
                    // [해석]
                        // 테이블이 없어서 error 나면 > 테이블 만들어~~ 라는 말 
                        // id INT AUTO_INCREMENT PRIMARY KEY | 자동으로 증가하는 고유키를 'id 열' 로 설정
                        
                    // await | mysql 이후에 promise 객체가 나올 텐데, 그거 다 나올 때 까지 기다려~ (맞나❓❓❓)
                            // | query 에서 원하는 응답을 가져오는게 힘드니까, 기다려주는 거야
            }
        }, 
            // [궁금증]
                // 여기에서 'async' 함수는 어떤 기능을 하는거지? ❓❓❓❓❓ 

            // [해석]
                // 현재 sql 에, 스키마만 있고, 테이블이 없는 상황, 이걸 만들어주는 구문 같은데? 
                
                // try - catch 구문의 사용 
                    // error 가 나면, 멈추지 않고, 해당 내용을 찍어줌, 어떤 메소드에서 오류가 났는지 
                    // 이게 없으면, error 가 나면 > 프로그램이 그냥 멈춰버림 
                    // '비동기' 로 처리해서 실행함. 한번 처리하고, 오류나면, 종료되는 것을 방지, 하기 위해서


        // 2. 글의 리스트를 '전체 조회' 하는 함수 
            viewPostAll : async function() {
                try {
                    const [result] = await mysql.query('SELECT * FROM posts')
                        // [result] | 배열 구조 분해할당에서, 첫 번째 요소, 를 result 로 가져오겠다는 말 인 것 같아 
                                // | 만약, [a, b, c, d, result] 이렇게 써있었다면, 총 5개의 값이 모두, 들어갔을거야. 
                                // | 그런데, [result] 이렇게 적었고, 그러면, 총 1개의 값만 result 에 들어가는것. 
                                // | [ , , result] 이렇게 적었다면, 세 번째 요소에 result 가 할당되었을 것. 
                        // [테스트]
                            // 그러면, 'query 로 들어오는 값' 중에서, 첫 번째 열에, 원하는 값이 있는지, 살펴보자.
                            
                    console.log(result)
                        // [잘 되는지 확인]
                            // 일부러 에러를 내보니까, 잘 작동하고 있는것 같아! ⭐⭐⭐⭐⭐ 

                        // [결과]
                            // 현재에는, [] 이렇게만 나옴. 
                            // 왜냐면? 아직 어떤 글도 안 넣었기 때문에? ❓❓❓❓❓ 
                            // 만약, sql 에 글을 넣으면, 바뀔까? 

                    return result
                        // [확인할 것]
                            // sql 에 글을 넣고, 첫 번째로 나오는 것이, 원하는 데이터 인가?, 를 확인 하자. 

                } catch (error) {
                    console.log("글 전체를 조회하려 했는데, 에러남!")
                }
            },

        // 3. 글을 선택했을 때, 글 하나를 보여줄 함수 
            selectPosts : async function (id) {
                try {
                    const [result] = await mysql.query("SELECT * FROM posts WHERE id = ?" , [id])
                        // [작동원리] 
                            // 이 메소드를 실행할 때, 매개변수 id 를 입력함 > 그러면, ?(placeholder) 에는 id 값이 들어감 
                            // 그러면, 해당 id 값에 맞는 게시글이 불러와짐. 

                        // [result] | 신기한게, mysql.query 에서 값을 불러오면, 수 많은 배열이 있는데, 
                                // | 첫 번째 값이, '글 추가'를 했던, [{id: 2, title: '12222', content: '2'}]' 이게 나온다. 
                                // | 기본적으로 이렇게 셋팅되어 있는게 신기하다. 

                    console.log(result);
                        // [결과]   [ { id: 2, title: '12222', content: '2' } ]

                    console.log("선택한 게시글 : " , result[0]);
                        // [0] 여기까지 들어가야, 원하는 걸, 뽑아낼 수 있다는 것도! 중요함! 나 혼자했을 때, 이걸 알아낼 수 있었어야 함!

                } catch (error) {
                    console.log("글 선택 조회 에러남")
                }
            }, 
                // [해석]
                    // 글 추가하는 걸 해야 이게 작동할 듯
                
                // [중요한 것] ⭐⭐⭐⭐⭐⭐⭐⭐ 
                    // async 는 await 랑 붙어 다님 
                    // then 메소드를 쓰거나, vs async await 를 쓰던지, 둘 중 하나만 써야 함. ⭐⭐⭐⭐⭐ ❓❓❓❓❓ 
                    // 같이 쓰면 절 대 안 됨 ⭐⭐⭐ | 기능은 되지만, 욕먹음 
                    // 더 중요한건, '왜 이렇게 될 수 밖에 없는가!' 를 이해해야 함 ⭐⭐⭐ 


        // 4. 글 추가하는 메서드 
            insert : async function(title, content) {
                try {
                    await mysql.query("INSERT INTO posts (title, content) VALUES (? , ?)" , [title, content]);
                        // [해석] ⭐⭐⭐⭐⭐⭐⭐⭐ 
                            // 'mysql.query("INSERT INTO posts (title, content) VALUE (?,?)", [title, content])' 여기의 결과값은 'promise 객체' 임 
                            // promise 객체가 될 수 있었던 이유는 connectionPool 을 해서 sql 에 연결했기 때문에 
                            // query 로 가서 값을 찾는데 시간이 1초 걸리는데, 
                                // 1) await 를 걸면 > 1초 걸리는 시간을 기다렸다가, > 값을 찾고 > console.log 아래줄로 내려간다. 
                                // 2) 만약, await 가 없으면 > 1초 걸리는 시간을 안 기다려주고 > 바로 console.log 로 내려간다 > 그 결과, 찾아야 하는 값을 찾지 못 하게 됨. 
                                // 이게 비동기를 쓰는 이유 ⭐⭐⭐⭐⭐⭐⭐⭐ 
                                // 즉, query 하는 과정이 걸리기 때문에, 시간을 기다려줘야 하고, 그래서 await 라는 비동기 를 쓸 수 밖에 없음. 

                        // (? , ?) | placeholder 임 
                                // | 여기에 들어갈 value 는, '그 다음 인자' 에 넣어주면 됨.
                                // | '인자' 에 들어갈 값은, ⭐'매개변수'⭐ 로 받아서 넣어주면 됨.
                            console.log("글 추가 완료 🙆‍♂️🙆‍♂️")

                
                } catch (error) {
                    console.log("글 추가 에러남~");
                }
            },

        // 5. 글 수정 메소드 
            update : async function(id, title, content) {
                try {
                    await mysql.query( "UPDATE posts SET title = ?, content = ? WHERE id = ?" , [title, content, id]);
                        // (? , ?) | placeholder 임 
                                // | 여기에 들어갈 value 는, '그 다음 인자' 에 넣어주면 됨.
                                // | '인자' 에 들어갈 값은, 해당 메소드를 '실행⭐' 할 때, ⭐'매개변수'⭐ 로 받아서 넣어주면 됨.
                                // | 이렇게 '실행⭐' 할 때, 넣을 수 있게 하면, 다양하게 넣을 수 있음. ⭐⭐⭐⭐⭐ 
                } catch (error) {
                    console.log(error)
                }
            }, 

        // 6. 글 삭제 메소드 
            delete : async function(id) {
                try {
                    await mysql.query("DELETE FROM posts WHERE id = ?;   SET @CNT = 0; UPDATE posts SET posts.id = @CNT:=@CNT + 1; " , [id])

                    // ALTER TABLE posts AUTO_INCREMENT = 0;

                        // ; | 하나의 코드가 끝났음을 알려줌 
                        // @CNT:=@CNT + 1; 이렇게 id 를 더해서, id 를 재정렬, ⭐⭐⭐
                        // posts AUTO_INCREMENT = 0; > 새롭게 초기화 추가해줘야, 다시 글 넣을 때, 11 로 되지 않음. 
                        // [id] 에서 [ ] 이걸 쓰는 이유는? 쿼리문에서 변수 받기? ❓❓❓ 

                        // 여기 쿼리문 해석을 못 하겠어 😥😥😥😥😥 
                        // 여기 쿼리문으로 인해, id 삭제하면, 재정렬, 되어야 함. 

                    console.log("게시글 삭제 완료");

                } catch (error) {
                    console.log(error)
                    console.log("게시글 삭제 하려 했는데 error")
                    
                }
            }

    }


// 🔷 만든 메소드가 정상작동하는지 확인

    // 1. 테이블 없으면 생성되나? 
        // posts.initTable();

    // 2. 글 조회해보기
        posts.viewPostAll();

    // 3. id 선택했을 때, '글 하나' 조회 하기 
        // posts.selectPosts(2)

    // 4. 글 추가 메서드 
        // posts.insert("18", "21아이모지는안되나2");

    // 5. 글 수정 메소드 
        // posts.update(3, '수정3' , '수정콘텐츠3')

    // 6. 글 삭제 메소드 
        posts.delete(3)

// 🔷 밖으로 빼기 
    // module.exports = posts