
echo "Starting collection for week long phrases of counts of 3"
node ETL/engine.js --duration week --phrase-count 3
echo "Done!"

echo "Starting collection for week long phrases of counts of 2"
node ETL/engine.js --duration week --phrase-count 2
echo "Done!"

echo "Starting collection for week long phrases of counts of 1"
node ETL/engine.js --duration week --phrase-count 1
echo "Done!"


echo "Starting collection for year long phrases of counts of 3"
node ETL/engine.js --duration year --phrase-count 3
echo "Done!"

echo "Starting collection for year long phrases of counts of 2"
node ETL/engine.js --duration year --phrase-count 2
echo "Done!"

echo "Starting collection for year long phrases of counts of 1"
node ETL/engine.js --duration year --phrase-count 1
echo "Done!"


echo "Starting collection for month long phrases of counts of 3"
node ETL/engine.js --duration month --phrase-count 3
echo "Done!"

echo "Starting collection for month long phrases of counts of 2"
node ETL/engine.js --duration month --phrase-count 2
echo "Done!"

echo "Starting collection for month long phrases of counts of 1"
node ETL/engine.js --duration month --phrase-count 1
echo "DONE!"

echo "Start collection of single tweets"
node ETL/engine.js --duration single --phrase-count 1
echo "Done!"
