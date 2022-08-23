# React To-do List
-----

## 개요
- 리액트로 구현한 SPA 투두 리스트
- 2021.09 ~ 2021.10

## 개발환경
- HTML / CSS / Vanila JS / React

## 디렉토리 트리
```
📦mashup-todolist
┣ 📂public
┃ ┣ 📜favicon.ico
┃ ┣ 📜index.html
┃ ┣ 📜logo192.png
┃ ┣ 📜logo512.png
┃ ┣ 📜manifest.json
┃ ┗ 📜robots.txt
┣ 📂src
┃ ┣ 📂components
┃ ┃ ┣ 📜TodoCreate.js
┃ ┃ ┣ 📜TodoHead.js
┃ ┃ ┣ 📜TodoItem.js
┃ ┃ ┣ 📜TodoList.js
┃ ┃ ┗ 📜TodoTemplate.js
┃ ┣ 📜App.css
┃ ┣ 📜App.js
┃ ┣ 📜App.test.js
┃ ┣ 📜TodoContext.js
┃ ┣ 📜TodoProvider.js
┃ ┣ 📜index.css
┃ ┣ 📜index.js
┃ ┣ 📜logo.svg
┃ ┣ 📜reportWebVitals.js
┃ ┗ 📜setupTests.js
┣ 📜.gitignore
┣ 📜README.md
┣ 📜package.json
┗ 📜yarn.lock
```

## 목표 기능 
- 할 일 추가를 할 수 있고, 할 일 리스트를 출력한다.
- 할 일 갯수를 상단에 표기 후, 완료된 일 최신 상태 리렌더링 
- 작성된 할 일 리스트를 삭제한다.

<br/> 

## 주요 코드
### App.js
```js
const GlobalStyle = createGlobalStyle`
    body {
        background: #e9ecef;
    }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;

```

### 상단 ( src/components/TodoHead.js )
```js
//Todo Head 상단의 날짜와 요일 할일갯수를 표시할 컴포넌트
function TodoHead() {
    const todos = useTodoState();
    const undoneTasks = todos.filter(todo => !todo.done);

    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long'});
    
    return (
        <TodoHeadBlock>
            <h1>{dateString}</h1>
            <div className="day">{dayName}</div>
            <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;
```
- ContextAPI를 사용하여 state 값을 전역상태 관리를 할 수 있다.
- undoneTakses에 filter함수를 사용하여 todos 중에 체크되지 않은 리스트를 반환한 배열의 길이로 남은 할 일 갯수를 출력하는데 사용했다.

### 리스트 ( src/components/TodoList.js )
```js
//할 일이 들어있는 todos 배열의 내장함수 map을 이용하여 TodoItem 컴포넌트 렌더링
function  TodoList() {
    const todos = useTodoState();

    return (
        <TodoListBlock>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}
                />
            ))}
        </TodoListBlock>
    );
}

export default TodoList;
```
- ContextAPI를 사용하여 state 값을 전역상태 관리를 할 수 있다.
- map 함수를 사용해서 반환된 배열의 속성값이 부여된 TodoItem 컴포넌트를 렌더링한다. 


### 항목 ( src/components/TodoItem.js )
```js
//각 할 일에 대한 정보를 렌더링해주는 컴포넌트 
function TodoItem({ id, done, text }) {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({ type: 'TOGGLE', id});
    const onRemove = () => dispatch({ type: 'REMOVE', id});
    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>
                {done && <MdDone/>}
            </CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete/>
            </Remove>
        </TodoItemBlock>
    );
}

export default React.memo(TodoItem);
```
- ContextAPI를 사용하여 dispatch 함수를 전역적으로 사용 할 수 있다.

### 추가 토글 ( src/components/TodoCreate.js )
```js
//할 일을 추가 할 때 작동하는 토글 버튼 컴포넌트
function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open);
  const onChange = e => setValue(e.target.value);
  const onSubmit = e => {
    e.preventDefault(); // 새로고침 방지
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        done: false
      }
    });
    setValue('');
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후, Enter 를 누르세요"
              onChange={onChange}
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);
```
- open 값이 true 일 때 나타나는 토글형 입력폼 컴포넌트를 구현할 수 있다.
- contextAPI를 활용하여 dispatch, nexdId  전역적으로 사용할 수 있다.

### Context ( src/TodoContext.js )
```js
const initialTodos = [];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(1);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}
export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}
```
- Context를 생성해서 Provider로 자식컴포넌트를 감싸서 값을 전달해준다.
- 자주 사용하는 코드의 반복을 줄이고 재사용성을 높힌다.

## 주요 실행 화면

