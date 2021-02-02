// Обязательные поля? присвоить класс '_required'
// Email? присвоить класс '_email'
// Остальные поля проверяются на '' (пустую строку)
// Во время отправки, пока сервер не ответит, форме присваивается класс '_sending'

document.addEventListener('DOMContentLoaded', () => {
  // Находим форму по селектору
	const form = document.querySelector('#form');
	// Адресс отправки
	const server = '#'
	// Метод отправки
	const serverMethod = 'POST'

  // При отправке формы, вызываем функцию
  form.addEventListener('submit', formSend);

  // Отправка формы fetch
  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    // получение данных формы из HTML
    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      // Если форма прошла валидацию
      let response = await fetch(server, {
        method: serverMethod,
        body: formData,
      });
      if (response.ok) {
        // Если пришел ответ от сервера

        // Очистка полей формы (кроме кастомных)
				form.reset();
				form.classList.remove('_sending');
      } else {
        // Если не пришел ответ от сервера
				alert('Ошибка отправки');
				form.classList.remove('_sending');
      }
    } else {
      // Если форма не прошла валидацию
      alert('Заполните обязательные поля');
    }
  }

  function formValidate(form) {
    let error = 0;
    let required = document.querySelectorAll('._required');
    for (let index = 0; index < required.length; index++) {
      const input = required[index];
      formRemoveError(input);
      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute('type') === 'checkbox' &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  function emailTest(input) {
    return /^([\w-\.*]+@([\w-]+\.)+[\w-]{2,4})?$/.test(input.value);
  }

  // function fileUpload() {
  //   const file = document.querySelector("input[type='file']");
  //   // Размер файла
  //   const fileSize = 10;
  //   const fileType = ['application/pdf', 'application/msword'];
  //   // Проверка типа файла
  //   if (!fileType.includes(file.type)) {
  //     alert(`Разрешены только ${fileType} типы файлов`);
  //     file.value = '';
  //   }
  //   if (file.size > fileSize * 1024 * 1024) {
  //     alert(`Размер файла не должен превышать ${fileSize} мб`);
  //     return;
  //   }
  // }
  // fileUpload();
});
