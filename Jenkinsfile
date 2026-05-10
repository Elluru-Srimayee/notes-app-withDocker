pipeline{
    agent any
    
    tools{
        maven 'Maven' //Optional (only if cnofigured in Jenkins)
    }
    
    stages{
        stage('Checkout'){
            steps{
                git branch: 'main', url: 'https://github.com/Elluru-Srimayee/notes-app-withDocker.git'
            }
        }
        stage('Debug') {
            steps {
                bat 'dir'
            }
        }
        stage('Build Jar') {
            steps {
                dir('backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend-notes') {
                    bat 'npm install'
                    bat 'set CI=false && npm run build'
                }
            }
        }
        stage('Docker Compose Down') {
            steps{
                bat 'docker compose down'
            }
        }
        stage('Docker Compose Build') {
            steps{
                bat 'docker compose build'
            }
        }
        stage('Docker Compose Up') {
            steps{
                bat 'docker-compose up -d'
            }
        }
        stage('Archive'){
            steps{
                dir('backend'){
                    archiveArtifacts artifacts:'target/backend-build.jar',fingerprint:true
                }
            }
        }
    }
}