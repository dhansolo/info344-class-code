#!/usr/bin/env bash

# Provisioning script for the authentication challenge.
echo "Hello, world!"

# use noninteractive mode since this is automated
export DEBIAN_FRONTEND=noninteractive

# update the package database 
sudo -E apt-get update

# install git
sudo -E apt-get install -y git

# allow Node.js v4.x servers to bind to low ports
curl -sL http://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo -E apt-get install -y nodejs
sudo -E apt-get install -y build-essential

# allow Node.js servers to bind to low ports
sudo -E apt-get install -y chase
sudo -E apt-get install -y libcap2-bin
sudo -E setcap cap_net_bind_service=+ep $(chase $(which node))

# install MySQL
sudo -E apt-get install -y mysql-server

mysql -u root <<-EOF
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.db WHERE Db='test' OR Db='test\_%';
FLUSH PRIVILEGES;
EOF

# install MongoDB and tools
sudo -E apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo -E tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo -E apt-get update
sudo -E apt-get install -y mongodb-org

# install MongoDB and tools
sudo -E apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo -E tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo -E apt-get update
sudo -E apt-get install -y mongodb-org

# install the kerberos library
# which is needed to build the MongoDB
# Node.js driver during npm install
sudo -E apt-get install -y libkrb5-dev

# install pm2 utility for managing node servers
sudo -E npm install -g pm2 --loglevel error

# install the tsd utility for installing
# Visual Studio Code typings files
# gives statement completion and parameter hinting
sudo -E npm install -g tsd --loglevel error