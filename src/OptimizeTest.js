import React, {useEffect, useState} from "react";

// const Textview = React.memo( ({text})=>{ // React.memo 사용을 하면 진짜로 리랜더가 안일어난다
//     useEffect(() => {
//         console.log(`update :: text :  ${text}`);
//     },);
//     return (
//         <div>{text}</div>
//     );
// });
// const CountView = React.memo(({count})=>{
//     useEffect(() => {
//         console.log(`update :: count :  ${count}`);
//     },);
//     return(
//         <div>{count}</div>
//     )
// });

const CounterA = React.memo(({count}) =>{
    useEffect(()=> {
        console.log(`counter A update - count: ${count}`);
    },);
    return (
        <div>
            {count}
        </div>
    )
});

const CounterB = ({obj})=>{
    useEffect(() => {
        console.log(`counter B update - count: ${obj.count}`);
    },);
    return(
        <div>
            {obj.count}
        </div>
    )
};

const areEqual = (prevProps, nextProps) =>{     // 리엑트 비교함수로 작용을 한다. areEqual 함수의 판단에 따라 리랜더링                                                                                       을 할지 말지 정해진다.
    if (prevProps.obj.count === nextProps.obj.count){                   //React.memo 는 정상적으로 작동을 하지만 객체의 주소 값들이 달라서 리랜더가 발생을했다.
                                                                        // 그래서 조건문으로 얕은비교가  일어나지 않도록 count 값을 비교해서 같으면 랜더링을 일으키지마 라는 뜻이다.
        return true;
    } else {
        return false;
    }
    // return true;   이전 프롭스 현재 프롭스 같다  -> 리랜더링을 일으키지 않는다.
}                 // 이전 과 현재가 다르다 -> 리랜더링을 일으키라
const MemoizedCounterB = React.memo(CounterB, areEqual);            // 고착 컴포넌트다 areEqual true 면 랜더링이 일어나지 않는다.


//
// const CounterB = React.memo(({obj})=>{
//     useEffect(() => {
//         console.log(`counter B update - count: ${obj.count}`);                          // 객체는 얕은 비교를 하고 비교는 주소로 한다.
//     },);                                                                                // React.memo 는 정상적으로 작동을 했지만 State 가 객체라서 들어 있어서 버튼을 클릭을 하면 리랜더가 일어난다.
//     return(
//         <div>
//             {obj.count}
//         </div>
//     )
// });

const OptimizeTest = () =>{
    // const [count, setCount] = useState(1)
    // const [text, setText] = useState("");
    const [count, setCount] = useState(1)
    const [obj,setObj] = useState({
        count : 1,
    })

    return <div style={{padding: 50}}>
        <div>
            <h2>counter A</h2>
            <CounterA count={count}/>
            <button onClick={() => setCount(count)}>A BUTTON</button> {/*<---- 이렇게 작성을하면 버튼을 눌려고 count 는 아무런 변화가 생기지 않는다.*/}
        </div>
        <div>
            <h2>counter B</h2>
            <MemoizedCounterB obj={obj}/>
            <button onClick={() => setObj({
               count: obj.count
            })}>B BUTTON</button>                   {/*<---- 이렇게 작성을하면 버튼을 눌려고 obj 의 아무런 변화가 생기지 않는다.*/}
        </div>
        {/*<div>*/}
        {/*    <h2>count</h2>*/}
        {/*    <CountView count={count}/>*/}
        {/*    <button onClick={() => setCount(count + 1)}>+</button>*/}
        {/*    <button onClick={() => setCount(count - 1)}>-</button>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    <h2>text</h2>*/}
        {/*    <Textview text={text}/>*/}
        {/*    <input value={text} onChange={(e) => setText(e.target.value)}/>*/}
        {/*</div>*/}
    </div>
}

export default OptimizeTest;