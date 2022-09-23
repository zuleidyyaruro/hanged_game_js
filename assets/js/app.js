
let numRandom;
let letter;
let chosenWord;
let index;
let countWrongLetters = 0;
const arrayWords = ["ABA"];

const main = document.querySelector("main");
const btnStartgame = document.querySelector("#btn-start-game");
const btnAddWord = document.querySelector("#btn-add-word");

const addNewWord = () => {
    // función para implementar en el onclick del boton 'add-new-word'
    main.innerHTML = `
        <form onsubmit="event.preventDefault()">

            <div>
                <input type="text" maxlength=10 placeholder="enter a new word">
            </div>

            <div>
                <button class='btn' id='btn-save' onclick='saveNewWord()'>save and start</button>
                <button class='btn' id='btn-cancel' onclick='cancelNewWord()'>cancel</button>
            </div>

        </form>
    `;

}

const saveNewWord = () => {
    // función que almacena una nueva palabra sin persistencia
    const inputValue = document.querySelector("input");

    if (inputValue.value.length > 3) {
        arrayWords.push((inputValue.value).toUpperCase());
        showHanged();
    } else {
        Swal.fire("Please, write a longer word");
    }

}

const cancelNewWord = () => {
    //  cancelar al ingresar una nueva palabra
    main.innerHTML = `
        <button class="btn" id="btn-start-game" onclick="showHanged()">start Game</button>
        <button class="btn" id="btn-add-word" onclick="addNewWord()">add new word</button>
    `;

}

const chooseSecretWord = () => {

    numRandom = Math.floor(Math.random() * arrayWords.length);
    return arrayWords[numRandom].split('');

}

const showHanged = () => {

    chosenWord = chooseSecretWord();

    main.classList.remove("main");
    main.classList.add("main-another");
    main.innerHTML = `
            <div>
                <img class='horca' src="./assets/img/horca.png" alt="line">
            </div>
            <div id='container-lines' >
            </div>
            <div id='wrong-letter'>
            </div>
    `;


    const containerLines = document.querySelector("#container-lines");

    for (let i = 0; i < chosenWord.length; i++) {
        containerLines.innerHTML += `
                <img class="line ${'line-' + i}" src="./assets/img/line.png" alt="line">     
         `;
    }
}


window.onkeypress = function (event) {

    letter = (event.key).toUpperCase();

    const containerLines = document.querySelector("#container-lines");

    if (/[^A-ZÑ]/.test(letter)) {
        return
    }

    let wordFinded = chosenWord.includes(letter);

    if (wordFinded) {

        for (let i = 0; i < chosenWord.length; i++) {

            if (chosenWord[i] === letter) {

                let indexWordRepeat = i;

                index = chosenWord.findIndex(item => item === letter);

                if (indexWordRepeat !== index) {
                    index = chosenWord.findIndex(item => item === letter);
                }

                const newItem = document.createElement("span");
                newItem.innerText = letter;

                let line = document.querySelector(`.line-${indexWordRepeat}`);


                if (containerLines.children[i].textContent !== letter) {
                    containerLines.insertBefore(newItem, line);
                    containerLines.removeChild(line);
                }

            }

        }

        const ar = [...containerLines.children]

        let count = 0;

        for (let i = 0; i < ar.length; i++) {

            if (ar[i].textContent === letter) {
                count += 1;
            }
        }

    } else {

        countWrongLetters += 1;

        let wrongLetter = document.querySelector('#wrong-letter');

        if (countWrongLetters > 4) {

            swal.fire({
                title: "You loose!",
                text: `The correct word is ${chosenWord.join('')} `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: "New Game",
                cancelButtonText: "Principal Menú",
                buttonsStyling: false
            })
                .then(resultado => {
                    if (resultado.value) {
                        showHanged();
                    } else {
                        // Dijeron que no
                        window.location.href = './index.html'
                    }
                });
        }

        wrongLetter.innerHTML += `
                    <span> ${letter}</span >
            `

    }



}


