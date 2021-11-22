const container = document.querySelector(".container__flex")
const containerPlayers = document.querySelectorAll(".container__player")
const back = document.getElementById("back")



function fetchPlayers() {
    fetch("./json/players.json")
    .then(res => res.json())
    .then(data => {

        const players = data.players
        console.log(players)

        showPlayers(players)
    })
}


function showPlayers(arr) {
    // display none on button back
    back.classList.remove("show")
     const playersBio = arr.map(player => {
        return `
        <div class="container__player"  >
        <img class="player" src="${player.picture}" alt="${player.name}" data-playerid=${player.id} />
        <div class="container__playerBio player" data-playerid=${player.id} >
            <h3 class="playerBio__name"><span class="playerBio__number">#${player.number}</span> ${player.name}</h3>
            <h3 class="playerBio__position">${player.position}</h3>
            <div class="playerBio__stats">
                <h5 class="playerBio__player">Played: ${player.season_played}</h5>
                <h5 class="playerBio__cleansheets">
                    ${player.clean_sheets > 0 ? `Clean Sheets: ` : `Goals: `}
                    ${player.clean_sheets > 0 ? player.clean_sheets : player.goals}
                 </h5>
                 <h5>${player.assists > 0 ? `Assists: ${player.assists}` : ""}</h5>
            </div>
        </div>
    </div>
        `
    }).join("")

    container.innerHTML = playersBio
}


//Show Single Player 
function showSinglePlayer(e) {
    console.log(e.target)
    if (e.target.classList.contains("player")) {

        // show button for back 
        back.classList.add("show")

        //show single player
        const player = e.target

        container.innerHTML = " "


        console.log(player)
        const playerID = +player.getAttribute("data-playerid")
        console.log(playerID)

        fetch("./json/players.json")
            .then(res => res.json())
            .then(data => {
                console.log(data, "data 1")
                const ply = data.players[playerID - 1]
                container.innerHTML = `
            <div class="footballPlayer">
                        <img src="${ply.picture}" alt="${ply.name}" />
                    <div class="player__container">
                            <div class="player__containerBio">
                                    <h2>${ply.name}</h2>
                                    <h3>${ply.position}</h3>
                                    <h5>${ply.complete_name}</h3>
                                    <h5>Height: ${ply.height}</h3>
                                    <h5>Weight: ${ply.weight}</h3>
                            </div>
                            <div class="player__containerStatistic">
                                <div class="statistic__season flex">
                                    <div class="flexColumn">
                                        <h2>Season played: </h2>
                                        <h4>${ply.season_played}</h4>
                                    </div>
                                    <div class="flexColumn">
                                        <h2>Season started: </h2>
                                        <h4>${ply.season_start}</h4>
                                    </div>
                                    <div class="flexColumn">
                                        <h2>${ply.clean_sheets > 0 ? `Clean Sheets: ` : `Goals: `} </h2>
                                        <h4>${ply.clean_sheets > 0 ? ply.clean_sheets : ply.goals }</h4>
                                    </div>
                                </div>
                                <div class="statistic__total flex">
                                    <div class="flexColumn">
                                        <h2>Total Matches: </h2>
                                        <h4>${ply.total_played}</h4>
                                    </div>
                                    <div class="flexColumn">
                                        <h2>Total Seasons: </h2>
                                        <h4>${ply.year_played}</h4>
                                    </div>
                                </div>
                            </div>
                    </div>
                    

            </div>
        `
            })


    }

}




window.addEventListener("load",fetchPlayers)
container.addEventListener("click",(e)=> showSinglePlayer(e))
back.addEventListener("click",fetchPlayers)