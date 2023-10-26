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
    const res = await client.query("SELECT * FROM vai_volta");
    return res.rows;
}

async function deleteSignature(id) {
    const client = await connect();
    const query = "DELETE FROM vai_volta WHERE id = $1";
    await client.query(query, [id]);
}

async function insertSignature(data) {
    const client = await connect();
    const query = "INSERT INTO vai_volta (aluno, destino, data, hora_saida, hora_chegada) VALUES ($1, $2, $3, $4, $5) ";
    const ob = [data.aluno, data.destino, data.data, data.hora_saida, data.hora_chegada];
    await client.query(query, ob);
}

async function selectSignature(id) {
    const client = await connect();
    const query = "SELECT * FROM vai_volta WHERE id = $1";
    const ob = [id];
    const res = await client.query(query, ob);
    return res.rows;
}

async function updateSignature(data) {
    const client = await connect();
    const query = "UPDATE vai_volta SET aluno = $1, destino = $2, data = $3, hora_saida = $4, hora_chegada = $5 WHERE id = $6";
    const ob = [data.aluno, data.destino, data.data, data.hora_saida, data.hora_chegada, data.id];
    await client.query(query, ob);
}

export { selectSignatures, selectSignature, insertSignature, deleteSignature, updateSignature };