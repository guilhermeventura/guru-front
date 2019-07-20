#!/bin/bash
PKG_SUM=$(md5sum package.json|cut -d\  -f 1)
CACHED_FILE=${PKG_SUM}.tgz
[[ -f ${CACHED_FILE} ]] && tar zxf ${CACHED_FILE}
npm install
[[ -f ${CACHED_FILE} ]] || tar zcf ${CACHED_FILE} node_modules
