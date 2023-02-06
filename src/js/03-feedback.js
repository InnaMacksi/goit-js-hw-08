import throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

savedData();


function onFormSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  try {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function savedData() {
  try {
    const savedText = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedText !== 0) {
      emailEl.value = savedText.email;
      messageEl.value = savedText.message;
    }
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
