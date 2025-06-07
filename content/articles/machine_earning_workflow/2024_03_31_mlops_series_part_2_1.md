---
title: "MLOps Series(Part2.1): Data Processing step with Prefect"
date: 2024-03-31
description: "In this Article I will talk about the data processing step in prefect to make it support our AI application"

tags:
   - machine learning 
   - AI
   - Mlops
---

In [Part 1](/articles/machine_earning_workflow/2024_03_16_mlops_series_part_1/), We already covered the overview and architecture of the project. In this article, I will go with the next step and talk about data fetching, cleaning, and preprocessing which is a very important step in building a machine learning model.

When working with a machine learning model, the data preprocessing step is crucial because better data leads to building a better model. Moreover, data scientists spend around 80% of their time working on data cleaning and preprocessing. Most of the time when we build a machine learning system, we go through a lot of data cleaning and preprocessing steps, leading to multiple problems:

- The preprocessing step sometimes disrupts the order.
- It’s really hard if we want to ignore some steps.
- We need to rewrite when we want to train in another environment.
- We cannot schedule or it’s very hard to schedule.
- Each step is not independent so it’s really hard to maintain and reuse.

Therefore, in terms of MLOps and automation, how can we improve efficiency and save time?

Let me to introduce [Prefect](https://docs.prefect.io/latest/), a workflow orchestration tool crafted to simplify and automate tasks. Its Python-based framework ensures that each function remains independent and straightforward to manage and schedule.

## 1. More about Prefect
Prefect is a workflow orchestration tool that helps developers build, observe, and manage data pipelines. It can also be utilized for scheduling and automating tasks as needed. There are some terminology that we need to understand in Prefect.

- **Flow**: It is defined as a Python function, any Python function can be a flow in Prefect. It is the container for workflow logic developer can define how their workflow work as python code.
- **Task**: It is like a small job in a Prefect workflow. You don’t have to use tasks, but they’re handy for breaking down your work into manageable pieces. They let you organize your workflow into smaller parts that you can reuse.
- **Deployment**: It is basically how your flows get set up to run on a server. They hold all the important details about when, where, and how your workflow should run. Instead of just being functions you have to start yourself, deployments turn your workflows into things that can be managed remotely using an API.
- **Work Pool**: It manages and organizes how your tasks are executed, It decides how and where your tasks get done.
- **Agent**: It is a lightweight polling service that gets scheduled work from the work pool and it regularly checks the schedule if there is any flow needed to run. With Prefect new version they use workers instead of agents.
- **Server**: It is a central hub for managing and monitoring flows and tasks in prefect, It provides a web-based interface that users can create, manage, schedule, and monitor their workflows.

More details and other terminology can be check [here](https://docs.prefect.io/latest/concepts/)

## 2. Getting started with Prefect
Getting started with Prefect is pretty simple if you already have Python installed on your computer.

- install Prefect via pip
``` bash
pip install prefect==[version]
```
- run Prefect server
``` bash
prefect server start
```

After we run Prefect server we will be able to access Prefect dashboard at http://localhost:4200/

![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2024_03_31_mlops_series_part_2_1/1_0.webp)

Congratulations you have successfully set up Prefect in your local machine, now you can start building your flows in Prefect.

- create a Python file main.pyand create a function that is used as a Prefect flow

``` python
from prefect import flow, task

@task
def say_hello():
    print("Hello, world!")

@task
def say_name(name):
    print(f"my name is, {name}!")

@flow
def greeting(name):
    say_hello()
    say_name(name)

if __name__ == "__main__":
    greeting(name="Navin")
```

based on this above code, I have 2 tasks that need to be run in one flow. So when I run my file the flow will get triggered and run all the tasks.

To run the flow

``` bash
python filename.py
```
After we run the flow we will able to visualize our task and flow in the dashboard.
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2024_03_31_mlops_series_part_2_1/2_0.webp)

We also can see the details of the task we run with logs, time, parameters, and other relevant information.

## How to deploy our flows as deployment
To schedule our flow and task to run at the specific time we want or run it from the UI dashboard we need to deploy our flows as [deployment](https://docs.prefect.io/latest/concepts/deployments/) in Prefect.

To deploy the `greeting` flow using the Prefect Python SDK, we’ll create a separate file named `deployment.py`. In this file, we’ll specify all the deployment details including schedules, parameters, flow name, and deployment name.

``` python
from main import greeting
from prefect.deployments import Deployment
from prefect.server.schemas.schedules import CronSchedule


greeting_deployment = Deployment.build_from_flow(
        flow = greeting,
        name = 'basic_greeting',
        work_queue_name = 'GreetingWorkQueue',
        parameters = dict(name='Navin'),
        schedule=(CronSchedule(cron="0 8 * * *", timezone="Asia/Phnom_Penh"))
        )

if __name__ == '__main__':
        greeting_deployment.apply()
```

- **`from main import greeting `**: with is we import greeting flow from our main .py file

- **`name = 'basic_greeting'`** : we define the name of our deployment

- **`parameters = dict(name='Navin')`**: we define the parameters that we want to pass to our flow when running the flow.

- **`work_queue_name`** : we define which work queue we want it to manage and handle the flow.

- **`schedule = (CronSchedule(cron="0 8 * * *"))`** : we define the schedules to tell the deployment that we want to run greeting flow every day at 8 am.

To run our deployment we need to start our work queue which is **`GreetingWorkQueue`**
``` bash
prefect agent start -q GreetingWorkQueue
```

Then we need to run our **`deployment.py`** file
```bash
python deployment.py
```

Once all processes have been executed successfully, our deployment will be visible on the Prefect dashboard. Additionally, we’ll have the capability to both run our deployment and flow directly from the Prefect dashboard.
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2024_03_31_mlops_series_part_2_1/3_0.webp)

## 3. Deploy Prefect Server in Docker
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2024_03_31_mlops_series_part_2_1/4_0.webp)

To integrate Prefect into our Mlop workflow I will deploy Prefect in Docker containers, Which will be easier for us when we want to run our workflow on different machines or environments.

To run Prefect in docker we need to have a Dockerfile
``` dockerfile
FROM python:3.11-slim-buster

RUN apt-get update
RUN apt-get update && apt-get install -y gnupg2
RUN apt-get install -y curl apt-transport-https

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
```

Create **`requirements.txt`** file to store all the libraries and it’s version that we want to install in our container
```bash
prefect==2.16.2
```

Create **`docker-compose.yaml`** file which is used for managing and to run or stopping our multiple containers
```bash
version: "3.9"
services:

  ### Prefect Database
  database:
    image: postgres:14.1-alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=prefectDatabase
    ports:
      - "5432:5432"
    volumes:
      - db:/var/lib/postgresql/data

  server:
    build: .
    container_name: prefect_ui
    restart: always
    volumes:
      - prefect:/root/.prefect
    #deploy and apply flow
    entrypoint: ["prefect", "server", "start","--host" ,"0.0.0.0"]
    environment:
      - DB_HOST=database
      - DB_USER=root
      - PREFECT_ORION_API_HOST=0.0.0.0
      - PREFECT_ORION_DATABASE_CONNECTION_URL=postgresql+asyncpg://postgres:postgres@database:5432/prefectDatabase
   
    ports:
      - 4200:4200

    ## Prefect Agent
  agent:
    build: .
    container_name: prefect_agent
    restart: always
    volumes:
        - ./:/opt/app
    command: >
            bash -c "cd /opt/app/data_preprocessing && python deployment.py && prefect agent start  -q GreetingWorkQueue"
    environment:
      - PREFECT_API_URL=http://server:4200/api
volumes:
  prefect:
  db:
networks:
  default:
          name: prefect-network
```
Based on the above docker-compose file there are 3 services that I have included to set up prefect in docker containers. To start all the services you need to run
```bash
docker compose up
```

Or if you want to run a specific service (Database , Agent, Server) you can run the below command
```bash
docker compose up {service_name}
```

**`Database Service`**: This service deploys PostgreSQL as the database for Prefect, where all data related to flows, tasks, schedules, deployments, work queues, and other Prefect-related information is stored.

**`Server Service`**: deploys the Prefect UI dashboard, providing a web-based interface to access and interact with information regarding tasks, flows, schedules, deployments, and work queues. Users can view and manage this information through the dashboard, Moreover, we also can run the tasks, flows, and setup schedules for deployment directly from the web application.

**`Agent Service`**: This Service is responsible for managing the execution of Prefect tasks within workflows. It coordinates the execution of tasks, communicates with the Prefect server, and ensures that tasks are executed efficiently.

## 4. What Next
In this section, we’ve gained insights into Prefect and its setup using Docker and Docker Compose. In the next article, we’ll delve into:
- Data preparation
- Data preprocessing
- Performing data preprocessing with Prefect
- Scheduling automatic reruns of data preprocessing tasks

## Reference
- Prefect document : https://docs.prefect.io/latest/
- Prefect Python SDK: https://docs.prefect.io/latest/api-ref/python/
- Docker: https://docs.docker.com/
- Docker compose: https://docs.docker.com/compose/
- Code to Test Yourself: https://github.com/seabnavin19/MlopsSeries/tree/part2.1