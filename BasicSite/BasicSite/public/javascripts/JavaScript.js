function OpenLogin() {
    document.getElementById('Login').style.display = 'block',
        document.getElementById('SignUp').style.display = 'none';
};

function OpenRegister() {
    document.getElementById('SignUp').style.display = 'block',
        document.getElementById('Login').style.display = 'none';
};

function Validate() {
    document.getElementById('error').style.display = 'block';
    document.getElementById('error').innerText = "Submitted";
};