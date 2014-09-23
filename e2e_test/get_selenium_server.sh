#!/bin/bash

if [ ! -e './selenium.jar' ];
then
  echo "Downlading selenium server standalone"
  curl -# -o selenium.jar http://selenium-release.storage.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar | grep %
fi
