# Shortcut for Mac

// adjust lines ?
node

#echo "$@" all arguments

$1 first argument


if [ ]

 then

  ;

 else

 fi



${PWD##*/}   / name of the current directory (instead $pwd which shows the whole path)


variablen:  bei der erstellung einfach ohne einen prefix ausschreiben ! und dann bei aufruf mit $

  if [ $1 ] # wenn es ein argument gibt

    then
      DIR=$1;

    else
      DIR="${PWD##*/}";
  fi

  echo $DIR
