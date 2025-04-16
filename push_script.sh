#!/bin/bash

# Function to push files
push_files() {
    git add .
    git commit -m "Add e-commerce website files"
    git push origin main
}

# Push files every 4 minutes
while true; do
    push_files
    echo "Waiting for 4 minutes before next push..."
    sleep 240  # 240 seconds = 4 minutes
done 