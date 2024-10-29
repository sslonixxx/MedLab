async function fetchSpecialities() {
    try {
        const response = await fetch('https://mis-api.kreosoft.space/api/dictionary/speciality?page=1&size=5')
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }

        const specialities = await response.json();
        populateSpecialities(specialities.specialties);

    } catch (error) {
        console.error('Error fetching specialities:', error);
    }
}

function populateSpecialities(specialities) {
    const specSelect = document.getElementById('spec');

    specialities.forEach(speciality => {
        const option = document.createElement('option');
        option.value = speciality.id;
        option.textContent = speciality.name;
        specSelect.appendChild(option);
    });
}
    
fetchSpecialities();
