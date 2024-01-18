import DiaryEditor from "./DiaryEditor";
import DiaryItem from "./DiaryItem";

const DiaryList = ({onEdit,onRemove,dairyList})=>{   // onRemove(onEdit) 를 사용을 하지는 않지만 어쩔수 없이 Item 에게 넘겨주려고 작성된 것이다.
                                              // 이것을 Props 드릴링이라 한다.

    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{dairyList.length}개의 일기가 있습니다.</h4>
            <div>
                {dairyList.map((it)=>(  // map 을 통해 it 으로 넘겨주고
                    <div key={it.id}>
                        {/*넘겨 받은 id를 넣어 준다 */}
                        {/*그리고 props 로 아이템으로 넘겨주면 */}
                        <DiaryItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit}/>
                        {/*// 우리는 리스트를 수정/삭제까지 다 해야 하는데 만약 DiaryList 에 모든 것을 만드는 것은 매우 좋지 않고 그렇게 되면 에러 발생 확률이 높다.배열의 데이터를 사용해서 랜더하는 Item 을 별도의 컴포넌트로 분할을 하는것이 좋은 방법이고 그렇게 할 것이다.

*/}
                        {/*<div>작성자 : {it.author}</div>*/}
                        {/*<div>일기 : {it.content}</div>*/}
                        {/*<div>감정 : {it.emotion}</div>*/}
                        {/*<div>작성 시간 : {it.created_date}</div>*/}
                    </div>
                ))}
            </div>
        </div>

    );
}
DiaryList.defaultProps={
    dairyList:[]
}

export default DiaryList;

// .map() 함수가 이 배열의 각 요소에 대해 콜백 함수를 실행하여 새로운 배열을 생성합니다.
// 이 콜백 함수에서 it 는 현재 배열 요소를 참조하는 매개변수입니다. 이 경우, 함수는 단순히 요소에 대한 정보를 사용하지 않고 괄호 안의 구조(<div>일기 아이템</div>)를 반환합니다.
// 따라서 이 코드는 dairyList 배열에 있는 각 요소마다 <div>일기 아이템</div>을 생성하고 이것들을 그룹화한 배열을 반환합니다.

// 매개 변수 it 에는 배열의 요소 하나 하나가 담겨 있다.

// 만약에 props 가 undefined 가 넘어 왔다면 문제가 발생한다. 문제 발생읠 방지 하기 위해서

// 자식 컴포넌트는 반드시 key 값이 필요하다 그래서 고유 식별자 같은것이 필요하다 현재는 배열 내에 객체 마다 id 값을 만들어서
// 상관없다 그래서 <div key={it.id}> 이렇게 작성을 해주면 그만이다.
// 하지만 만약에 저런 id 값이 없다면 이것을 대체 할수 있는 방법이 존재한다.
//   인덱스를 사용을 하면 된다. 인덱스를 사용을 하면 문제 해결을 할 수있다.
// 하지만 만약에 배열의 순서가 바뀐다면? 그러면 문제가 생긴다. 그래서 결과적으로 id를 사용을 하는것이 매우 좋다.
// 밑에 코드는 인덱스를 넣어준 코드이다.
//                 {dairyList.map((it,idx)=>(
//                     <div key={idx}>

// 우리는 리스트를 수정/삭제까지 다 해야 하는데 만약 DiaryList 에 모든 것을 만드는 것은 매주 좋지 않고 그렇게 되면 에러 발생 확률이 높다.
// 배열의 데이터를 사용해서 랜더하는 아이템을 별도의 컴포넌트로 분할을 하는것이 좋은 방법이고 그렇게 할 것이다.