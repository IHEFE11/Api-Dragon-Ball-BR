const traducoes = {
  female: "Mulher",
  male: "Homem",
  saiyan: "Saiyajin",
  human: "Humano",
  android: "Androide",
  namekian: "Namekuseijin",
  friezarace: "Guerreiros do Freeza",
  celula: "Cell",
  freezer: "Freeza",
  krillin: "Kuririn",
  nucleicobenigno: "Kaioshin",
  god: "Deus",
  angel: "Anjo"
};
const traduzir = (texto) => {
  return traducoes[texto] || texto;
}; 

const guerreiroapi = {}

guerreiroapi.getGuerreiro = (offset, limit) => {
  const promessas = [];

  for (let i = (offset + 1); i <= (offset + limit); i++) {
  const element = i;
  console.log(i)
  const url = `http://localhost:5019/api/person/${element}`
  promessas.push(fetch(url)
    .then((response) => response.json()) 
    .catch((error) => console.error("Erro ao carregar ou processar dados:", error)
      )
    );
    
  }
  return Promise.all(promessas)
      .then((guerreiros) => guerreiros.filter(g => g !== null));
}
