# IP or URL of the server you want to deploy to
APP_HOST=52.10.14.68

# If you want a different ROOT_URL, when using a load balancer for instance, set it here
ROOT_URL=http://ec2-52-10-14-68.us-west-2.compute.amazonaws.com

# Comment this if your host is not an EC2 instance
EC2_PEM_FILE=./workbench.pem

# What's your project's Git repo?
GIT_URL=git://github.com/jbaxleyiii/jamesbaxley.com.git

# Does your project use meteorite, or plain meteor?
METEORITE=false

# If not using Meteorite, you need to specify this
METEOR_RELEASE=1.0.3.2

#If you have an external service, such as Google SMTP, set this
#MAIL_URL=smtp://USERNAME:PASSWORD@smtp.googlemail.com:465

# What's your app name?
APP_NAME=out

# If your app is not on the repository root, set this
APP_PATH=.

# Specify location of .meteor folder
METEOR_APP=./out


# If you would like to use a different branch, set it here
GIT_BRANCH=master

# Kill the forever and node processes, and deletes the bundle directory and tar file prior to deploying
FORCE_CLEAN=false

# If you want to do something before forever starts Meteor, you can do it here
# NOTE: Don't forget to use a semi-colon at the end of every command
PRE_METEOR_START="export ROOT_URL=http://52.10.14.68;"

# PORT=80 MONGO_URL=mongodb://localhost:27017/out ROOT_URL=http://ec2-52-10-14-68.us-west-2.compute.amazonaws.com node bundle/main.js
