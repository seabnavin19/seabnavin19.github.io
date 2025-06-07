---
title: Easy way to build a web app to test your model just like “If else logic”​
date: 2022-04-15
description: "Deploying ML models doesn’t have to be complex! This article walks you through a beginner-friendly approach to turning your trained model into a functional web app using simple if-else logic. Great for data scientists and ML enthusiasts who want to showcase their models with minimal coding hassle. "

imageAltAttribute: CCTV Camera
tags:
   - LLM
   - AI Assistance 
   - OpenAI
---
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*j1Wa-czPXciFXbEz)
If you are working with Machine learning, Deep learning, or AI and you have a hard time deploying your model into any backend and frontend framework this article will help you a lot. I have worked with many ML and DL models include computer vision, Natural language processing, Recommendation engine and I realize that the deployment part is one of the most difficult parts in the project until I know Streamlit.

Streamlit is an open-source Python library that makes it easy to create and share beautiful, custom web apps for machine learning and data science. In just a few minutes you can build and deploy powerful data apps. And in this article, I will share with you some basics of streamlit so you can start building the web app for your ML, DL, AI application.

## 1. Installation
First, you need to have streamlit in your machine or virtual environment by run this command
```bash
pip install streamlit
```

## 2. Start first Web app
you can start your first web app by simply importing streamlit in any python file that you want to build your web app.
```python
import streamlit as st
st.title("hello")
```

Then you can start your first web app in streamlit by running this command: streamlit run [your app name]

## 2. Basic function in streamlit
It is not possible to share with you all the functions and features that provide by streamlit in this article. The purpose of this article is to give you a brief introduction to streamlit and guide you to build a simple web app with streamlit. you can see streamlit documentation here.

### 2.1 Text in streamlit

In streamlit you can write the text in many different forms such as title, header, normal text, etc.
```python
import streamlit as st
st.title("hello")
st.header("hello")
st.subheader('hello')
st.text('hello')
st.write("hello")
```
For **`st.write()`** is more special than others because with st.write() we can write any object into web app. for example we can write the list or dictionary to the web app.
```python
st.write([1,2,4,5,6]
st.write({"Name":"Navin","Age":17}))
```
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2022_04_15_streamlit_webapp/2_0.webp)

### 2.2 plot and graph

With streamlit we can plot or visualize the data with an interactive graph in a few lines of code.

```python
df= pd.read_csv("Data/AAPL.csv"
st.line_chart(df[["Close","High"]]))
```
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2022_04_15_streamlit_webapp/3_0.webp)

You can also try with another graph, pie chart, scatter plot, Map, heat map, etc.

### 2.3 Media and File

We can simply upload Images, Videos, any file to web app built by streamlit without need to handle anything and the logic is just very simple.
```python
image= st.file_uploader("Upload File here"
if image:
    st.image(image))
```

With these 3 lines of code, you can get the image from user uploading.

## 3. Summary
In conclusion, streamlit can help programmers, AI, and ML engineers who are not good with the front-end frameworks they can start building their first web app within a few minutes. And in this article, I am not able to show you all the features that provide by stream lit but I hope this article can give motivation to people who didn’t realize about streamlit and stress with the deployment part in their AI application prototype.