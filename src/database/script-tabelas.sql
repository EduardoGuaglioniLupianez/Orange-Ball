create database orangeball;

use orangeball;


CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stats (	
	id int auto_increment primary key,
	pts int,
    ass int,
    reb int,
    tentativas int,
    acertos int,
    fk_usuario int,
    data_treino date,
    constraint foreign key (fk_usuario) references usuario(id)
);

select * from usuario;
select * from stats;




-- TREINOS ESSE MES 
select count(id)
from stats
where fk_usuario = 1
and month(data_treino) = month(now())
and year(data_treino) = year(now());

select count(id)
from stats
where fk_usuario = 1
and month(data_treino) = month(DATE_SUB(NOW(), INTERVAL 1 MONTH))
and year(data_treino) = year(now());

SELECT (
select count(id)
from stats
where fk_usuario = 1
and month(data_treino) = month(now())
and year(data_treino) = year(now())
) AS qtd_treino_mes_atual,
(select count(id)
from stats
where fk_usuario = 1
and month(data_treino) = month(DATE_SUB(NOW(), INTERVAL 1 MONTH))
and year(data_treino) = year(now())) as qts_treino_mes_passado;





-- media esse mes
select avg(pts) from stats
where fk_usuario = 1
and month(data_treino) = month(now())
and year(data_treino) = year(now());

select 
	sum(pts) as pontos,
    sum(reb) as rebotes,
    sum(ass) as assitencia,
    sum(acertos) as acertos,
    sum(tentativas) as tentativas,
    data_treino 
from stats
where fk_usuario = 1 
and month(data_treino) = month(now())
and year(data_treino) = year(now())
GROUP BY data_treino;

select 
    data_treino 
from stats
where fk_usuario = 1 
and month(data_treino) = month(now())
and year(data_treino) = year(now())
GROUP BY data_treino;

INSERT INTO stats (pts, ass, reb, tentativas, acertos, data_treino, fk_usuario)  values (20,20,20,10,5,"2026-05-30",1);
