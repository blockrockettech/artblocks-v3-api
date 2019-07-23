#!/usr/bin/env bash

echo "Deploying firebase functions to LIVE"
firebase use artblocks-v3;
firebase deploy --only functions;
