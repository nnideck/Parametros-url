


console.log("search", window.location.search);

const span = document.querySelector("span")

const value = window.location.search;
const searchParams = new URLSearchParams(value)



if (searchParams.has("id")) {
    console.log("id", searchParams.get("id"));
    const id = parseInt(searchParams.get("id")!);
    getStudent(id);
  }

  async function getStudent (id: number){
    const details = await fetch (`http://localhost:3500/listaAlunos/${id}`)
    const studentDetail = await details.json()
    console.log(studentDetail)
const detail =
JSON.stringify(studentDetail);
span!.textContent = detail
}

