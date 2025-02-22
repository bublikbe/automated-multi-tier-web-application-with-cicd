
# GCP Project- Automated Multi-Tier Web Application with CI/CD

Welcome to the automated Multi-Tier Web Application with CI/CD project!

⚠️ The three files that are in the Github Repo(cloudrun-backend.yaml, frontend-react.js, my-backend.js) are files that I asked chatgpt to make me for this project feel free to use it.

This projects covers:

- Deploying a 3-tier web app(Frontend,Backend,Database)
- Using Terraform for infrastructure automation
- Setting up CI/CD with Cloud Build & GitHub Actions
- Securing the app with Cloud Armor (WAF) & IAP
- Scaling using GKE Autopilot






## 📝 Prerequisites:

- [Google Cloud Platform](https://console.cloud.google.com) account
- Github account

## ⚙️ Setup:

#### 1. Create a new project

- Go to [Google Cloud Console](https://console.cloud.google.com) and create a new project.

- Enable the next list of APIs:

    ✅ Compute Engine API

    ✅ Kubernetes Engine API

    ✅ Cloud Run API

    ✅ Cloud SQL API

    ✅ Cloud Build API

    ✅ Cloud Resource Manager API

    ✅ IAM API

#### 2. Create a VPC Network

- In the console, go to VPC Networks

- Click Create VRC Network
    
    Name: my-vpc

    Subnet mode: Custom

    Click Add Subnet ->

    Name: my-subnet

    Region: us-central1

    IP Range: 10.0.0.0/24

    Click Create 

#### 3. Deploy the Database (Cloud SQL PostgreSQL)

- the Console, go to SQL -> Click Create Instance

- Select PostgreSQL

- Configure:

    Instance ID: my-sql-instance

    Database version: PostgreSQL 14

    Region: us-central1

    Machine type: Shared-core (db-f1-micro)

    Enable Private IP

    Click Create

- Once created, go to Databases → Click Create Database

    Name it: my-database -> Click Create

- Create a User

Go to Users → Click Add User Account

Username: USERNAME_ID

Password: STRONGPASSWORD123

#### 4. Deploy Backend (Node.js API) on Cloud Run

- In the Console, go to Cloud Run → Click Create Service

- Configure:
 
Name: my-backend

Region: us-central1

Authentication: Allow unauthenticated

- Deploy from Source Code

Click Select Source Repository

Connect to GitHub

Select your backend repository

Click Deploy

#### 5. Deploy Frontend (React) on Cloud Run 

- In the Console, go to Cloud Run → Click Create Service

- Configure:

Name: frontend-react

Region: us-central1

Authentication: Allow unauthenticated

- Deploy from Source Code

Select GitHub Repository

Choose your frontend repository

Click Deploy

#### 6. Set Up CI/CD

- In the Console, go to Cloud Build -> Triggers

- Click Create Trigger

- Configure:

Name: cloudrun-backend

Event: Push to a branch

Repository: Select GitHub Repository

Branch: main

Build Configuration: Cloud Build YAML

- Add the following cloudrun-backend.yaml file.

- Click Create

#### 7. Secure with CLoud Armor & IAP

##### Set Up Cloud Armor

- Go to Security → Cloud Armor → Create Security Policy

- Name it my-security-policy

- Click Add Rule

Rule Action: Deny

Source IP: 1.2.3.4 (or any unwanted IP)

Response Code: 403

- Click Create

##### Enable Identity-Aware Proxy (IAP)

- Go to Identity & Access Management (IAM) 

- Click Cloud Run -> Select my-backend

- Click Edit -> Enable IAP

- Add users who can access the backend


## 📌 Project Summary

In this Project I have learned that:

 - to ensure secure private communication between backend and cloud SQL i have to create a VPC Network. It prevents pubic access to the database.
 
- I containerized the Node.js backend and pushed it to Artifact Registry.

- I designed and deployed a multi-tier web application using Google Cloud services. The architecture includes a React frontend, a Node.js backend, and a Cloud SQL database, all running in a scalable, secure, and automated cloud environment.

- To ensure fast and reliable deployments, I set up a CI/CD pipeline using GitHub Actions and Cloud Build. Every code commit automatically builds and deploys the updated application to Cloud Run, reducing manual work and preventing deployment errors.

- I optimized performance by using Cloud Run for the frontend and backend, ensuring automatic scaling with minimal cost. I also experimented with GKE Autopilot for containerized workloads, which provided fine-tuned auto-scaling based on demand.

- To protect my application, I enforced strict IAM roles, enabled Identity-Aware Proxy (IAP) for authentication, and added Cloud Armor to block suspicious traffic. This setup follows enterprise security best practices to prevent unauthorized access.

- I configured Cloud Logging and Cloud Monitoring to track system performance and errors. I also set up alerting to notify me of critical issues in real time, ensuring reliability.
