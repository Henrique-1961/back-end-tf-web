import pkg from "pg";
const { Pool } = pkg;

async function connect() {
    const pool = new Pool({
        connectionString: process.env.URL_BD,
    });
    
    return pool.connect();
}

async function autenticarAluno(email, senha) {
    const client = await connect();
    const query = "SELECT * FROM aluno WHERE email = $1 AND senha = $2";
    const aluno = [email, senha];
    const res = await client.query(query, aluno);
    return res.rows[0];
}

async function selectAlunos() {
    const client = await connect();
    const res = await client.query("SELECT * FROM aluno");
    return res.rows;
}

async function deleteAluno(id) {
    if (id == 1) throw new Error("the user 1 can not be deleted");
    const client = await connect();
    const query = "DELETE FROM aluno WHERE id = $1";
    await client.query(query, [id]);
}

async function insertAluno(data) {
    const client = await connect();
    const query = "INSERT INTO aluno (nome, email, senha, cidade, responsavel, telefone_responsavel, ativo, pernoite) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ";
    const aluno = [data.nome, data.email, data.senha, data.cidade, data.responsavel, data.telefone_responsavel, data.ativo, data.pernoite];
    await client.query(query, aluno);
}

async function selectAluno(id) {
    const client = await connect();
    const query = "SELECT * FROM aluno WHERE id = $1";
    const aluno = [id];
    const res = await client.query(query, aluno);
    return res.rows;
}

async function updateAluno(data) {
    const client = await connect();
    const query = "UPDATE aluno SET nome = $1, email = $2, senha = $3, cidade = $4, responsavel = $5, telefone_responsavel = $6, ativo = $7, pernoite = $8 WHERE id = $9";
    const aluno = [data.nome, data.email, data.senha, data.cidade, data.responsavel, data.telefone_responsavel, data.ativo, data.pernoite, data.id];
    await client.query(query, aluno);
}

export { selectAlunos, selectAluno, insertAluno, deleteAluno, updateAluno, autenticarAluno };