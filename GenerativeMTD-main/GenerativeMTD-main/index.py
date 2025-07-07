from GenerativeMTD import *
from gvae_data_transformer import *
from preprocess import find_cateorical_columns
from train import digitize_data
import glob

# Generate samples for unsupervised learning task
dfs = pd.read_csv('Data/mortality_2019_medi_cal_expansions/datasets/*')
df_names = glob.glob('Data/mortality_2019_medi_cal_expansions/datasets/*')

dataframe_counter = 0

for real in dfs:
    cat_col = find_cateorical_columns(real)
    model = GenerativeMTD(real)
    model.fit(real, discrete_columns = cat_col)
    fake = model.sample(1000)
    fake = digitize_data(real, fake)

    fake.to_csv(f'Data/mortality_2019_medi_cal_expansions/datasets/{df_names[dataframe_counter]}', index=False)

    dataframe_counter += 1