const Add_button_data = document.getElementById("ADDButtonID");
const form_data = document.getElementById("form_Id");
const update_button_data = document.getElementById("UpdateButtonId");



GetDataLocalStorage();      //localStorageFuntionCallingforReadData

//Event Listners
Add_button_data.addEventListener("click", ADD_ToDo_Function);
update_button_data.addEventListener("click", Update_ToDo_Function);


//initialize the event listener on each delete buttons
function Initialize_event_on_delete_button(){
document.querySelectorAll(".delt").forEach(el=>{
  el.addEventListener("click", Delete_ToDo_Function);
});
}
//initialize the event listener on each eddit buttons
function Initialize_event_on_edit_button(){
document.querySelectorAll(".edit").forEach(el=>{
  el.addEventListener("click", Edit_ToDo_Function);
});
}



//Funtions
function ADD_ToDo_Function(event) {
  console.log("im in ADD_ToDo_Function");
  event.preventDefault(); //form ko refresh krny sy rookta hai
  var InputIDValue = document.getElementById("inputID").value;
  saveToDoList = document.getElementById("ItemlistID").innerHTML += ` <li id="listt">
  <span>${InputIDValue}</span>
  <button class="delt" type="submit"> Delete </button>
  <button class="edit" type="submit"> Edit </button>
  </li> `;
  Initialize_event_on_delete_button();
  Initialize_event_on_edit_button();
  //console.log(saveToDoList);
  form_data.reset();

  saveDataLocalStorage(InputIDValue);  //saving data in local storage funtion calling
                                       //saving todo list which user write in input block
}


function Update_ToDo_Function(event) {
  console.log("im in Update_ToDo_Function ");
  document.getElementById("ADDButtonID").style.display = "inline";
  document.getElementById("UpdateButtonId").style.display = "none";
  event.preventDefault(); //form ko refresh krny sy rookta hai
  var UpdatedInputValue = document.getElementById("inputID").value;     //input box ke liye we use .value wesy normal tags ke liye we can use inner html
  saveToDoList = document.getElementById("ItemlistID").innerHTML += ` <li id="listt">
  <span>${UpdatedInputValue}</span>
  <button class="delt" type="submit"> Delete </button>
  <button class="edit" type="submit"> Edit </button>
  </li> `;
  Initialize_event_on_delete_button();
  Initialize_event_on_edit_button();
  UpdateLocalStorage(UpdatedInputValue);  //updating data in loacl storage funtion calling 
                                          //updating todo list item which user edited in input block
  form_data.reset();                                        
}         


function Delete_ToDo_Function(event) {
  //event.preventDefault();
  console.log("im in Delete_ToDo_Function ");
  var DeleteClickedToDoValue = event.target.previousElementSibling; //span aiga
  //console.log(DeleteClickedToDoValue);
  DeleteDataLocalStorage(DeleteClickedToDoValue.innerHTML); //span ka inner html aiga(todo list item value)
                                                            //we pass span innerhtml value in DeleteDataLocalStorageFuntion  
  document.getElementById("ItemlistID").removeChild(event.target.parentElement);
  form_data.reset();
  //event.target return the element that trigger the event in this case its delete button
}


function Edit_ToDo_Function(event){
  console.log("im in Edit_ToDo_Function");
  document.getElementById("UpdateButtonId").style.display="inline";
  document.getElementById("ADDButtonID").style.display = "none";
  //console.log(event.target.previousElementSibling.previousElementSibling.innerHTML);
  //event.target return the element that trigger the event in this case its edit button
  var EditClickedToDoValue = event.target.previousElementSibling.previousElementSibling.innerHTML;  //it return value of todo item which is clicked by edit button
  EditLocalStorage(EditClickedToDoValue);
  document.getElementById("inputID").value = EditClickedToDoValue;      //input box mai wo value ajaigi jo user edit krna chahra
  document.getElementById("ItemlistID").removeChild(event.target.parentElement);  //page se wo todo value remove hojai jo user edit kr ra
  //form_data.reset();
}


//********************* local storage CRUD ******************
//for saving data in local storage
function saveDataLocalStorage(InputIDValue) {
  let key1;
  if (localStorage.getItem("key1") == null) {
    key1 = [];
  } else {
    key1 = JSON.parse(localStorage.getItem("key1"));
  }
  key1.push(InputIDValue);
  localStorage.setItem("key1", JSON.stringify(key1));
}

//for read data from local storage
function GetDataLocalStorage() {
  let key1;
  if (localStorage.getItem("key1") == null) {
    key1 = [];
  } else {
    key1 = JSON.parse(localStorage.getItem("key1"));
    for (let i=0; i<key1.length; i++) {
      document.getElementById("ItemlistID").innerHTML += ` <li id="listt"><span>${key1[i]}</span>
    <button class="delt" type="submit"> Delete </button>
    <button class="edit" type="submit"> Edit </button>
    </li> `;
    }
  
Initialize_event_on_delete_button();
Initialize_event_on_edit_button();
  }
 
}

// for deleting data from local storage 
function DeleteDataLocalStorage(DeleteClickedToDoValue) {
  let key1;
  if (localStorage.getItem("key1") == null) {
    key1 = [];
  } else {
    key1 = JSON.parse(localStorage.getItem("key1"));
    var DeleteClickedToDoValueIndex = key1.indexOf(DeleteClickedToDoValue);
    console.log(DeleteClickedToDoValueIndex);
    key1.splice(DeleteClickedToDoValueIndex, 1);
  }
  localStorage.setItem("key1", JSON.stringify(key1));
}

function EditLocalStorage(EditClickedToDoValue) {
  let key1;
  if (localStorage.getItem("key1") == null) {
    key1 = [];
  } else {
    key1 = JSON.parse(localStorage.getItem("key1"));
    var EditClickedToDoValueINDEX = key1.indexOf(EditClickedToDoValue);
    console.log(EditClickedToDoValueINDEX);
Global_IndexOfEditValue = EditClickedToDoValueINDEX;
    
  }
}

//Global varaibale which can be access in any funtion also we can assign value from any funtion in this global variable
var Global_IndexOfEditValue;

//update Data in Local storage
function UpdateLocalStorage(UpdatedInputValue) {
  let key1;
  if (localStorage.getItem("key1") == null) {
    key1 = [];
  } else {
    key1 = JSON.parse(localStorage.getItem("key1"));
    console.log("global varaibale", Global_IndexOfEditValue);
    key1[Global_IndexOfEditValue] = UpdatedInputValue; 
  }
    localStorage.setItem("key1", JSON.stringify(key1));
}










