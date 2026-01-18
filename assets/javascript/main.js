const guerreirosContainer = document.getElementById('GuerreiroList')
const addGuerreiro = document.getElementById('addButton')
const buscarButton = document.getElementById('botaoBuscar')
const addScreen = document.getElementById('addScreen')
const formGuerreiro = document.getElementById('formGuerreiro')
const NOMES_COM_COR_DEDICADA = ["goku", "vegeta","gohan","Cell"]

const limit = 2
let offset = 0

function convertGuerreiroToLi(Guerreiro){
let classeBase = '';
const nomeSemMaius = Guerreiro.name.replace(/\s/g, '').toLowerCase(); 
const nomeOriginal = traduzir(nomeSemMaius);
const racaSemEspaco = Guerreiro.race.replace(/\s/g, '').toLowerCase(); 
const racaTraduzida = traduzir(racaSemEspaco);

if (NOMES_COM_COR_DEDICADA.includes(nomeOriginal)) {
    classeBase = nomeOriginal;
} else {
    
    classeBase = racaSemEspaco;
}
const classeCSS = classeBase
    .toLowerCase()
    .replace(/[^a-z]+/g, '');

    return `<li onclick="buscar('${Guerreiro.id}')" class="Guerreiro ${classeCSS}">
                <span class="name">${nomeOriginal}</span>
                <div class="detail">
                <ol class="stats">
                    <li class="stat ${classeCSS}"> ${traduzir(Guerreiro.gender)}</li>
                    <li class="stat ${classeCSS}">${racaTraduzida}</li>
                </ol>
                <img src="${Guerreiro.imagemUrl}" 
                alt="${Guerreiro.name}"></div>
             </li>
    `
}

function loadGuerreiros(offset , limit){
    guerreiroapi.getGuerreiro(offset , limit).then((guerreirosArray)=> {

    guerreirosContainer.innerHTML += guerreirosArray.map(convertGuerreiroToLi).join('')
    })
}
function addButton(){
addScreen.classList.remove('hidden');
}

formGuerreiro.addEventListener('submit', (event) => {
    event.preventDefault(); 

    
    const novoGuerreiro = {
        name: document.getElementById('name').value,
        race: document.getElementById('race').value,
        gender: document.getElementById('gender').value,
        description: document.getElementById('description').value,
        imagemUrl: document.getElementById('imagemUrl').value
    };

   
    fetch('http://localhost:5019/api/person', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoGuerreiro) 
    })
    .then(response => {
        if (response.ok) {
            alert('Guerreiro adicionado com sucesso!');
            formGuerreiro.reset(); 
            location.reload(); 
        } else {
            alert('Erro ao adicionar guerreiro');
        }
    })
    .catch(error => console.error('Erro na requisição:', error));
});

function buscar(id) {

    const url = `http://localhost:5019/api/person/${id}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data=> {
            console.log(data);
        })
        .catch(error => {
            console.error("Erro ao buscar detalhes:", error);
            alert("Não foi possível carregar os detalhes deste guerreiro.");
        });
        window.open(`http://localhost:5019/api/person/${id}`, '_blank');
}
loadGuerreiros(offset, limit);
