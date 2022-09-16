import { useState } from "react";
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import { Chessboard } from "react-chessboard";

export default function PlayRandomMoveEngine() {
  const game = new Chess();
  console.log(game.fen());

  function onDrop(sourceSquare, targetSquare) {
    console.log(sourceSquare);
    console.log(targetSquare);

    game.move({
      from: sourceSquare,
      to: targetSquare,
      //promotion: 'q' // always promote to a queen for example simplicity
    });

    console.log(game.fen());
    return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
  }

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}