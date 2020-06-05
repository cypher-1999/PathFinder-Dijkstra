import React, { Component } from 'react';


import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {
            col,
            isFinish,
            isStart,
            isWall,
            onmousedown,
            onmouseenter,
            onmouseup,
            onmouseleave,
            onkeydown,
            onkeyup,
            isWeight,
            isVisited,
            row,
        } = this.props;
        const extraClassName = isFinish
        ? 'node-finish'
        :isStart
        ? 'node-start'
        :isVisited
        ? 'node-visited'
        : isWall
        ? 'node-wall'
        : isWeight
        ?'node-weight'
        :''
       

        return <div tabIndex="1" id={`node-${row}-${col}`} className={`node ${extraClassName}` }
            onMouseDown={() => onmousedown(row,col)}
            onMouseUp  = {() => onmouseup(row,col)}
            onMouseEnter={() => onmouseenter(row,col)}
            onMouseLeave={() => onmouseleave(row,col)}  
            onKeyDown = {() => onkeydown(row,col)}
            onKeyUp = {()=>onkeyup()}
                
                >

        </div> ;
    }
} 

export const DEFAULT_NODE = {
    row:0,
    col:0,
}; 