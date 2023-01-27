import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    var FEN = game.fen();
    console.log(FEN)
    //const gameCopy = { ...game };
    const gameCopy = new Chess(FEN)
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDropX(sourceSquare, targetSquare) {
    //get piece at square
    
    if(onDrop(sourceSquare, targetSquare)){
      var piece = game.get(sourceSquare); //get the piece that moved

      movesList.push(
        {
          "piece": piece,
          "column": targetSquare[0],
          "row": targetSquare[1],
        }
      );

      getMoveOptions();

    }
    /*//move was legal
    getMoveOptions();*/
  }

  function onDrop(sourceSquare, targetSquare) {

    //works for traditional move, but not promotion
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      //promotion: 'q' // always promote to a queen for example simplicity
    });

    if(movesList.includes(move)){
      console.log("this is a valid move");
    }

    // illegal move
    if (move === null){
      console.log("promotion move");

      //auto promote to queen
      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for example simplicity
      });

      if(move === null){
        console.log("illegal move");
        return false;
      }
      
    }
    return true;
  }

  /*get the move options
  1. must end in same column
  OR
  2. must end in same row
  OR
  3. must be the same piece type that was previously moved
  */

  //history gets deleted when a player makes illegal move
  var movesList = []
  function getMoveOptions(){
    //movesList stores the lists of moves


    /*var history = game.history({ verbose: true });

    if(history[0]===undefined){
      return game.moves();
    }

    var piece = history[0].piece;
    var dest = history[0].to;
    console.log(dest);
    var col = dest[0];
    var row = dest[1];


    console.log("The next move must involve one of the 3 options:");
    console.log("1. The piece being moved must land on a space in row ", row);
    console.log("2. The piece being moved must land on a space in col ", col);
    console.log("3. The piece being moved must be a ", piece);*/

    console.log(movesList[0]);

    /*movesList.push(
      {
        "piece": piece,
        "column": col,
        "row": row,
      }
    );
    var info = movesList[0];
    console.log(info);

    var moves = game.moves();*/
  }

  //https://natclark.com/tutorials/javascript-auto-repeat/
  //setInterval(getMoveOptions, 2000); // Repeat myFunction every 2 seconds

  return <Chessboard position={game.fen()} onPieceDrop={onDropX} />;
}