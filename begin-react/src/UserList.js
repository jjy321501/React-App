import React, { useEffect } from 'react';

function User({ user ,onRemove,onToggle }) {

    useEffect(() => {
        console.log('user 값이 설정됨');
        console.log(user);
        return () => {
            console.log('user 가 바뀌기 전');
            console.log(user);
        };
    },[user]);

    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(user.id)}
            >
                {user.username}
            </b>
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
}

function UserList({users,onRemove,onToggle}){
    
    return (
        <div>
            {/* <User user={users[0]}/>
            <User user={users[1]}/>
            <User user={users[2]}/> */}
            {users.map(user => ( //자바스크립트 배열의 내장함수 map 을 사용
                <User 
                    user={user} 
                    key={user.id} 
                    onRemove={onRemove} 
                    onToggle={onToggle}
                />//react에서 배열을 렌더링시 key props를 설정해야함(없다면 index)
            ))}
        </div>
    );
}
export default UserList;