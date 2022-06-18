---Database auth
CREATE TABLE IF NOT EXISTS users
(
    id serial NOT NULL ,
    email character varying(255)  NOT NULL,
    password character varying(255)  NOT NULL,
    created_on timestamp without time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
);

---Database savings
 CREATE TABLE IF NOT EXISTS savings
(
    id serial NOT NULL ,
    user_id integer NOT NULL,
    amount numeric(11,2) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    CONSTRAINT savings_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS savings_detail
(
    id serial NOT NULL ,
    savings_id integer NOT NULL,
    type character varying(50) NOT NULL,
    amount numeric(11,2) NOT NULL,
    created_on timestamp without time zone,
    CONSTRAINT savings_detail_pkey PRIMARY KEY (id)
);

