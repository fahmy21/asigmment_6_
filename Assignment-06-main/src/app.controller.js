import {
    createTables,
    addColumnCategory,
    removeColumnCategory,
    changeContactNumberType,
    addNotNullToProductName,
    insertSupplier,
    insertProducts,
    insertSale,
    updateBreadPrice,
    deleteEggs,
    getTotalQuantitySold,
    getProductWithHighestStock,
    getSuppliersStartingWithF,
    getProductsNeverSold,
    getAllSales,
    createStoreManagerUser,
    grantPermissionsToStoreManager,
    revokeUpdateFromStoreManager,
    grantDeleteOnSalesTable,
} from "./database/queries.js";
export const bootstrap = () => {
    // 1- Create the required tables for the retail store database
    // createTables();

    // 2- Add a column "Category" to the Products table
    // addColumnCategory();

    // 3- Remove the "Category" column from Products
    // removeColumnCategory();

    // 4- Change "ContactNumber" column in Suppliers to VARCHAR(15)
    // changeContactNumberType();

    // 5- Add a NOT NULL constraint to ProductName
    // addNotNullToProductName();

    // 6a- Add a supplier with the name 'FreshFoods' and contact number '01001234567'
    // insertSupplier();

    // 6b- Insert three products: Milk, Bread, Eggs all provided by 'FreshFoods'
    // insertProducts();
    
    // 6c- Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'
    // insertSale();

    // 7- Update the price of 'Bread' to 25.00
    // updateBreadPrice();

    // 8- Delete the product 'Eggs'
    // deleteEggs();

    // 9- Retrieve the total quantity sold for each product
    // getTotalQuantitySold();

    // 10- Get the product with the highest stock
    // getProductWithHighestStock();

    // 11- Find suppliers with names starting with 'F'
    // getSuppliersStartingWithF();

    // 12- Show all products that have never been sold
    // getProductsNeverSold();

    // 13- Get all sales along with product name and sale date
    // getAllSales();

    // 14- Create a user "store_manager" and give them SELECT, INSERT, and UPDATE permissions
    // createStoreManagerUser();
    // grantPermissionsToStoreManager();

    // 15- Revoke UPDATE permission from "store_manager"
    // revokeUpdateFromStoreManager();

    // 16- Grant DELETE permission to "store_manager" only on the Sales table
    // grantDeleteOnSalesTable();
};
