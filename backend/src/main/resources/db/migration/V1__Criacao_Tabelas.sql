CREATE TABLE IF NOT EXISTS obras (
    id                  BINARY(16) PRIMARY KEY NOT NULL,
    nome                VARCHAR(255) NOT NULL,
    descricao           TEXT,
    data_inicio         DATE NOT NULL,
    data_previsao_fim   DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS etapas (
    id                  BINARY(16) PRIMARY KEY NOT NULL,
    obra_id             BINARY(16) NOT NULL,
    nome                VARCHAR(50) NOT NULL,
    status              VARCHAR(50) NOT NULL,
    responsavel         VARCHAR(150) NOT NULL,
    data_inicio         DATE NOT NULL,
    data_fim            DATE NOT NULL,
    FOREIGN KEY (obra_id) REFERENCES obras(id)
);
