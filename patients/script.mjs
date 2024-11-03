import { Conclusions } from "./conclusions.mjs";

    doctorName.textContent = localStorage.getItem("doctorName");
    document.getElementById("profile").addEventListener("click", () => {
        window.location.href = '../profile/index.html'; 
    })
    document.getElementById("logout").addEventListener("click", async (event) => {
        const response = await fetch('https://mis-api.kreosoft.space/api/doctor/logout', {
            method: 'POST'
        })
    }
    )

    const conclusionSelect = document.getElementById('conclusions');
    const searchButton = document.getElementById('search')

    // Заполнение выпадающего списка заключений
    function getConclusions(Conclusions) {
        Object.values(Conclusions).forEach(element => {
            const option = document.createElement('option');
            option.value = element;
            option.textContent = element;
            conclusionSelect.appendChild(option);
        });
    }

    getConclusions(Conclusions);


    function getSearchParams() {
        const name = document.getElementById('name').value.trim(); 
        const conclusions = conclusionSelect.key; 
        const scheduledVisits = document.getElementById('scheduledVisits').checked; 
        const onlyMine = document.getElementById('onlyMine').checked;
        const sorting = document.getElementById('sorting').value;
        const size = document.getElementById('size').value;

        const params = {};
        if (name) params.name = name;
        if (conclusions) params.conclusions = conclusions;
        params.scheduledVisits = scheduledVisits;
        params.onlyMine = onlyMine;
        if (sorting) params.sorting = sorting;
        if (size) params.size = size;

        return params;
    }

    async function fetchPatients(page = 1) {
        const token = localStorage.getItem('token');
        const params = getSearchParams();
    
        let url = `https://mis-api.kreosoft.space/api/patient`;
        const queryParams = [];
    
        if (params.name) queryParams.push(`name=${encodeURIComponent(params.name)}`);
        if (params.conclusions) queryParams.push(`conclusions=${encodeURIComponent(params.conclusions)}`);
        if (params.sorting) queryParams.push(`sorting=${encodeURIComponent(params.sorting)}`);
        if (params.scheduledVisits !== undefined) queryParams.push(`scheduledVisits=${params.scheduledVisits}`);
        if (params.onlyMine !== undefined) queryParams.push(`onlyMine=${params.onlyMine}`);
    
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${params.size || pageSize}`);
    
        url += `?${queryParams.join('&')}`;
        const urlString = new URL(window.location.href);
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
    
            var patients = responseData.patients || [];
        
            // Получаем количество записей и страниц
            var totalCount = responseData.pagination.count || 0; // Общее количество записей
            var currentPage = responseData.pagination.current || 0;
            var pageSize = responseData.pagination.size || 1; // Размер страницы
            var totalPages = Math.ceil(totalCount / pageSize); // Расчет общего количества страниц
    
            console.log("Общее количество записей:", totalCount);
            console.log("Общее количество страниц:", totalPages);
        } catch (error) {
            console.error("Ошибка при загрузке пациентов:", error);
        }
        console.log(patients)
        return {patients, totalPages};
    }

    async function main() {

        const data = await fetchPatients();
        const patients = data.patients;
        const totalPages = data.totalPages;
       

        function displayList(arrData) {
            
            const patientList = document.querySelector('.patientList')
            patientList.innerHTML = ""; 

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

                patientCard.innerHTML = `
                <h3>${el.name}</h3>
                <p>Email — ${el.email || 'Не указан'}</p>
                <p>Пол — ${el.gender === 'Male' ? 'Мужчина' : 'Женщина'}</p>
                <p>Дата рождения — ${formatDate(el.birthday)}</p> `
                patientList.appendChild (patientCard)
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
        const data = await fetchPatients(page);
        displayList(data.patients);
        displayPagination(page)
    })
    paginationBtnNext.addEventListener("click", async (event) => {
        const page = (parseInt(paginationBtn5.textContent, 10) + 1 > totalPages ? 1 : (parseInt(paginationBtn5.textContent, 10) + 1));
        const data = await fetchPatients(page);
        displayList(data.patients);
        displayPagination(page)
        
    })
    paginationBtn1.addEventListener("click", async (event) => {
        const page = parseInt(paginationBtn1.textContent, 10);
        const data = await fetchPatients(page);
        displayList(data.patients);
        displayPagination(page)
        
    })
    paginationBtn2.addEventListener("click", async (event) => {
        const page = parseInt(paginationBtn2.textContent, 10);
        const data = await fetchPatients(page);
        displayList(data.patients);
        displayPagination(page)
        
    })
    paginationBtn3.addEventListener("click", async (event) => {
        const page = parseInt(paginationBtn3.textContent, 10);
        const data = await fetchPatients(page);
        displayList(data.patients);
        displayPagination(page)
        
    })
    paginationBtn4.addEventListener("click", async (event) => {
        const page = parseInt(paginationBtn4.textContent, 10);
        const data = await fetchPatients(page);
        displayList(data.patients);
        displayPagination(page)
        
    })
    paginationBtn5.addEventListener("click", async (event) => {
        const page = parseInt(paginationBtn5.textContent, 10);
        const data = await fetchPatients(page);
        displayList(data.patients);
        displayPagination(page)
        
    })

    function displayPagination(page) {
        paginationBtn3.textContent = page;
        paginationBtn2.textContent = (parseInt(paginationBtn3.textContent, 10) - 1 < 0 ? totalPages : parseInt(paginationBtn3.textContent, 10) - 1)
        paginationBtn1.textContent = (parseInt(paginationBtn2.textContent, 10) - 1 <= 0 ? totalPages : parseInt(paginationBtn2.textContent, 10) - 1)
        paginationBtn4.textContent = (parseInt(paginationBtn3.textContent, 10) + 1 > totalPages ? 1 : parseInt(paginationBtn3.textContent, 10) + 1)
        paginationBtn5.textContent = (parseInt(paginationBtn4.textContent, 10) + 1 > totalPages ? 1 : parseInt(paginationBtn4.textContent, 10) + 1)
    }
    searchButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const data = await fetchPatients();
        const patients = data.patients;
        displayList(patients)
    })
        displayList(patients);
    }

    main();
  
    
    
    
    
   