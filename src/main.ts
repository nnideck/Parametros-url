enum Materias {
  matematica = "Matemática",
  portugues = "Português",
  historia = "História",
  geografia = "Geografia",
  fisica = "Física",
  quimica = "Química",
  linguas = "Línguas",
}

//*crio as interfaces para todos os objetos que receberei da API
interface Ialuno {
  id: number;
  nome: string;
  turma: number;
  notas: Inotas;
  faltas: Ifaltas;
}

interface Inotas {
  matematica: number[];
  portugues: number[];
  historia: number[];
  geografia: number[];
  fisica: number[];
  quimica: number[];
  linguas: number[];
}

interface Ifaltas {
  matematica: number;
  portugues: number;
  historia: number;
  geografia: number;
  fisica: number;
  quimica: number;
  linguas: number;
}

interface Iturmas {
  id: number;
  name: string;
}

//*crio uma interface que permitirá eu combinar diferentes filtros no momento da busca
interface Ifilter {
  classe: number;
  name: string;
  id: number;
}

//*crio uma let que receberá o valor de cada filtro (inputs)
let filter:Ifilter = {
  classe: 0 ,
  name: "",
  id: 0
}


//* já faço a seleção dos elementos com os quais terei interação no HTML
const listUl = document.querySelector(".list-1");
const button = document.querySelector("button");
const select = document.querySelector(".class-select");
const inputName = document.querySelector(".input");
const inputId = document.querySelector(".inputId");
const buttonClear = document.querySelector(".clear");
const spanError = document.querySelector(".span-1")
const pagination = document.querySelector(".nav-pagination")


//*crio uma let vazia, que será preenchida na função a seguir
let classList: Iturmas[] = [];

//*função primária: para carregar a lista de turmas da API
async function getClasses() {
  const resp = await fetch("http://localhost:3500/listaTurmas");
  const classes = await resp.json();
  //*preencho a let aberta, para que eu possa utilizar estes dados em outro momento também
  classList = classes;
  //* invoco a função de popular o elemento select do HTML com a lista de turmas que acabei de carregar
  populateSelect(classes);
  //getStudents()
}
//*por ser uma função necessária para o funcionamento de todo o resto, já a invoco
getClasses();


//* função que coletará os dados da lista de turma carregada e populará o select. Aqui digo que o que estou recebendo é um parâmetro do tipo array de Iturmas
async function populateSelect(list: Iturmas[]) {
  //* checagem: SE recebi a lista
  if (list) {
    //*loop por cada objeto da lista
    for (const obj of list) {
      //*coleto o nome da turma - que será usado como texto do option
      const className = obj.name;
      //*crio um novo elemento de option
      const newOption = document.createElement("option");
      //*informo que o texto deste option será o nome da turma correspondente
      newOption.text = className;
      //* informo que o value deste option será o id da turma correspondente
      newOption.value = String(obj.id);
      //*insiro meu option criado como append child do select existente no html
      select!.appendChild(newOption);
    }
  }
  //*para chamar a lista de alunos completa assim que abro o site, sem depender dos filtros
  getStudents(filter)
}

//* OPÇÃO 1: função para pegar a informação da Turma selecionada vinda do select quando mudo a seleção do select
//*essa mudança de seleção é definido como um tipo 'event'
function getSelect(event: Event) {
  //*guardo numa variável a informação referente ao ID (value) da seleção feita (option). O value eu mesma setei, ao criar a option na função acima
  const classID = (event.target! as HTMLInputElement) .value;
  //* caso haja algum valor na mudança do select
  if(event){
    //*mudo a classe da minha let filter (criada lá em cima) com o valor do id da option
    filter.classe = parseInt(classID)
  } 
    //*invoco a função getStudent informando como parâmetro o pacote inteiro do filtro. Isso permite que eu "acumule" as informações obtidas nos filtros
  getStudents(filter)
  }


//*OPÇÃO 2: função para pegar as informações dos dados do option, quando clico no botão
function buttonGetSelect() {
  //*guardo numa variável a informação referente ao ID (value) da seleção feita (option). O value eu mesma setei, ao criar a option na função acima
  const classID: number = parseInt((select! as HTMLInputElement).value);
  //*se o value é 0, ou seja, quando está selecionada a option "All". Este value 0 eu inputei direto no HTML, junto do primeiro option
  if (classID == 0) {
     //*invoco a função getStudents sem passar nenhum parametro pra ela, pois quero mostrar a lista completa
    getStudents(filter);
      //* se o value é diferente de 0
  } else {
        //*invoco a função informando como parâmetro o id que acabei de coletar
        filter.classe = classID
    getStudents(filter);
  }
}

//*Aqui escolhi a Opção 1 Linko a função à atividade "change" do select
select?.addEventListener("change", getSelect)


//*  aqui no caso de escolher a Opção 2. Portanto, linkei ao click do button invocar a função
//button!.addEventListener("click", buttonGetSelect);

//* crio uma função para coletar o valor indicado no campo do nome do aluno
function getInput(nameInput){
  //*guardo o value deste input (texto obtido) em uma variável
  const text = (inputName as HTMLInputElement).value;
  //*caso tenha recebido algum valor
if(nameInput){
  //*mudo o name da minha let filter (criada lá em cima) com o texto obtido no input
  filter.name = text
}
//*invoco a função getStudent informando como parâmetro o pacote inteiro do filtro - a fim de acumular as infos já inseridas
getStudents(filter)
}
//* linko a função getInput ao campo lá do HTML. Tipo de interação (search)
inputName?.addEventListener('search', getInput)


//* crio uma função para coletar o valor indicado no campo do id do aluno
function getId(idInput){
  //*guardo o value deste input (texto obtido) em uma variável
  const text = (inputId as HTMLInputElement).value;
  //*caso tenha recebido algum valor
if(idInput){
  //*mudo o name da minha let filter (criada lá em cima) com o texto obtido no input, mudando ele para number (conforme interface)
  filter.id = parseInt(text)
} 
//*invoco a função getStudent informando como parâmetro o pacote inteiro do filtro - a fim de acumular as infos já inseridas
getStudents(filter)
}
//* linko a função getInput ao campo lá do HTML. Tipo de interação (search)
inputId?.addEventListener('search', getId)


//*crio uma função para carregar a lista de alunos, que recebe como parâmetro uma informação do tipo Ifilter
//* aqui já divido as infos recebida (classe, name, id) para utiliza-las separadamente em seguida
//*deixo como default que o parametro a receber será vazio - justamento pois posso ou não recebê-lo (no caso de carregar a lista completa)
async function getStudents({classe, name, id}: Ifilter , page = 1 , param: any = "") {
  //*crio uma let com o endereço da API, pois sei que ela poderá ser modificada
  let url = `http://localhost:3500/listaAlunos?_sort=nome&_limit=7&_page=${page}`;
  //* SE alguma informação veio como parâmetro na classe
  if (classe != 0) {
    //*acrescento na let as informações para que o endereço da API já filtre o que preciso
    url += `&turma=${classe}`;
  }
  //* SE alguma informação veio como parâmetro no name
  if (name) {
    //*acrescento na let as informações para que o endereço da API já filtre o que preciso
    url += `&nome_like=${name}`
  }
   //* SE alguma informação veio como parâmetro no id
  if (id != 0) {
    //*acrescento na let as informações para que o endereço da API já filtre o que preciso
    url += `&id=${id}`;
  }
  //*inicio meu fetch - utilizando a URL modificada ou não
  const list = await fetch(url);
  const listStudents = await list.json();
  const totalCount = parseInt(list.headers.get('X-Total-Count') || "0");

      chargeList(listStudents)
      createPagination(totalCount, page)

  
  //*passo minha lista de estudantes recebidas (filtradas ou não) para a função que as carregará na tela
  //chargeList(listStudents);
}

//*função para carregar na tela as informações dos estudantes
//* o que recebo como parâmetro é uma lista do tipo array de Ialuno
async function chargeList(students: Ialuno[]) {
  //*crio uma let que será preenchida a seguir
  let studentsList = [];
  //*checagem: SE recebi a lista
  if (students) {
    //*faço um loop por todos os alunos (objects dentro do array)
    for (const student of students) {
      //*guardo numa variável a informação da turma, considerando a função FIND.
      //* Ou seja: faço uma busca na lista de turmas e lanço a função:
      //* (t) => t.id == student.turma, que significa: quando o id (number) do t (cada objeto contido no array da lista de turmas) for igual ao number indicado na
      //* turma do estudante da rodada, retornarei TRUE para o find. O find coleta o OBJETO do array cujo id corresponde à turma do aluno.
      const classe = classList.find((t) => t.id == student.turma);
  //*guardo numa variável a informação do nome do aluno
      const name = student.nome;
      //*guardo numa variável a informação do id do aluno
      const id = student.id;
      //* aqui dito que para todos estudantes encontrados do loop serão inseridos no array, que criei no início da função, o texto em HTML referente à um novo <li> já com todos os atributos settados
      //* no texto do HTML crio referência para o id e nome do aluno, e o nome da classe, que coletei no find acima - e também para o href de details da página derivada
      //*Uso "+=" pois sempre ADICIONAREI o texto. Usando só "=" eu substituiria
      studentsList += `<li class="list-group-item d-flex justify-content-between align-items-start li-1">
  <div class="ms-2 me-auto">
    <div class="fw-bold">Student:<a href="details.html?id=${id}" class="name"> ${name}</a></div>
    <span class="classe">class: ${classe?.name}  |</span>
    <span class="id">id: ${id}</span>
  </div>
</li>
`
    }
  }
  //*adicino no meu UL do HTML, com innerHTML, a lista de estudantes que acabei de carregar. Isto faz com que cada aluno vire um LI renderizado.
  listUl!.innerHTML = studentsList;
}

function createPagination (totalCount: number, actualPage: number){
 const totalPages = Math.ceil(totalCount/7)

 const ulPagination = document.createElement ("ul")
 ulPagination.classList.add ("pagination")

 const liPrev = document.createElement("li");
 const aPrev = document.createElement("a")
 aPrev.setAttribute ("href", "#");
 aPrev.classList.add("page-link")
 liPrev.classList.add ("page-item")
 aPrev.textContent = "Previous"
 if (actualPage > 1){
  liPrev.onclick = () => {getStudents(filter,actualPage - 1)}
 }
 liPrev.appendChild(aPrev)
 ulPagination.appendChild(liPrev)

for ( let i = 1 ; i <= totalPages; i++){
  const liPage = document.createElement("li");
  const aPage = document.createElement("a")
  aPage.setAttribute ("href", "#");
  aPage.classList.add("page-link")
  liPage.classList.add("page-item");
  aPage.textContent = `${i}`
  liPage.appendChild(aPage)
  ulPagination.appendChild(liPage)
  if (i != actualPage){
    liPage.onclick = () => {getStudents(filter, i)}
   }
   else {aPage.classList.add("active")}
 } 
 const liNext = document.createElement("li");
 const aNext = document.createElement("a")
 aNext.setAttribute ("href", "#");
 aNext.classList.add("page-link")
 liNext.classList.add("page-item");
 aNext.textContent = "Next"
 if (actualPage < totalPages){
  liNext.onclick = () => {getStudents(filter,actualPage + 1)}
 }
 liNext.appendChild(aNext)
 ulPagination.appendChild(liNext)

 
 pagination!.innerHTML = ""
 pagination!.appendChild(ulPagination)

}



//*função para o botão de limpar todos os campos
function clearAll(){
(inputName as HTMLInputElement).value = "";
(select as HTMLInputElement).value = "0";
(inputId as HTMLInputElement).value = "";
filter = {
  classe: 0,
  name: "",
  id: 0}
getStudents(filter)
}
buttonClear?.addEventListener("click", clearAll)

