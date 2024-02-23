cp ./npm/* ./dist
cp ./npm/README.md ../

B=`awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json`
echo 'Updating Versions To '${B}'...'
sed -i '' 's/$version/'${B}'/g' dist/README.md
sed -i '' 's/$version/'${B}'/g' dist/package.json
sed -i '' 's/$version/'${B}'/g' ../README.md
