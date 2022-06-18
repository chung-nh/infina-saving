---Database auth
CREATE TABLE IF NOT EXISTS users
(
    id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp without time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

---Database savings
 CREATE TABLE IF NOT EXISTS savings
(
    id integer NOT NULL DEFAULT nextval('savings_id_seq'::regclass),
    user_id integer NOT NULL,
    amount numeric(11,2) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    CONSTRAINT savings_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS savings_detail
(
    id integer NOT NULL DEFAULT nextval('savings_detail_id_seq'::regclass),
    savings_id integer NOT NULL,
    type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    amount numeric(11,2) NOT NULL,
    created_on timestamp without time zone,
    CONSTRAINT savings_detail_pkey PRIMARY KEY (id)
)
