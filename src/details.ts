


console.log("search", window.location.search);

const span = document.querySelector("span")
const h5Title = document.querySelector("h5")
const firstInfo = document.querySelector (".li-1")
const secInfo = document.querySelector (".li-2")
const thirInfo = document.querySelector (".li-3")
const fourInfo = document.querySelector (".li-4")
const ulDetails = document.querySelector(".ulDetails")
const nextButton = document.querySelector(".next-a")
const prevButton = document.querySelector(".prev-a")

const value = window.location.search;
const searchParams = new URLSearchParams(value)

interface Ifaltas {
  matematica: number;
  portugues: number;
  historia: number;
  geografia: number;
  fisica: number;
  quimica: number;
  linguas: number;
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

interface IstudentData {
  id: string,
  nome: string,
  turma: string,
  notas: Inotas,
  faltas: Ifaltas
}

let urlId:number = 0


if (searchParams.has("id")) {
    console.log("id", searchParams.get("id"));
    const id = parseInt(searchParams.get("id")!);
    getStudent(id);
    urlId = id
  }

  async function getStudent (id: number){
    const details = await fetch (`http://localhost:3500/listaAlunos/${id}`)
    const studentDetail = await details.json()
    console.log(studentDetail)
if (id == studentDetail.id){
  console.log()
const notas: Inotas = {
  matematica: studentDetail.notas.matematica,
  portugues: studentDetail.notas.portugues,
  geografia:studentDetail.notas.geografia,
  fisica: studentDetail.notas.fisica,
  quimica: studentDetail.notas.quimica,
  linguas: studentDetail.notas.linguas,
}

const faltas: Ifaltas = {
  matematica: studentDetail.faltas.matematica,
  portugues: studentDetail.faltas.portugues,
  geografia:studentDetail.faltas.geografia,
  fisica: studentDetail.faltas.fisica,
  quimica: studentDetail.faltas.quimica,
  linguas: studentDetail.faltas.linguas,
}


h5Title!.innerHTML = 
 `<b>Nome</b>:</b>  ${studentDetail.nome}`

 firstInfo!.innerHTML =  `<b>Id</b>: ${studentDetail.id}`
 secInfo!.innerHTML = `<b>Turma</b>: ${studentDetail.turma}`

 thirInfo!.innerHTML =
` <b>Notas</b>:
<br>Matemática: ${notas.matematica}</br>
 Português: ${notas.portugues}
 <br>Geografia: ${notas.geografia}</br>
 Física: ${notas.fisica}
 <br>Química: ${notas.quimica}</br>
 Línguas: ${notas.linguas}`

 fourInfo!.innerHTML =
`<b>Faltas</b>: 
 <br>Matemática: ${faltas.matematica}</br>
 Português: ${faltas.portugues}
 <br>Geografia: ${faltas.geografia}</br>
 Física: ${faltas.fisica}
 <br>Química: ${faltas.quimica}</br>
 Línguas: ${faltas.linguas}`
  

}
else {
  h5Title!.textContent = "Student not found"
  ulDetails!.remove()
}}


function nextDetail() {
 nextButton.href = `details.html?id=${urlId + 1}`
}

nextButton!.addEventListener("click", nextDetail)

function prevDetail() {
  prevButton.href = `details.html?id=${urlId - 1}`
 }
 
 prevButton!.addEventListener("click", prevDetail)
