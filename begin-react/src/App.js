import React,{useRef, useReducer, useMemo, useCallback} from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import './App.css';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';
import produce from 'immer';

/*
  useState => 컴포넌트에서 관리하는 값이 하나거나, 단순한 문자 또는 Boolean 값

  useReducer => 컴포넌트에서 관리하는 값이 여러 개가 되거나 상태의 구조가 복잡해지는 경우 
*/


//active 값이 true 인 사용자의 수를 세어서 화면에 렌더링
function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users:[
    {
      id:1,
        username:'velopert',
        email:'public.velopert@gmail.com',
        active:true
    },
    {
        id:2,
        username:'tester',
        email:'tester@example.com',
        active:false
    },
    {
        id:3,
        username:'liz',
        email:'liz@example.com',
        active:false
    }
  ]
};

function reducer(state, action){
  switch (action.type){
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user);
      });
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내준다.
export const UserDispatch = React.createContext(null);

function App() {
  /* const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  } */
  const [{username, email}, onChange, onReset] = useInputs({
    username:'',
    email:''
  });
  const [state , dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const {users} = state;

  
  /* const onChange = useCallback(e => {
    const {name, value} = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  },[]); */

  //함수형 업데이트 (리렌더링 최적화)
  /* const onCreate = useCallback(() => { 
    dispatch({
      type:'CREATE_USER',
      user:{
        id: nextId.current,
        username,
        email
      }
    });
   */  //Spread 방식
    /* setUsers([...users, user]); */
    //Concat 방식
    /* setUsers(users.concat(user));

    setInputs({
      username:'',
      email:''
    }); */
    /* nextId.current += 1;
  },[username, email,onReset]); */

  const count = useMemo(() => countActiveUsers(users),[users]);
  return (//쓰이는 곳에서 값을 정한다 => props(부모)
    <>
      {/* 주석은 화면에 보이지 않습니다 */}
      /* 중괄호로 감싸지 않으면 화면에 보입니다 */
      <Wrapper>
        <Hello name="react" color="red" isSpecial={true}/*{true} 를 생략하면 true 가 default 값*//>
        <Hello color="pink"/>
      </Wrapper>
      <Counter/>
      <InputSample/>
      <UserDispatch.Provider value={dispatch}>
      <CreateUser/>
      <UserList users={users}/>
     {/*  <div style={style}>{name}</div>
      <div className="gray-box"></div> */}
      <div>활성 사용자 수 : {count}</div>
      </UserDispatch.Provider>
    </>
  );
}

export default App;