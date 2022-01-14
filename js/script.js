
const forms = document.querySelector('.request_form');
console.log(forms);

const message = {
    waiting: 'Процесс...',
    rsent: 'Вы успешно зарегистрировались',
    rfailure: 'Ошибка сервера'
}

postData(forms);

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusMessage = document.createElement('div');
        statusMessage.classList.add('message');

        statusMessage.textContent = message.waiting;
        form.append(statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'request_register-form.php');

        request.setRequestHeader('Content-type', 'application/json');
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });

        request.send(JSON.stringify(object));


        request.addEventListener('load', () => {
            if(request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.rsent;
            } else {
                statusMessage.textContent = message.rfailure;
            }
            form.reset();
            setTimeout(() => {
                statusMessage.remove();
            }, 2000);
        })
    });
}