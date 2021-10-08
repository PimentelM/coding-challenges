echo "" > ./src/DataStructures.ts
cat `ls -l ./src/*.ts | grep -v ".spec.ts" | cut -d " " -f 10` >> ./src/DataStructures.ts
grep -v 'import ' ./src/DataStructures.ts > ./tempFile.ts
cat ./tempFile.ts > ./src/DataStructures.ts
rm ./tempFile.ts
