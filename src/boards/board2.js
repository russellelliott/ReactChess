import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PlayRandomMoveEngine(props) {
  const [game, setGame] = useState(new Chess());
  const [started, setStarted] = useState(false); //indicate if game started

  const [startSquares, setStartSquares] = useState({}); //indicates squares pieces can start from
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  useEffect(() => {}, [props]);

  function onSquareClick(targetSquare) {

    var object = {"e3": {backgroundColor: 'rgba(0, 0, 255, 0.4)'}};
    object["e4"] = {backgroundColor: 'rgba(0, 0, 255, 0.4)'};
    setRightClickedSquares(object);
    //setRightClickedSquares({"e3": {backgroundColor: 'rgba(0, 0, 255, 0.4)'}});
    //setRightClickedSquares({"e3": {backgroundColor: 'rgba(0, 0, 255, 0.4)'}});

  }

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
          "col": targetSquare[0],
          "row": targetSquare[1],
        }
      );

      getMoveOptions();

    }
    /*//move was legal
    getMoveOptions();*/
  }

  function isValid(target){
    //var found = false;
    /*validMoves.forEach(function (item, index) {
      console.log(item, index);
      console.log("what we are looking for: ", item, target);
      console.log(String(item)==String(target))
      //set the colors
      //var object = {"e3": {backgroundColor: 'rgba(0, 0, 255, 0.4)'}};
      if(String(item)==String(target)){
        //valid square to land on
        return true;
      }

    });
    //no valid found; return false
    return false;*/
    for(var i=0; i<validMoves.length; i++){
      console.log(validMoves[i]);
      if(validMoves[i]==target){
        return true;
      }
    }
    return false;
  }

  function onDrop(sourceSquare, targetSquare) {

    //works for traditional move, but not promotion
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      //promotion: 'q' // always promote to a queen for example simplicity
    });

    console.log("move: ", move);
    /*if(validMoves.includes(move)){
      console.log("this is a valid move");
    }else{
      console.log("somethign wrong");
    }*/
    /*console.log("we are trying to move to", move.to);
    if(isValid(move.to)){
      console.log("VALID MOVE");
    }else{
      console.log("INVALID MOVE");
      move = null;
    }

    if(move.to in validMoves){
      console.log("YES");
    }else{
      console.log("NO");
    }*/

    console.log("VALID MOVES ARRAY");
    console.log(rightClickedSquares);
    for(var i=0; i<rightClickedSquares.length; i++){
      console.log(rightClickedSquares[i]);
    }
    console.log("VALID MOVES LIST");
    console.log(validMoves);

    console.log("STARTER SQUARES LIST");
    console.log(startSquares);
    console.log("VALID MOVES");

    //iterate through properties of object
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

    /*for (const property in rightClickedSquares) {
      console.log(property, targetSquare);
      if(String(property)==String(targetSquare)){
        console.log("VALID MOVE")
      }
    }*/

    /*for (const finish in rightClickedSquares) {
      console.log(finish, targetSquare);
      for (const start in startSquares) {
        console.log(start, sourceSquare);
        if(String(finish)==String(targetSquare) && String(start)==String(sourceSquare)){
          console.log("VALID MOVE")
          //alert("Your move was valid")
        }else{
          console.log("invalid")
        }
      }
    }*/

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
    //secondary move validation
    /*if(started == false){
      setStarted(true);
    }
    console.log(started);*/

    if(started){
      if(targetSquare in rightClickedSquares && sourceSquare in startSquares){
        return true;
      }else{
        alert("bad");
        //return false;
      }
      //alert("valid");
      //the move is valid
    }else{
      setStarted(true);
      return true;
    }
    //return true;
  }

  //colors
  var starterColor = 'rgba(0, 255, 0, 0.4)';
  var endColor = 'rgba(0, 0, 255, 0.4)';

  /*get the move options
  1. must end in same column
  OR
  2. must end in same row
  OR
  3. must be the same piece type that was previously moved
  */

  //https://github.com/jhlywa/chess.js/issues/62
  //https://github.com/jhlywa/chess.js/issues/62#issuecomment-814156379
  function swapTurn() {
    let tokens = game.fen().split(" ");
    tokens[1] = game.turn() === "b" ? "w" : "b";
    tokens[3] = "-";
    game.load(tokens.join(" "));
  }
  
  //history gets deleted when a player makes illegal move
  var movesList = []
  var validMoves = game.moves(); //first move, all moves valid

  function getMoveOptions(){
    //clear the previous squares
    setStartSquares({});
    setRightClickedSquares({});
    validMoves = [];
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

    //get the details
    var rightCol = movesList[0].col;
    var rightRow = movesList[0].row;
    var rightPiece = movesList[0].piece.type;

    //swap the turn so we can get the moves we want
    swapTurn();

    //iterate through the moves
    game.moves({ verbose: true }).forEach(function (item, index) {
      console.log(item, index);
      //for each of the moves
      var to = item.to;
      var col = to[0];
      var row = to[1];
      var piece = item.piece;
      console.log(col, rightCol);
      console.log(row, rightRow);
      console.log(piece, rightPiece);
      if(col==rightCol || row==rightRow || piece==rightPiece){
        console.log("this move is valid");
        //validMoves.append(col+row)
        validMoves.push(item);
      }
    });

    //store the valid squares
    var object = {};
    var starter = {};
    //list of valid moves
    console.log("the moves");
    validMoves.forEach(function (item, index) {
      console.log(item, index);
      console.log(item.to);
      //set the colors
      //var object = {"e3": {backgroundColor: 'rgba(0, 0, 255, 0.4)'}};
      starter[item.from] = {backgroundColor: starterColor};
      object[item.to] = {backgroundColor: endColor}; //destination

    });
    setStartSquares(starter);
    setRightClickedSquares(object);

    

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

  return <Chessboard
  position={game.fen()}
  onPieceDrop={onDropX}
  //onSquareClick={onSquareClick}
  customSquareStyles={{
    ...startSquares,
    ...rightClickedSquares
  }}/>;
}