'use strict'

import shuffle from '../utils.js'

const LOCAL_TEAM = 0
const AWAY_TEAM = 1

export default class Tournament {

    constructor(name, teams=[], config={}) {
        this.name = name
        this.matchDaySchedule = []
        this.setup(config)
        this.setupTeams(teams)
    }

    setup(config) {
        const defaultConfig = { 
            rounds: 1,
            maxTeamsPerGroup: 4
        }
        this.config = Object.assign(defaultConfig, config)
    }

    setupTeams(teamNames) {
        this.teams = []
        for (const teamName of teamNames) {
            const team = this.customizeTeam(teamName)
            this.teams.push(team);
        }
        this.teams.shuffle()
    }

    customizeTeam(teamName) {
        return {
            name: teamName,
            matchesWon:0,
            matchesDraw:0,
            matchesLost:0
        }
    }

    initSchedule() {
        const maxTeamsPerGroup = this.config.maxTeamsPerGroup;  
        const teamsTournament = this.teams.length;
        const numberOfGroups = teamsTournament / maxTeamsPerGroup;
        const numberOfMatchDays = teamsTournament / numberOfGroups - 1;
        // const numberOfMatchDays = this.teams.length - 1;
        const numberOfMatchesPerGroup = teamsTournament / numberOfGroups / 2;
        const numberOfMatchesPerMatchDay = teamsTournament / 2;
// VALIDA QUE LA CANTIDAD DE EQUIPOS SEA LA ADECUADA.
        if (teamsTournament % maxTeamsPerGroup === 0) {
            for (let j = 0; j < numberOfMatchDays; j++) {
                const matchDay = []  // SE ESTABLECE UNA JORNADA VACÍA
                for (let k = 0; k < numberOfMatchesPerMatchDay; k++) {
                    const match = ['Equipo local', 'Equipo visitante']  // SE ESTABLECE UN PARTIDO 
                    matchDay.push(match);  // SE AGREGA AL ARRAY DE PARTIDOS DEL DÍA.
                }
                // CREADOS LOS PARTIDOS A LA JORNADA, SE AGREGAN AL PROGRAMA GENERAL DE PARTIDOS.
                this.matchDaySchedule.push(matchDay);
            }
        } else {
            console.log('La cantidad de equipo registrados no es la adecuada.')
        }
    }

    getTeamsName() {
        return this.teams.map(team => team.name)
    }

    setLocalTeams() {
        const teamNames = this.getTeamsName()
        const maxHomeTeams = this.teams.length - 2
        let teamIndex = 0
        this.matchDaySchedule.forEach(matchDay => {     // Por cada jornada
            matchDay.forEach(match=> {      // Por cada partido
                // Se establece el equipo local.
                match[LOCAL_TEAM] = teamNames[teamIndex]
                teamIndex++
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0
                }
            })
        })
    }

    setAwayTeams() {
        const teamNames = this.getTeamsName()
        const maxHomeTeams = this.teams.length - 2
        let teamIndex = maxHomeTeams
        this.matchDaySchedule.forEach(matchDay => {
            let isFirstMatch = true;
            matchDay.forEach(match => {
                if (isFirstMatch) {
                    isFirstMatch = false
                } else {
                    match[AWAY_TEAM] = teamNames[teamIndex]
                    teamIndex--
                    if (teamIndex < 0) {
                        teamIndex = maxHomeTeams
                    }
                }
            })
        })
    }

    fixLastTeamSchedule() {     // Mueve al último equipo entre local y visitante
        let matchDayNumber = 1
        const teamNames = this.getTeamsName()
        const lastTeamName = teamNames[teamNames.length - 1]
        this.matchDaySchedule.forEach(matchDay => {
            const firstMatch = matchDay[0]
            if (matchDayNumber % 2 == 0) {      // Si es una jornada par
                firstMatch[AWAY_TEAM] = firstMatch[LOCAL_TEAM]
                firstMatch[LOCAL_TEAM] = lastTeamName
            } else {        // Si es jornada impar.
                firstMatch[AWAY_TEAM] = lastTeamName        // Establecer el último equipo de la lista  como visitante o local, alternativamente.
            }
           matchDayNumber++

        })
    }

    scheduleMatchDays() {
        this.initSchedule()
        this.setLocalTeams()
        this.setAwayTeams()
        this.fixLastTeamSchedule()
    }
}
