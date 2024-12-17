function getPersonalInfo()
{
    const nameRegex = /^([a-zA-Z]+)( )([a-zA-Z]+)$/;
    const phoneRegex = /^(\()(\d{3})(\))(\s)(\d{3})(-\d{4})$/;

    let name = document.forms['payInfo'].elements['name'].value;
    let phoneNum = document.forms['payInfo'].elements['phone'].value;
    let address = document.forms['payInfo'].elements['address'].value;

    let cardNum = document.forms['payInfo'].elements['cardNumber'].value;
    let cardMon = document.forms['payInfo'].elements['month'].value;
    let cardYear = document.forms['payInfo'].elements['year'].value;
    let cardCVV = document.forms['payInfo'].elements['veriVal'].value;

    if (name == "" || !nameRegex.test(name))
    {
        alert("Invalid name.");
    }
}