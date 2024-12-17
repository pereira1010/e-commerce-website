function takeLoginInfo()
{
    const userRegex = /^([a-zA-Z0-9._%+-]+)(@)([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})$/; 
    const passRegex = /^([a-zA-Z0-9!@#$%^&*+-]{6,})$/; //<--- This may need a little fine tuning...
    
    let username = document.forms['loginForm'].elements['username'].value;
    let password = document.forms['loginForm'].elements['password'].value;

    let output = document.getElementById('output');

    
    if (!userRegex.test(username))
    {
        output.innerHTML = `${username} is invalid.` ;
    }

    else if (!passRegex.test(password))
    {
        output.innerHTML = `${password} is invalid.`;
    }

    else
    {
        output.innerHTML = "Logging in...";
    }
}