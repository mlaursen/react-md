#!/bin/bash

for arg in "$@"; do
  case $arg in
    -bn|-nb)
      build_dist=1
      build_next=1
      shift
      ;;
    -b)
      build_dist=1
      shift
      ;;
    -n)
      build_next=1
      shift
      ;;
    *)
      echo "Unknown argument: $arg"
      shift
      ;;
  esac
done

dist_tar_name=react-md.tar.bz2
next_tar_name=nextjs.tar.bz2
server_alias=react-md

if [[ -f "$dist_tar_name" ]]; then
  rm $dist_tar_name
fi

if [[ -f "$next_tar_name" ]]; then
  rm $next_tar_name
fi

if [[ $build_dist -eq 1 ]]; then
  yarn build
fi

if [[ $build_next -eq 1 ]]; then
  rm -r packages/documentation/.next
  yarn workspace documentation build
fi

find packages -maxdepth 3 -type d \( -name 'es' -or -name 'lib' -or -name 'dist' -or -name 'types' \) \
  | sed '/react-md/d' \
  | tar cjf $dist_tar_name --files-from -

tar cjf $next_tar_name packages/documentation/.next

scp $dist_tar_name react-md:~/react-md
scp $next_tar_name react-md:~/react-md

ssh $server_alias "cd react-md && git pull && rm -r packages/documentation/.next && find packages -maxdepth 3 -type d \( -name 'es' -or -name 'lib' -or -name 'dist' -or -name 'types' \) | xargs rm -r && tar xjf $dist_tar_name && tar xjf $next_tar_name && yarn && git clean -f && cd packages/documentation && pm2 restart documentation"
git clean -f
