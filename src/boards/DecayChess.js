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

  /*function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }*/

  //select a piece that could decay

  //values of each of the pieces
  var pieceValues = {
    "p" : 1, //pawn
    "n": 3, //bishop
    "b": 3, //bishop
    "r" : 5, //rook
    "q" : 9 //queen
  }

  //what pieces will decay to
  //queen -> rook -> bishop -> knight -> pawn -> king
  var decayPieces = {
    "p" : "k", //pawn
    "n": "p", //bishop
    "b": "n", //bishop
    "r" : "b", //rook
    "q" : "r" //queen
  }

  var names = {
    "k" : "king",
    "p" : "pawn", //pawn
    "n": "knight", //bishop
    "b": "bishop", //bishop
    "r" : "rook", //rook
    "q" : "queen" //queen
  }

  var avgGameMoves = 40; //average moves in chess game
  //https://chess.stackexchange.com/questions/2506/what-is-the-average-length-of-a-game-of-chess


  function selectPiece(piece, turn){
    var chance = pieceValues[piece]/avgGameMoves;
    var prob = Math.random(0, 1);
    if (prob<=chance){
        console.log(names[piece] + " has decayed into " + names[decayPieces[piece]]);
        console.log(turn);
        changePiece(piece, turn);
        //console.log(stuff);
    }
  }

  //https://github.com/jhlywa/chess.js/issues/174
  function changePiece(piece, turn){
    //first, find the piece in question
    var rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var cols = ['1', '2', '3', '4', '5', '6', '7', '8'];

    for(var row in rows){
        for(var col in cols){
            //console.log(row, col)
            //console.log(game.get(rows[row]+cols[col]));
            var current = game.get(rows[row]+cols[col]);
            if(current.type == piece && current.color == turn){
                console.log(game.get(rows[row]+cols[col]));
                //found the piece, replace it
                game.remove(rows[row]+cols[col]);
                game.put({ type: decayPieces[piece], color: turn }, rows[row]+cols[col]);
                //var newFEN = game.fen()
                var FEN = game.fen();
                const gameCopy = new Chess(FEN)
                //const result = gameCopy.move(move);
                setGame(gameCopy);
                break;
            }
            /*if (game.get(row+col) == {'type': piece, 'color': turn}){
                console.log("yes");
            }*/
        }
    }


    //chess.put({ type: piece, color: turn }, 'a5') // put a black pawn on square
  }

  function onDrop(sourceSquare, targetSquare) {
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

    //move was legal, make a decay
    selectPiece('q', game.turn());
    return true;
  }

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}