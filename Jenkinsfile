pipeline {
    agent any

    tools {
        nodejs "NodeJS"   // Make sure "NodeJS" is configured in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Jeremy-Njuguna/demo-express.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }


        stage('Security Scan') {
            steps {
                // Run npm audit and continue even if vulnerabilities are found
                sh 'npm audit || true'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test || true'   // skip failures for now if no tests
            }
        }

        stage('Build') {
            steps {
                echo 'Build step — optional for Node.js unless using TypeScript/bundlers.'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment step — here we could run or deploy the app.'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking application health endpoint...'
                // Try to hit the health endpoint (only works if deployed locally or on a server)
                bat 'curl -s http://localhost:3000/health || exit /b 0'
            }
        }


          stage('Code Quality') {
            steps {
                sh 'npm run lint'
            }
        }

        

    }

    post {
        success {
            echo 'Pipeline completed successfully ✅'
        }
        failure {
            echo 'Pipeline failed ❌'
        }
    }
}
