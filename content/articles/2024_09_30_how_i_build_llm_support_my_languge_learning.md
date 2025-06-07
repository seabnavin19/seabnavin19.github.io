---
title: How I build an LLM application that helps me learn new languages
date: 2024-09-30
description: "Learning new language is not easy , It's been really hard for me when comming to japan without knowning the language, So I came up with a creative application that help me learn the language more faster and fun "

imageAltAttribute: CCTV Camera
tags:
   - LLM
   - AI Assistance 
   - OpenAI
---


Learning a new language is not easy we need to know a lot of new vocabulary and grammar and with this, it requires us to use a lot of memories and practice the use case of those vocabulary and grammar.

## Problem with Learning New Languages
When I started moving to Japan, I needed to learn Japanese so I tried to pick up some books and use Duolingo to learn the languages, but when I started learning I noticed that I had noted down a lot of vocabulary and grammars and even I review it, still, I am not able to remember all of those things. Below is my real note of Japanese words and grammar in notion.
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2024_09_30_how_i_build_llm_support_my_languge_learning/1_0.webp)

## My motivation to start the project
But afterward, I found some podcasts and YouTube channels that use some basic Japanese words, and when I listened to those podcasts I felt like I was able to reflect on words and grammar that I have learned and I can understand some parts of the podcast, Then I’m starting thinking “wow this is great if I can feed all the words that I learn into this kind of podcast”.

Fortunately, I am a person who is passionate about learning and implementing AI and machine learning so I have an idea that I will be great if I can build something like that, so I decided to spend my whole weekend building this thing up.

## What is a Podcast generator?
The purpose of this project is to build tools that can generate podcasts by using the grammar and words that we have learn as the reference and the podcast content will be focused on using those words along with grammar, more over there will be a follow-up question to make sure we learn and understand the concept.

There will be 2 main features of this app:

1. PodCast Generation: generate a voice podcast that can be use to improve listening and use of the vocabulary and grammar
2. Question and Answer, Importance Words Generation: To ensure that users fully understand the podcast, I also include question and answer generation, which users can test their skills based on the grammar and vocabulary they learned.

## Technologies used
There are a few technologies and tools that I’ve used in this project

**programming languages** : python, because it is really easy to work with AI and machine learning project (in case there need improvement rather than LLM)

**Web Framework**: [streamlit](https://streamlit.io/), I think Streamlit is a very easy and fast for build a web application since it doesn’t require a lot of time to set up and code.

**LLM**: First I thought I should use an open-source LLM like [Llama](https://www.llama.com/), but seem it would take a longer time for me to start with it, so first I decided to go with the OpenAI model [gpt4o-mini](https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/) because this model is such and fast and cost-efficient model.

**Text-to-speech**: I also use the model from OpenAI for text-to-voice to generate the podcast, you can see details of the implementation [here](https://platform.openai.com/docs/guides/text-to-speech)

## Code Implementation
In this part, I will show step-by-step implementation of the project

Start a new project and environment in Python
``` bash
##create new folder
mkdir podcast_gen

##create new environment in python
python -m venv venv

##active python environment
 ##in mac
 source venv/bin/activate
 ## in window
 venv/script/actiate
```

Install some important library
``` bash
pip install streamlit  openai  langchain_openai

```

Define structure output: Because we want the out from the model into the format we want and make it easy to access and use later in the code

<script src="https://gist.github.com/seabnavin19/69348440c96c2b1825eb2c1853c7e57f.js"></script>

With this model, we can get the output from the model as we expected, see the detail of [here](https://python.langchain.com/docs/how_to/structured_output/).

Create a class for Generating the podcast script

<script src="https://gist.github.com/seabnavin19/895a57b39799f13eb79beb6644cf9439.js"></script>

In line 32: we tell the llm to give output based on specific format like podcast model class

After we get the script, questions, important words of the podcast we need to convert the script into a speech, which we use the OpenAI tts-1 model for that purpose.

<script src="https://gist.github.com/seabnavin19/268c60f57f1796e46d21d3033526b411.js"></script>


Now it's time to use all of these in our frontend which built base on streamlit

<script src="https://gist.github.com/seabnavin19/a68161b096112db5a4850157920452e9.js"></script>

So to run the application we just simply run

``` bash
streamlit run app.py
```

## Web Application
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2024_09_30_how_i_build_llm_support_my_languge_learning/2_0.webp)

## What Next ?
Seem this is just a simple prototype project but I think this kind of project is really useful and LLm and AI are really helpful to help us achieve our goal more faster rather than learning through traditional style , but still there are alot of things that I think that it need to be improve

- Update podcast more better with conversation interaction
- Receive voice from user and keep a conversation with user to encourage user to use the vocabulary and grammar

## Importance Resource
- Langchain: https://www.langchain.com/
- StreamLit: https://streamlit.io/components
- OpenAI Text to Speech: https://platform.openai.com/docs/guides/text-to-speech
- Github Repo: https://github.com/seabnavin19/llm-languages-learning-podcast-gen/tree/main

