pipeline {
    agent {
        docker {
            image 'lucasforlinn/playwright-nj-v1.50.1-noble'
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
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}