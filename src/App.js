
import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Lifecycle from "./Lifecycle";
import OptimizeTest from "./OptimizeTest";
// use 키워드를 사용하는 것들은 무조건 import 가 되어 있어야 한다.
//https://jsonplaceholder.typicode.com/comments
// const dummyList = [
//     {
//         id:1,                                   // 자식 컴포넌트가 key prop 을 받아야 한다. 고유 키가 필요하다
//         author:"조성주",                          // 우리는 고유의 id 를 만들어 두어서 괜찮다 "고유 식별자 필요함"
//         content: "안녕 ",
//         emotion:2,
//         created_date: new Date().getTime(),   // new Date() 괄호 안에 아무것도 안넣으면 현재 시간이 기준으로 반환을 해준다.
//                                                 //getTime() 은 숫자를 반환하는 메서드 시간을 받아서 ms 반환을 해주는 메서드 이다
//     },
//     {   id:2,
//         author:"이윤영",
//         content: "술 먹음 ",
//         emotion:4,
//         created_date: new Date().getTime(),
//     },
//     {
//         id:3,
//         author:"이영의",
//         content: "나는 꼬질이 ",
//         emotion:5,
//         created_date: new Date().getTime(),
//     },
//     {   id:4,
//         author:"변동환",
//         content: "하이 ",
//         emotion:3,
//         created_date: new Date().getTime(),
//     },
//
// ]

function App(factory, deps) {

    const [data,setData] = useState([]) // 일기 데이터를 저장을 할것이기 때문에 빈 배열로 초기 값을 만들어 준다. -일기가 없는 상태로 출발-
                                                            // App 컴포넌트가 처음 마운트 될때 스테이트의 값은 빈 배열 그 순간의  getDiaryAnalysis 함수를 호출이 되고
                                                            // 그 안에 값은 모두 0 으로 세팅이 된다.

    const dataId = useRef(0)            //  래퍼런스로 0으로 가리키게 한다.

    const getData = async ()=>{                                         // getData 성공하고 그리고
        const res = await fetch('https://jsonplaceholder.typicode.com/comments'
        ).then((res) => res.json());

        const initData = res.slice(0, 20).map((it)=>{
            return{
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5)+1, //Math.random() * 5 : 0 ~ 4 의 난수가 생김 반환은 실수로 반환을 한다.
                                                            //그래서 Math.floor 는 소수점을 버려주는 즉 정수를 반환을 해주는 기능을한다.
                                                        // 0~4 까지 밖에 반환이 안되기 때문에 +1 을 하여 1~5 까지 반환이 되게 해주는것이다.
                created_date:new Date().getTime(),      // 현재 시간을 반환을 받는다.
                id : dataId.current++,                  // useRef(0) 로 0을 가리키게 해서 +1 을 하는 형식으로 id 를 생성을한다.
            };
        });

        setData(initData);                          // 데이터를 변경을 해주고 porp 으로 내려준다
                                                    // setData 가 이루어 지면서  데이터가 한번 바뀐다.
                                                    // 이 안에 있는 모든 함수들이 재생성이 일어나게 된다.
                                                    // 코드가 다시 수행이 되고 그리고 나서 getDiaryAnalysis 다시 호출이 된다. 리랜더가 이루어 진다는 것은 App 컴포넌트가 다시 호출이 되는 것이다.
                                                    // 그러면 getDiaryAnalysis () 함수가 다시 호출이 된다는 소리이다.  함수형 컴포넌트를 만들었다고 해서 자바스크립트가 아닌거는 아니다.
                                                    // 결론적으로 같은 함수이기 때문에 App 컴포넌트 // App 함수가 return JSX 문법의 html 요소들은 이 DOM 요소들은 화면에 반영이 될 뿐 이
                                                    // 자바스크립트 함수가 호출이 되고 반환하는 건 똑같다. 그리고 App 컴포넌트가 리랜더가 일어난다.
                                                    // 리랜더가 일어난다면 getDiaryAnalysis 함수를 호출하는 라인이 다시 재실행이 된다.
                                                    // 함수가 두번 동작을 했다는 것을 알 수있다.
                                                    // 그리고 그냥 수정을 하는 것은 의미가 없다. 이유는 감정점수가 변할 수 없기 때문에 기분좋은 일기의 개수도 변할 수 없다.

    };

    useEffect(() => {

        getData();      // mount 될때 api 를 호출
    }, []);             // 일기 데이터 기초로 사용을 할것이다.
                        // body 는 일기 데이터의 일기 본문으로 쓰일거고 email 은 작성자로 쓸것이다.



    const onCreate = useCallback((author,content,emotion)=>{
        //useCallback 사용
        // 일기 데이터를 추가를 할 수있는 함수이다.
        // author/content/emotion 을 받아서 data 를 업데이트 시키는 setData 를 이용해서 onCreate 함수를 작성을 한다.
        // 에디터에서 받은 데이터를 규격에 맞춰서 넣고 그리고 setDate 로 내려주면
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id : dataId.current
        }
        dataId.current += 1;                            // id 를 +1을 해주고
        setData((data)=>[newItem,...data]);              // 스프레트 연산자로 새로운 Item 을 먼저 그리고 기존에 있는 data 를 붙여 주기 위해서 스프레드 연산자를 사용함
                                                        // 받은 데이터를 기존 데이터 앞에 넣어 준다. 그리고 이 데이터를 List 에게 내려준다.
    },[]);  // 빈배열을 사용을 한 이유는 마운트 됐을 한번만 만들고 그 다음 부터는 첫번째 만들었던 함수를 그래도 재사용할 수 있도록 그렇게 만들었다.
                    // 빈배열일 경우에는 일기를 추가를 하게 되면 20개가 다 사라지게 된다 이유는 state 가 빈 배열이었기 때문에 그렇다
                    // 함수는 컴포넌트가 재생성 될때 다시 생성되는 이유가 있습니다.
                    // 현재의 state 값을 참조 할 수 있어야 한다.   그런데 onCreate 함수는 콜백안에 갇혀서 의존성 배열을 빈 배열로 전달했기 때문에
    // 이 onCreate 함수가 알고 있는 데이터의 값은 그대도 빈 배열입니다. 그래서 빈 배열에 new 아이템을 추가해서 지금 딱 하나의 아이켐만 남게 된 상황이다.
    // 현재 data 를 넣어 버리면 onCreate 는 재생성이 되어버린다. 우리가 원하는 결과는 아니다. 우리는 함수가 재생성 되지 않으면서 최신값을 참조를 할 수 있어야 한다.
    // 이 싱태로 작동을하게 되면 정말 이상한 작동을 하게 된다.
    // 그래서 함수형 업데이트를 사용을 해야한다.
    // 함수형 업데이트란 ?
    // setData () 에는 값을 전달해야 한다 했다. 그리고 그 값이 새로운 state의 값으로 바뀐다 라고 말했다. 하지만 여기다가 함수를 전달을 해도 된다.
    // set 에 함수를 전달을 하는것을 함수형 업데이트라고 한다.
    // 이렇게 되면 우리가 의존성 배열을 비울수 있고 항상 최신의 state 를 인자를 통해서 참고할 수 있게 되면서 우리가 의존성배열을 비울수 있게 되면서 리랜더는 안일어난다.
    // 새로고침을 하면 리랜더가 두 번씩 일어났지만 함수형 업데이트를 사용을 해서 재생성을 방지하 였고 랜더도 한번만 일어났다

    const onRemove = useCallback((targetId)=>{
                                            //useCallback 사용
                                            // onDelete 가 item 에서 호출이 되면 받은 매개값이 들어가면서
                                            // 기존 data 를 filter 를 한다  it.id 와 전달 받은 매개값을 제외를 한 값이 newDiaryList 에 들어가고
        setData(data=> data.filter((it)=> it.id !== targetId));  // setData 를 호출을 해서  newDiaryList 내려주면 값이 갱신이 된다. 그리고 그 값을 List 에게 내려준다.
    },[]);
    const onEdit = useCallback((targetId,newContent)=>{
                //useCallback 사용
                 // 함수형 업데이트 사용
                // 수정을 하는 함수이다. setData 를 통해서 어떤 값을 전달을 할 것이다.
                //특정 일기 데이터를 수정하는 함수가 될것이다. targetId 매개 변수로 바은 이 아이디를 갖는 일기 데이터를 배열에서 수정할 거기 때문에 우리가
                // 이 원본 데이터 배열에 map이라는 내장함수를 이용을 한거다. map 이라는 내장함수를 이용해서 모든 요소를 순회하면서 새로운 배열을 만들어서
                // setData 에게 전달하게 됩니다. 새로운 배열은 수정이 완료된 배열이 되어야 하고 그 배열을 전달을 해야한다.
                // setData를 통해서 수정된 배열이 데이터에 반영이 될 테니까 어떻게 수정을 하는거냐면 it.id 모든 요소에 지금 현재 너가 수정 대상이라면 이런 식으로
                // content 를 교체 해줄거고 수정 대상이 아니라면 원래 있던 그냥 데이터를 다시 리턴을 해 줄 겁니다.
                //targetId 와 일치하는 요소를 가진 그 객체의 값은 content 가 newContent 로 바뀌게 될것이다. 그렇지 않은 객체의 값은 원본 값을 지키게 되겠죠
                // 자 그렇게 onEdit 수정함수를 만들어 줬습니다.
        setData((data)=>  // 함수형 업데이트 사용
            data.map((it)=>it.id === targetId ? {...it , content: newContent} : it
            )
        );
    },[]);

    const getDiaryAnalysis = useMemo(       // useMemo 사용법은 우리가 Memoization 하고 싶은 함수를 감싸면 된다. 결론적으로 getDiaryAnalysis 함수는
                                                    // useMemo 함수를 호출한 결과 값처럼 되었다.  useMemo 함수 안에 콜백함수로 우리가 원래 getDiaryAnalysis 함수가 수행하는 그 기능을 전달한 그런 꼴이 됐다.
                                                    // useMemo 함수는 첫 번째 인자로 콜백함수를 받아서 이 콜백함수가 리턴하는 이 값, 그러니깐 이 연산을 최적화할 수 있도록 도와주는 그런 기능이다.
        () =>{
        // console.log("일기 분석 시작");

        const goodCount = data.filter((it) => it.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = (goodCount / data.length) * 100;
        return {goodCount,badCount, goodRatio};  // 함수 반환을 객체로 한다.
                                                // 리엑트에서 이렇게 return 을 가지고 있는 함수를 Memoization 을 해서 이런 연산들을 최적화하기 위해서는 useMemo 라는 함수를 사용을 하면 된다.
    },[data.length]                                // useMemo 함수는 두 번째 인자로 배열을 전달해야 한다. uesEffect 의 두 번째 인자 배열과 똑같은 것이다.
                                                            // data.length 의 값이 변하는 순간에 콜백함수를 다시 수행한다. 아무리 getDiaryAnalysis 함수를 호출을 한다고 해도
                                                    // data.length 값이 변하지 않으면 그냥 같은 리턴을 계산하지 않고 반환을 한다는 뜻이다.
                                                    // useMemo 를 사용하게 되면 getDiaryAnalysis 더 이상 함수가 아니다 그냥 콜백함수가 리턴하는 값을 받게 된다. 그래서 더이상 함수가 아니다
                                                    // 그래서 함수가 아닌 값을 사용이 되어야 한다.
                                                    // 배열의 길이 변하지 않는 이상 작동을 하지 않는다.
    );

    const {goodCount,badCount,goodRatio}= getDiaryAnalysis; // 위 코드를 보면 반환을 객체로 하기 때문에 여기 또한 함수를 객체로 반환을 할 것이다.

    return (
        <div className="App">
            {/*<OptimizeTest/>  /!* 컴포넌트 재사용 실습 용도로 사용을 할 것이다. *!/*/}
            {/*<Lifecycle/>*/}
            <DiaryEditor onCreate={onCreate}/>
            {/*onCreate 를 Editor 에게 내려준다.  */}
            <div> 전체 일기 : {data.length}</div>
            <div> 기분 좋은 일기 개수 : {goodCount}</div>
            <div> 기분이 나쁜 개수 : {badCount}</div>
            <div> 기분이 좋은 비율 : {goodRatio}</div>
            <DiaryList onEdit={onEdit} onRemove={onRemove} dairyList={data}/>
            {/*dairyList={data} 중에 data 로 내려 받는 순간 리스트의 일기가 삭제가 된다.*/}
            {/*List 에게는 현재 데이터를 내려주기만 하면 된다. 데이터가 변경이 되면 전부 알아서 변경이 된다.*/}
            {/*data State 는 List 로 사용이 되기 때문에 prop 내려주면 된다. */}
            {/*prop 을 1차로 DiaryList 로 받는다  */}
        </div>
    );
}

export default App;

// 이번에는 컴포넌트 바깥으로 분리해버리는 기능에 대해서 알아보록 하겠다. useReducer 를 이용을 할 것이다.
// useReducer 은 코드를 가볍게 만들어 준다는 기능을 가지고 있다.



