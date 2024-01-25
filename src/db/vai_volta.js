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
    const res = await client.query("SELECT * FROM vaiVolta");
    return res.rows;
}

async function deleteSignature(id) {
    const client = await connect();
    const query = "UPDATE vaiVolta SET ativo = $1 WHERE id = $2";
    await client.query(query, [false, id]);
}

async function insertSignature(data) {
    const client = await connect();
    const query = "INSERT INTO vaiVolta (aluno, destino, data, hora_saida, hora_chegada, pai) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
    const ob = [data.aluno, data.destino, data.data, data.hora_saida, data.hora_chegada, data.pai];
    const res = await client.query(query, ob);
    return res.rows[0].id;
}

async function selectSignature(id) {
    const client = await connect();
    const query = "SELECT * FROM vaiVolta WHERE id = $1";
    const ob = [id];
    const res = await client.query(query, ob);
    return res.rows;
}

async function updateSignature(id, data) {
    const res = insertSignature(data);

    if (res !== undefined) {
        const client = await connect();
        const query = "UPDATE vaiVolta SET ativo = $1, pai = $2 WHERE id = $3";
        await client.query(query, [false, res, id]);
        return true;
    }

    return false;
}

export default { selectSignatures, selectSignature, insertSignature, deleteSignature, updateSignature };