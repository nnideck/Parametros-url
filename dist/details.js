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
const value = window.location.search;
const searchParams = new URLSearchParams(value);
if (searchParams.has("id")) {
    console.log("id", searchParams.get("id"));
    const id = parseInt(searchParams.get("id"));
    getStudent(id);
}
function getStudent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const details = yield fetch(`http://localhost:3500/listaAlunos/${id}`);
        const studentDetail = yield details.json();
        console.log(studentDetail);
        const detail = JSON.stringify(studentDetail);
        span.textContent = detail;
    });
}
