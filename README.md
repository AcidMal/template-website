# Template Website with Astro.js

Welcome to the Template Website repository! This project is built using [Astro.js](https://astro.build/), a modern static site generator. This guide will help you set up the project on your local machine, even if you're new to web development.

## Prerequisites

Before you begin, ensure you have the following installed on your computer:

- [Git](https://git-scm.com/): Version control system to clone the repository.
- [Node.js](https://nodejs.org/): JavaScript runtime. Download the LTS version.
- [npm](https://www.npmjs.com/): Node package manager, which comes with Node.js.
- [pnpm](https://pnpm.io/installation): Alternative to npm, recommended for this project.

## Recommended

Any IDE that supports Astro.js will work, but I recommend using one of the following:

- [Visual Studio Code](https://code.visualstudio.com/): A powerful code editor.
- [Cursor](https://www.cursor.com/): AI-powered code editor. (I personally use this)

## Cloning the Repository

1. Open your terminal (Command Prompt on Windows, Terminal on macOS/Linux).

2. Navigate to the directory where you want to store the project.

3. Run the following command to clone the repository:
   ```bash
   git clone https://github.com/AcidMal/template-website.git
   ```

4. Navigate into the cloned directory:
   ```bash
   cd template-website
   ```

## Installing Astro.js

1. Ensure you are in the project directory (`template-website`).

2. Run the following command to install Astro.js and other dependencies:
   ```bash
   pnpm install
   ```
   This command reads the `package.json` file and installs the necessary packages.

## Running the Development Server

1. Start the development server by running:
   ```bash
   npm run dev
   ```
2. Open your web browser and go to `http://localhost:4321` to see your website.

## Updating Social Links

- Update the `src/components/SocialButtons.astro` file with your own social links. It will be used in the footer of the website.

## Additional Information

- Make sure to update the .env file with your own Twitter Bearer Token and Username and update the .gitignore file to include the .env file.

## Additional Resources

- [Astro.js Documentation](https://docs.astro.build/)
- [Git Documentation](https://git-scm.com/doc)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [W3Schools](https://www.w3schools.com/)

## License

This project is open-source and available under the [MIT License](LICENSE).