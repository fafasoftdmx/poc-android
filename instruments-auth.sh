#!/usr/bin/env bash
sudo security authorizationdb write com.apple.dt.instruments.process.analysis <  ./appium/com.apple.dt.instruments.process.analysis.plist
sudo security authorizationdb write com.apple.dt.instruments.process.kill <  ./appium/com.apple.dt.instruments.process.kill.plist