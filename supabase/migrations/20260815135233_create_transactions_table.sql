CREATE TABLE transactions (
    id serial primary key,
    valeur_fonciere numeric(12, 2),
    surface_reelle_bati numeric(8, 2),
    type_local text,
    nature_mutation text,
    code_commune text
);
