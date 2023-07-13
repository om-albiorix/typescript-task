var Data = [];
var storedata = localStorage.getItem("myData");
if (storedata !== null) {
    Data = JSON.parse(storedata);
}
var editIndex = -1; // variable for edit data
window.onload = function () {
    listedData();
};
function abc(a) {
    if (a == 1) {
        return a.toString();
    }
    return '';
}
function handleSubmit(event) {
    var _a;
    event.preventDefault();
    var fName = document.getElementById("inputfname");
    var lName = document.getElementById("inputlname");
    var emailAdd = document.getElementById("inputemailadd");
    var mobileNo = document.getElementById("inputmobile");
    var birthDate = document.getElementById("inputdateofbirth");
    var spCha = "`~!@#$%^&*()_+|}{“:?>[],'’,./-=";
    if (fName.value == "" ||
        lName.value == "" ||
        emailAdd.value == "" ||
        mobileNo.value == "" ||
        birthDate.value == "") {
        alert("Please fill in all the fields");
    }
    else if (mobileNo.value.length > 10) {
        alert("Mobile No. should not exceed 10 digits");
    }
    else if (mobileNo.value.length < 10) {
        alert("Mobile No. should be at least 10 digits");
    }
    else if (!((_a = emailAdd.value) === null || _a === void 0 ? void 0 : _a.includes("@"))) {
        alert("Email address is not valid");
    }
    else if (!isNaN(Number(emailAdd.value[0])) || (spCha === null || spCha === void 0 ? void 0 : spCha.includes(emailAdd.value[0]))) {
        alert("Email address should not start with a number or a special character");
    }
    else {
        var myData = [];
        var getData = localStorage.getItem("myData");
        if (getData !== null) {
            myData = JSON.parse(getData);
        }
        if (editIndex > -1) {
            // old row edit
            myData[editIndex] = {
                fName: fName.value,
                lName: lName.value,
                emailAdd: emailAdd.value,
                mobileNo: (mobileNo.value),
                birthDate: (birthDate.value),
            };
            editIndex = -1; // again edit
        }
        else {
            // new row add
            myData.push({
                fName: fName.value,
                lName: lName.value,
                emailAdd: emailAdd.value,
                mobileNo: (mobileNo.value),
                birthDate: (birthDate.value),
            });
        }
        localStorage.setItem("myData", JSON.stringify(myData));
        listedData();
        clearForm();
    }
}
function listedData() {
    var table = document.getElementById("information-list");
    if (table) {
        table.innerHTML = "";
        var myData = [];
        var myGetData = localStorage.getItem("myData");
        if (myGetData !== null) {
            myData = JSON.parse(myGetData);
        }
        var thead = table.createTHead();
        var row = thead.insertRow();
        row.innerHTML = "\n      <th>First Name</th>\n      <th>Last Name</th>\n      <th>Email Address</th>\n      <th>Mobile No.</th>\n      <th>Birth Date</th>\n      <th>Action</th>";
        if (myData && myData.length > 0) {
            myData.forEach(function (item, index) {
                var newRow = table.insertRow();
                newRow.innerHTML = "\n          <td>".concat(item.fName, "</td>\n          <td>").concat(item.lName, "</td>\n          <td>").concat(item.emailAdd, "</td>\n          <td>").concat(item.mobileNo, "</td>\n          <td>").concat(item.birthDate, "</td>\n          <td>\n            <a class='btn btn-primary' onClick=\"onEdit(").concat(index, ")\">Edit</a>\n            <a class='btn btn-danger' onClick=\"onDelete(").concat(index, ")\">Delete</a>\n          </td>\n        ");
                table.appendChild(newRow);
            });
        }
    }
}
function onDelete(index) {
    var myData = [];
    var myGetData = localStorage.getItem("myData");
    if (myGetData !== null) {
        myData = JSON.parse(myGetData);
    }
    ;
    myData.splice(index, 1);
    localStorage.setItem("myData", JSON.stringify(myData));
    listedData();
}
function clearForm() {
    document.getElementById("myForm").reset();
}
function onEdit(index) {
    var myData = [];
    var myGetData = localStorage.getItem("myData");
    if (myGetData !== null) {
        myData = JSON.parse(myGetData);
    }
    var item = myData[index];
    document.getElementById("inputfname").value = item.fName || "";
    document.getElementById("inputlname").value = item.lName || "";
    document.getElementById("inputemailadd").value = item.emailAdd || "";
    document.getElementById("inputmobile").value = item.mobileNo || "";
    document.getElementById("inputdateofbirth").value = item.birthDate || "";
    editIndex = index;
    var addButton = document.getElementById("AddData");
    if (addButton) {
        addButton.innerText = "Update Data";
    }
}
