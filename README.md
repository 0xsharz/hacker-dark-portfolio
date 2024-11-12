# Hacker-Style Personal Portfolio

This is a single-page static personal portfolio built using [Next.js](https://nextjs.org). The project presents the contact information in a hacker-style interface, mimicking a Linux system hacking and exploit process, culminating in showing the decrypted contact details of the individual.

## Features
- Hacker-style theme with terminal-like visuals.
- Display contact information with a simulated "exploit" animation.

Demo: https://shz.lol/

![image](https://github.com/user-attachments/assets/5b0dca7e-2224-4afd-9aa9-4b77e0603682)

## Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your machine.

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/0xsharz/hacker-dark-portfolio.git
   cd hacker-dark-portfolio
   ```

2. Install dependencies using npm:
   ```bash
   npm install
   ```

### Running the Project Locally
To run the project in production mode locally:

1. Build the Next.js project:
   ```bash
   npm run build
   ```

2. Start the server in production mode:
   ```bash
   npm start
   ```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Deploying to Render.com

To deploy this project on [Render.com](https://render.com):

1. Create a new Web Service on Render.com.
2. Connect your GitHub repository containing this project.
3. Set the **Build Command** to:
   ```bash
   npm install && npm run build
   ```
4. Set the **Start Command** to:
   ```bash
   npm start
   ```
5. Specify the environment as **Node**.

Render will automatically build and deploy your application. Once deployment is complete, the site will be live on the provided URL.

## Learn More
To learn more about Next.js and its features, visit the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

## Contributing
Feel free to fork the repository and make pull requests to contribute.

## License
This project is licensed under the MIT License.

