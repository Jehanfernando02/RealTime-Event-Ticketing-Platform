pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '5'))
        disableConcurrentBuilds()
    }

    triggers {
        // Trigger on GitHub webhook
        githubPush()
    }

    environment {
        DOCKER_COMPOSE_CMD = 'docker compose'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Containers') {
            steps {
                echo 'Building Docker containers...'
                sh "${DOCKER_COMPOSE_CMD} build"
            }
        }

        stage('Deploy to Server') {
            steps {
                echo 'Deploying application using Docker Compose...'
                // Run in detached mode, recreate containers if needed, and remove orphans
                sh "${DOCKER_COMPOSE_CMD} up -d --build --remove-orphans"
            }
        }

        stage('Health Check') {
            steps {
                echo 'Waiting for services to start...'
                sleep time: 15, unit: 'SECONDS'
                
                echo 'Checking backend health endpoint...'
                // Retry up to 3 times, waiting 10 seconds between retries
                retry(3) {
                    sh 'curl -f http://localhost:8080/actuator/health'
                    sleep time: 10, unit: 'SECONDS'
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Pruning unused Docker images...'
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo 'Deployment Pipeline completed successfully! ✅'
        }
        failure {
            echo 'Deployment Pipeline failed. ❌'
            // In a real scenario, you could add Slack or Email notifications here
        }
    }
}
