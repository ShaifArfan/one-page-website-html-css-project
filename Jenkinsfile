pipeline {
	agent any

stages{
 //------------------------------------------------
  stage('Generate Local Tag') {
    steps {
        script {
            def shortHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
            def timestamp = new Date().format('yyyyMMddHHmmss')
            env.LOCAL_TAG = "v${timestamp}-${shortHash}"

            echo "Generated Local Tag: ${env.LOCAL_TAG}"
        }
    }
    }

 //------------------------------------------------

    stage('Docker Build & Push') {
        steps {
            withCredentials([string(credentialsId: 'Bolverkr14', variable: 'bolverkr_pw')]) {
                echo "print tag : $LOCAL_TAG"
                sh 'docker login -u attilaisnotdead -p $bolverkr_pw'
                sh 'docker build -t attilaisnotdead/websiteyann:$LOCAL_TAG .'
                sh 'docker push attilaisnotdead/websiteyann:$LOCAL_TAG'
            }
        }
    }

 //------------------------------------------------

    stage(' Deployment docker ') {
        steps {
           
                script {
                    sh 'sudo docker ps -a --filter "name=attilaisnotdead" --format "{{.ID}}" |sudo  xargs -r docker stop'
                    sh 'sudo docker ps -a --filter "name=attilaisnotdead" --format "{{.ID}}" |sudo  xargs -r docker rm' 
                    sh 'docker run -d  -p 9999:80 --name attilaisnotdead$LOCAL_TAG attilaisnotdead/websiteyann:$LOCAL_TAG'
                }
           
        }
    }
//------------------------------------------------
}

}