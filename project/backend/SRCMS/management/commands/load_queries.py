import pandas as pd
import sys
import os
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import psycopg2

class Command(BaseCommand):
    help = 'Load data from an Excel file into the complaints table'

    def add_arguments(self, parser):
        parser.add_argument(
            '--file',
            type=str,
            required=True,
            help='Path to the Excel file containing complaint data'
        )
        parser.add_argument(
            '--batch-size',
            type=int,
            default=5000,
            help='Number of rows per batch'
        )
    def handle(self, *args, **options):
        file_path = options['file']
        if not os.path.exists(file_path):
            raise CommandError(f"File not found: {file_path}")

        # Read Excel into DataFrame
        try:
            df = pd.read_excel(file_path)
        except Exception as e:
            raise CommandError(f"Error reading Excel file: {e}")
        
        print("RAW COLUMNS:", list(df.columns))  # before normalization

         # Optional: Normalize column names for consistent mapping
        df.columns = df.columns.str.strip().str.lower().str.replace(r'\s+', '_', regex=True)
        print("NORMALIZED COLUMNS:", list(df.columns))
        df.rename(columns={'id':'external_id'}, inplace=True)
        
        self.stdout.write(f"ALIASED COLUMNS: {list(df.columns)}")

        # Connect to Postgres via Django settings
        try:
            conn = psycopg2.connect(
                host=settings.DATABASES['default']['HOST'],
                dbname=settings.DATABASES['default']['NAME'],
                user=settings.DATABASES['default']['USER'],
                password=settings.DATABASES['default']['PASSWORD'],
                port=settings.DATABASES['default']['PORT'],
            )
            
            conn.autocommit = True
            cursor = conn.cursor()
        except Exception as e:
            raise CommandError(f"Database connection error: {e}")

        BATCH_SIZE, MAX_ERRORS = 5000, 50  # Define batch size for insertion
        # Process DataFrame in batches
        n = len(df)
        for batch_start in range(0, n, BATCH_SIZE):
            batch = df.iloc[batch_start : batch_start + BATCH_SIZE]
            batch_errors = []
            inserted_this_batch = 0
            total_inserted = 0

            
        for i, start in enumerate(range(0, len(df), BATCH_SIZE), 1):
            print(f"Starting batch #{i} (rows {start}–{start+BATCH_SIZE-1})")
            
        print(n, "rows in total.")
            


        # Insert rows
        count = 0
        with conn.cursor() as cursor:
            for idx, row in batch.iterrows():
                try:
                    # Map DataFrame columns to table columns explicitly
                    cursor.execute(
                        """
                        INSERT INTO "SRCMS_queryresponse"
                          (external_id,
                           user_query,
                           category,
                           subcategory,
                           suggested_response
                           )
                        VALUES (%s, %s, %s, %s, %s)
                        ON CONFLICT (external_id) DO NOTHING
                        """,
                        (
                            row['external_id'],               # was missing: now mapped
                            row['user_query'],       # was 'category', corrected to match Excel
                            row['category'],         # originally 'complaint_text'
                            row['subcategory'],     # new mapping
                            row['suggested_response']# new mapping
                        )
                    )
                    if cursor.rowcount:
                        inserted_this_batch += 1
                except KeyError as ke:
                    self.stderr.write(self.style.ERROR(
                        f"Row {idx}: missing column {ke}. Check Excel headers or normalization."))
                except Exception as e:
                    # Log first error in this batch only
                    self.stderr.write(f"Batch error at row {idx}: {e}")
                    break
                count += 1
            total_inserted += inserted_this_batch
            self.stdout.write(
                f"Batch {batch_start//BATCH_SIZE + 1}: inserted {inserted_this_batch}, total {total_inserted}"
            )

        self.stdout.write(self.style.SUCCESS(
            f"Done. Total new records: {total_inserted}"
        ))
        conn.commit()
        for idx, msg in batch_errors:
            self.stderr.write(self.style.ERROR(f"Row {idx} failed: {msg}"))
        
        cursor.close()
        conn.close()

        self.stdout.write(self.style.SUCCESS(f"Successfully loaded {count} records from {file_path}.") )