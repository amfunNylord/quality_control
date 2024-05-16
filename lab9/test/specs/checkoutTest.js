const checkoutPage = require('../../pages/checkoutPage');
const { CONFIRM_BUTTON_TEXT, USER_DATA, INVALID_USER_DATA, SUCCESS_MESSAGE, ERROR_MESSAGE } = require('../../config/checkoutPageConfig');

describe('Checkout Test', () => {
    it('User can make an order', () => {
        checkoutPage.open();

        checkoutPage.addToCartButton.click();
        setTimeout(async () => {
            const confirmButton = await checkoutPage.getModalButton(CONFIRM_BUTTON_TEXT);
            confirmButton.click();
        }, 5000);

        checkoutPage.fillData(USER_DATA);
        checkoutPage.submitButton.click();
        setTimeout(() => {
            expect(checkoutPage.titleMessage.getText()).toBe(SUCCESS_MESSAGE);
        }, 5000);
    });

    it('User can\'t make an order with already used login', () => {
        checkoutPage.open();

        checkoutPage.addToCartButton.click();
        setTimeout(async () => {
            const confirmButton = await checkoutPage.getModalButton(CONFIRM_BUTTON_TEXT);
            confirmButton.click();
        }, 5000);

        checkoutPage.fillData(INVALID_USER_DATA);
        checkoutPage.submitButton.click();

        setTimeout(async () => {
            expect(checkoutPage.errorMessage.getText()).toBe(ERROR_MESSAGE);
        }, 5000);
    });
});