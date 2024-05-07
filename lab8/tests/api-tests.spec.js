const axios = require('axios');
const fs = require('fs');
const Ajv = require('ajv');

const BASE_URL = "http://shop.qatl.ru/";
const LIST_PRODUCTS_URI = 'api/products';
const ADD_PRODUCT_URI = 'api/addproduct';
const EDIT_PRODUCT_URI = 'api/editproduct';
const DELETE_PRODUCT_URI = 'api/deleteproduct';
const testData = JSON.parse(fs.readFileSync('config/test-values.json', 'utf-8'));
const schema = JSON.parse(fs.readFileSync('config/schema.json', 'utf8'));

let addedProductId;
const ajv = new Ajv();
const validate = ajv.compile(schema);

function CheckProduct(obj1, obj2) {
    const jsonString1 = JSON.stringify(obj1).slice(JSON.stringify(obj1).indexOf(',') + 1);
    const jsonString2 = JSON.stringify(obj2).slice(1);
    return jsonString1 == jsonString2;
}

async function addProductRequest(product, status) {
    const addProductResponse = await axios.post(`${BASE_URL + ADD_PRODUCT_URI}`, product);
    expect(addProductResponse.data.status).toBe(status);
    if (status != undefined) {
        addedProductId = addProductResponse.data.id;
    }
}

async function deleteProductRequest(productId, status) {
    const deleteProductResponse = await axios.get(`${BASE_URL + DELETE_PRODUCT_URI}?id=${productId}`);
    expect(deleteProductResponse.data.status).toBe(status);
}

async function editProductRequest(product, status) {
    const editProductResponse = await axios.post(`${BASE_URL + EDIT_PRODUCT_URI}`, product);
    expect(editProductResponse.data.status).toBe(status);
}

async function getAllProductRequest() {
    const getAllProductsResponse = await axios.get(`${BASE_URL + LIST_PRODUCTS_URI}`);
    expect(getAllProductsResponse.status).toBe(200);
    return getAllProductsResponse.data;
}

// вынести в отдельные методы, использовать global айдишник, добавить схему
describe("Testing shop api", () => {
    // Test cases go here
    test('Adding correct product and deleting it', async () => {
        const productData = testData.correctProduct;
        await addProductRequest(productData, 1);

        const allProductsResponse = await getAllProductRequest();
        const allProductsCount = allProductsResponse.length;
        const addedProduct = allProductsResponse[allProductsCount - 1];

        expect(validate(addedProduct)).toBe(true);
        expect(CheckProduct(addedProduct, productData)).toBe(true);

        await deleteProductRequest(addedProductId, 1);

        const allProductsResponseNew = await getAllProductRequest();
        const allProductsCountNew = allProductsResponseNew.length;
        expect(allProductsCountNew + 1).toBe(allProductsCount);
    });
    test('Adding correct product with 15 category', async () => {
        // берем тестовые данные
        const productData = testData.productWithValid15Category;

        await addProductRequest(productData, 1);

        const allProductsResponse = await getAllProductRequest();
        const allProductsCount = allProductsResponse.length;
        const addedProduct = allProductsResponse[allProductsCount - 1];
        expect(validate(addedProduct)).toBe(true);

        await deleteProductRequest(addedProductId, 1);

        const allProductsResponseNew = await getAllProductRequest();
        const allProductsCountNew = allProductsResponseNew.length;
        expect(allProductsCountNew).toBe(allProductsCount);
    }, 10000);

    test('Adding correct product with same alias', async () => {
        // берем тестовые данные
        const productData = testData.correctProduct;

        await addProductRequest(productData, 1);
        const addedProductId1 = addedProductId;

        await addProductRequest(productData, 1);
        const addedProductId2 = addedProductId;

        const allProductsResponse = await getAllProductRequest();
        const allProductsCount = allProductsResponse.length;
        const addedProduct1 = allProductsResponse[allProductsCount - 2];
        const addedProduct2 = allProductsResponse[allProductsCount - 1];
        expect(validate(addedProduct1)).toBe(true);
        expect(validate(addedProduct2)).toBe(true);

        expect(addedProduct1.alias).toBe(productData.alias);
        expect(addedProduct2.alias).toBe(productData.alias + '-0');

        await deleteProductRequest(addedProductId1, 1);
        await deleteProductRequest(addedProductId2, 1);
    }, 10000);

    test('Adding incorrect product with invalid price', async () => {
        const productData = testData.productWithStringPrice;

        // добавляем товар
        await addProductRequest(productData, undefined);
    });

    test('Adding incorrect product with negative price', async () => {
        const productData = testData.productWithNegativePrice;

        await addProductRequest(productData, undefined);
    });

    test('Adding incorrect product with null category', async () => {
        const productData = testData.productWithNullCategory;

        await  addProductRequest(productData, undefined);
    });

    test('Adding incorrect product with invalid category', async () => {
        const productData = testData.productWithInvalid0Category;

        await addProductRequest(productData, 1);

        await deleteProductRequest(addedProductId, 1);
    });

    test('Adding incorrect product with invalid 16 category', async () => {
        const productData = testData.productWithInvalid16Category;

        await addProductRequest(productData, 1);

        await deleteProductRequest(addedProductId, 1);
    });

    test('Adding incorrect product with null status', async () => {
        const productData = testData.productWithNullStatus;

        await addProductRequest(productData, 1);

        await deleteProductRequest(addedProductId, 1);
    });

    test('Adding incorrect product with invalid status', async () => {
        const productData = testData.productWithInvalidStatus;

        await addProductRequest(productData, 1);

        await deleteProductRequest(addedProductId, 1);
    });

    test('Adding incorrect product with null hit', async () => {
        const productData = testData.productWithNullHit;

        await addProductRequest(productData, 1);

        await deleteProductRequest(addedProductId, 1);
    });

    test('Adding incorrect product with invalid hit', async () => {
        const productData = testData.productWithInvalidHit;

        await addProductRequest(productData, 1);

        await deleteProductRequest(addedProductId, 1);
    });

    test('Adding incorrect product with missing props', async () => {
        const productData = testData.productWithMissingProps;

        await addProductRequest(productData, undefined);
    });

    test('Adding empty product', async () => {
        const productData = testData.emptyProduct;

        await addProductRequest(productData, undefined);
    });

    test('Adding null product', async () => {
        const productData = testData.nullProduct;

        await addProductRequest(productData, 0);
    });

    test('Adding incorrect product with invalid id', async () => {
        const productData = testData.productWithInvalidId;

        await addProductRequest(productData, 1);

        await deleteProductRequest(addedProductId, 1);
    });

    test('Deleting non-existing product', async () => {
        const nonExistingProductId = 1000000;

        await deleteProductRequest(nonExistingProductId, 0);
    });

    test('Deleting product with invalid id', async () => {
        const invalidId = "id";

        await deleteProductRequest(invalidId, 0);
    });

    test('Edit existing product', async () => {
        // берем тестовые данные
        const productData = testData.correctProduct;

        await addProductRequest(productData, 1);

        // получаем все товары
        const allProductsResponse = await getAllProductRequest();
        const allProductsCount = allProductsResponse.length;
        const addedProduct = allProductsResponse[allProductsCount - 1];
        expect(validate(addedProduct)).toBe(true);

        // проверяем что это именно тот товар, который мы добавили
        expect(CheckProduct(addedProduct, productData)).toBe(true);

        let editedProductData = testData.correctProductEdited;
        editedProductData.id = addedProductId;
        editProductRequest(editedProductData, 1);

        delete editedProductData.id;

        // получаем все товары

        const allProductsResponse2 = await getAllProductRequest();
        const allProductsCount2 = allProductsResponse2.length;
        const editedProduct = allProductsResponse2[allProductsCount2 - 1];
        expect(validate(editedProduct)).toBe(true);

        // проверяем что товар изменился
        expect(CheckProduct(editedProduct, editedProductData)).toBe(true);

        await deleteProductRequest(addedProductId, 1);

        const allProductsResponseNew = await getAllProductRequest();
        const allProductsCountNew = allProductsResponseNew.length;
        expect(allProductsCountNew + 1).toBe(allProductsCount);
    }, 10000);

    test('Edit existing product with alias already is used', async () => {
        // берем тестовые данные
        const productDataEdited = testData.correctProductEdited;

        await addProductRequest(productDataEdited, 1);
        const addedEditedProductId = addedProductId;

        // получаем все товары
        const allProductsResponse1 = await getAllProductRequest();
        const allProductsCount1 = allProductsResponse1.length;
        const addedEditedProduct1 = allProductsResponse1[allProductsCount1 - 1];
        expect(validate(addedEditedProduct1)).toBe(true);

        // проверяем что это именно тот товар, который мы добавили
        expect(CheckProduct(addedEditedProduct1, productDataEdited)).toBe(true);

        // берем тестовые данные
        const productData = testData.correctProduct;

        await addProductRequest(productData, 1);

        // получаем все товары
        const allProductsResponse = await getAllProductRequest();
        const allProductsCount = allProductsResponse.length;
        const addedProduct = allProductsResponse[allProductsCount - 1];
        expect(validate(addedProduct)).toBe(true);

        // проверяем что это именно тот товар, который мы добавили
        expect(CheckProduct(addedProduct, productData)).toBe(true);

        let editedProductData = testData.correctProductEdited;
        editedProductData.id = addedProductId;
        editProductRequest(editedProductData, 1);

        editedProductData.alias += `-${editedProductData.id}`;
        delete editedProductData.id;

        // получаем все товары
        const allProductsResponse2 = await getAllProductRequest();
        const allProductsCount2 = allProductsResponse2.length;
        const editedProduct = allProductsResponse2[allProductsCount2 - 1];
        expect(validate(editedProduct)).toBe(true);

        // проверяем что товар изменился
        expect(CheckProduct(editedProduct, editedProductData)).toBe(true);

        deleteProductRequest(addedEditedProductId, 1);
        deleteProductRequest(addedProductId, 1);

        const allProductsResponseNew = await getAllProductRequest();
        const allProductsCountNew = allProductsResponseNew.length;
        expect(allProductsCountNew + 2).toBe(allProductsCount2);
    }, 15000);

    test('Edit only price of existing product', async () => {
        // берем тестовые данные
        const productData = testData.correctProduct;

        await addProductRequest(productData, 1);

        // получаем все товары
        const allProductsResponse = await getAllProductRequest();
        const allProductsCount = allProductsResponse.length;
        const addedProduct = allProductsResponse[allProductsCount - 1];
        expect(validate(addedProduct)).toBe(true);

        // проверяем что это именно тот товар, который мы добавили
        expect(CheckProduct(addedProduct, productData)).toBe(true);

        let editedProductData = testData.editPriceProduct;
        editedProductData.id = addedProductId;
        editProductRequest(editedProductData, undefined);

        // получаем все товары
        const allProductsResponse2 = await getAllProductRequest();
        const allProductsCount2 = allProductsResponse2.length;
        const editedProduct = allProductsResponse2[allProductsCount2 - 1];

        // проверяем что товар не изменился
        expect(CheckProduct(editedProduct, productData)).toBe(true);

        await deleteProductRequest(addedProductId, 1);

        const allProductsResponseNew = await getAllProductRequest();
        const allProductsCountNew = allProductsResponseNew.length;
        expect(allProductsCountNew + 1).toBe(allProductsCount2);
    }, 15000);
});
