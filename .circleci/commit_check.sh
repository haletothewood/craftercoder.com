set -e

# latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# latest commit where ./src was changed
SRC_COMMIT=$(git log -1 --format=format:%H --full-diff ./src)

if [ $SRC_COMMIT = $LATEST_COMMIT ];
    then
        echo "src has changed - deploying app"
        bash .circleci/release.sh
else
     echo "src has not changed - not deploying app"
     exit 0;
fi
