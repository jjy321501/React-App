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
### 상단 ( TodoHead.js )
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

### 리스트 ( TodoList.js )
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

### 추가 토글 ( TodoItem.js )
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

## 주요 실행 화면

