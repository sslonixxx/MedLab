const token = localStorage.getItem('token')

const urlParams = new URLSearchParams(window.location.search);
let patientId = urlParams.get("patientId");
doctorName.textContent = localStorage.getItem("doctorName");
const searchButton = document.getElementById('search')

if (patientId) {
    getPatientCard(patientId);
}
document.getElementById("profile").addEventListener("click", () => {
    window.location.href = '../profile/index.html'; 
})
document.getElementById("logout").addEventListener("click", async (event) => {
    const response = await fetch('https://mis-api.kreosoft.space/api/doctor/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    localStorage.clear;
    window.location.href = '../authorization/index.html'; 
    console.log(response)
}
)

async function getPatientCard(patientId) {
    let patient = document.querySelector(".wrap-container2")
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



function getSearchParams() {
    const grouped = document.getElementById('grouped').checked; 
    const diagnos = document.getElementById('diagnoses')
    const size = document.getElementById('size').value;

    const params = {};
    if (diagnos) params.diagnos = diagnos;
    params.grouped = grouped;
    if (size) params.size = size;

    return params;
}

async function fetchInspections(page = 1) {
    const token = localStorage.getItem('token');
    const params = getSearchParams();

    let url = `https://mis-api.kreosoft.space/api/patient/${patientId}/inspections`;
    const queryParams = [];
    if (params.grouped !== undefined) queryParams.push(`grouped=${params.grouped}`);
    // if (params.diagnos) queryParams.push(`icdRoots=${encodeURIComponent(params.diagnos)}`);

    queryParams.push(`page=${page}`);
    queryParams.push(`size=${params.size || pageSize}`);

    url += `?${queryParams.join('&')}`;
    const urlString = new URL(window.location.href);
    urlString.searchParams.set('grouped', params.grouped);
    urlString.searchParams.set('icdRoots', params.diagnos);
    urlString.searchParams.set('page', page);
    urlString.searchParams.set('size', params.size);
    window.history.pushState(null, null, urlString);

    console.log("Запрашиваемый URL:", url);

    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const responseData = await response.json();
        console.log("Ответ API:", responseData);

        var inspections = responseData.inspections || [];
    
        
        var totalCount = responseData.pagination.count || 0; 
        var pageSize = responseData.pagination.size || 1; 
        var totalPages = Math.ceil(totalCount / pageSize); 

        console.log("Общее количество записей:", totalCount);
        console.log("Общее количество страниц:", totalPages);
    } catch (error) {
        console.error("Ошибка при загрузке пациентов:", error);
    }
    console.log(inspections)
    return {inspections, totalPages};
}

async function main() {

    const data = await fetchInspections();
    const inspections = data.inspections;
    const totalPages = data.totalPages;
   

    function displayList(arrData) {
        
        const inspectionsList = document.querySelector('.inspectionsList')
        inspectionsList.innerHTML = ""; 

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        }

        arrData.forEach((el) => {
            const patientCard = document.createElement("li")
            patientCard.classList.add("patientCard")
            patientCard.addEventListener("click", (event) => {
            window.location.href = `../patientCard/index.html?patientId=${el.id}`;
            })

            patientCard.innerHTML = `
            <h3>${el.name}</h3>
            <p>Email — ${el.email || 'Не указан'}</p>
            <p>Пол — ${el.gender === 'Male' ? 'Мужчина' : 'Женщина'}</p>
            <p>Дата рождения — ${formatDate(el.birthday)}</p> `
            inspectionsList.appendChild (patientCard)

        })
    }

const paginationBtnPrev = document.getElementById("paginationBtnPrev")
const paginationBtn1 = document.getElementById("paginationBtn1")
const paginationBtn2 = document.getElementById("paginationBtn2")
const paginationBtn3 = document.getElementById("paginationBtn3")
const paginationBtn4 = document.getElementById("paginationBtn4")
const paginationBtn5 = document.getElementById("paginationBtn5")
const paginationBtnNext = document.getElementById("paginationBtnNext")

paginationBtnPrev.addEventListener("click" , async (event) => {
    const page = parseInt(paginationBtn1.textContent, 10) - 1|| totalPages;
    const data = await fetchInspections(page);
    displayList(data.inspections);
    displayPagination(page)
})
paginationBtnNext.addEventListener("click", async (event) => {
    const page = (parseInt(paginationBtn5.textContent, 10) + 1 > totalPages ? 1 : (parseInt(paginationBtn5.textContent, 10) + 1));
    const data = await fetchInspections(page);
    displayList(data.inspections);
    displayPagination(page)
    
})
paginationBtn1.addEventListener("click", async (event) => {
    const page = parseInt(paginationBtn1.textContent, 10);
    const data = await fetchInspections(page);
    displayList(data.inspections);
    displayPagination(page)
    
})
paginationBtn2.addEventListener("click", async (event) => {
    const page = parseInt(paginationBtn2.textContent, 10);
    const data = await fetchInspections(page);
    displayList(data.inspections);
    displayPagination(page)
    
})
paginationBtn3.addEventListener("click", async (event) => {
    const page = parseInt(paginationBtn3.textContent, 10);
    const data = await fetchInspections(page);
    displayList(data.inspections);
    displayPagination(page)
    
})
paginationBtn4.addEventListener("click", async (event) => {
    const page = parseInt(paginationBtn4.textContent, 10);
    const data = await fetchInspections(page);
    displayList(data.inspections);
    displayPagination(page)
    
})
paginationBtn5.addEventListener("click", async (event) => {
    const page = parseInt(paginationBtn5.textContent, 10);
    const data = await fetchInspections(page);
    displayList(data.inspections);
    displayPagination(page)
    
})

function displayPagination(page) {
    paginationBtn3.textContent = page;
    paginationBtn2.textContent = (parseInt(paginationBtn3.textContent, 10) - 1 <= 0 ? totalPages : parseInt(paginationBtn3.textContent, 10) - 1)
    paginationBtn1.textContent = (parseInt(paginationBtn2.textContent, 10) - 1 <= 0 ? totalPages : parseInt(paginationBtn2.textContent, 10) - 1)
    paginationBtn4.textContent = (parseInt(paginationBtn3.textContent, 10) + 1 > totalPages ? 1 : parseInt(paginationBtn3.textContent, 10) + 1)
    paginationBtn5.textContent = (parseInt(paginationBtn4.textContent, 10) + 1 > totalPages ? 1 : parseInt(paginationBtn4.textContent, 10) + 1)
}
searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const data = await fetchInspections();
    const inspections = data.inspections;
    displayList(inspections)
})
    displayList(inspections);
}

main()