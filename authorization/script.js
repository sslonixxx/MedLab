document.getElementById('btnEnter').addEventListener('click', handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('authorization');
    const formData = new FormData(form);
    
    const email = formData.get('email');
    const password = formData.get('password');

    
    try {
        const response = await sendData(email,password);
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
         
            localStorage.setItem('token', token);
            window.location.href = '../profile/index.html'; 
           
           } else {
            const error = await response.json();
            console.error('Login error', error);
           }
          } catch (error) {
           console.error('Error:', error);
          }
}

async function sendData(email, password) {
    return await fetch('https://mis-api.kreosoft.space/api/doctor/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
          }),
    });
}
document.getElementById('btnRegistration').addEventListener('click', () => {
    window.location.href = '../registration/index.html';
});