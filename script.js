var todoList, id;
window.onload = () => {
    todoList = JSON.parse(localStorage.getItem("todoList"));


    id = +localStorage.getItem("index")
    if (todoList) {
        for (let i = 0; i < todoList.length; i++) {
            filList(todoList[i].note, todoList[i].userDate, todoList[i].id);
        }
    }
    
}

var Notes = function (note, userDate, id) {
    this.note = note;
    this.userDate = userDate;
    this.id = id;
};
var id = 0;

var notes = [];
var addNote = document.getElementById("save");
//check if there history todo
id = localStorage.getItem("index");
if (!(localStorage.getItem("todoList") === null)) {
    notes = JSON.parse(localStorage.getItem("todoList"));
}

function save() {
    //take the data from the user
    let note = document.getElementById("noteText").value;
    let todoDate = document.getElementById("userDate").value;
    let todoNote = new Notes(note, todoDate, id);
    //valadite if the user enter the data or no 
    if (!todoDate) {
        alert("you must to insert date and note");
        return;
    }
    if (!note) {
        alert("you must to insert date and note");
        return;
    }

    //print the note
    notes.push(todoNote);
    id++;
    //inser index in local storge for used it in add new items without return the id 
    localStorage.setItem("index", id.toString())
    //insert the all notes in local storge 
    localStorage.setItem("todoList", JSON.stringify(notes));

    //call the function with prameters
    filList(note, todoDate, id);

    clean();

}



//delete the tasks
function complete() {
    //delete from the screen
    $(this)
        .parent()
        .remove()
    //delete from local storge
    let i = +this.parentElement.id;
    notes = notes.filter(note => note.id !== i);
    localStorage.setItem("todoList", JSON.stringify(notes));

}

//function for full the data in the stick note
function filList(note, todoDate, index) {
    createButton();
    let node = document.createElement("LI");
    node.id = index;
    let textnode = document.createTextNode(note);
    let datenote = document.createTextNode(todoDate);

    //creat x button for the stick
    let new_button = createButton();
    new_button.addEventListener("click", complete);
    node.appendChild(new_button);
    //creat a stick note with tha data
    node.appendChild(textnode);
    node.appendChild(document.createElement("br"));
    node.appendChild(document.createElement("br"));
    node.appendChild(datenote);
    document.getElementById("showList").appendChild(node);
}

//function for the creat x button 
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


//clean the field when that save
function clean() {
    noteText.value = "";
    userDate.value = "";
}

//function delete the data from local storge 
function clearStorge(){
    localStorage.clear();
}