#! /usr/local/bin/python3

import subprocess
import datetime

workdir="/Users/dong/workbench/qmfe/creasy2010.github.io"
cmmand=f"cd {workdir} && git pull && git add . && git commit -m 'auto push at {str(datetime.datetime.now())}' &&git push"
subprocess.run(cmmand, shell=True, check=True)


