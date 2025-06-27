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

    def handle(self, *args, **options):
        file_path = options['file']
        if not os.path.exists(file_path):
            raise CommandError(f"File not found: {file_path}")

        # Read Excel into DataFrame
        try:
            df = pd.read_excel(file_path)
        except Exception as e:
            raise CommandError(f"Error reading Excel file: {e}")
        
         # Optional: Normalize column names for consistent mapping
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')

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


        # Insert rows
        count = 0
        for idx, row in df.iterrows():
            try:
                # Map DataFrame columns to table columns explicitly
                cursor.execute(
                    """
                    INSERT INTO "SRCMS_complaint"
                      (passenger_id,
                       complaint_type,
                       complaint_description,
                       complaint_id,
                       train_type,
                       severity_level
                       )
                       
                    VALUES (%s, %s, %s, %s, %s, %s)
                    """,
                    
                    (
                        row['passenger_id'],               # was missing: now mapped
                        row['complaint_type'],              # was 'category', corrected to match Excel
                        row['complaint_description'],       # originally 'complaint_text'
                        row['complaint_id'],                # new mapping
                        row['train_type'],                  # new mapping
                        row['severity_level'],              # normalized from 'Severity Level'
                    )
                )
                count += 1
            except KeyError as ke:
                self.stderr.write(self.style.ERROR(
                    f"Row {idx}: missing column {ke}. Check Excel headers or normalization."))
            except Exception as e:
                self.stderr.write(self.style.ERROR(
                    f"Row {idx} insertion failed: {e}"))

        
        cursor.close()
        conn.close()

        self.stdout.write(self.style.SUCCESS(f"Successfully loaded {count} records from {file_path}.") )