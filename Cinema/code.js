const  form = document.getElementById('form1')
const  fisrtName = document.getElementById('fname')
const  email_input = document.getElementById('eMail')
const  passWord = document.getElementById('pword')
const  repPassWord = document.getElementById('rPword')
const  err_msg = document.getElementById('error-msg')

form.addEventListener('submit',(e)=> {

    if(fisrtName){
        //presence of firstname shows signup form
        let errors = []
        errors =getSignupFormErrors(fisrtName.value, email_input.value,passWord.value,repPassWord.value) 
        if (errors.length > 0)
            {
                e.preventDefault()
                err_msg.innerText = errors.join(", ")
            }   
    }
    else{
        //absence means its login form
        let errors = getLoginFormErrors(email_input.value,passWord.value)
        if (errors.length > 0)
            {
                e.preventDefault()
                err_msg.innerText = errors.join(", ")
            }
    }
     
  
})

function getLoginFormErrors(email,password)
{
  let eRRors = []
  if (email == null) {
     eRRors.push("email is requred")
     email_input.parentNode.classList.add('incorrect')
   }

    if (password == null) {
        eRRors.push("password is requred")
     passWord.parentNode.classList.add('incorrect')
    }  
  return eRRors
}

function getSignupFormErrors(firstname,email,password,repeatpassword)
{
    let eRRors = []

    if ( firstname == null) {
        eRRors.push("firstname is requred")
        fisrtName.parentNode.classList.add('incorrect')
    }

    if (email == null) {
        eRRors.push("email is requred")
        email_input.parentNode.classList.add('incorrect')
    }

    if (password == null) {
        eRRors.push("password is requred")
        passWord.parentNode.classList.add('incorrect')
    }

    if (repeatpassword != password || repeatpassword==null) {
        eRRors.push("please repeat the password")
        repPassWord.parentNode.classList.add('incorrect')
    }

    return eRRors;
}