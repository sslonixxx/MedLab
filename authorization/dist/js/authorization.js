function handleFormSubmit (event) {
    event.preventDefault()
    serializeForm (applicantForm)
}

function serializeForm(formNode){
    return new FormData(formNode)
}

const applicantForm = document.getElementById('authorization')
applicantForm.addEventListener('submit', handleFormSubmit)

async function sendData(data) {
    return await fetch('http://localhost/login/' , {
        method: 'POST',
        body: data,
    })
}