document.getElementById('btnEnter').addEventListener('click', handleRegistrationFormSubmit);

async function handleRegistrationFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('registration');
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const password = formData.get('password');
    const email = formData.get('email');
    const birthday = new Date(formData.get('date')).toISOString();
    const gender = formData.get('gender');
    const phone = formData.get('phone');
    const speciality = formData.get('spec');

    try {
        const response = await sendRegistrationData({
            name,
            password,
            email,
            birthday: birthday,
            gender,
            phone,
            speciality
        });
        
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
         
            localStorage.setItem('token', token);
            window.location.href = '../profile/index.html'; 
        } else {
            const error = await response.json();
            console.error('Registration error', error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendRegistrationData(data) {
    return await fetch('https://mis-api.kreosoft.space/api/doctor/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

document.getElementById('phone').addEventListener('input', function (e) {
    const input = e.target;
    let value = input.value.replace(/\D/g, '');
    if (value.startsWith('7') || value.startsWith('8')) {
        value = value.slice(1); 
    }

    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    input.value = `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}`;
});
