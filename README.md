# NodeJS-TypeScript-MongoDB-Docker Boilerplate
This repo can be used as a starting point for backend development with Nodejs, Express, TypeScript, MongoDB, Docker.

A few things to note in the project:
* **TypeScript** - It uses TypeScript.
* **JWT** - It uses JWT Token for Authentication.
* **Mongo Connection Helper** - A helper class to connect to MongoDB reliably.
* **Joi** - For declarative payload validation
* **Middleware for easier async/await** - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.
* **.env file for configuration** - Change server config like app port, mongo url etc
* **Winston Logger** - Uses winston as the logger for the application.
* **ESLINT** - ESLINT is configured for linting.
* **Jest** - Using Jest for running test cases
* **Swagger** - Open API Specification

## Installation

### Manual Method

#### 1. Clone this repo

```
$ git clone https://github.com/ysumit52/node-typescript-mongo-docker.git your-app-name
$ cd your-app-name
```

#### 2. Install dependencies

```
$ npm i
```

## Development

### Start dev server
```
$ npm run dev
```
Running the above commands results in 
* 🌏**API Server** running at `http://localhost:3000`
* 🛢️**MongoDB** running at `mongodb://localhost:27017`


## Environment
To edit environment variables, create a file with name `.env` and copy the contents from `.env.sample` to start with.

| Var Name  | Type  | Default | Description  |
|-----------|-------|---------|--------------|
| NODE_ENV  | string  | `development` |API runtime environment. eg: `production`  |
|  PORT | number  | `3000` | Port to run the API server on |
|  MONGO_URL | string  | `mongodb://localhost:27017/express_mongo` | URL for MongoDB |
|  SECRET | string  | `learnEveryday` | JWT Token's Secret Key |

## Logging
The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/logger.ts`.
* All logs are saved in `./logs` directory.
* Console messages are prettified
* Each line in error log file is a stringified JSON.


## Kubernetes, Docker and MongoDB

* 🛢️**MongoDB** login to mongosh a MongoDB CLI
    * First, connect to MongoDB without authentication and switch to the admin database:
    ```
    mongosh
    ```
    * Once inside, run:
    ```
    use admin
    show users
    db.auth("admin", "admin@123")
    ```
    * Create the User (If Missing)
    ```
    db.createUser({
    user: "timon",
    pwd: "test@123",
    roles: [{ role: "readWrite", db: "test_db" }]
    })
    use test_db
    show users
    ```
    * Check if authentication is enabled in your MongoDB config (mongod.cfg):
    ```
    security:
        authorization: enabled
    ```
    * If not, add it, then restart MongoDB:
    ```
    net stop MongoDB
    net start MongoDB
    ```
    * If the user exists but still cannot log in:
    ```
    use test_db <db name>
    db.updateUser("timon", { pwd: "test@123" })
    ```



* 🐳**Docker And Kubernetes Deployment**

    * Step 1: Build and Run Locally Using Docker Compose
        1. Navigate to your project folder:
        ```
        cd /path/to/your/project
        ```
        2. Build the Docker images:
        ```
        docker-compose build
        ```
        3. Start the containers:
        ```
        docker-compose up -d
        ```
         3. Start the containers:
        ```
        docker push  <your-username>/<your-docker-name>:<tag-name>
        ```
        4. Verify that your services are running:
        ```
        docker ps
        ```
        5. Check the logs if needed:
        ```
        docker-compose logs -f
        ```

    * Step 2: Deploy MongoDB and Node.js to Kubernetes

        1. Create the MongoDB deployment:
        ```
        kubectl apply -f mongodb-deployment.yaml
        ```
        2. Create the MongoDB service:
        ```
        kubectl apply -f mongodb-service.yaml
        ```
        3. Check if MongoDB is running:
        ```
        kubectl get pods
        kubectl get services
        ```
        4. Create the Node.js deployment:
        ```
        kubectl apply -f nodejs-deployment.yaml
        ```
        5. Create the Node.js service:
        ```
        kubectl apply -f nodejs-service.yaml
        ```
        6. Check if MongoDB is running:
        ```
        kubectl get pods
        kubectl get services
        ```

    * Step 3: Verify and Expose the Application

        1. Check running pods:
        ```
        kubectl get pods
        ```
        2. Expose Node.js Service (if using LoadBalancer or NodePort):
        ```
        kubectl get services
        ```
        3. If your service type is NodePort, you can access it via:
        ```
        minikube service nodejs-service
        ```
        4. Or 
        ```
        kubectl port-forward service/nodejs-service 3000:3000
        ```
        (Replace 3000 with your actual exposed port)

    * Step 4: Scale and Manage Deployment
        1. Scale Up or Down
        ```
        kubectl scale deployment nodejs-deployment --replicas=3
        ```
        2. Check Deployment Status
        ```
        kubectl get deployments
        kubectl describe deployment nodejs-deployment
        ```
        3. Clean Up (if needed)
        ```
        kubectl delete -f mongodb-deployment.yaml -f mongodb-service.yaml -f nodejs-deployment.yaml -f nodejs-service.yaml
        ```


* Additional Steps:
    * If you've changed docker-compose.yml, restart everything:
    ```
    docker-compose down -v  # Stops and removes volumes
    docker-compose up --build  # Rebuilds and starts
    ```
    * Rebuild the Docker image with the latest code
    ```
    docker build -t my-nodejs-app:v2 .
    ```
    * Rebuild the Docker image without cache
    ```
    docker build --no-cache -t mitsu52/node_typescript_mongodb:v2 .
    ```

* Update Kubernetes Deployment
    * Force a Rolling Restart
    ```
    kubectl rollout restart deployment your-deployment-name
    ```
    * If your deployment uses latest tag, Kubernetes might not pull the new image automatically due to caching. To force it, update the image manually:
    ```
    kubectl set image deployment/your-deployment-name your-container-name=your-repo/your-image-name:latest
    ```
    * Kubernetes services don’t need a restart unless their configurations are changed. However, you can delete and recreate the service if needed:
    ```
    kubectl delete svc your-service-name
    kubectl apply -f service.yaml
    ```
    * Check if new pods are running correctly:
    ```
    kubectl get pods
    kubectl describe pod <pod-name>
    kubectl logs <pod-name> -f  # View logs in real-time
    ```

    * If your pods are still using the old image, try:
    ```
    kubectl delete pod --all
    ```


## License
Copyright (c) ygsumit. All rights reserved.
Licensed under the [MIT](LICENSE) License.
