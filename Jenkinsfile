def label = "mypod-${UUID.randomUUID().toString()}"
def workspace = "/tmp/jenkins-${UUID.randomUUID().toString()}"
def yaml = """
apiVersion: v1
kind: Pod
metadata:
  generateName: jnlp-
  labels:
    name: jnlp
    label: jnlp
spec:
  containers:
    - name: jnlp
      image: jenkins/jnlp-slave
      tty: true
      securityContext:
        runAsUser: 1000
        allowPrivilegeEscalation: false
    - name: selenium-server
      image: selenium/standalone-chrome
      tty: true
      ports:
        - containerPort: 4444
      securityContext:
       runAsUser: 1000
       allowPrivilegeEscalation: false
      volumeMounts:
        - mountPath: /dev/shm
          name: selenium
    - name: node
      image: node:10.14.1-alpine
      tty: true
      securityContext:
       runAsUser: 1000
       allowPrivilegeEscalation: false
  volumes:
    - name: docker-sock
      hostPath:
        path: /var/run/docker.sock
        type: Directory
    - name: selenium
      hostPath:
        path: /dev/shm
        type: Directory
"""
podTemplate(label: label, yaml: yaml) {
  node(label) {
    def myRepo = checkout scm
    def gitCommit = myRepo.GIT_COMMIT
    def gitBranch = myRepo.GIT_BRANCH
    def shortGitCommit = "${gitCommit[0..10]}"
    def previousGitCommit = sh(script: "git rev-parse ${gitCommit}~", returnStdout: true)

    stage('Check selenium') {
      container('selenium-server') {
        sh "ps aux | grep selenium"
      }
    }
    stage('Test') {
      try {
        container('node') {
          sh """
            pwd
            echo "GIT_BRANCH=${gitBranch}" >> /etc/environment
            echo "GIT_COMMIT=${gitCommit}" >> /etc/environment
            npm install
            npm run e2e
            """
        }
      }
      catch (exc) {
        println "Failed to test - ${currentBuild.fullDisplayName}"
        throw(exc)
      }
    }
  }
}
