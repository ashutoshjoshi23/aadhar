"""
01_merge_enrollment.py
Merge enrollment CSV files into single dataset

UIDAI Hackathon 2025
"""

import pandas as pd
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.config import *
from utils.helper_functions import *

def main():
    """Main function to merge enrollment files"""
    
    print("=" * 80)
    print("ENROLLMENT DATA MERGING")
    print("=" * 80)
    
    # Load and merge files
    print(f"\nLoading {len(ENROLLMENT_FILES)} enrollment files...")
    merged_df = merge_csv_files(ENROLLMENT_FILES, RAW_DATA_DIR)
    
    if merged_df is None:
        print("✗ Failed to merge files")
        return
    
    # Validate data
    print("\n--- Data Validation ---")
    check_missing_values(merged_df, "Enrollment Data")
    check_duplicates(merged_df, "Enrollment Data")
    
    # Data info
    print_dataframe_info(merged_df, "Merged Enrollment Data")
    
    # Display sample
    print("\nFirst 5 records:")
    print(merged_df.head())
    
    print("\nData types:")
    print(merged_df.dtypes)
    
    # Calculate total enrollments
    total_enrollments = merged_df['num_enrollments'].sum()
    print(f"\n✓ Total Enrollments: {format_number(total_enrollments)}")
    
    # Save merged file
    print(f"\nSaving merged data...")
    save_dataframe(merged_df, MERGED_ENROLLMENT_FILE)
    
    # Summary statistics
    print("\n--- Summary Statistics ---")
    print(merged_df['num_enrollments'].describe())
    
    # Date range
    if 'enrollment_date' in merged_df.columns:
        merged_df['enrollment_date'] = pd.to_datetime(merged_df['enrollment_date'])
        print(f"\nDate Range: {merged_df['enrollment_date'].min()} to {merged_df['enrollment_date'].max()}")
    
    # Geographic coverage
    print(f"\nGeographic Coverage:")
    print(f"  States/UTs: {merged_df['state'].nunique()}")
    print(f"  Districts: {merged_df['district'].nunique()}")
    print(f"  Pincodes: {merged_df['pincode'].nunique()}")
    
    # Age statistics
    print(f"\nAge Statistics:")
    print(f"  Min Age: {merged_df['age'].min()}")
    print(f"  Max Age: {merged_df['age'].max()}")
    print(f"  Mean Age: {merged_df['age'].mean():.2f}")
    print(f"  Median Age: {merged_df['age'].median():.2f}")
    
    print("\n" + "=" * 80)
    print("✓ ENROLLMENT DATA MERGE COMPLETED SUCCESSFULLY!")
    print("=" * 80)
    print(f"\nOutput file: {MERGED_ENROLLMENT_FILE}")
    print(f"Total records: {format_number(len(merged_df))}")
    print(f"Total enrollments: {format_number(total_enrollments)}")

if __name__ == "__main__":
    main()
