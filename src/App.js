import React, {Component} from 'react';
import Board from "./components/Board";

import {createMatrix, createPiece} from "./components/Utils";

class App extends Component {

    constructor() {
        super();
        this.matrix = createMatrix(10,20);
        this.piece = createPiece();

        this.timer  = 0;
        this.dropCounter = 0;

        this.pos = {x:3, y:0};

        this.state = {
            pos: this.pos,
            score: 0,
            speed: 1000,
            gameStatus: 'play'
        };

        this.move = this.move.bind(this);


    }

    move(dir){
        this.pos.x += dir;
        if (this.collide()){
            this.pos.x -= dir;
        }
        this.setState({
            pos: this.pos
        });
    }


    collide(){
        const [m, o] = [this.piece, this.pos];
        for (let y=0; y<m.length; y++){
            for (let x=0; x<m[y].length; x++){
                if (
                    m[y][x]===1
                    && (
                        this.matrix[y+o.y] && this.matrix[y+o.y][x+o.x]
                    ) !== 0
                ){
                    return true;
                }
            }
        }
        return false;
    }

    merge(){
        this.piece.forEach((row,y)=>{
            row.forEach((col, x)=>{
                if (col===1){
                    this.matrix[y+this.pos.y][x+this.pos.x] = 1;
                }
            })
        })
    }

    reset(){
        this.pos.y = 0;
        this.pos.x = 3;
        this.piece = createPiece();
        this.setState({
            pos: this.pos
        });
    }

    sweep(){
        outer: for(let y=this.matrix.length-1; y>0; y--){
            for (let x=0; x<this.matrix[y].length; x++){
                if (this.matrix[y][x]===0){
                    continue outer;
                }
            }
            const row = this.matrix.splice(y,1)[0].fill(0);
            this.matrix.unshift(row);
            y++;
            let _score = this.state.score+1;
            let _speed = this.state.speed - 100;

            this.setState({
                score: _score,
                speed: _speed
            });
        }
    }

    playerDrop = ()=>{
        this.dropCounter = 0;
        this.pos.y++;

        if (this.collide()){
            this.pos.y--;
            if (this.pos.y<1){
                this.setState({
                    gameStatus:'gameover'
                });
            }
            this.merge();
            this.reset();
            this.sweep();
        }
        this.setState({
            pos: this.pos
        });
    }

    rotate(){
        this.rotatePiece();
        while(this.collide()){
            if (this.pos.x+this.piece[0].length>this.matrix[0].length){
                this.pos.x --;
            } else {
                this.pos.x ++;
            }
        }
        this.setState({
            pos:this.pos
        });
    }

    rotatePiece(){
        for(let y=0; y<this.piece.length; y++){
            for(let x=0; x<y; x++){
                [
                    this.piece[x][y],
                    this.piece[y][x]
                ] = [
                    this.piece[y][x],
                    this.piece[x][y]
                ]
            }
        }
        this.piece.reverse();
    }

    update = (time=0) => {
        const deltaTime = time-this.timer;
        this.timer = time;
        this.dropCounter += deltaTime;
        if (this.dropCounter>this.state.speed){
            this.playerDrop();
        }
        if (this.state.gameStatus==='play'){
            requestAnimationFrame(this.update);
        } else if (this.state.gameStatus==='gameover'){
            alert('GAME OVER !');
            this.setState({
                gameStatus:'play'
            });
            this.reset();
            this.matrix = createMatrix(10,20);
            this.update();
        }

    }

    componentDidMount(){
        this.update();
        document.addEventListener('keydown',(e)=>{
            console.log(e.keyCode);
            // left 37
            // right 39
            // up 38
            // down 40

            if (e.keyCode===37){
                this.move(-1);
            } else if (e.keyCode===39){
                this.move(1);
            } else if (e.keyCode===38){
                this.rotate();
            } else if (e.keyCode===40){
                this.playerDrop();
            }
        })
    }

    render() {
        return (
            <div>
            <div className={'leftBox'}>
                <Board
                    matrix={this.matrix}
                    piece={this.piece}
                    pos ={this.state.pos}
                />
            </div>
            <div className={'leftBox'}>
                <br />
                <strong>&nbsp; SCORE : {this.state.score}</strong><br/>
                <strong>&nbsp; SPEED : {this.state.speed}</strong><br/>
                <strong>&nbsp; STATUS : {this.state.gameStatus}</strong><br/>
            </div>
            </div>
        );
    }
}

export default App;