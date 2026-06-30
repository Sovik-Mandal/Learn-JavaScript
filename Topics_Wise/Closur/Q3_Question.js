function startWithCapitalLetter(str) {
    return str.length > 0 && str[0] === str[0].toUpperCase();
}

const responce = startWithCapitalLetter("Sovik")
console.log(responce);