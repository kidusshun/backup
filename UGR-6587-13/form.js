let fName= document.getElementById('fname');
let lName= document.getElementById('lname');
let email= document.getElementById('email');
let phoneNumber= document.getElementById('phone-number__number');
let message= document.getElementById('message');





function validateInput(){
    //first name
    if(fName.value.trim()===""){
        onError(fName,"*Required");
    }
    else{
        onSuccess(fName);
    }
    //last name
    if(lName.value.trim()===""){
        onError(lName,"*Required");
    }
    else{
        onSuccess(lName);
    }
    //email
    if(email.value.trim()===""){
        onError(email,"*Required");
    }
    else{
        onSuccess(email);
    }
    //Phone number
    if(phoneNumber.value.trim()===""){
        onError(phoneNumber,"*Required");
    }
    else{
        onSuccess(phoneNumber);
    }
    //Message
    if(message.value.trim()===""){
        onError(message,"*Required");
    }
    else{
        onSuccess(message);
    }
}
document.getElementById('submit-button')
.addEventListener("click",(event)=>{
    event.preventDefault();
    validateInput();
});


function onSuccess(input){
    let parent=input.parentElement;
    let messageEle=parent.querySelector("small");
    messageEle.style.visibility="hidden";
    messageEle.innerText=message; 
    input.style.border="2px solid green";   
}

function onError(input,message){
    let parent=input.parentElement;
    let messageEle=parent.querySelector("small");
    messageEle.style.visibility="visible";
    messageEle.innerText=message;
    input.style.border="1px solid red";     
}


