pipeline {
    agent any
    
    parameters {
        booleanParam(name: 'pushToDockerRegistry', defaultValue: true, description: 'Toggle this value')
    }
    stages {
        
        stage("Destroy Docker Container") {
            steps {
                echo "========Executing Docker compose Down========"
                script {
                    try {
                        sh 'docker-compose down --rmi all' 
                    } catch (err) {
                        echo err.getMessage()
                      }
                }
                echo "========Docker compose Down successfull========"
                
            }
        }
        
        stage("Create Docker Container") {
            steps {
                echo "========Executing Docker compose========"
                configFileProvider([configFile(fileId: 'todoapp.env', targetLocation: 'todoapp.env') ]){ 
                        sh 'docker-compose up -d --build'
                }
                echo "========Docker compose Up successfull========"
                
            }
        }
        stage("Clean Workspace"){
           steps {
               cleanWs()
           }
        }
        stage("Push to Docker Registry"){
            when {
                expression {
                   return params.pushToDockerRegistry
                }
            }
            environment {
                DOCKER_LOGIN = credentials('docker-login')
            }
            steps{
                echo "========Push to Docker Registry========"
                
                sh 'echo $DOCKER_LOGIN_PSW | docker login -u $DOCKER_LOGIN_USR --password-stdin'
                sh 'docker push iamgk/todoapp'
                                
                echo "========Push to Docker Registry Completed========"
            }
        }
    }
    post{
        
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}