import { useState } from "react";
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import { Chessboard } from "react-chessboard";

const movesList = []; //stores the moves
var piece; //variable to store the piece that was just moved
export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());

  function getMoveOptions(movesList, piece){
    console.log("whose turn is it?")
    console.log(game.turn());
    console.log("getMoveOptions piece (if undefined that means there was no previous move): ");
    console.log(piece);
    var allMoves = game.moves();
    //the next move must share the same letter and/or number as the previous move
    if(movesList.length == 0){
      console.log("no previous moves");
      return allMoves; //return a list of all possible moves
    }
    var prevMove = movesList[movesList.length-1];
    console.log("the previous move was: ");
    console.log(prevMove);
    var letter = prevMove[0];
    var number = prevMove[1];
    console.log("The next move must have %s and/or %s.", letter, number);
    const validMoves = []; //a list of valid moves
    //array for each
    //https://www.freecodecamp.org/news/javascript-array-foreach-tutorial-how-to-iterate-through-elements-in-an-array-with-map/
    allMoves.forEach(function(move) {
      console.log(move);
        if (move.includes(letter) || move.includes(number)) { //check if move has same letter or number
          console.log("move: ", move);
          var endSquare = move.slice(-2);
          console.log("end square: ", endSquare);
            validMoves.push(move); //add move to valid moves list
        }
    })
    console.log("valid moves");
    console.log(validMoves);

    return validMoves;
  
    
  }

  function makeAMove(move) {
    var moveOptions = getMoveOptions(movesList);
    console.log(moveOptions);
    var FEN = game.fen();
    console.log(FEN)
    //const gameCopy = { ...game };
    const gameCopy = new Chess(FEN)
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onClick(){
    console.log("piece clicked");
  }

  function onDropX(sourceSquare, targetSquare){
    onDrop(sourceSquare, targetSquare);
    console.log("onDropX piece: ");
    console.log(piece);
    getMoveOptions(movesList, piece);
  }

  function onDrop(sourceSquare, targetSquare) {
    piece = game.get(sourceSquare).type;
    console.log("onDrop piece: ");
    console.log(piece);
    //works for traditional move, but not promotion
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      //promotion: 'q' // always promote to a queen for example simplicity
    });

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

    //move was legal
    movesList.push(targetSquare); //add destination square to list
    /*console.log(movesList);

    console.log("here are the legal moves at this point");
    console.log(game.moves());
    console.log(game.turn());

    var moveOptions = getMoveOptions(movesList);
    console.log(moveOptions);*/
    
    //setTimeout(makeRandomMove, 200);
    return true;
  }
  //multiple onlclick events
  //https://upmostly.com/tutorials/adding-multiple-functions-inside-a-single-onclick-event-handler
  return <Chessboard position={game.fen()} onPieceDrop={onDropX}/>;
}