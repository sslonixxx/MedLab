document.getElementById('btnEnter').addEventListener('click', handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('authorization');
    const formData = new FormData(form);
    
    const data = {
        name: formData.get('name'),
        password: formData.get('password'),
        email: formData.get('email'),
        birthday: new Date(formData.get('date')).toISOString(), 
        gender: formData.get('gender'),
        phone: formData.get('phone'),
        speciality: formData.get('spec') 
    };

    
    try {
        const response = await sendData(data);
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

async function sendData(data) {
    return await fetch('https://mis-api.kreosoft.space/api/doctor/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}