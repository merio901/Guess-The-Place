import { Round } from './round.js';

export class TheGame{
  constructor(){
    this.rounds = [];
    this.gameScore = 0;
  }
  generateRound = (nextRound) =>{
    let round = new Round();
    round.geocode(nextRound);
    this.rounds.push(round);
  }
}
