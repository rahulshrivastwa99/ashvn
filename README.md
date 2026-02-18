<!-- # Supabase CLI

[![Coverage Status](https://coveralls.io/repos/github/supabase/cli/badge.svg?branch=main)](https://coveralls.io/github/supabase/cli?branch=main) [![Bitbucket Pipelines](https://img.shields.io/bitbucket/pipelines/supabase-cli/setup-cli/master?style=flat-square&label=Bitbucket%20Canary)](https://bitbucket.org/supabase-cli/setup-cli/pipelines) [![Gitlab Pipeline Status](https://img.shields.io/gitlab/pipeline-status/sweatybridge%2Fsetup-cli?label=Gitlab%20Canary)
](https://gitlab.com/sweatybridge/setup-cli/-/pipelines)

[Supabase](https://supabase.io) is an open source Firebase alternative. We're building the features of Firebase using enterprise-grade open source tools.

This repository contains all the functionality for Supabase CLI.

- [x] Running Supabase locally
- [x] Managing database migrations
- [x] Creating and deploying Supabase Functions
- [x] Generating types directly from your database schema
- [x] Making authenticated HTTP requests to [Management API](https://supabase.com/docs/reference/api/introduction)

## Getting started

### Install the CLI

Available via [NPM](https://www.npmjs.com) as dev dependency. To install:

```bash
npm i supabase --save-dev
```

To install the beta release channel:

```bash
npm i supabase@beta --save-dev
```

When installing with yarn 4, you need to disable experimental fetch with the following nodejs config.

```
NODE_OPTIONS=--no-experimental-fetch yarn add supabase
```

> **Note**
For Bun versions below v1.0.17, you must add `supabase` as a [trusted dependency](https://bun.sh/guides/install/trusted) before running `bun add -D supabase`.

<details>
  <summary><b>macOS</b></summary>

  Available via [Homebrew](https://brew.sh). To install:

  ```sh
  brew install supabase/tap/supabase
  ```

  To install the beta release channel:

  ```sh
  brew install supabase/tap/supabase-beta
  brew link --overwrite supabase-beta
  ```

  To upgrade:

  ```sh
  brew upgrade supabase
  ```
</details>

<details>
  <summary><b>Windows</b></summary>

  Available via [Scoop](https://scoop.sh). To install:

  ```powershell
  scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
  scoop install supabase
  ```

  To upgrade:

  ```powershell
  scoop update supabase
  ```
</details>

<details>
  <summary><b>Linux</b></summary>

  Available via [Homebrew](https://brew.sh) and Linux packages.

  #### via Homebrew

  To install:

  ```sh
  brew install supabase/tap/supabase
  ```

  To upgrade:

  ```sh
  brew upgrade supabase
  ```

  #### via Linux packages

  Linux packages are provided in [Releases](https://github.com/supabase/cli/releases). To install, download the `.apk`/`.deb`/`.rpm`/`.pkg.tar.zst` file depending on your package manager and run the respective commands.

  ```sh
  sudo apk add --allow-untrusted <...>.apk
  ```

  ```sh
  sudo dpkg -i <...>.deb
  ```

  ```sh
  sudo rpm -i <...>.rpm
  ```

  ```sh
  sudo pacman -U <...>.pkg.tar.zst
  ```
</details>

<details>
  <summary><b>Other Platforms</b></summary>

  You can also install the CLI via [go modules](https://go.dev/ref/mod#go-install) without the help of package managers.

  ```sh
  go install github.com/supabase/cli@latest
  ```

  Add a symlink to the binary in `$PATH` for easier access:

  ```sh
  ln -s "$(go env GOPATH)/bin/cli" /usr/bin/supabase
  ```

  This works on other non-standard Linux distros.
</details>

<details>
  <summary><b>Community Maintained Packages</b></summary>

  Available via [pkgx](https://pkgx.sh/). Package script [here](https://github.com/pkgxdev/pantry/blob/main/projects/supabase.com/cli/package.yml).
  To install in your working directory:

  ```bash
  pkgx install supabase
  ```

  Available via [Nixpkgs](https://nixos.org/). Package script [here](https://github.com/NixOS/nixpkgs/blob/master/pkgs/development/tools/supabase-cli/default.nix).
</details>

### Run the CLI

```bash
supabase bootstrap
```

Or using npx:

```bash
npx supabase bootstrap
```

The bootstrap command will guide you through the process of setting up a Supabase project using one of the [starter](https://github.com/supabase-community/supabase-samples/blob/main/samples.json) templates.

## Docs

Command & config reference can be found [here](https://supabase.com/docs/reference/cli/about).

## Breaking changes

We follow semantic versioning for changes that directly impact CLI commands, flags, and configurations.

However, due to dependencies on other service images, we cannot guarantee that schema migrations, seed.sql, and generated types will always work for the same CLI major version. If you need such guarantees, we encourage you to pin a specific version of CLI in package.json.

## Developing

To run from source:

```sh
# Go >= 1.22
go run . help
``` -->

<h1 align="center">
         Ashvaan - Mental HealthCare Web App
</h1>

## 📊 Overview of the App

Welcome to Ashvaan. <br> Ashvaan is a web app that analyses the psychological and mental health conditions of an individual and provide solutions to the problems.
Ashvaan is a mental health solution that aims to provide users with easy access to resources related to mental wellbeing. Ashvaan will help people to identify these issues timely and take necessary steps to improve the conditions of the victims and provide care to those, who are at risk of serious mental complications. The purpose of Ashvaan is to assist its users by providing solutions to their mental health conditions without requiring professional help in most cases. We have observed that these solutions work efficiently in bettering their mental health conditions. Users can also track their habits and keep a record of how often they have been doing the same. In serious cases, users will be able to book an appointment with a psychologist for consultation and get timely help.

## 🚀 Tech Stack:

![image](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)&nbsp;&nbsp;
![image](https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)&nbsp;&nbsp;
![Plotly](https://img.shields.io/badge/Plotly-49587c.svg?&style=for-the-badge&logo=power-bi&logoColor=white)
![image](https://img.shields.io/badge/Numpy-342B029.svg?&style=for-the-badge&logo=numpy&logoColor=white)&nbsp;&nbsp;
![image](https://img.shields.io/badge/scikit%20learn-FF8282?style=for-the-badge&logo=scikit-learn&logoColor=white)&nbsp;&nbsp;
![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)&nbsp;&nbsp;
![image](https://img.shields.io/badge/sqlite-E34F26?style=for-the-badge&logo=sqlite&logoColor=white)&nbsp;&nbsp;
![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)&nbsp;&nbsp;
![image](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)&nbsp;&nbsp;
![image](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)&nbsp;&nbsp;

---

## Structure Of The Project

- The home page consists of an about section, a services section and a contact section and a authentication system where in order to use certain services you need to sign up.
- In the first services section, there is a Stress Analysis section where the analysis of stress is visualized through different interactive plots using Plotly.
- The next section consists of Stress Detection where the ML model uses K-Nearest Neighbour to find the stress level of a person.
- Now comes the our solution to mental healh firsly music therapy which helps user to concentrate and meditate which releases stress.
- Music Therapy : User can meditate for set duration of time with soothing music playing the background.
- Exercise Recommendations : User can exercise for set duration of time by following the instructions that is being displayed on the screen.
- Our user can also get access to our ChatBot which can answer them the general questions.

## Model Deployment

<!-- - The web application is built using python library -> Flask and Web Programming languages -> HTML, CSS, , Js Bootstrap
- The entire application is finally deployed on Heroku by adding - Procfile (informs Heroku that which application is to be run first), Requirements (notifies Heroku about the libraries that needs to be installed before deploying or running our application) -->
<!-- - See the deployed application [here](https://mind-care.herokuapp.com/). -->
<!--
## 🔴 UI Of The Web Application

### 1. Home Page

<pre>
<img src="https://user-images.githubusercontent.com/78292851/188285404-ea2e1cbf-7957-4e18-a792-fd115d9e3e4a.png" width="1010"> <img src="https://user-images.githubusercontent.com/78292851/188285416-21085822-0b60-496c-bb79-81d0322de913.png" width="1010">
</pre>

### 2. About Us

<pre>
<img src="https://user-images.githubusercontent.com/78292851/188285848-079c575d-3428-4645-b1fa-de40e22c9c31.png" width="1010">
</pre>

### 2. Authentication

<pre>
<img src="https://user-images.githubusercontent.com/78292851/188285360-2d1357c7-0894-4e0e-a0f2-5a4e8dc0f241.png" width="1010"> <img src="https://user-images.githubusercontent.com/78292851/188285370-0131d33a-7c48-498a-9e81-92316c953263.png"> <img src="https://user-images.githubusercontent.com/78292851/188285385-2d4df385-61a7-48d2-be7d-6f352b065b91.png" width="1010">
</pre>

### 3. Services Section

<pre>
<img src="https://user-images.githubusercontent.com/78292851/188286006-e28d3181-f849-420a-b1fc-5bca08dcc58c.png" width="1010"> <img src="https://user-images.githubusercontent.com/78292851/188286020-44f2884f-dcf3-44cc-9c14-21eb3467cd07.png" width="1010">

</pre>

### 4. Stress Analysis

<pre>
  <img src="https://user-images.githubusercontent.com/78292851/188286076-eab33599-1725-40a6-a996-18fb04343adb.png" width="1000"> <img src="https://user-images.githubusercontent.com/78292851/188286099-3e945183-a633-4823-9b16-f8fc9f3c7cd5.png" width="1000"> <img src="https://user-images.githubusercontent.com/78292851/188286107-8f52cfd6-003c-4375-96f2-440444552801.png" width="1000">

</pre>

### 5. Stress Detection

<pre>
<img src="https://user-images.githubusercontent.com/78292851/188285266-24fcebfb-1bf6-4165-8351-3085dd06c1b0.png" width="1010"> <img src="https://user-images.githubusercontent.com/78292851/188285272-4a84a40c-f6ec-4252-aac8-ec68677d6d99.png" width="1010">
</pre>

### 6. Music Therapy

<pre>
<img src="https://user-images.githubusercontent.com/78292851/188286150-4a33fb29-2fee-417b-8f1d-817c02276625.png" width="1010"> <img src="https://user-images.githubusercontent.com/78292851/188286168-94f6d58b-a990-43e3-a1ec-fd32bcee367a.png" width="1010"> <img src="https://user-images.githubusercontent.com/78292851/188286195-44d37d55-4f2e-4fe2-afc4-b1694ace0176.png" width="1010">

</pre>

### 7. Fun Quizzes & Games

<pre>
<img src="https://user-images.githubusercontent.com/78292851/188286218-9493cc87-a091-4b66-80bf-80315f6167ec.png" width="1010"><img src="https://user-images.githubusercontent.com/78292851/188286232-6c6688cd-a60b-40c0-8468-e519b2fc4c67.png" width="1010"> <img src="https://user-images.githubusercontent.com/78292851/188286248-ae86cb3a-b04a-4315-80cd-a9d8a49c63e2.png" width="1010">
</pre>

### 8. Yoga & Exercises

<pre>
<img src="https://user-images.githubusercontent.com/78292851/188286285-23bbe566-040e-4ffe-b90a-37c7ffe94dbd.png" width="1010"> <img src="https://user-images.githubusercontent.com/78292851/188286294-adc0b8ef-24f7-429b-913b-4ba65aa8306d.png" width="1010">
</pre>

### 7. Contact Section & Blogs

<pre>
<img src="https://user-images.githubusercontent.com/78292851/188286331-1024959b-ff97-444e-84a9-37230bc7954c.png" width="1010"> <img src="https://user-images.githubusercontent.com/78292851/188286361-a4c98e9b-243c-42e6-8a47-78b1d6301332.png" width="1010">
</pre>

## Run Locally

Open VSCode -

1.1 `git clone <repo link>`

1.2 `cd Ashvaan`

1.3 `pip install -r requirements.txt `

1.4 `flask run` -->

## make .env file in global directory

### take env variable content  and paste it into .env created file

## then >>> npm install

## then >>> npm install @supabase/supabase-js

# then >>> npm run dev
