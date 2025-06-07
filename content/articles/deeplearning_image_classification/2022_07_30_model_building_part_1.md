---
title: "Deep Learning Image classification application- part2 ( Model Building)"
date: 2022-07-30
description: "Continue your journey in building a deep learning image classification app! In Part 2, we dive into model development—covering dataset preparation, CNN architecture design, training strategies, and performance evaluation. "

tags:
   - machine learning 
   - AI
   - DeepLearning
   - Computer Vision
   - Mobile Application
---

Before you read this article you should also read my first article here, Because in my first article I have given you the overview of my project and the motivation to do this project, If you have already read part 1 it’s time to get started.

In this article part2, I will focus on the steps and processes to build an image classification model. Normally in order to build a Machine learning model, there are the steps that I follow:

- Data collection (either from any source or we collect on our own)
- Data preparation and Feature engineering
- google collab setup
- Model building
- Model validation and Testing

## 1. Data Collection
In this project, I use the data that was published in Kaggle

Link Dataset: https://www.kaggle.com/datasets/chipprogrammer/mashroom-image-classification

This dataset has 3017 images of 16 different mushrooms, and they also classify those 16 mushrooms as edible and Not edible.

### 1.1 Download the data from Kaggle to Drive
Since I use google collab to train this model, I need to download the data set in my google drive. I use google collab because I can train my model on GPU that was provided by Google.
<script src="https://gist.github.com/seabnavin19/44a8bcfae6d1a3023c2066552ea0fe69.js"></script>

## 2. Collab Setup
To use GPU provided by google, click runtime in the collab navbar then select GPU as the Hardware accelerator.
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2022_07_30_deeplearning_image_classification_part_2/1_0.webp)

You can see the information on the GPU provided by Google by using this command:
```bash
!nvidia-smi
```
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2022_07_30_deeplearning_image_classification_part_2/2_0.webp)

## 3. Data Exploration and Preparation
### 3.1 Data Loading
In order to load data faster and more efficiently when training and evaluating my deep learning model, I will use ImageDataGenerator class in the Keras. With ImageDataGenerator our images in datasets will be progressive load in the training and evaluation stage. So we don’t need to load all the images beforehand into our system memory.
<script src="https://gist.github.com/seabnavin19/41c49218fab7c45d75b8aef925110ebe.js"></script>

Based on the code you can see with ImageDataGenerator, we can apply any transformation and augmentation (rescale, shear, zoom, etc) in our images when loaded for training and evaluation.

Also, we can split our data into training data and validation data by using (subset) when loading the dataset.

See more detail here: https://www.tensorflow.org/api_docs/python/tf/keras/preprocessing/image/ImageDataGenerator

### 3.2 Data Exploring
After running the above code this is the output:
```bash
Found 2420 images belonging to 16 classes. 
Found 597 images belonging to 16 classes.
```
which means we have 2420 images for training and 597 for validation, all the images belong to 16 types of mushrooms.
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2022_07_30_deeplearning_image_classification_part_2/3_0.webp)

At first, I thought this data it has some problems, it seems that the data is not balanced, but after I see that the mushroom that was not edible tend to have more data so it is the benefit for my model because I want my model to have a false negative of mushrooms that not edible.

## 4. Model Building
After we load and explore our data our next step is to build a model which can classify the mushroom. I will use the transfer learning technique to train the model specifically using intercpetV3 as a base model and connect it when a dense layer to classify the mushroom.

**What is transfer learning?**

Transfer learning is a technique we use pre-trained layers of existing neural networks that accomplish a similar task to the one you are trying to solve. For example, you can access a DNN that is already trained to classify 1000 classes including animals, vehicles, plants, etc let’s call it model A. And now you want to build a model that classifies cat and dog then it is a good idea to use a pre-trained model A.

**What is the benefit of transfer learning?**

- You can use the layers of the existing model that already trained
- Require less data for the model to detect the pattern
- Speed up the training since you reduce trainable parameters in each layer

### 4.1 Model architecture
![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2022_07_30_deeplearning_image_classification_part_2/4_0.webp)
<script src="https://gist.github.com/seabnavin19/f207e5d29e93cbbf975cacb5e31ee3e2.js"></script>

Based on the graph You can see that

- I make use of the inceptionV3 model pre-trained layers
- line (7 -9) we make all layers of the pre-trained model into non-trainable layers, which means the weights of the layer will not affect by backpropagation.
- line (13–20) I put the inceptionV3 layer into my sequential model that connects to a hidden layer with 64 neurons with relu activation function, then connects to an output layer which uses softmax activation function because we train a multiclass classification model.
4.2 Training
Now the model is ready the next step is to give the data to the model to learn.

To avoid overfitting and vanishing gradient problems before we train the model it is a good idea to define an early stopping callback function, which means the model will stop the learning process when performing it the validation does not improve anymore.
<script src="https://gist.github.com/seabnavin19/45a797e72cc31a5bca9a031630586959.js"></script>

![](https://raw.githubusercontent.com/seabnavin19/Resource-For-Public-Article/main/Articles/2022_07_30_deeplearning_image_classification_part_2/5_0.webp)


Actually, I have trained the model twice first I train it for only 20 epochs then I trained it for another 10 epochs, the performance of the model seems good now with 0.94 accuracy with train data and 0.80 with test data.

then let’s save the model for later use:
```bash
model.save(path/to/save)
```
## What Next?

- Validate and test the model
- Performance matric, AUC, and ROC to select a better threshold
- Quantization of the model for use in mobile application
