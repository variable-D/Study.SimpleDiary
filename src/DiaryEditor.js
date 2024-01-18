import React,  {useRef, useState} from "react";

const DiaryEditor = ({onCreate}) => {
    const [state, setState] = useState({
        author:"",
        content:"",
        emotion:1,
    });

    const authorInput = useRef();
    const contentInput = useRef();

    const handleChangeState = (e)=>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        if (state.author.length < 1) {
            authorInput.current.focus();
            // alert("작성자는 최소 1글자 이상 입력해주세요");
            // focus
            return;
        }
        if (state.content.length < 5) {
            contentInput.current.focus();
            // alert("일기 본문은 최소 5글자 이상 입력해주세요");
            // focus
            return;
        }
        onCreate(state.author,state.content,state.emotion);  // 여기서 조건이 참이 되어 author , content , emotion 을 받아서 App 컴포넌트로 매개변수를 통해 넘겨준다.
        alert(`저장 성공`);
        setState({
            author: "",
            content: "",
            emotion: 1,
        })                  // 이 코드는 작성을 하고 나서 저장까지 했지만 작성된 일기가 남아 있기 때문에
                            // 초기화 작업을 해주는 것이다.
    }
    return <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input
                ref={authorInput}
                name="author"
                value={state.author}
                placeholder={"작성자"}
                onChange={handleChangeState}
                required/>
        </div>
        <div>
            <textarea
                ref={contentInput}
                name="content"
                value={state.content}
                placeholder={"일기 내용"}
                onChange={handleChangeState}
                required/>
        </div>
        <div>
            오늘의 감정점수 :
            <select
                name="emotion"
                value={state.emotion}
                onChange={handleChangeState}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
    </div>;
}
export default DiaryEditor;

//{/"props 를 사용 author 상태를 변화를 시킨다 사용자가 입력에 따라"/}
// input 이 수정이 될려면 author 의 값이 바꿔줘야만 실시간으로 반영이 된다. 이 때 onChange 를 사용을 해야 한다.
// input 에 입력이 발생되면 input 은 이벤트가 발생했다고 생각을 한다. 그리고 이용하고자 하는 이벤트는 onChange event 인데
// onChange 는 값이 변경이 되었을 때 수행하는 이벤트이다.
// input 의 값이 바뀌었을때 onChange 라는 props 전달한 이 콜백함수를 수행을 한다. 라고 생각하면 된다.
// 값이 변경 될 때 마다 콜백함수가 실행이 된다. 지금 콘솔창에 출력이 되는 값은 우리가 onChange 이벤트에 전달한 콜백함수의 넘겨 받은
// 매개변수 e 의 값이다.
// onChange value 라는것을 이용을 하면 입력하고 있는 값을 콜백함수의 불러서 사용을 할 수있다.
//console.log(e.target.value); <-- 이런식으로 작성을 하고 값을 확인을 하면 현재 내가 무슨 키보트에 무슨 값을 입력을 하는지 알 수있다.
//setAuthor(e.target.value) <--- 이렇게 작성을 하게 되면 값이 변경이 될 때마다 값을 업데이트를 시켜줄수 있다.
// name="author" //  console.log(e.target.name); 이렇게 이름까지 초기화가 되어 있어서 출력을 하게 되면 이름까지도 출력을 할 수있게 된다.
// <textarea/> 사용을 하게 되면 창을 늘리고 줄이고 할 수있다 그리고 input 이랑 사용방법은 같다.
// 일기의 본문도 useState 를 사용을한다.
//    <textarea value={content} onChange={(e) =>{
//                 setContent(e.target.value);
//             }}/> 이렇게 사용을 하면 값이 변경 되면 콜백함수를 호출을 한다.

// input 과 textarea 는 이런식으로 State 이용 하는 방법이 동일하다 그리고 갖는 자료형 까지 같다
// 자료형 까지 같다면 굳이 두개의 자료형을 둘 필요가 없다 하나의 State 로 묶어 줄 수있다.
//   const [state, setState] = useState({
//         author:"",
//         content:"",
//     }) 이런식으로 State 를 합쳐줄수 있다. 그리고 props 를 작성을 할 때는 {state.author} , {state.content}
// 각각 필요한곳에 작성을 할 수있다.
// 그리고 input -> setState 는  setState({
//                     author: e.target.value,
//                     content: state.content,
//                 });
// textarea ->  setState({
//                     author: state.content,
//                     content: e.target.value,
//                 }); 값이 변하면 안되는 곳은 유지를 시키고 변해야 할 곳은 상태 변화를 시키면 된다.
//                 매번 객체 하나 하나 작성을 하기가 힘들기 때문에
//                  이때 변경을 할 값만 작성을 해주면 나머지는 위에다 ...(스프레드) 연산자를 이용해서 펼쳐줘버리면 된다.
// setState({
//                     ...state,
//                     author: e.target.value,
//                 });  이런식으로 변경될 값은 작성을해주고 그 외값은 변경 시킬 필요가 없기 때문에 스프레드 연산자를 활용하면 된다.
// 반드시 위에 펼져 줘야 한다. 그리고 변경될 값은 밑에 적어야 한다.
// 그리고 onChange 도 두개로 나뉘어 있다. 하지만 이것도 하나로 합칠수 있다.


//   const handleChangeState = (e)=>{
//         console.log(e.target.name);
//         console.log(e.target.value);
//
//         setState({
//             ...state,
//             [e.target.name]: e.target.value
//         });
//     } onChange 를 하나로 합치면 이렇게 된다.

// name="author" // name="content"  <-- 이렇게 각각 name 을 정해준다.
//    setState({
//             ...state,
//             [e.target.name]: e.target.value
//         });              이렇게 코드를 작성을 하면 [e.target.name] 여기에는 name 이 들어가고 e.target.value 변경을 하겠다 라는 뜻이다.

//----------------------------------------------------------------------------------------------------------------------------------------

// const handleSubmit = (e) => {
//         if (state.author.length < 1) {
//             alert("작성자는 최소 1글자 이상 입력해주세요");
//             return;
//         }
//         if (state.content.length < 5) {
//             alert("일기 본문은 최소 5글자 이상 입력해주세요");
//             return;
//         }
//         alert(`작성자: ${state.author} \n일기내용: ${state.content} \n감정점수: ${state.emotion} \n저장 성공`);
//     }
// 위 코드는 작성자 란에 한 글자 이상 작성이 되어야 하고 일기 본문 란에 5글자 이상 작성을 해야 일기 저장하기를 할 수있는 코드다
// 하지만 요즘 트랜디한 웹페이지는 alert 으로 작성을 하지 않는다 그래서 focus 를 작성을 해볼것이다. 그래야 좀더 트랜디 해진다.

// focus 를 사용을 하기 위해서 import React,  {useRef, useState} from "react";  <--- 에서 useRef 와 React 를 import 를 해야한다.
// MutableRefObject 의 기능은 html / DOM 요소를 접근 할 수있는 기능을 한다.
// authorInput.current.focus(); <--- 조건식이 참이 아니면 문제 있는 곳에 커서가  옮겨 간다.
// authorInput.current.focus(); 작동 원리
// 래퍼랜스 객체 / DOM 요소를 선택하는 useRef로 생성한 래퍼랜스 객체는 현재 가리키는 값을 current 라는 프로퍼티로 불러와서 사용을 할 수 있다.
// authorInput.current 는 지금은 authorInput 태그가 되는거고 authorInput 태그에 focus 라는 기능을 사용해서 가리키는 박스를 focus 하도록 만든것이다.\





