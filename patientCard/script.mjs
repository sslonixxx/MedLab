const token = localStorage.getItem('token')

const urlParams = new URLSearchParams(window.location.search);
const patientId = urlParams.get("patientId");

if (patientId) {
    getPatientCard(patientId);
}

export async function getPatientCard(patientId) {
    let patient = document.querySelector(".wrap-container2")
    // patient.innerHTML = "";
    let patientName=document.createElement("h2")
    let birthday = document.createElement("div")

    

    let url = 'https://mis-api.kreosoft.space/api/patient/';
    url += `${patientId}`;

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const responseData = await response.json();
        patientName.textContent = responseData.name;

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        }
        birthday.textContent = `Дата рождения: ${formatDate(responseData.birthday)}`

        patient.appendChild(patientName);
        patient.appendChild(birthday)

        
    } catch (error) {
        console.error("Ошибка при загрузке пациента:", error);
    }



}