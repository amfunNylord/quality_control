const { RIGHT_USER_DATA, SUCCESS_MESSAGE } = require('../../config/loginPageConfig');
const loginPage = require('../../pages/loginPage');

describe('Authorization Test', () => {
    it('should login successfully with valid credentials', async () => {
        loginPage.open();
        loginPage.login(RIGHT_USER_DATA.username, RIGHT_USER_DATA.password);
        const successMessage = await loginPage.successAlert.getText();
        expect(successMessage).toBe(SUCCESS_MESSAGE);
    });
});