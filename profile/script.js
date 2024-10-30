const token = localStorage.getItem('token');
const userMenuContainer = document.getElementById('userMenuContainer');
const doctorName = document.getElementById('doctorName');
const dropdownMenu = document.getElementById('dropdownMenu');
const logoutButton = document.getElementById('logout');



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

        doctorName.textContent = data.name; 
        localStorage.setItem('doctorName', data.name);
        
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
    });
} else {
    console.error('Auth token not found in localStorage');
}


document.getElementById('btnEnter').addEventListener('click', handleProfileUpdate);

async function handleProfileUpdate(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Auth token not found in localStorage');
        return;
    }

    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const birthday = document.getElementById('birthday').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const profileData = {
        name: name,
        gender: gender,
        birthday: birthday,
        phone: phone,
        email: email
    };

    try {
        const response = await fetch('https://mis-api.kreosoft.space/api/doctor/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Profile update error:', errorData);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Profile updated successfully');
        alert('Профиль успешно обновлен!');
    } catch (error) {
        console.error('Error updating profile:', error);
    }
}
