var form = document.getElementById('form');
form.addEventListener('submit', addExpense);

function addExpense(event) {
    event.preventDefault();
    var amountInput = document.getElementById('amount');
    var descriptionInput = document.getElementById('description');
    var optionInput = document.getElementById('option');
    const newUser = {
        amount: amountInput.value,
        description: descriptionInput.value,
        option: optionInput.value
    };
    var storedUserDetail = localStorage.getItem('User_Details');
    var userArray = storedUserDetail ? JSON.parse(storedUserDetail) : [];
    userArray.push(newUser);

    localStorage.setItem("User_Details", JSON.stringify(userArray));

    displayUserDetailOnScreen();
    form.reset();
}

function displayUserDetailOnScreen() {
    var divId = document.getElementById("userInfo");
    var storedUserDetails = localStorage.getItem("User_Details");
    var userArray = storedUserDetails ? JSON.parse(storedUserDetails) : [];
    divId.innerHTML = "";
    userArray.forEach(function (user, index) {
        divId.innerHTML += `
        <li style="margin-left:20px";"margin-top:20px">
        ${user.amount} - ${user.option} - ${user.description}
       <button onclick="deleteUserInfo(${index})"><strong>Delete Expense</strong></button>
       <button onclick="editUserInfo(${index})"><strong>Edit Expense</strong></button>
        </li>`;
    });
}
function editUserInfo(index) {
    var storedUserDetails = localStorage.getItem("User_Details");
    var userArray = storedUserDetails ? JSON.parse(storedUserDetails) : [];
    var amountInput = document.getElementById('amount');
    var descriptionInput = document.getElementById('description');
    var optionInput = document.getElementById('option');

    amountInput.value = userArray[index].amount;
    descriptionInput.value = userArray[index].description;
    optionInput.value = userArray[index].option;
    userArray.splice(index, 1);
    localStorage.setItem("User_Details", JSON.stringify(userArray));
    displayUserDetailOnScreen();
}

function deleteUserInfo(index) {
    var storedUserDetails = localStorage.getItem("User_Details");
    var userArray = storedUserDetails ? JSON.parse(storedUserDetails) : [];
    userArray.splice(index, 1);

    localStorage.setItem("User_Details", JSON.stringify(userArray));
    displayUserDetailOnScreen();
}

displayUserDetailOnScreen();
