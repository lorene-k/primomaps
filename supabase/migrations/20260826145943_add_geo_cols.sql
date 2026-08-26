ALTER TABLE transactions
    ADD COLUMN longitude DOUBLE PRECISION,
    ADD COLUMN latitude DOUBLE PRECISION,
    ADD COLUMN geom extensions.GEOMETRY(Point, 4326);

CREATE INDEX idx_transactions_geom ON transactions USING GIST (geom);