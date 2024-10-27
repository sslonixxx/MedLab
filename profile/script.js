const token = localStorage.getItem('token');


if (token) {
    fetch('https://mis-api.kreosoft.space/api/doctor/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('User profile data:', data);
        const name = document.getElementById('name');
        const gender = document.getElementById('gender');
        const birthday = document.getElementById('birthday');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
    
        if (name) name.value = data.name || '';
        if (birthday) birthday.value = data.birthday || '';
        if (gender) gender.value = data.gender || '';
        if (email) email.value = data.email || '';
        if (phone) phone.value = data.phone || '';
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
    });
} else {
    console.error('Auth token not found in localStorage');
}
