grep -v 'exports.' ./dist/DataStructures.js > ./tempFile
cat ./tempFile > ./dist/DataStructures.js
rm ./tempFile

grep -v 'sourceMappingURL' ./dist/DataStructures.js > ./tempFile
cat ./tempFile > ./dist/DataStructures.js
rm ./tempFile

grep -v '__esModule' ./dist/DataStructures.js > ./tempFile
cat ./tempFile > ./dist/DataStructures.js
rm ./tempFile
