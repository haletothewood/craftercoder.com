CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    customId character varying(36),
    title TEXT,
    views character varying(36),
    upvotes character varying(36)
);
