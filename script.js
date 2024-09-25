const ToDoInput = document.getElementById("ToDoInput");
const AddTodoBTN = document.getElementById("AddTodoBTN");
const TODO = document.getElementById("TODO");

function lodeToDos() {
  try {
    let saveToDos = localStorage.getItem("ToDoArray");
    return saveToDos ? JSON.parse(saveToDos) : [];
  } catch (error) {
    console.log("Error Form local Storage : ", error);
    return [];
  }
}

let StoreArr = lodeToDos();

AddTodoBTN.addEventListener("click", () => {
  const todoText = ToDoInput.value.trim();
  if (todoText === "") {
    alert("Input is empty!");
    return;
  }
  addTodoToDOM(todoText);
  StoreArr.push(todoText);
  localStorage.setItem("ToDoArray", JSON.stringify(StoreArr));
  ToDoInput.value = "";
});

function lodeToDosInDisplay() {
  console.log(StoreArr);
  TODO.innerHTML = "";

  if (StoreArr.length === 0) {
    let Div = document.createElement("Div");
    Div.className = "ToDoList";
    Div.innerHTML = ` <div class="TodoText"> Empty !</div>`;
    TODO.appendChild(Div);
  } else {
    StoreArr.map((item) => {
      addTodoToDOM(item);
    });
  }
}



function addTodoToDOM(todoText) {
  if (todoText === "") {
    alert("Input is empty!");
    return;
  }

  let Div = document.createElement("Div");
  Div.className = "ToDoList";
  Div.innerHTML = `
    <div class="TodoText">${todoText}</div>
    <div class="TodoIcon">
      <img
        class="checkBox"
        onclick="CheckBoxFunction(this)"
        src="path/to/check_box_outline.png"
        alt=""
        srcset=""
      />
      <img
        class="Delete"
        onclick="DeleteFunction(this)"
        src="path/to/Delete.png"
        alt=""
        srcset=""
      />
    </div>`;
  TODO.appendChild(Div);
}

function CheckBoxFunction(checkBox) {
  if (checkBox) {
    let parentDiv = checkBox.closest(".ToDoList");
    if (parentDiv) {
      let TodoText = parentDiv.querySelector(".TodoText");

      if (checkBox.src.endsWith("/check_box_outline.png")) {
        TodoText.style.textDecoration = "line-through";
        checkBox.src = "path/to/check_box.png";
      } else if (checkBox.src.endsWith("/check_box.png")) {
        TodoText.style.textDecoration = "none";
        checkBox.src = "path/to/check_box_outline.png";
      }
    } else {
      console.log("parentDiv is not Found");
    }
  } else {
    console.log("checkBox is not Found");
  }
}

function DeleteFunction(deleteIcon) {
  let parentDiv = deleteIcon.closest(".ToDoList");
  let TodoText = parentDiv
    .querySelector(".TodoText")
    .textContent.replace(" !", "");

  StoreArr = StoreArr.filter((item) => item !== TodoText);

  localStorage.setItem("ToDoArray", JSON.stringify(StoreArr));
  parentDiv.remove();
}


lodeToDosInDisplay();
