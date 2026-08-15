import os
import csv
import asyncpg
import asyncio
from dotenv import load_dotenv
from decimal import Decimal, InvalidOperation


load_dotenv()


def clean_numeric_value(value: str):
	if value == "":
		return None
	try:
		return Decimal(value)
	except (ValueError, TypeError, InvalidOperation):
		return None # TODO - Track invalid values


def load_csv(file_path: str):
	records = []
	with open(file_path, mode='r', encoding='utf-8', newline='') as csvfile:
		reader = csv.DictReader(csvfile)
		for row in reader:
			record = (
				clean_numeric_value(row["valeur_fonciere"]),
				clean_numeric_value(row["surface_reelle_bati"]),
				row["type_local"],
				row["nature_mutation"],
				row["code_commune"]
			)
			records.append(record)
	return records


async def csv_to_db():
	db_url = os.getenv("SUPABASE_URL")
	records = load_csv("../data/92.csv")
	conn = await asyncpg.connect(db_url)
	try:
		async with conn.transaction():
			await conn.execute("TRUNCATE TABLE transactions RESTART IDENTITY;")
			await conn.copy_records_to_table(
				"transactions",
				records=records,
				columns=[
					"valeur_fonciere",
					"surface_reelle_bati",
					"type_local",
					"nature_mutation",
					"code_commune"
				]
			)
	finally:
		await conn.close()
	print(f"{len(records)} records added.")


if __name__ == "__main__":
	asyncio.run(csv_to_db())
