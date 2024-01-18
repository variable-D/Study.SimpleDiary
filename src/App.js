
import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useEffect, useRef, useState} from "react";
import Lifecycle from "./Lifecycle";
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

function App() {

    const [data,setData] = useState([]) // 일기 데이터를 저장을 할것이기 때문에 빈 배열로 초기 값을 만들어 준다. -일기가 없는 상태로 출발-

    const dataId = useRef(0)            //  래퍼런스로 0으로 가리키게 한다.

    const getData = async ()=>{
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
    };

    useEffect(() => {

        getData();      // mount 될때 api 를 호출
    }, []);             // 일기 데이터 기초로 사용을 할것이다.
                        // body 는 일기 데이터의 일기 본문으로 쓰일거고 email 은 작성자로 쓸것이다.


    const onCreate = (author,content,emotion)=>{   // 일기 데이터를 추가를 할 수있는 함수이다.
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
        setData( [newItem,...data]);              // 스프레트 연산자로 새로운 Item 을 먼저 그리고 기존에 있는 data 를 붙여 주기 위해서 스프레드 연산자를 사용함
                                                        // 받은 데이터를 기존 데이터 앞에 넣어 준다. 그리고 이 데이터를 List 에게 내려준다.
    }

    const onRemove = (targetId)=>{                      // onDelete 가 item 에서 호출이 되면 받은 매개값이 들어가면서
                                            // 기존 data 를 filter 를 한다  it.id 와 전달 받은 매개값을 제외를 한 값이 newDiaryList 에 들어가고
        const newDiaryList = data.filter((it)=> it.id !== targetId);
        console.log(newDiaryList);
        setData(newDiaryList);  // setData 를 호출을 해서  newDiaryList 내려주면 값이 갱신이 된다. 그리고 그 값을 List 에게 내려준다.
    }
    const onEdit = (targetId,newContent)=>{   // 수정을 하는 함수이다. setData 를 통해서 어떤 값을 전달을 할 것이다.
                //특정 일기 데이터를 수정하는 함수가 될것이다. targetId 매개 변수로 바은 이 아이디를 갖는 일기 데이터를 배열에서 수정할 거기 때문에 우리가
                // 이 원본 데이터 배열에 map이라는 내장함수를 이용을 한거다. map 이라는 내장함수를 이용해서 모든 요소를 순회하면서 새로운 배열을 만들어서
                // setData 에게 전달하게 됩니다. 새로운 배열은 수정이 완료된 배열이 되어야 하고 그 배열을 전달을 해야한다.
                // setData를 통해서 수정된 배열이 데이터에 반영이 될 테니까 어떻게 수정을 하는거냐면 it.id 모든 요소에 지금 현재 너가 수정 대상이라면 이런 식으로
                // content 를 교체 해줄거고 수정 대상이 아니라면 원래 있던 그냥 데이터를 다시 리턴을 해 줄 겁니다.
                //targetId 와 일치하는 요소를 가진 그 객체의 값은 content 가 newContent 로 바뀌게 될것이다. 그렇지 않은 객체의 값은 원본 값을 지키게 되겠죠
                // 자 그렇게 onEdit 수정함수를 만들어 줬습니다.

        setData(
            data.map((it)=>it.id === targetId ? {...it , content: newContent} : it
            )
        );
    };
    return (
        <div className="App">
            {/*<Lifecycle/>*/}
            <DiaryEditor onCreate={onCreate}/>
            {/*onCreate 를 Editor 에게 내려준다.  */}
            <DiaryList onEdit={onEdit} onRemove={onRemove} dairyList={data}/>
            {/*dairyList={data} 중에 data 로 내려 받는 순간 리스트의 일기가 삭제가 된다.*/}
            {/*List 에게는 현재 데이터를 내려주기만 하면 된다. 데이터가 변경이 되면 전부 알아서 변경이 된다.*/}
            {/*data State 는 List 로 사용이 되기 때문에 prop 내려주면 된다. */}
            {/*prop 을 1차로 DiaryList 로 받는다  */}
        </div>
    );
}

export default App;
