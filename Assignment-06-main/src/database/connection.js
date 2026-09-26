import mysql2 from "mysql2";

const dataBaseConnection = () => {
    return mysql2.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "assignment_06",
    });
};
export const db = dataBaseConnection();

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected to the database");
});


