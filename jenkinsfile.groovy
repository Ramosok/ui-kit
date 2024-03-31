pipeline {

	agent { label 'front-build-agent' }

    options {
    	buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
        timestamps()
    }
	stages {
		stage('buld package') {
			steps {
				script {
				    sh """
                        npm ci
                        npm run build
                     """
				}
			}
		}
		stage('publish package') {
			steps {
    				script {
    				    sh """
                            npm publish
                         """
				}
			}
		}
	}
	post {
    cleanup { deleteDir() }
  }
}