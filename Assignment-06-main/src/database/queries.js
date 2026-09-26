import { db } from "./connection.js";

export const createTables = () => {
    db.query(
        `
        CREATE TABLE IF NOT EXISTS supplier (
            supplierID INT PRIMARY KEY AUTO_INCREMENT,
            supplierName VARCHAR(255) NOT NULL,
            contactNumber VARCHAR(20) NOT NULL
        )
    `,
        (err) => {
            if (err)
                console.log("[1] Error creating supplier table:", err.message);
            else console.log("[1] supplier table created");
        },
    );

    db.query(
        `
        CREATE TABLE IF NOT EXISTS product (
            productID INT PRIMARY KEY AUTO_INCREMENT,
            productName VARCHAR(255),
            price DECIMAL(10,2) NOT NULL,
            stockQuantity INT NOT NULL,
            supplierID INT,
            CONSTRAINT FK_supplier FOREIGN KEY (supplierID) REFERENCES supplier(supplierID)
        )
    `,
        (err) => {
            if (err)
                console.log("[1] Error creating product table:", err.message);
            else console.log("[1] product table created");
        },
    );

    db.query(
        `
        CREATE TABLE IF NOT EXISTS sales (
            saleID INT PRIMARY KEY AUTO_INCREMENT,
            productID INT,
            quantitySold INT NOT NULL,
            saleDate DATE NOT NULL,
            CONSTRAINT FK_product FOREIGN KEY (productID) REFERENCES product(productID)
        )
    `,
        (err) => {
            if (err)
                console.log("[1] Error creating sales table:", err.message);
            else console.log("[1] sales table created");
        },
    );
};

export const addColumnCategory = () => {
    db.query(`ALTER TABLE product ADD COLUMN category VARCHAR(255)`, (err) => {
        if (err) console.log("[2] Error:", err.message);
        else console.log("[2] category column added");
    });
};

export const removeColumnCategory = () => {
    db.query(`ALTER TABLE product DROP COLUMN category`, (err) => {
        if (err) console.log("[3] Error:", err.message);
        else console.log("[3] category column removed");
    });
};

export const changeContactNumberType = () => {
    db.query(
        `ALTER TABLE supplier MODIFY COLUMN contactNumber VARCHAR(15) NOT NULL`,
        (err) => {
            if (err) console.log("[4] Error:", err.message);
            else console.log("[4] contactNumber changed to VARCHAR(15)");
        },
    );
};

export const addNotNullToProductName = () => {
    db.query(
        `ALTER TABLE product MODIFY COLUMN productName VARCHAR(255) NOT NULL`,
        (err) => {
            if (err) console.log("[5] Error:", err.message);
            else console.log("[5] NOT NULL added to productName");
        },
    );
};

export const insertSupplier = () => {
    db.query(
        `INSERT INTO supplier (supplierName, contactNumber) 
        VALUES 
            ('FreshFoods', '01001234567'),
            ('GreenMart', '01009876543'),
            ('TopSupply', '01112345678')`,
        (err) => {
            if (err) console.log("[6a] Error:", err.message);
            else console.log("[6a] Suppliers inserted");
        },
    );
};

export const insertProducts = () => {
    db.query(
        `INSERT INTO product (productName, price, stockQuantity, supplierID)
        VALUES
            ('Milk', 15.00, 50, 1),
            ('Bread', 10.00, 30, 1),
            ('Eggs', 20.00, 40, 1),
            ('Juice', 25.00, 20, 2),
            ('Butter', 18.00, 15, 3)`,
        (err) => {
            if (err) console.log("[6b] Error:", err.message);
            else console.log("[6b] Products inserted");
        },
    );
};

export const insertSale = () => {
    db.query(
        `INSERT INTO sales (productID, quantitySold, saleDate) 
        VALUES 
            (1, 2, '2025-05-20'),
            (2, 5, '2025-05-20'),
            (4, 3, '2025-05-21')`,
        (err) => {
            if (err) console.log("[6c] Error:", err.message);
            else console.log("[6c] Sales inserted");
        },
    );
};
    
export const updateBreadPrice = () => {
    db.query(
        `UPDATE product SET price = 25.00 WHERE productName = 'Bread'`,
        (err) => {
            if (err) console.log("[7] Error:", err.message);
            else console.log("[7] Bread price updated to 25.00");
        },
    );
};

export const deleteEggs = () => {
    db.query(`DELETE FROM product WHERE productName = 'Eggs'`, (err) => {
        if (err) console.log("[8] Error:", err.message);
        else console.log("[8] Eggs deleted");
    });
};

export const getTotalQuantitySold = () => {
    db.query(
        `
            SELECT p.productName, SUM(s.quantitySold) AS totalQuantitySold
            FROM product p
            JOIN sales s ON p.productID = s.productID
            GROUP BY p.productName
        `,
        (err, results) => {
            if (err) console.log("[9] Error:", err.message);
            else {
                console.log("[9] Total quantity sold per product:");
                console.table(results);
            }
        },
    );
};

export const getProductWithHighestStock = () => {
    db.query(
        `
        SELECT productName, stockQuantity
        FROM product
        ORDER BY stockQuantity DESC
        LIMIT 1
    `,
        (err, results) => {
            if (err) console.log("[10] Error:", err.message);
            else {
                console.log("[10] Product with highest stock:");
                console.table(results);
            }
        },
    );
};

export const getSuppliersStartingWithF = () => {
    db.query(
        `SELECT supplierName FROM supplier WHERE supplierName LIKE 'F%'`,
        (err, results) => {
            if (err) console.log("[11] Error:", err.message);
            else {
                console.log("[11] Suppliers starting with F:");
                console.table(results);
            }
        },
    );
};

export const getProductsNeverSold = () => {
    db.query(
        `
            SELECT p.productName
            FROM product p
            LEFT JOIN sales s ON p.productID = s.productID
        WHERE s.saleID IS NULL
    `,
        (err, results) => {
            if (err) console.log("[12] Error:", err.message);
            else {
                console.log("[12] Products never sold:");
                console.table(results);
            }
        },
    );
};

export const getAllSales = () => {
    db.query(
        `
                SELECT s.saleID, p.productName, s.quantitySold, s.saleDate
                FROM sales s
                JOIN product p ON s.productID = p.productID
            `,
        (err, results) => {
            if (err) console.log("[13] Error:", err.message);
            else {
                console.log("[13] All sales:");
                console.table(results);
            }
        },
    );
};

export const createStoreManagerUser = () => {
    db.query(
        `CREATE USER IF NOT EXISTS 'store_manager'@'localhost' IDENTIFIED BY 'password'`,
        (err) => {
            if (err) console.log("[14] Error creating user:", err.message);
            else console.log("[14] User store_manager created");
        },
    );
};

export const grantPermissionsToStoreManager = () => {
    db.query(
        `GRANT SELECT, INSERT, UPDATE ON assignment_06.* TO 'store_manager'@'localhost'`,
        (err) => {
            if (err)
                console.log("[14] Error granting permissions:", err.message);
            else
                console.log(
                    "[14] SELECT, INSERT, UPDATE granted to store_manager",
                );
        },
    );
};

export const revokeUpdateFromStoreManager = () => {
    db.query(
        `REVOKE UPDATE ON assignment_06.* FROM 'store_manager'@'localhost'`,
        (err) => {
            if (err) console.log("[15] Error:", err.message);
            else console.log("[15] UPDATE revoked from store_manager");
        },
    );
};

export const grantDeleteOnSalesTable = () => {
    db.query(
        `GRANT DELETE ON assignment_06.sales TO 'store_manager'@'localhost'`,
        (err) => {
            if (err) console.log("[16] Error:", err.message);
            else
                console.log(
                    "[16] DELETE on sales table granted to store_manager",
                );
        },
    );
};
