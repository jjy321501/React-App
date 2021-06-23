import React,{useRef, useReducer, useMemo, useCallback} from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
import './App.css';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

/*
  useState => 컴포넌트에서 관리하는 값이 하나거나, 단순한 문자 또는 boolean 값

  useReducer => 컴포넌트에서 관리하는 값이 여러개가 되거나 상태의 구조가 복잡해지는 경우 
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
    case 'CHANGE_INPUT':
      return{
        ...state,
        inputs:{
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs:initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return{
        ...state,
        users:state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user  
        )
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter( user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  /* const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  } */
  const [{username, email}, onChange, reset] = useInputs({
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
  const onCreate = useCallback(() => { 
    dispatch({
      type:'CREATE_USER',
      user:{
        id: nextId.current,
        username,
        email
      }
    });
    //Spread 방식
    /* setUsers([...users, user]); */
    //Concat 방식
    /* setUsers(users.concat(user));

    setInputs({
      username:'',
      email:''
    }); */
    nextId.current += 1;
  },[username, email]);
  
  //함수형 업데이트 (리렌더링 최적화)
  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  },[]);
  //함수형 업데이트 (리렌더링 최적화)
  const onRemove = useCallback(id => {
    dispatch({
      type:'REMOVE_USER',
      id
    });
  },[]);

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
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
     {/*  <div style={style}>{name}</div>
      <div className="gray-box"></div> */}
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;