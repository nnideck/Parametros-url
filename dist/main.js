"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Materias;
(function (Materias) {
    Materias["matematica"] = "Matem\u00E1tica";
    Materias["portugues"] = "Portugu\u00EAs";
    Materias["historia"] = "Hist\u00F3ria";
    Materias["geografia"] = "Geografia";
    Materias["fisica"] = "F\u00EDsica";
    Materias["quimica"] = "Qu\u00EDmica";
    Materias["linguas"] = "L\u00EDnguas";
})(Materias || (Materias = {}));
const listUl = document.querySelector(".list-1");
const button = document.querySelector("button");
function chargeList(students) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield fetch("http://localhost:3500/listaAlunos?_sort=nome");
        const listStudents = yield list.json();
        let studentsList = [];
        if (students) {
            for (const student of listStudents) {
                const name = student.nome;
                const classe = student.turma;
                const id = student.id;
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
`;
            }
        }
        listUl.innerHTML = studentsList;
    });
}
button.addEventListener("click", chargeList);
