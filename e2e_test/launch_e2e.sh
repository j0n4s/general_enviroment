#!/bin/bash

export MAILER=false
grunt ci
unset MAILER

