import {useRef, useState} from "react";

const DiaryItem = ({onEdit,onRemove,author,content,emotion,created_date,id})=>{
    // 배열의 Item 을 받고 그리고 기능을 구현을 한다.
    //  {/*prop 은 직접 하나하나 받아 와야 한다. */}
    const localContentInput = useRef();  // 래퍼런스 객체 생성하는 코드
    const [isEdit,setIsEdit]= useState(false);   // 수정창을 열고 닫아 주는 역활을 하는 state
    const [localContent,setLocalContent] = useState(content)        // 수정창의 입력 부분을 담당을 한다.
    const toggleIsEdit = () => setIsEdit(!isEdit);  // 수정창을 닫아주는 역할

    const handleRemove = ()=>{
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {  // window.confirm 윈도우 창이 문구와 함께 나온다.
            onRemove(id); // 삭제 버튼을 누르면 window.confirm 실행을 해서 확인을 누르는 순간 onDelete 호출을 하고
        }                  // 그리고 id 를 매개변수를 통해 넘겨준다. App.js 로
    }
    const handleQuitEdit = ()=>{
        setIsEdit(false);  // setIsEdit 이 false 되는 순간 수정창은 꺼진다.
        setLocalContent(content)    // 꺼지면 content 일기 구문을 setLocalContent 에게 넣어주면 글자를 더 넣어도 훼손 되는것이 없이 현재 localContent 값이 원래의 content 로 변하게 된다.
                                    // 다시 열어서 확인을 하면 원래의 content 로 변했다는걸 알 수있다.
    }
    const handleEdit = () =>{
        if (localContent.length < 5) {              // 5 글자 이하일 경우에는 focus 를 실행을 해준다.
            localContentInput.current.focus();
            return
        }
        if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)){   // 창이 나와 수정을 하겟냐고 물어본다
            onEdit(id, localContent);                       // onEdit 호출하는 한다. 그리고 id 와 받은 content 를 넘겨 준다.
            toggleIsEdit();                                  // 수정 창을 닫아주는 함수이다.
        }
    }
    return (
        <div className="DiaryItem">
            <div className="info">
                {/*아이템에서 하나 하나 출력을 해준다.*/}
                <span>작성자 : {author} | 감정점수 : {emotion}</span><br/>
                {/*prop 은 직접 하나하나 받아 와야 한다. */}
                <span className="date">{new Date(created_date).toLocaleString()}</span>
                {/*new Date(created_date).toLocaleString()  new Date 객체를 생성한 이유는 toLocaleString() 메서드 사용하기 위해*/}
            </div>
            <div className="content">{isEdit ? <> {/* content 의 내용을 가져오기 위해 value 에 적어준다.*/}
                <textarea ref={localContentInput} value={localContent} onChange={(e) => setLocalContent(e.target.value)}/> </> : <>{content}</>}
            </div>          {/*래퍼랜스 객체로 가리켜준다. focus 사용을 위해서  */}
                                                        {/*그리고 위 코드는 궁극적으로는 삼항연산자를 사용을 하여 참이면 수정된 값으로 변경 거짓이면 기존 내용으로 보여준다.*/}

            {isEdit ? (<>                                                   {/*삼항 연산자를 사용을해서 isEdit 이 참이면 수정 취소/완료 버튼을 보여주고 */}
                <button onClick={handleQuitEdit}>수정 취소</button>         {/*아니면 삭제/수정 버튼을 보여준다.*/}
                <button onClick={handleEdit} >수정 완료</button>
            </>):( <>
                <button onClick={handleRemove}>삭제</button>
                <button onClick={toggleIsEdit}>수정</button>
            </>)}


        </div>
    );
}
export default DiaryItem;


// new Date(created_date).toLocaleString() <-- 이렇게 작성을 하면 Date 객체는 현재 시간을 기준으로 () 소괄호 안에
// 아무것도 없으면 하지만 그 안에 ms 넣어준다. 그리고 Date 객체를 왜 또 생성을 했냐면 Date 객체에는
// toLocaleString() 있다 이 메서드를 사용을 하면 인간이 알아보기 쉽게 시간을 반환을 해준다.