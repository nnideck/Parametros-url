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


//* já faço a seleção dos elementos com os quais terei interação no HTML
const listUl = document.querySelector(".list-1");
const button = document.querySelector("button");
const select = document.querySelector(".class-select");

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
      newOption.value = obj.id;
      //*insiro meu option criado como append child do select existente no html
      select!.appendChild(newOption);
    }
  }
}

//* OPÇÃO 1: função para pegar a informação da Turma selecionada vinda do select quando mudo a seleção do select
//*essa mudança de seleção é definido como um tipo 'event'
function getSelect(event: Event) {
  //*guardo numa variável a informação referente ao ID (value) da seleção feita (option). O value eu mesma setei, ao criar a option na função acima
  const classID = event.target!.value;
  //*se o value é 0, ou seja, quando está selecionada a option "All". Este value 0 eu inputei direto no HTML, junto do primeiro option
  if (classID == 0) {
    //*invoco a função getStudents sem passar nenhum parametro pra ela, pois quero mostrar a lista completa
    getStudents();
  //* se o value é diferente de 0
  } else {
    //*invoco a função informando como parâmetro o id que acabei de coletar
    getStudents(classID);
  }
}

//*OPÇÃO 2: função para pegar as informações dos dados do option, quando clico no botão
function buttonGetSelect() {
  //*guardo numa variável a informação referente ao ID (value) da seleção feita (option). O value eu mesma setei, ao criar a option na função acima
  const classID = select!.value;
  //*se o value é 0, ou seja, quando está selecionada a option "All". Este value 0 eu inputei direto no HTML, junto do primeiro option
  if (classID == 0) {
     //*invoco a função getStudents sem passar nenhum parametro pra ela, pois quero mostrar a lista completa
    getStudents();
      //* se o value é diferente de 0
  } else {
        //*invoco a função informando como parâmetro o id que acabei de coletar
    getStudents(classID);
  }
}

//*Aqui escolhi a Opção 2. Portanto, linkei ao click do button invocar a função
button!.addEventListener("click", buttonGetSelect);

//*aqui no caso de escolher a Opção 1. Linko a função à atividade "change" do select
//select?.addEventListener("change", getSelect)


//*crio uma função para carregar a lista de alunos, que recebe como parâmetro a informação inputada no select
//*deixo como default que o parametro a receber será vazio - justamento pois posso ou não recebê-lo
async function getStudents(param = "") {
  //*crio uma let com o endereço da API, pois sei que ela poderá ser modificada
  let url = `http://localhost:3500/listaAlunos?_sort=nome`;
  //* SE alguma informação veio como parâmetro
  if (param) {
    //*acrescento na let as informações para que o endereço da API já filtre o que preciso. Aqui to colocando que a turma deverá ser a indicada no select
    url += `&turma=${param}`;
  }
  //*inicio meu fetch - utilizando a URL modificada ou não
  const list = await fetch(url);
  const listStudents = await list.json();
  
  //*passo minha lista de estudantes recebidas (filtradas ou não) para a função que as carregará na tela
  chargeList(listStudents);
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
      //!guardo numa variável a informação da turma, considerando a função FIND.
      //* Ou seja: faço uma busca na lista de turmas e lanço a função:
      //* (t) => t.id == student.turma, que significa: quando o id (number) do t (cada objeto contido no array da lista de turmas) for igual ao number indicado na
      //* turma do estudante da rodada, retornarei TRUE para o find. O find coleta o OBJETO do array cujo id corresponde à turma do aluno.
      //!por que nao consigo usar algo como enum aqui?
      const classe = classList.find((t) => t.id == student.turma);
  //*guardo numa variável a informação do nome do aluno
      const name = student.nome;
      //*guardo numa variável a informação do id do aluno
      const id = student.id;
      //* aqui dito que para todos estudantes encontrados do loop serão inseridos no array que criei no início da função o texto tem HTML referente à um novo <li> já com todos os atributos settados
      //* no texto do HTML crio referência para o id e nome do aluno, e o nome da classe, que coletei no find acima
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


//* exercicio filtros
//* adicione um campo para busca por nome e um select para selecionar a turma na tela de listagem
//* crie uma lista de turmas dentro do nosso arquivo json
//* substitua as turmas de cada aluno pelo id da turma correspondente na lista de turmas
//* cria uma função para carregar a lista de turmas
//* crie uma função para popular o select com as turmas carregadas
//* guarde a lista de turmas carregada em uma variavel separada para ser usada mais tarde
//* carregue a lista de estudantes apos carregar a lista de turmas
//* ajuste a função de mostrar a lista de estudantes para mostrar a turma correspondente
//* crie uma função para ser chamada sempre que o select de turma for alterado
//* link essa função ao select (pode fazer isso dentro da função que popula o selct)
//* pegue o valor selecionado no select
//* passe esse valor do select como filtro para trazer a lista de alunos (de acordo com a turma selecionada)
