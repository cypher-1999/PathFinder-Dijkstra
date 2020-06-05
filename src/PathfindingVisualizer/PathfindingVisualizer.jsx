import React,{Component} from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import './PathfindingVisualizer.css';
import { Jumbotron } from 'reactstrap';
var START_NODE_ROW = 15;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 35;
export default class PathfindingVisualizer extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed:false,
            keyIsPressed:false,
            forStartNode:false,
        };
    }
    componentDidMount(){
       /* const nodes = [];
        for( let row = 0; row<20 ; row++){
            const currentRow = []
            for(let col = 0; col<50; col++){
                const currentNode ={
                    col,
                    row,
                    isStart: row === START_NODE_ROW && col === START_NODE_COL,
                    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }

        this.setState(this.state.grid = nodes);*/
        const grid = getInitialGrid();
        this.setState({ grid });
    }

    /*animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder){
           for(let i =0 ; i< visitedNodesInOrder.length;i++){
               if (i === visitedNodesInOrder.length) {
                   setTimeout(() => {
                       this.animateShortestPath(nodesInShortestPathOrder);
                   }, 10 * i);
                   return;
               }
               const node = visitedNodesInOrder[i];
                node.isVisited =true;
                
               const newGrid = this.state.grid;
               newGrid[node.row][node.col] = node;
               this.setState(this.state.grid = newGrid); 
           }
    }*/

    handleKeyDown(row,col){
        this.setState({keyIsPressed:true});
        getNewGridWithWeightToggled(this.state.grid,row,col);
    }
    handleKeyUp(){
        this.setState({keyIsPressed:false});
    }
    handleMouseDown(row, col) {
       // if (!this.state.mouseIsPressed) return;
       if(row === START_NODE_ROW && col === START_NODE_COL){
            //const newStartNode = getNewStartNode(this.state.grid,row,col);
            this.setState({mouseIsPressed:true, forStartNode:true});
            document.getElementById(`node-${row}-${col}`).className =
            'node not-start-node';
            
       }
       else{
           const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
           this.setState({ grid: newGrid, mouseIsPressed: true });
       }
        
    }
    handleMouseLeave(row,col){
        if (this.state.mouseIsPressed === true && this.state.forStartNode === true){
            document.getElementById(`node-${row}-${col}`).className =
                'node node-hover-exit';
        }
        else return;
    }
    handleMouseEnter(row, col) {
        
        if(this.state.mouseIsPressed===false && this.state.keyIsPressed===true ){
            const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid });
        }
        else if (!this.state.mouseIsPressed) return;
        else if(this.state.mouseIsPressed===true && this.state.forStartNode===true){
            document.getElementById(`node-${row}-${col}`).className =
                'node node-hover-enter';
        }
        else if(!this.state.forStartNode){
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
            this.setState({ grid: newGrid });
        }
    }

    handleMouseUp(row,col) {
        if(this.state.forStartNode){
            START_NODE_COL = col;
            START_NODE_ROW = row;
            console.log('row is'+row+' col is '+col);
            document.getElementById(`node-${row}-${col}`).className =
                'node node-start';
            this.setState({forStartNode:false});
        }
        this.setState({ mouseIsPressed:false });
    }

    
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 1; i < visitedNodesInOrder.length-1; i++) {
            if (i === visitedNodesInOrder.length-2) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                console.log("shortest path activated");
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if(node.isWeight){
                 document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited-weight';   
                }
                else{
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-visited';
                }
                
            }, 10 * i);
            console.log("shortest path not yet activated");
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 1; i < nodesInShortestPathOrder.length-1; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                if (node.isWeight) {
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-visited-weight-path';
                }
                else{
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-shortest-path';
                }
                
                
            }, 50 * i);
        }
    }
    visualizeDijkstra() {
        const  grid  = this.state.grid;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    
    render(){
        const grid = this.state.grid;
        console.log(grid)

        return(
            <div className="container">
            <Jumbotron className="">
                <h1>Dijkstra's Algorithm</h1>
            </Jumbotron>    
            <div className="row justify-content-center">
                    <div className="col-1 col-md-1 ">
                        <div className="node node-visited"/>
                        <div>Visited Node</div>
                    </div>
                    <div className="col-1 col-md-1 ">
                        <div className="node node-visited-weight" />
                        <div>Visited Weight node</div>
                    </div>
                    <div className="col-1 col-md-1 ">
                        <div className="node node-start" />
                        <div>Start Node</div>
                    </div>
                    <div className="col-1 col-md-1 ">
                        <div className="node node-finish" />
                        <div>Finish Node</div>
                    </div>
                    <div className="col-1 col-md-1 ">
                        <div className="node node-wall" />
                        <div>Wall Node</div>
                    </div>
                    <div className="col-1 col-md-1 ">
                        <div className="node node-weight" />
                        <div>Weight Node</div>
                    </div>
                    <div className="col-1 col-md-1 ">
                        <div className="node shortest-path" />
                        <div>Shortest Path</div>
                    </div>
                    <div className="col-1 col-md-1 ">
                        <div className="node node-visited-weight-path" />
                        <div>Weights SP</div>
                    </div>
                    
            </div>
            <div className="row justify-content-center mt-5">
            <button onClick={()=>this.visualizeDijkstra()} className="btn btn-primary">Run</button>
            </div>
            <div className="grid">
                {grid.map((row,rowIdx) => {
                    return <div key={rowIdx}>
                        {row.map((node,nodeIdx) => <Node
                         key={nodeIdx}
                         row = {node.row}
                         col = {node.col} 
                         isStart={node.isStart}
                         isFinish={node.isFinish}
                         isVisited={node.isVisited}
                         onmousedown ={(row,col) => this.handleMouseDown(row,col)}
                         onmouseup ={(row,col) => this.handleMouseUp(row,col)}
                         onmouseenter ={(row,col) => this.handleMouseEnter(row,col)} 
                         onmouseleave = {(row,col)=>this.handleMouseLeave(row,col)}
                         onkeydown = {(row,col) => this.handleKeyDown(row,col)}
                         onkeyup = {()=>this.handleKeyUp()}
                         isWeight={node.isWeight}
                         isWall = {node.isWall} 
                        ></Node>)}
                    </div>
                })}
            </div> 
            <div>
            </div> 
            </div>              
            
        );
    }
} 

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};
const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isWeight:false,
        previousNode: null,
    };
};

const getNewGridWithWallToggled=(grid,row,col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall : !node.isWall,
        
    };
    newGrid[row][col] = newNode;

    return newGrid;
    
};

const getNewGridWithWeightToggled = (grid, row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWeight: !node.isWeight,

    };
    newGrid[row][col] = newNode;

    return newGrid;

};