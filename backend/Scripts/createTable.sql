CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    senha TEXT NOT NULL
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO Usuarios (usuario, senha)
VALUES (
    'admin', 
    crypt('admin', gen_salt('bf'))
);

CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(8) UNIQUE NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    ano INTEGER,
    cor VARCHAR(30),
    km_atual INTEGER,
    tipo VARCHAR(30),
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE agendamento_manutencao (
    id SERIAL PRIMARY KEY,
    veiculo_id INTEGER REFERENCES veiculos(id),
    data_agendamento TIMESTAMP WITH TIME ZONE NOT NULL,
    tipo_manutencao VARCHAR(100),
    descricao TEXT
);

CREATE TABLE historico_manutencao (
    id SERIAL PRIMARY KEY,
    veiculo_id INTEGER REFERENCES veiculos(id),
    data_manutencao TIMESTAMP WITH TIME ZONE NOT NULL,
    detalhes TEXT,
    custo NUMERIC(10, 2),
    km_troca INTEGER
);

CREATE TABLE controle_custos (
    id SERIAL PRIMARY KEY,
    veiculo_id INTEGER REFERENCES veiculos(id),
    tipo_custo VARCHAR(100),
    valor NUMERIC(10, 2),
    data_custo TIMESTAMP WITH TIME ZONE NOT NULL,
    descricao TEXT
);
