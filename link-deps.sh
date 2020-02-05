#!/bin/sh
cd shared
npm link

cd ../backend
npm link @alehuo/clubhouse-shared

cd ../frontend
npm link @alehuo/clubhouse-shared