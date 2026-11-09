#!/bin/sh
# Captures after the opening animation. usage: shot.sh <width> <height> <out> 
google-chrome --headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion --window-size=$1,$2 --virtual-time-budget=4000 --screenshot="$3" "file://$PWD/dist/index.html" >/dev/null 2>&1
