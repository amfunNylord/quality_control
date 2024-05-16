const {SEARCH_TEXT, SEARCH_URL, CARD_DATA, FILTER_DATA, PRODUCT_ITEM, CATEGORY_DATA} = require('../../config/catalogPageConfig');
const catalogPage = require('../../pages/catalogPage');

describe('Catalog Search Test', () => {
    beforeEach(() => {
        catalogPage.open();
    });

    it('Finding products with search field', () => {
        catalogPage.findByText(SEARCH_TEXT);
        setTimeout(() => {
            expect(browser.getUrl()).toBe('http://shop.qatl.ru/search?s=ROYAL');
            expect(catalogPage.breadcrumb.getText()).toBe(SEARCH_TEXT);
        }, 30000);
    });

    it('Finding products with brand cards', () => {
        catalogPage.goByCardLink();
        setTimeout(() => {
            expect(browser.getUrl()).toBe(`http://shop.qatl.ru${CARD_DATA.url}`);
            expect(catalogPage.breadcrumb.getText()).toBe(CARD_DATA.text);
        }, 30000);
    });

    it('Finding products with category', async () => {
        const categoryLink = await browser.$(`*=http://shop.qatl.ru${CATEGORY_DATA.url}`);
        categoryLink.click();
        setTimeout(() => {
            expect(browser.getUrl()).toBe(`http://shop.qatl.ru${CATEGORY_DATA.url}`);
            expect(catalogPage.breadcrumb.getText()).toBe(CATEGORY_DATA.text);
        }, 30000);
    });

    it('Finding products with product cards', async () => {
        const productCard = await browser.$(`*=http://shop.qatl.ru${PRODUCT_ITEM.url}`);
        productCard.click();
        setTimeout(() => {
            expect(browser.getUrl()).toBe(`http://shop.qatl.ru${PRODUCT_ITEM.url}`);
            expect(catalogPage.breadcrumb.getText()).toBe(PRODUCT_ITEM.text);
        }, 30000);
    });
});