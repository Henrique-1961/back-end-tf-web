import pkg from "pg";
const { Pool } = pkg;

async function connect() {
    const pool = new Pool({
        connectionString: process.env.URL_BD,
    });
    
    return pool.connect();
}

async function autenticarAssistente(email, senha) {
    const client = await connect();
    const query = "SELECT * FROM assistente WHERE email = $1 AND senha = $2";
    const assistente = [email, senha];
    const res = await client.query(query, assistente);
    return res.rows[0];
}

async function selectAssistentes() {
    const client = await connect();
    const res = await client.query("SELECT * FROM assistente");
    return res.rows;
}

async function deleteAssistente(id) {
    if (id == 1) throw new Error("the user 1 can not be deleted");
    const client = await connect();
    const query = "DELETE FROM assistente WHERE id = $1";
    await client.query(query, [id]);
}

async function insertAssistente(data) {
    const client = await connect();
    const query = "INSERT INTO assistente (nome, email, senha) VALUES ($1, $2, $3) RETURNING id";
    const assistente = [data.nome, data.email, data.senha];
    const res = await client.query(query, assistente);
    return res.rows[0].id;
}

async function selectAssistente(id) {
    const client = await connect();
    const query = "SELECT * FROM assistente WHERE id = $1"; 
    const assistente = [id];
    const res = await client.query(query, assistente);
    return res.rows;
}

async function updateAssistente(data) {
    const client = await connect();
    const query = "UPDATE aluno SET nome = $1, email = $2, senha = $3, cidade = $4, responsavel = $5, telefone_responsavel = $6, ativo = $7, pernoite = $8 WHERE id = $9";
    const assistente = [data.nome, data.email, data.senha, data.cidade, data.responsavel, data.telefone_responsavel, data.ativo, data.pernoite, data.id];
    await client.query(query, assistente);
}

export { selectAssistentes, selectAssistente, insertAssistente, deleteAssistente, updateAssistente, autenticarAssistente };