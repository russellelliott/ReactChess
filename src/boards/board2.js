import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PlayRandomMoveEngine(props) {
  const [game, setGame] = useState(new Chess());
  const [started, setStarted] = useState(false); //indicate if game started

  const [startSquares, setStartSquares] = useState({}); //indicates squares pieces can start from
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [rightRow, setRightRow] = useState(0); //indicate if game started
  const [rightCol, setRightCol] = useState(0); //indicate if game started

  const [rightRowDisplay, setRightRowDisplay] = useState(0); //indicate if game started
  const [rightColDisplay, setRightColDisplay] = useState(0); //indicate if game started


  const [rightPieceName, setRightPieceName] = useState(""); //indicate if game started

  useEffect(() => {}, [props]);

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
  }

  //undoes the last move in situations where the move is legal in traditional chess, but illegal in our unique set of rules
  function undoLastMove() {
    const gameCopy = new Chess(game.fen()); // Create a copy of the current game state
    gameCopy.undo(); // Undo the last move
    setGame(gameCopy); // Update the game state with the undone move
  }  

  function onDrop(sourceSquare, targetSquare) {

    //works for traditional move, but not promotion
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      //promotion: 'q' // always promote to a queen for example simplicity
    });

    console.log("move: ", move);

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

    if(started){
      if(targetSquare in rightClickedSquares && sourceSquare in startSquares){
        return true;
      }else{
        console.log("illegal move; move must comply with rules")
        undoLastMove(); //undo the last move to revert player position
      }
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

  //piece names dictionary
  const pieceNames = {
    'p': 'Pawn',
    'r': 'Rook',
    'n': 'Knight',
    'b': 'Bishop',
    'q': 'Queen',
    'k': 'King'
  };

  function getMoveOptions(){
    //clear the previous squares
    setStartSquares({});
    setRightClickedSquares({});
    validMoves = [];
    //movesList stores the lists of moves
    console.log(movesList[0]);

    //get the details of valid moves
    //var rightCol = movesList[0].col;
    setRightCol(movesList[0].col);
    //var rightRow = movesList[0].row;
    setRightRow(movesList[0].row);
    var rightPiece = movesList[0].piece.type;
    //var rightPieceName = pieceNames[rightPiece.toLowerCase()]; // Convert to lowercase to match dictionary keys
    setRightPieceName(pieceNames[rightPiece.toLowerCase()]);

    console.log("The next move must involve one of the 3 options:");
    console.log("1. The piece being moved must land on a space in row", rightRow);
    console.log("2. The piece being moved must land on a space in col", rightCol);
    console.log("3. The piece being moved must be a", rightPieceName);

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

      console.log("history: ", movesList) //stores the most recent move
      //movesList[0].col and movesList[0].row store the correct most recent col and row
      console.log(movesList[0].col, rightCol);
      //var rightRow = movesList[0].row;
      console.log(movesList[0].row, rightRow);
      console.log(movesList[0].piece.type);

      console.log("right column?", "move to", col, "history", movesList[0].col)
      console.log("right column?", "move to", row, "history", movesList[0].row)
      console.log("right piece?", "move to", piece, "history", movesList[0].piece.type)
      
      //if instead of rightCol and rightRow you use rightColDisplay and rightRowDisplay, it changes the valid moves
      if(col===movesList[0].col || row===movesList[0].row || piece===movesList[0].piece.type){
      //if(col===rightCol || row===rightRow || piece===rightPiece){
        console.log("this move is valid");
        console.log(item)
        //validMoves.append(col+row)
        validMoves.push(item);
      }
    });

    //store the valid squares
    var object = {};
    var starter = {};
    //list of valid moves
    console.log("MOVE DEBUG DATA");
    //the rightCol and rightRow from here are the right ones to display
    //rightCol and rightRow are 0 0 during the first move. this seems to represent move right before most recent move?
    console.log(rightCol);
    console.log(rightRow);

    setRightColDisplay(rightCol);
    setRightRowDisplay(rightRow);

    console.log(rightPiece);
    console.log("the moves", validMoves);
    console.log("END MOVE DEBUG DATA");
    validMoves.forEach(function (item, index) {
      console.log(item, index);
      console.log(item.to);

      //set the colors for the valid moves
      starter[item.from] = {backgroundColor: starterColor}; //piece that can be moved is highlighted green
      object[item.to] = {backgroundColor: endColor}; //destination any piece can do is highlighted blue

    });
    setStartSquares(starter);
    setRightClickedSquares(object);
  }

  return (
    <>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDropX}
        customSquareStyles={{
          ...startSquares,
          ...rightClickedSquares
        }}
      />
      {started && (
        <div>
          <h2>Instructions</h2>
          <p>Move any of the pieces highlighted in green to any of the spaces highlighted in blue following traditional chess move rules.</p>
          <h2>Technical Specifics</h2>
          <p>The next move must involve one of the 3 options:</p>
          <ul>
            <li>The piece being moved must land on a space in row {rightRow}</li>
            <li>The piece being moved must land on a space in column {rightCol}</li>
            <li>The piece being moved must be a {rightPieceName}</li>
          </ul>

          <h2>Inspiration</h2>
          <p>Inspured by this <a href = "https://www.youtube.com/watch?v=JHN22fL4LVw">Youtube Video</a>. Here are the rules: "Chess, but every move you make move you make must share the same letter or number with the previous move"</p>
        </div>
      )}
    </>
  );
  
}