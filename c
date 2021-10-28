#!/bin/bash 
./mkstr shaders/*.fs
./mkstr shaders/*.vs
tsc
cp *.html target/