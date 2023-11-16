## Pense
_Unleash your thoughts, inspire connections._
<hr />

<header>
<h3>Overview</h3>
Pense (French word for "to think", pronounced /pens/, like "penser") is a blog app built aims to provide a faster and leaner content writing experience for modern topics.
Pense will not solve every possible problem related to content creation or publishing. It will not address issues beyond content management.
</header>

### Problem the Portfolio Project is Intended to Solve
Pense (blog app) is intended to solve the problem of providing individuals and organisations with a platform to create, publish, and manage their written content in an organised and user-friendly manner. The project aims to simplify the process of content creation, publication, and engagement, making it easier for users to reach their target audience.

# Notice
> ### What the Portfolio Project Will Not Solve
> Pense (blog app) as a portfolio project, will not solve every possible problem related to content creation or publishing. It will not address issues beyond content management, such as e-commerce, social networking, or multimedia content management, two factor authentication.

### Who the Portfolio Project Will Help and Users:
_The portfolio project will help a variety of users, including:_
1. Bloggers and Writers
2. Businesses
3. Content Creators
4. Readers and Subscribers
5. Relevance to a Specific Locale
Pense (blog app), in general, is not inherently tied to a specific locale or location. It can be used globally, and its content can be accessible worldwide.


### RISKS
#### Technical Risks
**Security Breach:** There is a possibility that our project may be hacked or exploited by malicious actors. This could result in exposing our user data, compromising our integrity, or damaging our reputation.
**Mitigation:** We will use secure coding practices and frameworks (Flask-Security) to prevent common vulnerabilities (e.g., SQL injection, XSS, CSRF). We will also use HTTPS and SSL certificates to encrypt our communication. 
#### Non-Technical Risks
**Scope Creep:** There is a possibility that we may add more features or requirements to our project than originally planned. This could result in increasing our complexity
**Mitigation:** We will follow the agile methodology and use tools like Trello to manage our project scope. We will also communicate regularly to prioritise and validate our features. We will also avoid unnecessary changes and focus on the core functionality of our project.


## EXISTING SOLUTIONS
**Medium:** Medium is a popular online publishing platform that allows anyone to create and share stories, articles, and blogs. It has a simple and elegant user interface, a rich text editor, and a large and engaged community of readers and writers.
**Similarities:** Supports various types of content, such as text, images, videos, and audio.
**Differences:** Users can’t follow other users who write about topics that interest them.
Users can’t make money from their stories and they can’t set up a paywall for their stories, which means that all members can access their blog.
We want to focus on the core functionality of creating and sharing content. We also want to avoid the complexity and cost of implementing these features. Therefore, our project is different from Medium in these aspects

## Environment
This project file consist of both the front and the backend to the pense app. The backend of this project was built in python using Flask framework to harness our development, while the frontend was designed using React and Redux. The views folder of this application consist of all what is install to get the dynamic content running.
The run this application follow the steps below
### Backend
**Note:** This guide assume python is already installed on your machine. If it's not installed go to https://www.python.org/downloads/ follow the neccessary instructions.
1. Create a virtual environment for the application to work
```
cd pense
python3 -m venv .venv
```
2. Activate the virtual environment. This depends on your machine
**windows**
```
. .venv/Scripts/activate
```
**Linux/macOs**
```
. .venv/bin/activate
```
**Note:** If you still don't understand visit https://flask.palletsprojects.com/en/3.0.x/installation/

3. A requirements file is present in the parent folder. On your text editor terminal install pip
```
ubuntu/macOs: sudo apt install python3-pip
terminal: python -m pip install --upgrade pip
pip install -r requirements.txt
```
4. You can run the backend service
```
python3 -m api.v1.app
```

### FrontEnd
**Note:** This guide assume Node is already installed on your machine. If it's not installed go to https://nodejs.org/en/download/ follow the neccessary instructions.
1. You need to change directory to the views folder
```
cd views/web_pense
```
2. Install dependencies
```
npm install
```
**Note:** This will install the necessary dependencies required for the front end to work perfectly.
```
npm run dev
```
