
# International Eye Institute Website

This repository contains the source code for the International Eye Institute's website, accessible at [http://eyegive.org](http://eyegive.org). The website is hosted on AWS S3 and is deployed using GitHub Actions.

## Getting Started

These instructions will help you set up a copy of the project on your local machine for development and testing purposes.
git p
### Prerequisites

- Node.js
- NPM (Node Package Manager)

### Installing

1. Clone the repository:
   ```
   git clone https://github.com/your-repository-url.git
   ```
2. Navigate to the project directory:
   ```
   cd internationaleyeinstitute.org
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running Locally

To run the project locally for development:

```
npm start
```

This command will start the Webpack development server. You can view the website at `localhost:3000`

## Deployment

The project is automatically deployed to AWS S3 using GitHub Actions whenever changes are pushed to the `main` branch. The deployment process is defined in the `.github/workflows` directory.

## Directory Structure

- `src`: Source files for the website.
  - `js`: JavaScript files for site functionality.
  - `assets`: Static assets for the website.
    - `css`: Stylesheets for the website.
    - `icons`: Icon files.
    - `images`: Image files used across the website.
    - `pdf`: PDF documents available for download.
  - `html`: HTML templates and pages.
    - `newsletters`: Newsletter templates.
    - `pages`: HTML templates for various pages on the site.
