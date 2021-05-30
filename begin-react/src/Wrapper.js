import React from 'react';
//쓰임 당하는 곳에서 값을 정하는 것 => children
function Wrapper({children}){
    const style = {
        border: '2px solid black',
        padding: '16px',
    };
    return(
        <div style={style}>
            {children}
        </div>
    )
}

export default Wrapper;