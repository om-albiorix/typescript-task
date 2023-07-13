interface myDataType{
    fName:string;
    lName:string;
    emailAdd:string;
    mobileNo:string;
    birthDate:string;
 } 

let Data : myDataType[]=[];
const storedata=localStorage.getItem("myData");
if(storedata !==null){
    Data =JSON.parse(storedata)
} 
 let editIndex:number = -1;  // variable for edit data

window.onload = function () {
    listedData();
};

function abc(a:number):string{
    if(a==1){
        return a.toString();
    }
    return '';
}

function handleSubmit(event:Event) {
    event.preventDefault();

    let fName = document.getElementById("inputfname")!  as HTMLInputElement ;
    let lName  = document.getElementById("inputlname")! as HTMLInputElement  ;
    let emailAdd = document.getElementById("inputemailadd")! as HTMLInputElement ;
    let mobileNo = document.getElementById("inputmobile")! as HTMLInputElement;
    let birthDate= document.getElementById("inputdateofbirth")! as HTMLInputElement;
    let spCha :string  = "`~!@#$%^&*()_+|}{“:?>[],'’,./-=";


    if (
         fName.value== "" ||
        lName.value == "" ||
        emailAdd.value == "" ||
        mobileNo.value == "" ||
        birthDate.value == ""
    ) {
        alert("Please fill in all the fields");
    } else if (mobileNo.value.length > 10) {
        alert("Mobile No. should not exceed 10 digits");
    } else if (mobileNo.value.length < 10) {
        alert("Mobile No. should be at least 10 digits");
    } else if (!emailAdd.value?.includes("@")) {
        alert("Email address is not valid");
    } else if (!isNaN(Number(emailAdd.value[0])) || spCha?.includes(emailAdd.value[0])) {
        alert(
            "Email address should not start with a number or a special character"
        );
    } else {
        let myData :myDataType[] =[];
        const getData=localStorage.getItem("myData");
        if(getData!==null){
            myData=JSON.parse(getData)
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
            
            editIndex = -1;  // again edit
        } else {
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
    let table = document.getElementById("information-list") as HTMLTableElement;

    if (table) {
        table.innerHTML = "";

        let myData: myDataType[]=[];
        let myGetData=localStorage.getItem("myData");
        if(myGetData !==null){
            myData=JSON.parse(myGetData)
        }

        let thead = table.createTHead();
        let row = thead.insertRow();
        row.innerHTML = `
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email Address</th>
      <th>Mobile No.</th>
      <th>Birth Date</th>
      <th>Action</th>`;

        if (myData && myData.length > 0) {
            myData.forEach((item, index) => {
                let newRow = table.insertRow() ;
                newRow.innerHTML = `
          <td>${item.fName}</td>
          <td>${item.lName}</td>
          <td>${item.emailAdd}</td>
          <td>${item.mobileNo}</td>
          <td>${item.birthDate}</td>
          <td>
            <a class='btn btn-primary' onClick="onEdit(${index})">Edit</a>
            <a class='btn btn-danger' onClick="onDelete(${index})">Delete</a>
          </td>
        `;
                table.appendChild(newRow);
            });
        }
    }
}

function onDelete(index : number) {
    
  
    let myData: myDataType[]=[];
    let myGetData=localStorage.getItem("myData");
    if(myGetData !==null){
        myData=JSON.parse(myGetData)
    };
    myData.splice(index, 1);
    localStorage.setItem("myData", JSON.stringify(myData));
    listedData();
}

function clearForm()  {
    (document.getElementById("myForm")as HTMLFormElement).reset();
}

function onEdit(index:number) {
 
    let myData: myDataType[]=[];
    let myGetData=localStorage.getItem("myData");
    if(myGetData !==null){
        myData=JSON.parse(myGetData)
    }

    let item = myData[index];
    (document.getElementById("inputfname")as HTMLInputElement).value = item.fName || "";
    (document.getElementById("inputlname")as HTMLInputElement).value = item.lName || "";
    (document.getElementById("inputemailadd")as HTMLInputElement).value = item.emailAdd || "";
    (document.getElementById("inputmobile")as HTMLInputElement).value = item.mobileNo|| "";
    (document.getElementById("inputdateofbirth")as HTMLInputElement).value = item.birthDate || "";

    editIndex = index; 
    const addButton = document.getElementById("AddData");
    if(addButton){
        addButton.innerText = "Update Data";
    }
}
