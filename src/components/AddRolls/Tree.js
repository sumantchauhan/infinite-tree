import React from 'react';

const Tree = (props) => {
  const {title} = props.member;
  
  return(
  <div className="addrollsname" onClick={()=> props.handelClick(props.member)}>
    <span>{title}</span>
  </div>
  )
}

export default Tree;