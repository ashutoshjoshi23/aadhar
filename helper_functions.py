"""
Helper functions for UIDAI Hackathon 2025
Reusable utility functions for data processing and analysis
"""

import pandas as pd
import numpy as np
from datetime import datetime
import os

# ============================================================================
# DATA LOADING FUNCTIONS
# ============================================================================

def load_csv_file(filepath, encoding='utf-8'):
    """
    Load CSV file with error handling
    
    Parameters:
    -----------
    filepath : str
        Path to CSV file
    encoding : str
        File encoding (default: utf-8)
    
    Returns:
    --------
    pandas.DataFrame or None
    """
    try:
        df = pd.read_csv(filepath, encoding=encoding)
        print(f"✓ Loaded {filepath}: {len(df):,} records")
        return df
    except Exception as e:
        print(f"✗ Error loading {filepath}: {e}")
        return None

def merge_csv_files(file_list, data_dir):
    """
    Merge multiple CSV files into single DataFrame
    
    Parameters:
    -----------
    file_list : list
        List of CSV filenames
    data_dir : str
        Directory containing CSV files
    
    Returns:
    --------
    pandas.DataFrame
    """
    dfs = []
    for filename in file_list:
        filepath = os.path.join(data_dir, filename)
        df = load_csv_file(filepath)
        if df is not None:
            dfs.append(df)
    
    if dfs:
        merged_df = pd.concat(dfs, ignore_index=True)
        print(f"\n✓ Total records after merge: {len(merged_df):,}")
        return merged_df
    else:
        print("✗ No data files loaded successfully")
        return None

# ============================================================================
# DATA VALIDATION FUNCTIONS
# ============================================================================

def check_missing_values(df, name="Dataset"):
    """
    Check for missing values in DataFrame
    
    Parameters:
    -----------
    df : pandas.DataFrame
    name : str
        Name for display
    
    Returns:
    --------
    pandas.Series
        Missing value counts per column
    """
    missing = df.isnull().sum()
    total_missing = missing.sum()
    
    print(f"\n{name} - Missing Values:")
    print("=" * 50)
    if total_missing == 0:
        print("✓ No missing values found!")
    else:
        print(missing[missing > 0])
        print(f"\nTotal missing: {total_missing:,}")
    print("=" * 50)
    
    return missing

def check_duplicates(df, name="Dataset"):
    """
    Check for duplicate records
    
    Parameters:
    -----------
    df : pandas.DataFrame
    name : str
        Name for display
    
    Returns:
    --------
    dict
        Duplicate statistics
    """
    total_records = len(df)
    duplicates = df.duplicated().sum()
    duplicate_rate = (duplicates / total_records) * 100
    
    print(f"\n{name} - Duplicate Analysis:")
    print("=" * 50)
    print(f"Total Records: {total_records:,}")
    print(f"Duplicates: {duplicates:,}")
    print(f"Duplicate Rate: {duplicate_rate:.2f}%")
    
    if duplicate_rate < 5:
        print("Status: ✓ Good")
    elif duplicate_rate < 10:
        print("Status: ⚠ Moderate")
    else:
        print("Status: ✗ Critical")
    print("=" * 50)
    
    return {
        'total_records': total_records,
        'duplicates': duplicates,
        'duplicate_rate': duplicate_rate
    }

def validate_data_types(df, expected_types):
    """
    Validate column data types
    
    Parameters:
    -----------
    df : pandas.DataFrame
    expected_types : dict
        Dictionary of column:type pairs
    
    Returns:
    --------
    bool
        True if all types match
    """
    print("\nData Type Validation:")
    print("=" * 50)
    
    all_valid = True
    for col, expected_type in expected_types.items():
        if col in df.columns:
            actual_type = df[col].dtype
            match = str(actual_type) == expected_type
            status = "✓" if match else "✗"
            print(f"{status} {col}: {actual_type} (expected: {expected_type})")
            if not match:
                all_valid = False
        else:
            print(f"✗ Column '{col}' not found")
            all_valid = False
    
    print("=" * 50)
    return all_valid

# ============================================================================
# DATA CLEANING FUNCTIONS
# ============================================================================

def standardize_dates(df, date_column):
    """
    Convert date column to datetime and extract features
    
    Parameters:
    -----------
    df : pandas.DataFrame
    date_column : str
        Name of date column
    
    Returns:
    --------
    pandas.DataFrame
        DataFrame with additional date features
    """
    df[date_column] = pd.to_datetime(df[date_column])
    df['year'] = df[date_column].dt.year
    df['month'] = df[date_column].dt.month
    df['day'] = df[date_column].dt.day
    df['day_of_week'] = df[date_column].dt.day_name()
    df['week_of_year'] = df[date_column].dt.isocalendar().week
    
    print(f"✓ Standardized {date_column} and extracted temporal features")
    return df

def standardize_text(df, text_columns):
    """
    Standardize text columns (strip, title case)
    
    Parameters:
    -----------
    df : pandas.DataFrame
    text_columns : list
        List of column names to standardize
    
    Returns:
    --------
    pandas.DataFrame
    """
    for col in text_columns:
        if col in df.columns:
            df[col] = df[col].str.strip().str.title()
    
    print(f"✓ Standardized {len(text_columns)} text columns")
    return df

def standardize_pincode(df, pincode_column='pincode'):
    """
    Standardize pincode format (6 digits with leading zeros)
    
    Parameters:
    -----------
    df : pandas.DataFrame
    pincode_column : str
        Name of pincode column
    
    Returns:
    --------
    pandas.DataFrame
    """
    df[pincode_column] = df[pincode_column].astype(str).str.zfill(6)
    print(f"✓ Standardized {pincode_column} format")
    return df

# ============================================================================
# AGE CATEGORIZATION FUNCTIONS
# ============================================================================

def categorize_age(age):
    """
    Categorize age into groups
    
    Parameters:
    -----------
    age : int
        Age in years
    
    Returns:
    --------
    str
        Age category
    """
    if age <= 5:
        return '0-5 years'
    elif age <= 17:
        return '5-17 years'
    else:
        return '18+ years'

def add_age_category(df, age_column='age'):
    """
    Add age category column to DataFrame
    
    Parameters:
    -----------
    df : pandas.DataFrame
    age_column : str
        Name of age column
    
    Returns:
    --------
    pandas.DataFrame
    """
    df['age_category'] = df[age_column].apply(categorize_age)
    print(f"✓ Added age_category column")
    return df

# ============================================================================
# STATISTICAL FUNCTIONS
# ============================================================================

def calculate_summary_statistics(df, value_column):
    """
    Calculate comprehensive summary statistics
    
    Parameters:
    -----------
    df : pandas.DataFrame
    value_column : str
        Column to analyze
    
    Returns:
    --------
    dict
        Summary statistics
    """
    stats = {
        'count': len(df),
        'sum': df[value_column].sum(),
        'mean': df[value_column].mean(),
        'median': df[value_column].median(),
        'std': df[value_column].std(),
        'min': df[value_column].min(),
        'max': df[value_column].max(),
        'q25': df[value_column].quantile(0.25),
        'q75': df[value_column].quantile(0.75),
        'q95': df[value_column].quantile(0.95)
    }
    
    return stats

def detect_outliers_iqr(df, column, multiplier=1.5):
    """
    Detect outliers using IQR method
    
    Parameters:
    -----------
    df : pandas.DataFrame
    column : str
        Column to analyze
    multiplier : float
        IQR multiplier (default: 1.5)
    
    Returns:
    --------
    pandas.DataFrame
        DataFrame with outliers only
    """
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    
    lower_bound = Q1 - multiplier * IQR
    upper_bound = Q3 + multiplier * IQR
    
    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    
    print(f"\nOutlier Detection ({column}):")
    print(f"  Q1: {Q1:.2f}")
    print(f"  Q3: {Q3:.2f}")
    print(f"  IQR: {IQR:.2f}")
    print(f"  Lower Bound: {lower_bound:.2f}")
    print(f"  Upper Bound: {upper_bound:.2f}")
    print(f"  Outliers Found: {len(outliers):,} ({len(outliers)/len(df)*100:.2f}%)")
    
    return outliers

# ============================================================================
# AGGREGATION FUNCTIONS
# ============================================================================

def aggregate_by_state(df, value_column):
    """
    Aggregate data by state
    
    Parameters:
    -----------
    df : pandas.DataFrame
    value_column : str
        Column to aggregate
    
    Returns:
    --------
    pandas.DataFrame
        State-level aggregated data
    """
    state_agg = df.groupby('state').agg({
        value_column: ['sum', 'mean', 'count']
    }).reset_index()
    
    state_agg.columns = ['state', f'total_{value_column}', f'avg_{value_column}', 'num_records']
    state_agg = state_agg.sort_values(f'total_{value_column}', ascending=False)
    
    # Calculate percentage
    state_agg['percentage'] = (state_agg[f'total_{value_column}'] / 
                               state_agg[f'total_{value_column}'].sum() * 100)
    
    return state_agg

def aggregate_by_district(df, value_column):
    """
    Aggregate data by district
    
    Parameters:
    -----------
    df : pandas.DataFrame
    value_column : str
        Column to aggregate
    
    Returns:
    --------
    pandas.DataFrame
        District-level aggregated data
    """
    district_agg = df.groupby(['state', 'district']).agg({
        value_column: 'sum'
    }).reset_index()
    
    district_agg.columns = ['state', 'district', f'total_{value_column}']
    district_agg = district_agg.sort_values(f'total_{value_column}', ascending=False)
    
    return district_agg

def aggregate_by_date(df, date_column, value_column):
    """
    Aggregate data by date
    
    Parameters:
    -----------
    df : pandas.DataFrame
    date_column : str
        Date column name
    value_column : str
        Column to aggregate
    
    Returns:
    --------
    pandas.DataFrame
        Date-level aggregated data
    """
    date_agg = df.groupby(date_column).agg({
        value_column: 'sum'
    }).reset_index()
    
    date_agg.columns = ['date', f'total_{value_column}']
    
    return date_agg

# ============================================================================
# EXPORT FUNCTIONS
# ============================================================================

def save_dataframe(df, filepath, index=False):
    """
    Save DataFrame to CSV with confirmation
    
    Parameters:
    -----------
    df : pandas.DataFrame
    filepath : str
        Output file path
    index : bool
        Include index in output
    """
    try:
        df.to_csv(filepath, index=index)
        print(f"✓ Saved: {filepath} ({len(df):,} records)")
    except Exception as e:
        print(f"✗ Error saving {filepath}: {e}")

def print_dataframe_info(df, name="DataFrame"):
    """
    Print comprehensive DataFrame information
    
    Parameters:
    -----------
    df : pandas.DataFrame
    name : str
        Name for display
    """
    print(f"\n{name} Information:")
    print("=" * 80)
    print(f"Shape: {df.shape[0]:,} rows × {df.shape[1]} columns")
    print(f"Memory: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
    print("\nColumns:")
    for col in df.columns:
        print(f"  - {col} ({df[col].dtype})")
    print("=" * 80)

# ============================================================================
# FORMATTING FUNCTIONS
# ============================================================================

def format_number(num):
    """Format large numbers with comma separators"""
    return f"{num:,}"

def format_percentage(num, decimals=2):
    """Format number as percentage"""
    return f"{num:.{decimals}f}%"

def format_date(date):
    """Format date as string"""
    return date.strftime('%Y-%m-%d')

# ============================================================================
# TEST FUNCTIONS
# ============================================================================

def test_helper_functions():
    """Test all helper functions with sample data"""
    print("\n" + "=" * 80)
    print("TESTING HELPER FUNCTIONS")
    print("=" * 80)
    
    # Create sample DataFrame
    sample_data = {
        'state': ['Maharashtra', 'UP', 'Bihar'] * 10,
        'district': ['Mumbai', 'Lucknow', 'Patna'] * 10,
        'age': [3, 12, 25] * 10,
        'value': np.random.randint(1, 100, 30),
        'date': pd.date_range('2025-01-01', periods=30)
    }
    df = pd.DataFrame(sample_data)
    
    print("\n1. Testing data validation functions...")
    check_missing_values(df, "Sample Data")
    check_duplicates(df, "Sample Data")
    
    print("\n2. Testing data cleaning functions...")
    df = standardize_dates(df, 'date')
    df = standardize_text(df, ['state', 'district'])
    
    print("\n3. Testing age categorization...")
    df = add_age_category(df, 'age')
    
    print("\n4. Testing statistical functions...")
    stats = calculate_summary_statistics(df, 'value')
    print(f"\nSummary Statistics: {stats}")
    
    print("\n5. Testing aggregation functions...")
    state_agg = aggregate_by_state(df, 'value')
    print(f"\nState Aggregation:\n{state_agg.head()}")
    
    print("\n" + "=" * 80)
    print("ALL TESTS COMPLETED SUCCESSFULLY!")
    print("=" * 80)

if __name__ == "__main__":
    test_helper_functions()
