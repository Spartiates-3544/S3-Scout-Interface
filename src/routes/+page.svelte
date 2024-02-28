<script>
    import { browser } from '$app/environment';
    import template from '../lib/template.json';
    
    let sections = Object.keys(template); //an array containing all the sections in the json template

    let allFields = [];
    let clonnedJson = Object.assign({}, template);
    
    let isSaveMenuOpen = false;
    let menuHeight = "55px";

    let test = 0;

    if (browser) {
        if (!window.localStorage.getItem('allSaves')) {
            window.localStorage.setItem("allSaves", '[]')
        }
    }

    function save() {
        sections.forEach(section => {
            Object.keys(template[section]).forEach(field => {
                allFields.push(field)
            })
        });
        if (browser) {
            let newSaveTitle = `${clonnedJson.General.matchType.value} ${clonnedJson.General.matchNumber.value} Team ${clonnedJson.General.teamNb.value}`
            let allSavedValues = JSON.parse(window.localStorage.getItem('allSaves'));
            if(!allSavedValues.includes(newSaveTitle)){
                allSavedValues.push(`${newSaveTitle}`);
            }          
            let newSavedValues = [...allSavedValues]

            window.localStorage.setItem(newSaveTitle, JSON.stringify(clonnedJson));
            window.localStorage.setItem("allSaves", JSON.stringify(newSavedValues));
        }
    }

    function openSaveMenu() {
        isSaveMenuOpen = !isSaveMenuOpen
        let allSavesList = JSON.parse(localStorage.getItem('allSaves'))

        if (isSaveMenuOpen == true){
            menuHeight = `calc((${allSavesList.length} + 1) * 45px + 70px`
        } else if (isSaveMenuOpen == false){
            menuHeight = "55px"

        }
    }

    function openSave(save) {
        if(browser) {
            clonnedJson = Object.assign({}, JSON.parse(localStorage.getItem(save)))
            openSaveMenu()
        }
    }
</script>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    main{
        background-color: rgb(5, 5, 9);
        color: #fff;
        display: grid;
        place-content: center;
        padding-top: 10px;
        height: 100%;
        padding-bottom: 100px;
    }

    .sections{
        width: 70vw;
        background-color: #05080d;
        border-radius: 7px;
        margin-top: 7px;
        padding: 20px;
        border-color: #1b1b21;
        border-width: 1px;
        border-style: solid;
        max-width: 700px;
    }

    input[type=text], input[type=number], select{
        background-color: #05080d;
        border-width: 0;
        border-bottom-width: 1.5px;
        border-bottom-color: #d0c4ff53;
        outline: none;
        width: 100%;
        transition: 150ms;
        color: #fff;
        border-radius: 0px;
        padding: 0 0 5px 0;
        font-size: 110%;
    }

    input[type=text]:focus, input[type=number]:focus{
        border-bottom-color: #ce7a0c;
    }

    input[type=checkbox]{
        accent-color: #ce7a0c;
    }

    select{
        padding: 0 0 5px 0;
    }
    
    .fields{
        padding-top: 10px;
    }

    #S3{
        font-size: 120%;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    #copyright{
        padding-top: 10px;
        font-size: 80%;
        color: #1b1b21;
    }

    #bottomElement{
        position: fixed;
        bottom: 15px;
        left: 0;
        margin-left: 2%;
        width: 95%;
        height: var(--menuHeight);
        background-color: rgba(145, 145, 145, 0.25);
        display: grid;
        place-content: end center;
        padding-bottom: 15px;
        gap: 7vw;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border-radius: 10px;
        border-width: 1px;
        border-color: #4b4b4b;
        border-style: solid;
        transition: 300ms ease-in-out;
    }

    #buttonCluster{
        display: grid;
        place-content: center;
        grid-template-columns: auto auto;
        gap: 7vw;
    }

    .bottomButton{
        width: 40vw;
        height: 37px;
        max-width: 200px;
        border-width: 0;
        border-radius: 3px;
        color: #05080d;
    }

    .save{
        animation: fadeIn;
        animation-duration: 300ms;
        animation-timing-function: ease-in-out;
        outline: none;
        background: none;
        border-width: 0;
        font-size: 100%;
        color: #fff;
        text-align: left;
    }
</style>

<main style="--menuHeight: {menuHeight}">
    <p id="S3">Spartiates Scouting System</p>

    {#each sections as name}
        <section class="sections">
            <p style="font-weight: 600">{name}</p>
            {#each Object.keys(template[name]) as field}
            <section class="fields">
                <p style="font-size: 80%;">{template[name][field].displayName}</p>
                {#if template[name][field].type === 'string'}
                    <input type="text" bind:value={clonnedJson[name][field].value}>
                {:else if template[name][field].type === 'number'}
                    <input type="number" bind:value={clonnedJson[name][field].value}>
                {:else if template[name][field].type === 'boolean'}
                    <input type="checkbox" bind:checked={clonnedJson[name][field].value}>
                    <p style="font-size: 60%;">*check if true, leave unchecked if false</p>
                {:else if template[name][field].type === 'selector'}
                    <select id="{field}" bind:value={clonnedJson[name][field].value}>
                        {#each template[name][field].options as option}
                            <option value="{option}">{option}</option>
                        {/each}   
                    </select>
                {/if}
            </section>
            {/each}
        </section>
    {/each}
    
    <p id="copyright">Spartiates &copy Copyright 2023 <br> Made with love by Nicky Ly & Charles Petit</p>

    <section id="bottomElement">
        {#if isSaveMenuOpen}
            {#each JSON.parse(localStorage.getItem('allSaves')) as save}
                <button class="save" on:click={() => openSave(save)}>{save}</button>
            {/each}
        {/if}
        <section id="buttonCluster">
            <button class="bottomButton" on:click={save}>Sauvegarder</button>
            <button class="bottomButton" on:click={openSaveMenu}>Modifier</button>
        </section>
    </section>
</main>