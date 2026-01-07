"""
Configuration file for UIDAI Hackathon 2025
Contains all configuration settings, paths, and constants
"""

import os

# ============================================================================
# DIRECTORY PATHS
# ============================================================================

# Base directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
OUTPUT_DIR = os.path.join(BASE_DIR, 'output')
VISUALIZATION_DIR = os.path.join(OUTPUT_DIR, 'visualizations')

# Data subdirectories
RAW_DATA_DIR = os.path.join(DATA_DIR, 'raw')
PROCESSED_DATA_DIR = os.path.join(DATA_DIR, 'processed')

# Create directories if they don't exist
for directory in [DATA_DIR, OUTPUT_DIR, VISUALIZATION_DIR, RAW_DATA_DIR, PROCESSED_DATA_DIR]:
    os.makedirs(directory, exist_ok=True)

# ============================================================================
# INPUT FILE PATHS
# ============================================================================

# Enrollment System Files
ENROLLMENT_FILES = [
    'api_data_aadhar_0_350000.csv',
    'api_data_aadhar_350000_700000.csv',
    'api_data_aadhar_700000_1006029.csv'
]

# Biometric System Files
BIOMETRIC_FILES = [
    'api_data_aadhar_biometric_0_500000.csv',
    'api_data_aadhar_biometric_500000_1000000.csv',
    'api_data_aadhar_biometric_1000000_1500000.csv',
    'api_data_aadhar_biometric_1500000_1861108.csv'
]

# Demographic System Files
DEMOGRAPHIC_FILES = [
    'api_data_aadhar_demographic_0_500000.csv',
    'api_data_aadhar_demographic_500000_1000000.csv',
    'api_data_aadhar_demographic_1000000_1500000.csv',
    'api_data_aadhar_demographic_1500000_2000000.csv',
    'api_data_aadhar_demographic_2000000_2071700.csv'
]

# ============================================================================
# OUTPUT FILE PATHS
# ============================================================================

# Merged data files
MERGED_ENROLLMENT_FILE = os.path.join(PROCESSED_DATA_DIR, 'merged_enrollment_data.csv')
MERGED_BIOMETRIC_FILE = os.path.join(PROCESSED_DATA_DIR, 'merged_biometric_data.csv')
MERGED_DEMOGRAPHIC_FILE = os.path.join(PROCESSED_DATA_DIR, 'merged_demographic_data.csv')

# Analysis output files
ENROLLMENT_STATS_FILE = os.path.join(OUTPUT_DIR, 'enrollment_statistics.csv')
BIOMETRIC_STATS_FILE = os.path.join(OUTPUT_DIR, 'biometric_statistics.csv')
DEMOGRAPHIC_STATS_FILE = os.path.join(OUTPUT_DIR, 'demographic_statistics.csv')
COMPARATIVE_STATS_FILE = os.path.join(OUTPUT_DIR, 'comparative_statistics.csv')

# ============================================================================
# DATA SCHEMA
# ============================================================================

# Enrollment System Columns
ENROLLMENT_COLUMNS = [
    'registrar_id', 'state', 'district', 'pincode', 
    'age', 'num_enrollments', 'enrollment_date'
]

# Biometric System Columns
BIOMETRIC_COLUMNS = [
    'update_center_id', 'state', 'district', 'pincode',
    'age_group', 'num_biometric_updates', 'update_date'
]

# Demographic System Columns
DEMOGRAPHIC_COLUMNS = [
    'update_center_id', 'state', 'district', 'pincode',
    'age_group', 'num_demographic_updates', 'update_date'
]

# ============================================================================
# AGE GROUP DEFINITIONS
# ============================================================================

AGE_GROUPS = {
    'CHILDREN': (0, 5),
    'YOUTH': (5, 17),
    'ADULTS': (18, 150)
}

AGE_GROUP_LABELS = {
    'CHILDREN': '0-5 years',
    'YOUTH': '5-17 years',
    'ADULTS': '18+ years'
}

# ============================================================================
# ANALYSIS PARAMETERS
# ============================================================================

# Date range
START_DATE = '2025-03-01'
END_DATE = '2025-12-31'

# Statistical parameters
PERCENTILES = [0.25, 0.50, 0.75, 0.95, 0.99]
IQR_MULTIPLIER = 1.5  # For outlier detection

# Top N parameters
TOP_N_STATES = 15
TOP_N_DISTRICTS = 15
TOP_N_PINCODES = 15

# ============================================================================
# VISUALIZATION SETTINGS
# ============================================================================

# Figure settings
FIGURE_DPI = 300
FIGURE_SIZE_LARGE = (16, 10)
FIGURE_SIZE_MEDIUM = (12, 8)
FIGURE_SIZE_SMALL = (10, 6)

# Color schemes
COLOR_SCHEME_ENROLLMENT = ['#FF6B6B', '#4ECDC4', '#45B7D1']
COLOR_SCHEME_BIOMETRIC = ['#95E1D3', '#F38181']
COLOR_SCHEME_DEMOGRAPHIC = ['#AA96DA', '#FCBAD3']

# Professional color palette
COLORS = {
    'primary': '#1F4E78',
    'secondary': '#2E75B5',
    'tertiary': '#548DD4',
    'success': '#28a745',
    'warning': '#ffc107',
    'danger': '#dc3545',
    'info': '#17a2b8',
    'light': '#f8f9fa',
    'dark': '#343a40'
}

# Font settings
FONT_FAMILY = 'Arial'
FONT_SIZE_TITLE = 16
FONT_SIZE_LABEL = 12
FONT_SIZE_TICK = 10

# ============================================================================
# DATA QUALITY THRESHOLDS
# ============================================================================

DUPLICATE_THRESHOLD_GOOD = 5.0      # < 5% is good
DUPLICATE_THRESHOLD_MODERATE = 10.0  # 5-10% is moderate
# > 10% is critical

MISSING_VALUE_THRESHOLD = 1.0  # < 1% is acceptable

# ============================================================================
# REPORTING PARAMETERS
# ============================================================================

# Dashboard titles
ENROLLMENT_DASHBOARD_TITLE = "AADHAAR ENROLLMENT DATA ANALYSIS - COMPREHENSIVE DASHBOARD"
BIOMETRIC_DASHBOARD_TITLE = "AADHAAR BIOMETRIC UPDATE ANALYSIS - COMPREHENSIVE DASHBOARD"
DEMOGRAPHIC_DASHBOARD_TITLE = "AADHAAR DEMOGRAPHIC UPDATE ANALYSIS - COMPREHENSIVE DASHBOARD"

# Report metadata
HACKATHON_NAME = "UIDAI HACKATHON 2025"
ANALYSIS_PERIOD = "March - December 2025"
TOTAL_DAYS = 304

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def get_input_file_path(filename):
    """Get full path for input file"""
    return os.path.join(RAW_DATA_DIR, filename)

def get_output_file_path(filename):
    """Get full path for output file"""
    return os.path.join(OUTPUT_DIR, filename)

def get_visualization_path(filename):
    """Get full path for visualization file"""
    return os.path.join(VISUALIZATION_DIR, filename)

# ============================================================================
# PRINT CONFIGURATION SUMMARY
# ============================================================================

def print_config():
    """Print configuration summary"""
    print("=" * 80)
    print("UIDAI HACKATHON 2025 - CONFIGURATION")
    print("=" * 80)
    print(f"\nBase Directory: {BASE_DIR}")
    print(f"Data Directory: {DATA_DIR}")
    print(f"Output Directory: {OUTPUT_DIR}")
    print(f"\nEnrollment Files: {len(ENROLLMENT_FILES)}")
    print(f"Biometric Files: {len(BIOMETRIC_FILES)}")
    print(f"Demographic Files: {len(DEMOGRAPHIC_FILES)}")
    print(f"\nAnalysis Period: {START_DATE} to {END_DATE}")
    print(f"Total Days: {TOTAL_DAYS}")
    print(f"\nVisualization DPI: {FIGURE_DPI}")
    print("=" * 80)

if __name__ == "__main__":
    print_config()
