import React from 'react';
//이번 컴포넌트에서는 상태관리를 App에서 하게하고, input의 값, 이벤트로 등록할 함수들을 props로 넘겨받아 사용
function CreateUser ({username, email, onChange, onCreate}){
    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}                
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    )
}

export default CreateUser;