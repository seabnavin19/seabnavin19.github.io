---
title: "MLOps Series: Intro to ML workflow(Part1)"
date: 2024-03-16
description: "Unlock the foundations of building robust machine learning systems! In this first part of the MLOps series, we walk through the complete ML workflow—from data collection and experimentation to deployment and monitoring"

tags:
   - machine learning 
   - AI
   - Mlops
---

In this series of MLops and machine learning workflow, I will discuss MLops tools, machine learning workflow, and how to take your model to production including data preparation, data cleaning, model building, model deployment, and model monitoring.

To guide you through the process of machine-learning workflow I will build a machine-learning system from start to end, I will not focus much on the machine-learning technique and data analysis but I will focus more on the architecture of the system and workflow of the system so you can use this project as a reference project when you want to build a machine learning system.

As a data scientist or machine learning engineer you are familiar with model building using frameworks like scikit-learn, tensorflow or pytorch. To build the model you may need some steps like data preparation, data cleaning, data preprocessing, hyper-parameter, and model evaluation. So with proper Mlops tools, we will able to

- easily rerun our pipeline, eliminate the bug, and able to reproduce the same result
- Data and model can be version and keep track of changes, so we can compare the result to another model, or the same model with different parameters
- We can automate some tasks like retraining, and redeploying when there are changes in data or model results.

## 1. About the demo project
In this series, I will build a system that can predict a bank’s customer churn, which means we want to know the probability of the customer willing to leave the bank based on customer data such as services used, tenor, balance, etc. you can check more about dataset here

Our goal is not to just build a machine-learning model, here are some of the criteria of our system

- Machine learning pipelines need to be reusable
- Machine learning workflow easy to maintain
- Data scientists and machine learning engineers can keep track of the results of their experiments
- Data scientists or related people can monitor the model
- Able to schedule for retraining or rerun the pipeline

## 2. System architecture
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2024_03_16_mlops_series_part_1/1_0.webp)

Based on the architect above there are a few tools that we use such as

- **Prefect** : It is a modern workflow automation that can be used for data engineering and data science workflow, with prefect we can create, schedule, and monitor complex data pipelines. So using prefect in our machine learning workflow will help us to keep track of our repetitive tasks like data cleaning and processing.
- **mlflow**: It is an open-source platform that helps us to manage the entire machine learning workflow from experiment, development, deployment, and monitoring. In our project, we will use MLflow to keep track of model experiments to compare the results of the same model with different parameters and different models that we train and to make sure we use the best model we trained in the production environment.
Dependency Of MLflow: To set up mlflow in this project, I will use Minio for artifact storing and use Mysql as a database.
- **FastAPI**: It is a modern web framework for building API, In our project, I will use FastAPI to build an API that accesses the best model from Mlflow and makes predictions on new data. FastAPI is built on Python so it will be easy for us to deploy the model since we also train the model in Python.
- **Evendently AI**: It is a platform that is used for evaluating, testing, and monitoring ML models, In this project I will use Evidently AI to monitor the model performance metrics, feature importance, and model fairness. Based on the report from Evendently AI we can decide whether to retrain our model or not.
- **Docker**: is a platform for running, testing, and deploying our application in containers. Using docker containers in this project will help us to manage and deploy all of our services easier and faster.

** Note: All of the tools above (Prefect, Mlflow, Minio, Mysql, FastAPI, and Evidently AI ) Will be set up using docker containers. I will explain all of the tools I use with the use case and the basics of each tool in the next article.

## 3. What next?
In the next article, I will go in-depth about prefect, and here is the table of content

- Basic terminology of Prefect (Agent, Workflow, Prefect Dashboard, Flow, Task, etc)
- Use case of Prefect
- Prefect in machine learning workflow
- How we use prefect in our project