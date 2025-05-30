import * as duckdb from "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.28.1-dev232.0/+esm";

// Setup DuckDB
const bundles = duckdb.getJsDelivrBundles();
const bundle = await duckdb.selectBundle(bundles);
const workerUrl = URL.createObjectURL(new Blob([`importScripts("${bundle.mainWorker}");`], { type: "text/javascript" }));
const logger = new duckdb.ConsoleLogger();
var db = new duckdb.AsyncDuckDB(logger, new Worker(workerUrl));
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
var conn = await db.connect();
URL.revokeObjectURL(workerUrl);

const output = document.getElementById("output");
const fileStatus = document.getElementById("fileStatus");
const textStatus = document.getElementById("textStatus");
const sqlQuery = document.getElementById("sqlQuery");
const runSqlBtn = document.getElementById("runSqlBtn");
const loadCsvTextBtn = document.getElementById("loadCsvTextBtn");


async function resetDuckDB() {
    if (conn) {
        await conn.close();
    }
    if (db) {
        await db.terminate(); // releases memory and filesystem
    }

    // Re-instantiate the DuckDB database
    const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();
    const logger = new duckdb.ConsoleLogger();
    const workerUrl = URL.createObjectURL(new Blob([`importScripts("${bundle.mainWorker}");`], { type: "text/javascript" }));
    const worker = new Worker(JSDELIVR_BUNDLES.mainWorker);
    const loggerBinding = duckdb.selectBundle(JSDELIVR_BUNDLES);
    db = new duckdb.AsyncDuckDB(logger, new Worker(workerUrl));
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

    // Connect again
    conn = await db.connect();
    URL.revokeObjectURL(workerUrl);

    console.log("DuckDB has been reset.");
}


resetDuckDB();

// Initially disable SQL button until data is loaded

if (runSqlBtn !== null)
{
    runSqlBtn.disabled = true;
}

let tableName = "data";
let isDataLoaded = false;

console.log("duck.js loaded");

// Function to convert BigInt values in an object
function convertBigInts(obj) {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (typeof obj === 'bigint') {
        return obj.toString();
    }

    if (Array.isArray(obj)) {
        return obj.map(convertBigInts);
    }

    if (typeof obj === 'object') {
        const result = {};
        for (const key in obj) {
            result[key] = convertBigInts(obj[key]);
        }
        return result;
    }

    return obj;
}

// Function to run a SQL query and display results
window.runDuckQuery = async function(sql) {
// async function runDuckQuery(sql) {
    try {

        if (output !== null)
        {
            output.textContent = "Running query...";
        }

        const result = await conn.query(sql);
        const rows = convertBigInts(await result.toArray());
        
        // Get column names
        const meta = result.schema.fields.map(f => f.name);
        
        // Format the output
        let formattedOutput = `Query: ${sql}\n\n`;
        formattedOutput += `Total rows: ${rows.length}\n\n`;
        formattedOutput += JSON.stringify(rows, null, 2);
        
        if (output !== null)
        {
            output.textContent = formattedOutput;
        }

        return rows;

    } catch (error) 
    {
        if (output !== null)
        {
            output.textContent = `SQL Error: ${error.message}`;
        }

        console.error(error);
        return error.toString();
    }

}

// Function to load CSV data (either from file or text)
window.duckLoadCsvData = async function(csvText, result_text, sourceName = "") 
{
    try {
        // Drop the table if it exists
        await conn.query(`DROP TABLE IF EXISTS ${tableName}`);

        // Create a temporary file in the virtual file system
        const tempFileName = "temp_csv_file.csv";
        await db.registerFileText(tempFileName, csvText);

        // Create table from the CSV file
        await conn.query(`CREATE TABLE ${tableName} AS SELECT * FROM read_csv_auto('${tempFileName}')`);

        // Get schema information
        const schemaResult = await conn.query(`DESCRIBE ${tableName}`);
        const schemaInfo = convertBigInts(await schemaResult.toArray());
        
        // Sample query to show first few rows
        result_text = await runDuckQuery(`SELECT * FROM ${tableName} LIMIT 5`);
        
        // Set default query
        if (sqlQuery !== null)
        {
            sqlQuery.value = `SELECT * FROM ${tableName} LIMIT 10`;
        }
        
        // Update status
        if (runSqlBtn !== null)
        {
            runSqlBtn.disabled = false;
        }
        isDataLoaded = true;

        // Clean up the temporary file
        await db.dropFile(tempFileName);
        
        return true;
    } catch (error) {

        if (output !== null)
        {
            output.textContent = `Error: ${error.message}`;
        }

        console.error(error);

        if (runSqlBtn !== null)
        {
            runSqlBtn.disabled = true;
        }

        isDataLoaded = false;
        return false;
    }
}

if (document.getElementById("csvInput") !== null)
{
    // Event listener for file upload
    document.getElementById("csvInput").addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) {
            fileStatus.textContent = "No file selected";
            output.textContent = "Waiting for CSV...";
            runSqlBtn.disabled = true;
            isDataLoaded = false;
            return;
        }
        
        fileStatus.textContent = `Loading: ${file.name}`;
        const text = await file.text();
        let result_text = "";
        
        const success = await duckLoadCsvData(text, result_text, file.name);
        if (success) {
            fileStatus.textContent = `Loaded: ${file.name}`;
        } else {
            fileStatus.textContent = `Error loading: ${file.name}`;
        }
    });

    // Event listener for CSV text paste
    loadCsvTextBtn.addEventListener("click", async () => {
        const csvText = document.getElementById("csvTextarea").value.trim();
        if (!csvText) {
            textStatus.textContent = "No CSV text provided";
            output.textContent = "Waiting for CSV...";
            runSqlBtn.disabled = true;
            isDataLoaded = false;
            return;
        }
        
        textStatus.textContent = "Loading pasted CSV data...";
        
        let result_text = "";
        const success = await duckLoadCsvData(csvText, result_text, "pasted data");
        if (success) {
            textStatus.textContent = "CSV data loaded successfully";
        } else {
            textStatus.textContent = "Error loading CSV data";
        }
    });

    // Add event listener for the SQL button
    runSqlBtn.addEventListener("click", async () => {
        if (!isDataLoaded) {
            output.textContent = "Please load CSV data first";
            return;
        }
        
        const sql = sqlQuery.value.trim();
        if (!sql) {
            output.textContent = "Please enter a SQL query";
            return;
        }
        
        await runDuckQuery(sql);
    });

    // Also run query when Enter is pressed with Ctrl key
    sqlQuery.addEventListener("keydown", async (event) => {
        if (event.key === "Enter" && event.ctrlKey) {
            event.preventDefault();
            if (isDataLoaded) {
                await runDuckQuery(sqlQuery.value.trim());
            } else {
                output.textContent = "Please load CSV data first";
            }
        }
    });
}

// Run init tabs after module loads as well
if (typeof initTabs === 'function') {
    initTabs();
}