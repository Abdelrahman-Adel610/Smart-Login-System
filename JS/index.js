var loginMail=document.querySelector("#login .mail");
var loginPass=document.querySelector("#login .pass");
var SignName=document.querySelector("#Signup .name");
var SignMail=document.querySelector("#Signup .mail");
var SignPass=document.querySelector("#Signup .pass");
var SignMSG=document.querySelector("#Signup #msg");
var LoginMSG=document.querySelector("#login #msg");
var SignUpBtn=document.querySelector("#Signup button");
var LoginBtn=document.querySelector("#login button");
var HomeMSG=document.querySelector('#Home h1')
var LogOut=document.querySelector(".logOut")
var indx;
var UserNameRegex=/^[A-Z][a-z]{1,15}$/
var UserMailRegex=/^(\w|\d)(\w|\s|\d)+@[a-zA-Z]{4,}\.com$/
var UserPasswordRegex=/(\w|\d){3,}[#$%&*^!/]+(\w|\d)+$/
var Users=[];
if(localStorage.getItem("Users"))
{
    Users=JSON.parse(localStorage.getItem("Users"))

}
if(SignName)
SignName.addEventListener("input",function(e){
    ValidateUserName();
})
function ValidateUserName()
{
    if(UserNameRegex.test(SignName.value))
    {
        
        SignName.classList.remove("is-invalid");
        SignName.classList.add("is-valid")
    //    SignMSG.innerHTML="";
        return true;
    }
    else
    {
        SignName.classList.remove("is-valid");
        SignName.classList.add("is-invalid");
        return false;
    }
}
if(SignMail)
SignMail.addEventListener("input",function(e){
    ValidateEmail();
})
function ValidateEmail()
{
    if(UserMailRegex.test(SignMail.value))
    {
        
        SignMail.classList.remove("is-invalid");
        SignMail.classList.add("is-valid")
        return true;
    }
    else
    {
        SignMail.classList.remove("is-valid");
        SignMail.classList.add("is-invalid");
        return false;
    }
}
if(SignPass)
SignPass.addEventListener("input",function(e){
    ValidatePass();
})
function ValidatePass()
{
    if(UserPasswordRegex.test(SignPass.value))
    {
        
        SignPass.classList.remove("is-invalid");
        SignPass.classList.add("is-valid")
        return true;
    }
    else
    {
        SignPass.classList.remove("is-valid");
        SignPass.classList.add("is-invalid");
        return false;
    }
}
if(SignUpBtn)
SignUpBtn.addEventListener("click",function(e){
    AddUser();
})
function AddUser()
{
SignMSG.innerHTML=""
if(ValidateUserName()&&ValidateEmail()&&ValidatePass())
{
 if(!searchUser())
 { 
    newUser=
    {
    Name:SignName.value,
    Email:SignMail.value,
    Password:SignPass.value
    }
    // SignName.value="";
    // SignMail.value="";
    // SignPass.value="";
    SignPass.classList.remove("is-valid");
    SignMail.classList.remove("is-valid");
    SignName.classList.remove("is-valid");
    SignMSG.innerHTML="<p class='text-success'>Success</p>";
    Users.push(newUser);
    localStorage.setItem("Users",JSON.stringify(Users));
 }
 else
 { 
 SignMSG.innerHTML="<p>User Already Exist</p>"
 }
}


else{
if(!ValidateUserName())
 SignMSG.innerHTML+="<p>Invalid Name! The User Name must start with Capital letter no spaces or special characters</p>";

 if(!ValidateEmail())
 SignMSG.innerHTML+="<p>Invalid Email! the email must end with @domain.com</p>";

 if(!ValidatePass())
SignMSG.innerHTML+="<p>Invalid Password! the Password must start with at least 3 characters or digits & it must contain at least one special character and ends with character or digit</p>";
}   
}
function searchUser()
{
    if(SignName)
    {
    for(var i=0;i<Users.length;i++)
    {
    if(Users[i].Name==SignName.value && Users[i].Email==SignMail.value)
    return true;
    }
    }
    if(loginMail)
    {
        for(var i=0;i<Users.length;i++)
        {
        if((Users[i].Password==loginPass.value && Users[i].Email==loginMail.value))
        {
            
        localStorage.setItem("mainUser",Users[i].Name);
        return true;
         }
        }
    }
return false;
}


var baseURL = ''
var pathparts = location.pathname.split('/');
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]}
    if(LoginBtn)
LoginBtn.addEventListener("click",function()
{
    if(searchUser())
    {
        indx=searchUser();
        if (baseURL == '/') {
            location.replace('https://' + location.hostname + '/home.htm')

        } else {
            location.replace(baseURL + '/home.htm')

        }    }
    else
    {
        if(loginMail.value==""||loginPass.value=="")
        {
            LoginMSG.innerHTML="<p>All inputs are required</p>"
        }
        else
        {
            LoginMSG.innerHTML="<p>Invalid UserMail or Password</p>"
        }
    }
})
if(document.URL.includes("home"))
{
    HomeMSG.innerHTML=`Welcome ${localStorage.getItem("mainUser")}`;
}
if(LogOut)
LogOut.addEventListener("click",function(){
    if (baseURL == '/') {
        location.replace('https://' + location.hostname + '/index.htm')

    } else {
        location.replace(baseURL + '/index.htm')
    }
    RemoveMainUser();
})
function RemoveMainUser()
{
    localStorage.removeItem("mainUser");
}
