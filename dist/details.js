"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("search", window.location.search);
const span = document.querySelector("span");
const h5Title = document.querySelector("h5");
const firstInfo = document.querySelector(".li-1");
const secInfo = document.querySelector(".li-2");
const thirInfo = document.querySelector(".li-3");
const fourInfo = document.querySelector(".li-4");
const ulDetails = document.querySelector(".ulDetails");
const nextButton = document.querySelector(".next-a");
const prevButton = document.querySelector(".prev-a");
const value = window.location.search;
const searchParams = new URLSearchParams(value);
let urlId = 0;
if (searchParams.has("id")) {
    console.log("id", searchParams.get("id"));
    const id = parseInt(searchParams.get("id"));
    getStudent(id);
    urlId = id;
}
function getStudent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const details = yield fetch(`http://localhost:3500/listaAlunos/${id}`);
        const studentDetail = yield details.json();
        console.log(studentDetail);
        if (id == studentDetail.id) {
            console.log();
            const notas = {
                matematica: studentDetail.notas.matematica,
                portugues: studentDetail.notas.portugues,
                geografia: studentDetail.notas.geografia,
                fisica: studentDetail.notas.fisica,
                quimica: studentDetail.notas.quimica,
                linguas: studentDetail.notas.linguas,
            };
            const faltas = {
                matematica: studentDetail.faltas.matematica,
                portugues: studentDetail.faltas.portugues,
                geografia: studentDetail.faltas.geografia,
                fisica: studentDetail.faltas.fisica,
                quimica: studentDetail.faltas.quimica,
                linguas: studentDetail.faltas.linguas,
            };
            h5Title.innerHTML =
                `<b>Nome</b>:</b>  ${studentDetail.nome}`;
            firstInfo.innerHTML = `<b>Id</b>: ${studentDetail.id}`;
            secInfo.innerHTML = `<b>Turma</b>: ${studentDetail.turma}`;
            thirInfo.innerHTML =
                ` <b>Notas</b>:
<br>Matemática: ${notas.matematica}</br>
 Português: ${notas.portugues}
 <br>Geografia: ${notas.geografia}</br>
 Física: ${notas.fisica}
 <br>Química: ${notas.quimica}</br>
 Línguas: ${notas.linguas}`;
            fourInfo.innerHTML =
                `<b>Faltas</b>: 
 <br>Matemática: ${faltas.matematica}</br>
 Português: ${faltas.portugues}
 <br>Geografia: ${faltas.geografia}</br>
 Física: ${faltas.fisica}
 <br>Química: ${faltas.quimica}</br>
 Línguas: ${faltas.linguas}`;
        }
        else {
            h5Title.textContent = "Student not found";
            ulDetails.remove();
        }
    });
}
function nextDetail() {
    nextButton.href = `details.html?id=${urlId + 1}`;
}
nextButton.addEventListener("click", nextDetail);
function prevDetail() {
    prevButton.href = `details.html?id=${urlId - 1}`;
}
prevButton.addEventListener("click", prevDetail);
