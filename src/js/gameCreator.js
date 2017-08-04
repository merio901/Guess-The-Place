import { Round } from './round.js';


export class TheGame{
  constructor(){
    this.rounds = [];
    this.shots = 10;
  }
  getRoundCount = () =>{
    return this.roundCount;
  }
  updateUpperPanel = () =>{
    // TODO:
  }
  updateBottomPanel = () =>{
    // TODO:
  }
  generateRound = (nextRound) =>{
    let round = new Round();
    round.shots = 10;
    round.geocode(nextRound);
    this.rounds.push(round);
  }


}
