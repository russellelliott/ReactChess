import { useState } from "react";
import { Chess, QUEEN } from "chess.js";
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


  var pieceValues = {
    "p" : 1, //pawn
    "n": 3, //bishop
    "b": 3, //bishop
    "r" : 5, //rook
    "q" : 9 //queen
  }

  var avgGameMoves = 40; //average moves in chess game
  //https://chess.stackexchange.com/questions/2506/what-is-the-average-length-of-a-game-of-chess


  function selectPiece(piece, turn){
    var chance = pieceValues[piece]/avgGameMoves;
    var prob = Math.random(0, 1);
    if (prob<=chance){
        console.log("Queen could decay");
        getPositions(game, piece);
    }
  }

  //https://github.com/jhlywa/chess.js/issues/174
  const getPositions = (game, piece) => {
    return [].concat(...game.board()).map((p, index) => {
      if (p !== null && p.type === piece.type && p.color === piece.color) {
        return index
      }
    }).filter(Number.isInteger).map((piece_index) => {
      const row = 'abcdefgh'[piece_index % 8]
      const column = Math.ceil((64 - piece_index) / 8)
      return row + column
    })
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
    selectPiece('q', game.turn);
    return true;
  }

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}