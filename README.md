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


# API ENDPOINT
This will guide you on how to use the endpoints created for the pense application

### Signup
The signup supports just the `POST` request only. A verification email will be send to any email you use in registration for authentication. Email needs to be verified before you can login into the application.
```
https://pense.pythonanywhere.com/api/v1/signup

{
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@gmail.com"
    "password": "2345f",
}
```

### Login
The login supports just the `POST` request only. After you must have verified your email it should redirect you to the login.
```
https://pense.pythonanywhere.com/api/v1/login
{
    "email": "johndoe@gmail.com",
    "password": "2345f"
}
```

### Email Verification
This make use of a `GET, PUT` request for the purpose of verification, successfully verification returns a success.
```
https://pense.pythonanywhere.com/api/v1/verify?email=<email>
{
    "email": "johndoe@gmail.com"
}
```


### Creating a Post
```
https://pense.pythonanywhere.com/api/v1/posts
```

### AUTHOR
#### Abdulrasheed Aliyu
<p>I'm Abdulrasheed Aliyu also known as Rashnotech. <br />
I am a dedicated full-stack software engineer enrolled in the 
ALX Software Engineering program, where I am honing my skills and
knowledge in the field. My fervor for AI/ML technologies is evident,
as I am deeply passionate about leveraging these advancements to provide innovative
solutions to complex problems.
My experience in the field enables me to effectively bridge the gap between conceptual
ideas and their practical implementation using cutting-edge technologies. I am committed to 
staying at the forefront of the industry, consistently seeking opportunities to contribute 
to advancements in both AI/ML and software engineering. <br />
<strong>For further communication or collaboration, please feel free to reach out to me below.</strong>
</p>
<a to='https://www.linkedin.com/in/abdulrashnotech/'>Linkedin</a>
<a to='https://github.com/Rashnotech'>Github</a>
<a to='https://twitter.com/@rashnotech'>Twitter</a>

#### Aliyu Adekola