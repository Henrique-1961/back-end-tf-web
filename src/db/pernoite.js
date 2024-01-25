import pkg from "pg";
const { Pool } = pkg;

async function connect() {
    const pool = new Pool({
        connectionString: process.env.URL_BD,
    });
    
    return pool.connect();
}

async function selectSignatures() {
    const client = await connect();
    const res = await client.query("SELECT * FROM pernoite");
    return res.rows;
}

async function deleteSignature(id) {
    const client = await connect();
    const query = "UPDATE pernoite SET ativo = $1 WHERE id = $2";
    await client.query(query, [false, id]);
}

async function insertSignature(data) {
    const client = await connect();
    const query = "INSERT INTO pernoite (aluno, destino, dataSaida, horaSaida, horaChegada, dataChegada, telefoneResponsavel, responsavel, pai, ativo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id";
    const ob = [data.aluno, data.destino, data.dataSaida, data.horaSaida, data.horaChegada, data.dataChegada, data.telefoneResponsavel, data.responsavel, data.pai, true];
    const res = await client.query(query, ob);
    return res.rows[0].id;
}

async function selectSignature(id) {
    const client = await connect();
    const query = "SELECT * FROM pernoite WHERE id = $1";
    const ob = [id];
    const res = await client.query(query, ob);
    return res.rows;
}

async function updateSignature(id, data) {
    const res = await insertSignature(data);
    
    if (res !== undefined){
        const client = await connect();
        const query = "UPDATE pernoite SET ativo = $1, pai = $2 WHERE id = $3";
        await client.query(query, [false, res, id]);
        return true;
    }

    return false;
}

export default { selectSignatures, selectSignature, insertSignature, deleteSignature, updateSignature };