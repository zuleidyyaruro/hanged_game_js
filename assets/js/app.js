

const arrayWords = ["JIRAFA", "AMIGO", "CASA"];

// referencias html
const inputValue = document.querySelector("input");

const saveWord = () => {

    if (inputValue.value.length > 3) {
        arrayWords.push((inputValue.value).toUpperCase());
        inputValue.value = "";
        // window.location.hred redirige a la ruta deseada
        window.location.href = "/new-game.html";
    } else {
        Swal.fire("Please, write a longer word");
    }
    console.log(arrayWords);
}

