// import React,{useState,useEffect} from "react";
// // 지금 까지는 하나의 파일에 하나의 컴포넌트만 만들었지만 이번에는 두개를 만들어 볼것이다.
// // 하지만 우리는 가독성 때문에 하나의 파일에 하나의 컴포넌트만 만들었다.
// const UnmountTest = ()=> {
//     useEffect(()=>{
//         console.log("Mount");      // 컴포넌트가 마우트 되는 순간을 제어하는 그런 useEffect 되는 거다.  버튼을 누르면 마운트가 된다.
//
//         return()=>{ // 언마운트를 시키는 방법은 콜백함수가 함수를 하나만 호출하기만 하면 된다.
//             // 언마운트(Unmount) 시점에 실행되게 됨
//             console.log("unmount!");
//
//         }
//     },[])
//
//     return(<div>
//         Unmount Testing Component
//     </div>
//     );
// }
//
// // isVisible 이 ture 일 때만 화면에 랜더링 되도록 할 것이다.
//
//
// const Lifecycle = () => {
//     const [isVisible, setIsVisible] = useState(false);
//
//     const toggle = () => setIsVisible(!isVisible);
//
//
//     // const [count,setCount] = useState(0); // count 에 사용될 State
//     // const [text, setText] = useState("");   // Input 에 사용될 State
//     //
//     // useEffect(() => {
//     //     console.log("Component mounted");
//     // }, []);   // 빈 배열일 경우 컴포넌트가 마운트 된 시점에만 console.log 를 출력을 한다. 리랜더가 발생을해도 useEffect 는 아무것도 안한다. 이유는
//     //                 // 빈 배열 이기 때문에이다.
//     //                 // 만약 마운트 시점에 뭔가를 하고 싶으면 useEffect 의 두번째 인자인 의존성 배열 빈 배열을 전달해주고 나서 그 다음으로 하고 싶은 일을 넣어 주면 된다.
//     //                 // 컴포넌트가 업데이트가 되는 시점은 State 변경 / Props 변경/ 부모 컴포넌트가 리렌더링이 되면 자기 자신도 리렌더링이 된다.
//     //                 // 리렌더링이 된다는 말은 컴포넌트가 업데이트가 된다는 말과 같은 말이다.
//     // useEffect(() => {   // 두번째 인자가 없으면 리렌더링이 되면 업데이트가 되고 그러는 동시에 콘솔창에 update 문구 출력이 된다.
//     //  console.log("update");
//     // });
//     //
//     // useEffect(() => {
//     //     console.log(`count is update : ${count}`);                      // count 가 5 이상 6이 되는 순간 조건이 참이 되어 1로 바뀐다
//     //     if (count > 5) {
//     //         alert("count가 5를 넘었습니다. 따라서 1로 초기화를 합니다.");
//     //         setCount(1);
//     //     }
//     // }, [count]);
//     // // useEffect 의 이런 성질을 잘 활용을 하면 감지해서 그 값이 변화하는 순간에만 이런 콜백함수를 수행시키게 바꿀 수가 있다.
//     // // 조건식 사용하여 위 성질을 활용을 잘 할 수있다.
//     // useEffect(() => {
//     //     console.log(`text is update : ${text}`);
//     // }, [text]);
//
//
//     return (
//         <div style={{padding: 20}}>
//             <button onClick={toggle}>ON/OFF</button>
//             {isVisible && <UnmountTest/>}  {/*단락 회로 평가를 이용을해서 앞에가 참이면 뒤에 컴포넌트가 랜더링이 되고 거짓이면 뒤꺼는 볼 필요가 없다.*/}
//         </div>
//     );
// };
//
// export default Lifecycle;