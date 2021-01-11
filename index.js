'use strict'

import FirstPhase from './classes/FirstPhase.js';

import { selectionsFifa } from './fifa.js';



const config = { rounds: 1, maxTeamsPerGroup:4, pointsPerWin:3, pointsPerDraw:1, pointsPerLose:1}; // Define de forma extraordinaria algunos parámetros que  pueden variar.

const qatar = new FirstPhase('WolrdCup Fifa Quatar 2021',selectionsFifa, config);

// console.log(qatar.config);

const teamNames = qatar.teams.map(team => team.name);

// teamNames.forEach(function(equipo) {
//     console.log(equipo);
// })

// console.log(qatar);


// console.log(qatar.teams);
// console.log(teamNames);

// for (const teamName of teamNames) {
//     console.log(teamName);
// }

// for (const team of qatar.teams) {
//     console.log(team)
// }
/*
const numberOfGroups = qatar.teams.length / 4;
const numberOfMatchDays = qatar.teams.length / numberOfGroups - 1;
const numberOfMatchesPerGroup = qatar.teams.length / numberOfGroups / 2;
const numberOfMatchesPerMatchDay = qatar.teams.length / 2;

console.log('GRUPOS', numberOfGroups);
console.log('JORNADAS', numberOfMatchDays);
console.log('JUEGOS POR GRUPO', numberOfMatchesPerGroup);
console.log('JUEGOS POR DIA', numberOfMatchesPerMatchDay);
*/

qatar.scheduleMatchDays()
console.log(qatar.matchDaySchedule)