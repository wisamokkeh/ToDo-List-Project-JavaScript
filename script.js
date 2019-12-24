var Notes = function (note, userDate, id) {
  this.note = note;
  this.userDate = userDate;
  this.id = id;
};
var id = 0;

var notes = [];
var addNote = document.getElementById("save");
//check if there history todo
if (!(localStorage.getItem("todoList") === null)) {
  notes = JSON.parse(localStorage.getItem("todoList"));
}
function save() {
  let note = document.getElementById("noteText").value;
  let todoDate = document.getElementById("userDate").value;
  let todoNote = new Notes(note, todoDate, id);
  if (!todoDate) {
    alert("you must to insert date and note");
    return;
  }
  if (!note) {
    alert("you must to insert date and note");
    return;
  }

  notes.push(todoNote);
  id++;
  localStorage.setItem("todoList", JSON.stringify(notes));
  filList(note, todoDate);
  function filList(note, todoDate) {
    let node = document.createElement("LI");
    let textnode = document.createTextNode(note);
    let datenote = document.createTextNode(todoDate);
    node.appendChild(textnode);
    node.appendChild(datenote);
    document.getElementById("showList").appendChild(node);
    function createButton() {
      let new_button = document.createElement("button");
      new_button.classList.add(
        "btn",
        "btn-danger",
        "btn-sm",
        "float-right",
        "float-top"
      );
      new_button.innerHTML = "&#10006;";
      return new_button;
    }
    let new_button = createButton();
    new_button.addEventListener("click", complete);
    node.appendChild(new_button);
  }
  //delete the tasks
  function complete() {
    $(this)
      .parent()
      .remove()
      .localStorage.removeItem();
  }
}
