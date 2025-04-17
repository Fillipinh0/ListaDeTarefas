/** @type {HTMLInputElement} */
const inputTarefa = document.querySelector(".input-tarefa");

const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

inputTarefa.addEventListener("keydown", function(e) {
  if (e.key == "Enter") {
    if (!inputTarefa.value) return;
    criatarefa(inputTarefa.value);
    limpaInput();
  } 
});

btnTarefa.addEventListener("click" , function() {
  if (!inputTarefa.value) return;
  criatarefa(inputTarefa.value);
  limpaInput();
  
});

//Apagar tarefa 
// document.addEventListener("click", function(e) {
//   const el = e.target;
//   if (el.classList.contains("apagar")) {
//     el.parentElement.remove()
//   }
// });

function criaBotaoApagar(li){
  li.innerText += " ";
  const botaoApagar = document.createElement("button");
  botaoApagar.innerText = "Apagar";
  botaoApagar.classList.add("apagar");

  botaoApagar.addEventListener("click", function () {
    li.remove(); // Remove o elemento <li> correspondente
    salvarTarefas()
  });

  li.appendChild(botaoApagar);
}

function criatarefa(textoInput) {
  const li = document.createElement("li");
  li.innerText = textoInput;
  tarefas.appendChild(li);
  criaBotaoApagar(li);
  salvarTarefas()

}

function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

function salvarTarefas(){
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  console.log(tarefasJSON);
  localStorage.setItem("tarefas", tarefasJSON);
}

function adcionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas); 

  for (let tarefa of listaDeTarefas) {
    criatarefa(tarefa);
  }
}
adcionaTarefasSalvas();