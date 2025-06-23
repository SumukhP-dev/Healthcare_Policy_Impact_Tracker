# Importing the Required libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Loading the dataset from the URL
enrollment_cohs_data = pd.read_csv("./datasets/cleaned_4.7-cohs-plans-q4-2024-odp (2).csv")
enrollment_cohs_data.head()

# plotting the time series data to visualize the trends or patterns
plt.figure()
enrollment_cohs_data = enrollment_cohs_data.pivot(index="Year", values="Number of Eligible Individuals ",
                                                  columns="County Organized Health System (COHS) Health Plan")
enrollment_cohs_data.plot()

# saving the plot as an image
plt.savefig('enrollment_cohs_plot.png')
plt.show()

# # Creating the lagged features and preparing the data for linear regression
# data['Month'] = data.index
# data['Month'] = data['Month'].map(pd.Timestamp.toordinal)

# # Defining the feature (X) and target (y) variables
# X = data[['Month']]
# y = data['Passengers']

# # Splitting the data into training and test sets in proportion of 80% and 20% respectively
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

# # Initializing the linear regression model
# model = LinearRegression()

# # Training the model on the training data available
# model.fit(X_train, y_train)

# # Making predictions on the testing data
# y_pred = model.predict(X_test)

# # Evaluating the models using MSE metric
# mse = mean_squared_error(y_test, y_pred)
# print(f'Mean Squared Error: {mse}')

# # Plotting the actual vs predicted values inorder to visualize model performance
# plt.figure(figsize=(10, 6))
# plt.plot(data.index, data['Passengers'], label='Actual')
# plt.plot(X_test.index, y_pred, label='Predicted', color='red')
# plt.title('Actual vs Predicted Airline Passengers')
# plt.xlabel('Date')
# plt.ylabel('Number of Passengers')
# plt.legend()
# # Saving the plot as an image
# plt.savefig('actual_vs_predicted.png')
# plt.show()

