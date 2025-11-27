# 1. Base Image: Use an official Node.js image to start the build.
# Using the Debian-based slim image to avoid the Alpine CVE reported in the scanner.
FROM node:latest

# 2. Set Working Directory: This is the directory inside the container
# where your application code will reside and run from.
WORKDIR /src

# 3. Copy Dependency Files: Copy package.json and package-lock.json first
# to leverage Docker's build cache. If these files don't change, Docker won't
# re-run the npm install step, speeding up subsequent builds.
COPY package*.json ./

# 4. Install Dependencies: Install all production dependencies.
# The --omit=dev flag keeps the image lean.
RUN npm install --omit=dev

# 5. Copy Application Code: Copy the rest of your application source code.
COPY . .

# 6. Expose Port: Inform Docker that the container listens on the specified port.
# Note: Render automatically forwards traffic, but this is good practice.
EXPOSE 3000

# 7. Start Command: Define the command to run when the container starts.
# This should match your "start" script in package.json.
CMD [ "npm", "start" ]