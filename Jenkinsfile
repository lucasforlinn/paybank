pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.1-noble'
            args '--network paybank_skynet'
        }
    }
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