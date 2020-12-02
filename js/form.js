'use strict';

(function () {
const tournamentForm = document.querySelector(`.tournament__form`);
const homeTeamName = document.querySelector(`.tournament-form__team-name_home`);
const visitorTeamName = document.querySelector(`.tournament-form__team-name_visitor`);
const homeScore = tournamentForm.querySelector(`.tournament-form__input_home-score`);
const visitorScore = tournamentForm.querySelector(`.tournament-form__input_visitor-score`);
const buttonResult = tournamentForm.querySelector(`.tournament-form__button-add-result`);
let homeTeamPoints = 0;
let visitorTeamPoints = 0;
let homeTeam = {};
let visitorTeam = {};
let gameToPlay = 0;
let win = 0;
let loss = 0;
let draw = 0;
let scored = 0;
let conceded = 0;
let difference = 0;
const table = document.querySelector(`.tournament-table`);

const createObjTeamHome = function () {
   const objHome = {
       name: homeTeamName.value,
       points: homeTeamPoints,
       games: gameToPlay,
       wins: win,
       loss: loss,
       draw: draw,
       scored: scored,
       conceded: conceded,
       difference: difference
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
        draw: draw,
        scored: scored,
        conceded: conceded,
        difference: difference
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
    const golScore = string.querySelector(`.tournament-table__cell_scored`);
    const golConceded = string.querySelector(`.tournament-table__cell_conceded`);
    const golDifference = string.querySelector(`.tournament-table__cell_difference`);
    const delta =  Number(golDifference.textContent);

    name.textContent = team.name;
    textContentCounter(pointsInTable, team.points);
    textContentCounter(matchesInTable, team.games);
    textContentCounter(winInTable, team.wins);
    textContentCounter(losInTable, team.loss);
    textContentCounter(drawsInTable, team.draw);
    textContentCounter(golScore, team.scored);
    textContentCounter(golConceded, team.conceded);    
    const DeltaSum = delta + (team.scored - team.conceded);
    golDifference.textContent = DeltaSum;           
}

const sortTable = function () {    
    let sortedRows = Array.from(table.rows)
      .slice(1)    
    sortedRows.sort(function(rowA, rowB) {
        let a = parseInt(rowA.cells[2].innerHTML);
        let b = parseInt(rowB.cells[2].innerHTML);

        if (a === b) {
            a = parseInt(rowA.cells[9].innerHTML);
            b = parseInt(rowB.cells[9].innerHTML);
        } 

        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;            
        }
        
        return 0; 
    });        
    
    table.tBodies[0].append(...sortedRows);    
}

const pointsCounter = function () {
    homeTeam = createObjTeamHome();
    visitorTeam = createObjTeamVisitor();
    homeTeam.games += 1;
    homeTeam.scored += Number(homeScore.value);
    homeTeam.conceded += Number(visitorScore.value);
    visitorTeam.games += 1;
    visitorTeam.scored += Number(visitorScore.value);
    visitorTeam.conceded += Number(homeScore.value);

    if (homeScore.value > visitorScore.value) {        
        homeTeam.points += 3;
        homeTeam.wins += 1;
        visitorTeam.loss += 1;        
    } else if (homeScore.value < visitorScore.value) {        
        visitorTeam.points += 3;
        visitorTeam.wins += 1;
        homeTeam.loss += 1;       
    } else {        
        homeTeam.points = 1;
        visitorTeam.points +=1;
        homeTeam.draw += 1;
        visitorTeam.draw += 1;
    }        
    fillTable(homeTeam);
    fillTable(visitorTeam);
}

const placeChecker = function () {
    const tableRows = Array.from(table.rows)
    .slice(1);        
    let index = 1;
    for (let row of tableRows) {
        const place = row.querySelector(`.tournament-table__cell_place`);
        place.textContent = index;
        index++ 
   }            
}

const validation = function () {
    if (homeTeamName.value === visitorTeamName.value) {
        buttonResult.disabled = true;        
    }
    else {
        buttonResult.disabled = false; 
    }
}

const onTournamentFormSubmit = function (evt) {        
    homeTeam = {};
    visitorTeam = {};
    evt.preventDefault()
    pointsCounter();
    sortTable();
    placeChecker();
}

homeTeamName.addEventListener(`input`, validation);
visitorTeamName.addEventListener(`input`, validation);
tournamentForm.addEventListener(`submit`, onTournamentFormSubmit);
})();