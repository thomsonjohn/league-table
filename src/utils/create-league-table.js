const leagueTable = [];

const createLeagueTable = (data) => {
    
    // console.log(data);
    data.rounds.map((round) => {
        round.matches.map((match, index) => {
            // console.log(match);
            const team1 = {key: match.team1.key, name: match.team1.name, scored: match.score1};
            const team2 = {key: match.team2.key, name: match.team2.name, scored: match.score2};

            checkAndAdd(team1);
            checkAndAdd(team2);

            updateGoals(match);

        })
        leagueTable.sort(compare);
        leagueTable.map((team, index) => {
            team.rank = index + 1;
        })
    })

    console.log(leagueTable);
    return leagueTable;
}

function compare(a,b) {
    if (a.points < b.points) {
        return 1;
    } else if (a.points > b.points) {
        return -1;
    } else if (a.points === b.points) {
        if (a.goalDifference < b.goalDifference) {
            return 1;
        } else if (a.goalDifference > b.goalDifference) {
            return -1;
        } else if (a.goalDifference === b.goalDifference) {
            if (a.goalsFor < b.goalsFor) {
                return 1;
            } else if (a.goalsFor > b.goalsFor) {
                return -1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    } else {
        return 0;
    }


    if (a.points < b.points)
      return 1;
    if (a.points > b.points)
      return -1;
    return 0;
}


function updateGoals(match) {

    var team1 = leagueTable.find((el) => {
        return el.id === match.team1.key;
    })

    team1.goalsFor += match.score1;
    team1.goalsAgainst += match.score2;
    team1.goalDifference = team1.goalsFor - team1.goalsAgainst;

    var team2 = leagueTable.find((el) => {
        return el.id === match.team2.key;
    })

    team2.goalsFor += match.score2;
    team2.goalsAgainst += match.score1;
    team2.goalDifference = team2.goalsFor - team2.goalsAgainst;

    if(match.score1 > match.score2) {
        team1.points += 3;
        team1.totalWins++;
        team2.totalDefeats++;
    } else if (match.score1 === match.score2) {
        team1.points += 1;
        team2.points += 1;
        team1.totalDraws++;
        team2.totalDraws++;
    } else {
        team2.points += 3;
        team2.totalWins++;
        team1.totalDefeats++;
    }
}

function checkAndAdd(team) {
    var id = leagueTable.length + 1;
    var found = leagueTable.some((el) => {
      return el.id === team.key;
    });
    if (!found) { leagueTable.push({ id: team.key, teamName: team.name, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0, totalWins: 0, totalDraws: 0, totalDefeats: 0 }); }
}

export {
    createLeagueTable
};