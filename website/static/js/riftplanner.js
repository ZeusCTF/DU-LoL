const dragItems = document.querySelectorAll(".player-marker");
const riftmap = document.querySelector(".container-sr");

dragItems.forEach(dragItem => {
    dragItem.addEventListener('dragstart', () => {
        dragItem.classList.add('dragging');
        if(!dragItem.classList.contains('dragged'))
            dragItem.classList.add('dragged');
    })

    dragItem.addEventListener('dragend', e => {
        e.preventDefault();
        dragItem.classList.remove('dragging');
        dragItem.style.left = (e.pageX-10) + "px";
        dragItem.style.top = (e.pageY-10) + "px";
        console.log("X: " + e.pageX + "px")
        console.log("Y: " + e.pageY + "px")
    })
})

function selectMarker(btn) {
    //fetch Id of current button clicked
    const selectId = btn.id;
    //split Id to create marker ID
    const markerId = selectId.split("select")[0];
    console.log(selectId);
    console.log(markerId);
    //query for currently selected markers
    var curMarkers = document.querySelectorAll('.selected-marker');
    if(curMarkers) {
        curMarkers.forEach(curMarker => {
            //remove currently selected markers
            curMarker.classList.remove('selected-marker');
        })
    }
    //select the targeted button
    btn.classList.add('selected-marker');
    //find the equivalent marker token
    const targetMarker = document.getElementById(markerId);
    //select equivalent marker token
    targetMarker.classList.add('selected-marker');
}

function populateChampGallery() {
    console.log("Populating champion gallery");
    var folder = "../images/riftplanner/champions/";
    var frmt = ".webp";
    const championNames = ['aatrox', 'ahri', 'akali', 'akshan', 'alistar', 'amumu', 'anivia', 'annie', 'aphelios', 'ashe', 'aurelion_sol', 'azir', 'bard', 'bel\'veth', 'blitzcrank', 'brand', 'braum', 'caitlyn', 'camille', 'cassiopeia', 'cho\'gath', 'corki', 'darius', 'diana', 'dr.mundo', 'draven', 'ekko', 'elise', 'evelynn', 'ezreal', 'fiddlesticks', 'fiora', 'fizz', 'galio', 'gangplank', 'garen', 'gnar', 'gragas', 'graves', 'gwen', 'hecarim', 'heimerdinger', 'illaoi', 'irelia', 'ivern', 'janna', 'jarvan_iv', 'jax', 'jayce', 'jhin', 'jinx', 'kai\'sa', 'kalista', 'karma', 'karthus', 'kassadin', 'katarina', 'kayn', 'kennen', 'kha\'zix', 'kindred', 'kled', 'kog\'ma', 'k\'sante', 'leblanc', 'lee_sin', 'leona', 'lillia',' lissandra', 'lucian', 'lulu', 'lux', 'malphite', 'malzahar', 'maokai', 'master_yi', 'missfortune', 'mordekaiser', 'morgana', 'nami', 'nasus', 'nautlius', 'neeko', 'nidalee', 'nilah', 'nocturne', 'nunu_&_willump', 'olaf', 'orianna', 'ornn', 'pantheon', 'poppy', 'pyke', 'qiyana', 'quinn', 'rakan', 'rammus', 'rek\'sai', 'renata_glasc', 'renekton', 'rengar', 'riven', 'rumble', 'ryze', 'sejuani', 'senna', 'sett', 'shaco', 'shen', 'shyvana', 'singed', 'sion', 'sivir', 'skarner', 'sona', 'soraka', 'swain', 'sylas', 'syndra', 'tahm_kench', 'taliyah', 'talon', 'taric', 'teemo', 'thresh', 'tristana', 'trundle', 'tryandamere', 'twisted_fate', 'twitch', 'udyr', 'urgot', 'varus', 'vayne', 'veigar', 'vel\'koz', 'vex', 'viego', 'viktor', 'vi', 'vladimir', 'volibear', 'warwick', 'xayah', 'xerath', 'xin_zhao', 'yasuo', 'yorick'];

    //can't create images in flask via JS.  Have to find and send all the images in LoL.py
    
    // for(var i = 0; i < championNames.length; i++)
    // {
    //     var champIcon = document.createElement("img");
    //     console.log(championNames[i]);
    //     champIcon.src = "{{ url_for('static',filename=\'" + folder + championNames[i] + "Square" + frmt + "\') }}";
    //     console.log(champIcon.src);
    //     riftmap.appendChild(champIcon);
    // }
}