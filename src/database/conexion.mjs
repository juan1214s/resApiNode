import sql from `mssql`

const dbSettings ={
    user:"",
    password:"",
    server:"",
    database:""
}

sql.connect(dbSettings);