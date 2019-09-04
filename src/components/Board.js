import React from 'react';

export default class Board extends React.Component{

    constructor(){
        super();
        this.draw = this.draw.bind(this);
    }

    draw(){
        this.ctx.fillStyle = '#41F1B6';

        this.props.matrix.forEach((row,y)=>{
            row.forEach((col,x)=>{
               this.ctx.fillStyle = (col===1)?'#ff0000':'#41F1B6';
               this.ctx.fillRect(x,y,0.9,0.9);
            });
        });

        this.props.piece.forEach((row,y)=>{
            row.forEach((col,x)=>{
                this.ctx.fillStyle = (col===1)?'#ff0000':'rgba(0,0,0,0)';
                this.ctx.fillRect(
                    x+this.props.pos.x,
                    y+this.props.pos.y,0.9,0.9);
            });
        });
    }

    componentDidMount(){
        this.canvas = this.refs.canvas;
        if (this.canvas){
            this.ctx = this.canvas.getContext('2d');
            this.ctx.fillStyle = '#41F1B6';
            this.ctx.scale(30,30);
            this.ctx.fillRect(0,0,10,20);
        }
        this.draw();
    }

    componentWillReceiveProps(){
        this.draw();
    }

    render(){
        return(
            <canvas
            style={{marginLeft:20, marginTop:20}}
                ref={'canvas'} width={300} height={600}/>
        )
    }

}