let selectCharacterOne = document.getElementById("selectCharacterOne");
let selectCharacterTwo = document.getElementById("selectCharacterTwo");
const buttonShowCharacters = document.getElementById("buttonShowCharacters");
const buttonRestart = document.getElementById("buttonRestart");
let mainWindow = document.getElementById("mainWindow");

selectCharacterOne.addEventListener("click" , () => {
  selectCharacterOne.value = selectCharacterOne.value;
})
selectCharacterTwo.addEventListener("click" , () => {
  selectCharacterOne.value = selectCharacterOne.value;
})

let characterOne;
let characterTwo;
let currentCharacter;

class Characters {
  constructor(name, gender, height, mass, hair_color, pictureUrl){
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hair_color = hair_color;
    this.pictureUrl = pictureUrl;
  }
  checkOtherWeight(char, messWindow){
    if(char == characterOne){
      currentCharacter = characterOne;
      if(+currentCharacter.mass < +characterTwo.mass){
        let difference = characterTwo.mass - currentCharacter.mass;
        messWindow.innerText = `Jag är lättare! ${characterTwo.name} väger ${characterTwo.mass} kg och jag väger ju bara ${currentCharacter.mass}.
        ${characterTwo.name} väger ${difference}kg mer än mig!`;
      }
      else if (+currentCharacter.mass == +characterTwo.mass){
        messWindow.innerText = `Oj, jag och ${characterTwo.name} är lika tunga :)`;
      }
      else{
        let difference = currentCharacter.mass - characterTwo.mass;
        messWindow.innerText = `Jag är viss tyngre än ${characterTwo.name}..
          Hela ${difference}kg tyngre....... :(`;
      }
    }
    ////////////////////////////////////////////////////////////////////////
    else{
      currentCharacter = characterTwo;
      if(+currentCharacter.mass < +characterOne.mass){
        messWindow.innerText = `Jag är lättare! ${characterOne.name} väger ${characterOne.mass} kg och jag väger ju bara ${currentCharacter.mass}!`;
      }
      else if (+currentCharacter.mass == +characterOne.mass){
        messWindow.innerText = `${characterOne.name} och jag är exakt lika tunga..`;
      }
      else{
        messWindow.innerText = `Jag är viss tyngre än ${characterOne.name}:(`
      }
    }
 
  }
  checkOtherHeight(char, messWindow){
    if(char == characterOne){
      currentCharacter = characterOne;
      if(+currentCharacter.height < +characterTwo.height){
        let difference = characterTwo.height - currentCharacter.height;
        messWindow.innerText = `${characterTwo.name} är ${characterTwo.height} cm lång och är då ${difference} cm längre än mig :(`;
      }
      else if (+currentCharacter.height == +characterTwo.height){
        messWindow.innerText = `Jag är lika lång som ${characterTwo.name}`;
      }
      else{
        let difference = currentCharacter.height - characterTwo.height;
        messWindow.innerText = `Jag är ${currentCharacter.height} cm lång, vilket gör mig ${difference} cm längre än ${characterTwo.name} här.`;
      }
    }
    ////////////////////////////////////////////////////////////////////////
    else{
      currentCharacter = characterTwo;
      if(+currentCharacter.height < +characterOne.height){
        messWindow.innerText = `Jag är kortare! ${characterOne.name} är ${characterOne.height} cm och jag är bara ${currentCharacter.height}!`;
      }
      else if (+currentCharacter.height == +characterOne.height){
        messWindow.innerText = `Vi är exakt lika långa..`;
      }
      else{
        messWindow.innerText = `Jag är längre än ${characterOne.name}:)`;
      }
    }
  }
  checkOtherHairColor(char, messWindow){
    if(char == characterOne){
      currentCharacter = characterOne;
      if(currentCharacter.hair_color === "Inget hår" && characterTwo.hair_color === "Inget hår"){
        messWindow.innerText = `Varken jag eller ${characterTwo.name} har hår.`;
      }
      else if(currentCharacter.hair_color == characterTwo.hair_color){
      messWindow.innerText = `${characterTwo.name} och jag har samma hårfärg.`;
      }
      else{
        if(characterTwo.hair_color == "Inget hår"){ 
          messWindow.innerText = `${characterTwo.name} har ${characterTwo.hair_color}...`;
        }
        else{
        messWindow.innerText = `${characterTwo.name}s hårfärg är ${characterTwo.hair_color}`;
        }
      }
    }
    ////////////////////////////////////////////////////////////////////
    else{
      currentCharacter = characterTwo;
      if(currentCharacter.hair_color == "Inget hår" && characterOne.hair_color == "Inget hår"){
        messWindow.innerText = `Vi har inget hår.`;
      }
      else if(currentCharacter.hair_color == characterOne.hair_color){
      messWindow.innerText = `Vi har samma hårfärg.`;
      }
      else{
        if(characterOne.hair_color == "Inget hår"){
          messWindow.innerText = `${characterOne.name} har ${characterOne.hair_color}...`;
        }
        else{
        messWindow.innerText = `${characterOne.name}s hårfärg är ${characterOne.hair_color}`;
        }
      }
    }
  }
  checkOtherGender(char, messWindow){
    if(char == characterOne){
      currentCharacter = characterOne;
      if(characterTwo.gender == currentCharacter.gender){
        messWindow.innerText = `${characterTwo.name} är också en ${characterTwo.gender}`;
      }
      else if(characterTwo.gender == "man"){
        messWindow.innerText = `${characterTwo.name} är en man`;
      }
      else if (characterTwo.gender == "kvinna"){
        messWindow.innerText = `${characterTwo.name} är en kvinna`;
      }
      else{
        messWindow.innerText = `${characterTwo.name} har inget`;
      }
    }
    else{
      currentCharacter = characterTwo;
      if(characterOne.gender == currentCharacter.gender){
        messWindow.innerText = `${characterOne.name} är en ${characterOne.gender} som jag`;
      }
      else if(characterOne.gender == "man"){
        messWindow.innerText = `${characterOne.name} är en man`;
      }
      else if (characterOne.gender == "kvinna"){
        messWindow.innerText = `${characterOne.name} är en ${characterOne.gender}`;
      }
      else{
        messWindow.innerText = `${characterOne.name} är en robot!`;
      }
    }
  }
}

buttonShowCharacters.addEventListener("click" , () => {
    buttonShowCharacters.classList.add("hide");
    buttonRestart.classList.remove("hide");
    let getCharacter = async (url) => {
    let response = await fetch (url);
    let jsonCharacterData = await response.json();
    charData = jsonCharacterData.results[0];
    return charData;
    }
    getCharacter(`https://swapi.dev/api/people/?search=${selectCharacterOne.value}`)
   .then(charData => {
     characterOne = new Characters (
      charData.name, charData.gender, charData.height, charData.mass, charData.hair_color, getCharacterImage(charData.name));
      createCharacterCard(characterOne)
    });
    getCharacter(`https://swapi.dev/api/people/?search=${selectCharacterTwo.value}`)
    .then(charData => {
      characterTwo = new Characters (
       charData.name, charData.gender, charData.height, charData.mass, charData.hair_color, getCharacterImage(charData.name));
       createCharacterCard(characterTwo)
     });
})
buttonRestart.addEventListener("click" , () => {
  location.reload();
})

function getCharacterImage(name){
  switch(name){
    case "Luke Skywalker": 
      return "url(../img/luke.jpg)";
    case "C-3PO":
      return "url(../img/c-3po.jpg)";
    case "R2-D2":
      return "url(../img/r2-d2.jpg)";
    case "Darth Vader":
      return "url(../img/darth-vader.jpg)";
    case "Leia Organa":
      return "url(../img/leia-organa.jpg)";
    case "Owen Lars":
      return "url(../img/owen-lars.jpg)";
    case "Beru Whitesun lars":
      return "url(../img/beru-whitesun-lars.png)";
    case "R5-D4":
      return "url(../img/r5-d4.jpg)";
  }
}

function createCharacterCard(character){

  let pictureDiv = document.createElement("div");
  pictureDiv.classList.add("picture-Div");
  pictureDiv.style.backgroundImage = `${character.pictureUrl}`;
  pictureDiv.style.backgroundSize = `cover`;

  let messageWindow = document.createElement("div");
  messageWindow.classList.add("message-Window");
  messageWindow.innerText = `Jag är ${character.name}`;

  let buttQuestWeight = document.createElement("button");
  buttQuestWeight.innerText = "Vad är den andre karaktärens vikt?";
  buttQuestWeight.classList.add("card-Button");

  let buttQuestHeight = document.createElement("button");
  buttQuestHeight.innerText = "Är den andre karaktären längre?";
  buttQuestHeight.classList.add("card-Button");

  let buttQuestHairColor = document.createElement("button");
  buttQuestHairColor.innerText = "Vad är den andra karaktärens hårfärg?";
  buttQuestHairColor.classList.add("card-Button");

  let buttQuestGender = document.createElement("button");
  buttQuestGender.innerText = "Vad är den andra karaktärens kön?";
  buttQuestGender.classList.add("card-Button");

  let characterCard = document.createElement("div");
  characterCard.classList.add("char-Card");
  characterCard.innerHTML = `
  <h2>${character.name}</h2>
  `
  characterCard.appendChild(pictureDiv);
  characterCard.appendChild(messageWindow);

  characterCard.appendChild(buttQuestWeight);
  characterCard.appendChild(buttQuestHeight);
  characterCard.appendChild(buttQuestHairColor);
  characterCard.appendChild(buttQuestGender);

  mainWindow.appendChild(characterCard);

  switch(character.hair_color){
    case "blond":
      character.hair_color = "blont";
      break;
    case "brown":
      character.hair_color = "brun";
      break;
    case "brown, grey":
      character.hair_color = "brunt med gråa inslag";
      break;
    case "none":
    case "n/a":
      character.hair_color = "Inget hår";
      break;
  }
  switch(character.gender){
    case "male":
      character.gender = "man";
      break;
    case "female":
      character.gender = "kvinna";
      break;
    case "n/a":
      character.gender = "Robot";
      break;
  }
  //////////EVENTLISTENERS FÖR KNAPPARNA////////////////////////7

  buttQuestWeight.addEventListener("click", () => {
    character.checkOtherWeight(character, messageWindow);
  })
  buttQuestHeight.addEventListener("click", () => {
    character.checkOtherHeight(character, messageWindow);
  })
  buttQuestHairColor.addEventListener("click", () => {
    character.checkOtherHairColor(character, messageWindow);
  })
  buttQuestGender.addEventListener("click", () => {
    character.checkOtherGender(character, messageWindow);
  })
  
}







