for file in $(find . -name "*.html"); do
  echo Processing $file

  cat beginning.txt $file > $file.modified

  mv $file.modified $file

done
