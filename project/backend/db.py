import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

print("HOST:",    os.getenv("DB_HOST"))
print("DB:",      os.getenv("DB_NAME"))
print("USER:",    os.getenv("DB_USER"))
print("PASSWORD:",repr(os.getenv("DB_PASSWORD")))
print("PORT:",    os.getenv("DB_PORT"))

def get_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT", 5432)
    )
if __name__ == "__main__":
    try:
        conn = get_connection()
        print("✅ Connection successful!")
        conn.close()
    except Exception as e:
        print("❌ Connection failed:", e)