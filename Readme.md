# Sweeper

 Cleaning the mess on package.json

## Installation

    $ npm install -g sweeper

## Quick Start

 The best way to clean your package.json is to utilize de executable `sweeper(1)` to show a list of used and unused dependencies.

    $ npm install -g sweeper
    $ cd /YOUR_PROJECT_DIRECTORY/
    $ sweeper

 After that, you can clean your package.json knowing what is used and what is not. Be sure to double check Sweeper's output, as dynamic generators for requires are not detected yet.

 Hit `sweeper --help` for usage help and other options
