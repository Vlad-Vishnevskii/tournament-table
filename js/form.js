'use strict';

(function () {
const tournamentForm = document.querySelector(`.tournament-form`);
const homeTeamName = tournamentForm.querySelector(`.tournament-form__home-team-name`);
const visitorTeamName = tournamentForm.querySelector(`.tournament-form__visitor-team-name`);
const homeScore = tournamentForm.querySelector(`.tournament-form__home-score`);
const visitorScore = tournamentForm.querySelector(`.tournament-form__visitor-score`);
let homeTeamPoints = 0;
let visitorTeamPoints = 0;
let homeTeam = {};
let visitorTeam = {};
let gameToPlay = 0;
let win = 0;
let loss = 0;
let draw = 0;

const createObjTeamHome = function () {
   const objHome = {
       name: homeTeamName.value,
       points: homeTeamPoints,
       games: gameToPlay,
       wins: win,
       loss: loss,
       draw: draw
   }
   return objHome; 
}

const createObjTeamVisitor = function () {
    const objVisitor = {
        name: visitorTeamName.value,
        points: visitorTeamPoints,
        games: gameToPlay,
        wins: win,
        loss: loss,
        draw: draw
    }
    return objVisitor;
 }

const textContentCounter = function (element, indexTable) {
    let int = element.textContent;    
    int = Number.parseInt(int);
    int += indexTable;
    element.textContent = int;
}

const fillTable = function (team) {    
    const string = document.querySelector(`[data-team="${team.name}"]`);       
    const name = string.querySelector(`.tournament-table__cell_name`);
    const pointsInTable = string.querySelector(`.tournament-table__cell_points`); 
    const matchesInTable = string.querySelector(`.tournament-table__cell_matches`);
    const winInTable = string.querySelector(`.tournament-table__cell_wins`);    
    const losInTable = string.querySelector(`.tournament-table__cell_loss`);
    const drawsInTable = string.querySelector(`.tournament-table__cell_draws`);
    name.textContent = team.name;
    textContentCounter(pointsInTable, team.points);
    textContentCounter(matchesInTable, team.games);
    textContentCounter(winInTable, team.wins);
    textContentCounter(losInTable, team.loss);
    textContentCounter(drawsInTable, team.draw);    
}

const onTournamentFormSubmit = function (evt) {    
    homeTeam = {};
    visitorTeam = {};
    evt.preventDefault()
    pointsCounter();    
}

const pointsCounter = function () {
    homeTeam = createObjTeamHome();
    visitorTeam = createObjTeamVisitor();
    homeTeam.games += 1;
    visitorTeam.games += 1;
    if (homeScore.value > visitorScore.value) {
        console.log(`первые победили`)
        homeTeam.points += 3;
        homeTeam.wins += 1;
        visitorTeam.loss += 1;
    } else if (homeScore.value < visitorScore.value) {
        console.log(`вторые победили`)
        visitorTeam.points += 3;
        visitorTeam.wins += 1;
        homeTeam.loss += 1;       
    } else {
        console.log(`ничья`)
        homeTeam.points = 1;
        visitorTeam.points +=1;
        homeTeam.draw += 1;
        visitorTeam.draw += 1;
    }        
    fillTable(homeTeam);
    fillTable(visitorTeam);
}

tournamentForm.addEventListener(`submit`, onTournamentFormSubmit);
})();