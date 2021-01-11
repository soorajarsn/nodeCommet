# About
This project is about web crawling. There is website called medium.com, where we have articles on different topics. It
crawls the articles of that website(that is [medium.com](https://medium.com). )
I have used react as frontend and node.js as backend. On frontend it has a landing page from where you can select 
a given topic or you can search for a topic that you may want to read using a search box. When you select a topic 
firstly it shows ten recent articles, and then you can fetch more articles by pressing on a button at the bottom of the 
page.

# Technologies and Programming languages:
I have used the following technologies to make this website working.

## Node.js
I have used node.js for backend. Some of the libraries that I have used at backend are as follows:

#### request-promise
This library is used to make requests to medium.
#### cheerio
I have used cheerio as server side jquery to process the raw data coming from medium's website. After crawling the 
relevant information from the data, I sent it to react frontend.
#### languagedetect
While crawling some articles of different languages other than English were coming from medium. So I used this library 
to detect the language of articles and discarding them if they were not of English.
### socket.io
I used web sockets to send the individual articles that have been crawled in real-time instead of sending them all at the same time.

## React.js
I have used React.js as frontend. While developing this I got me familiar with some new concepts of react like Hooks. I used hooks 
to manage the state of the application and developed the infinite scrolling in the page using hooks.

### scss
To design the pages, I have used scss.

## Amazon aws EC2
You can find this app working [here](http://ec2-13-233-33-52.ap-south-1.compute.amazonaws.com)
