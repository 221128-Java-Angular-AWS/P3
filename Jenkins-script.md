#Prepare build environment  
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh  
nvm install 16

#Copy application secrets from bucket  
aws s3 cp s3://jenkins-secret-bucket/application.yml ./e-commerce-backend-main/src/main/resources/application.yml



#Check environment  
pwd  
ls -al  
echo $PATH  
echo $JAVA_HOME  
echo $MAVEN_HOME  
java -version  
node --version  
npm --version  

#Build backend  
cd e-commerce-backend-main  
mvn clean package -q

#Dockerize and launch API  
cd ..  
#print msg if failed  
docker container stop $(docker container ls -a -q --filter name=e-commerce) || echo "Container not running"  
docker container rm e-commerce || echo "Unable to rm this container"  
docker build -t=e-commerce:alpha .  
docker run -p 7777:8080 --name e-commerce -d e-commerce:alpha  

#Build and deploy SPA  
cd e-commerce-frontend-angular-main  
npm install ngx-bootstrap --force  
npm run ng build  
aws s3 cp --recursive dist/* s3://p3-static-hosting/ 