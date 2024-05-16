const CONFIRM_BUTTON_TEXT = 'Оформить заказ';

const SUCCESS_MESSAGE = 'Произошла ошибка';

const ERROR = 'Этот логин уже занят';

const USER_DATA = {
    login: 'autotest_yo',
    password: 'test1234',
    name: 'TestName',
    email: 'testemail@yandex.ru',
    address: 'Yoshkar-Ola',
    note: 'Helllllllllo',
};

const INVALID_USER_DATA = {
    login: 'test_yo',
    password: 'test1234',
    name: 'TestName',
    email: 'testemail@yandex.ru',
    address: 'Yoshkar-Ola',
    note: 'Helllllllllo',
};

module.exports = { CONFIRM_BUTTON_TEXT, USER_DATA, SUCCESS_MESSAGE, INVALID_USER_DATA, ERROR };