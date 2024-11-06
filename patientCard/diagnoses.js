async function fetchDiagnoses() {
    try {
        const response = await fetch('https://mis-api.kreosoft.space/api/dictionary/icd10?page=1&size=20')
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }

        const diagnoses = await response.json();
        populateDiagnoses(diagnoses.records);

    } catch (error) {
        console.error('Error fetching diagnoses:', error);
    }
}

function populateDiagnoses(diagnoses) {
    const diagnosesSelect = document.getElementById('diagnoses');

    diagnoses.forEach(diagnos => {
        const option = document.createElement('option');
        option.value = diagnos.code;
        option.textContent = diagnos.name;
        diagnosesSelect.appendChild(option);
    });
}
    
fetchDiagnoses();
