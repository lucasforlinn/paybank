pipeline {
    agent any
    stages {
        stage('Node.js install dependencies') { 
            steps {
                sh 'npm install'
            }
        }
        stage('E2e Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}