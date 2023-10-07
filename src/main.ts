

/*
excluia os comandos de export no arquivo de lista de alunos
excluia os comandos de import do arquivo main.ts
mova todas as interfaces para o arquivo main.ts
transforme a lista de materias e a lista de alunos em um objeto com 2 propriedades (lista-materias, lista-alunos)
renomeie a extensão do arquivo lista-alunos.ts para .json e mova-o para um novo diretorio chamado data
no package.json, adicione o script:
  "json:server": "npx json-server -p 3500 ./data/lista-alunos.json -w",
na raiz do projeto, crie o arquivo api.rest para testar as apis (opcional)

exemplos para o arquivo rest:
    GET http://localhost:3500/lista-materias HTTP/1.1
    ###
    GET http://localhost:3500/lista-alunos HTTP/1.1
    ###
    GET http://localhost:3500/lista-alunos?_sort=nome HTTP/1.1

criar a função para carregar a lista de alunos
exiba na tela uma lista de alunos contendo
id, nome e turma
(criar uma função para criar o html com a lista de alunos)
*/


enum Materias {
  matematica = "Matemática",
  portugues = "Português",
  historia = "História",
  geografia = "Geografia",
  fisica = "Física",
  quimica = "Química",
  linguas = "Línguas",
  }

interface Ialuno {
nome: string;
turma: string;
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

  const listUl = document.querySelector(".list-1")
  const button = document.querySelector("button")

  async function chargeList (students: Ialuno[]){
const list = await fetch ("http://localhost:3500/listaAlunos?_sort=nome")
const listStudents = await list.json()
let studentsList = []
 if(students){
for (const student of listStudents){
const name = student.nome
const classe = student.turma
const id = student.id
studentsList +=
`<li
  class="list-group-item d-flex justify-content-between align-items-start li-1"
>
  <div class="ms-2 me-auto">
    <div class="fw-bold"><span class="name">Student: ${name}</span></div>
    <span class="classe">class: ${classe}  |</span>
    <span class="id">id: ${id}</span>
  </div>
</li>
`
  }}
listUl!.innerHTML = studentsList
}


button!.addEventListener("click", chargeList)
  


