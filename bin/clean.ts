/**
 * 删除根目录中的文件夹
 *
 * @使用场景
 *
 * @company qianmi.com
 * @Date    2018/9/19
 **/

import fs, { Stats } from "fs";
import fse from  'fs-extra';
import {join} from 'path';

let workBasePath = join(__dirname,'../..');

const ignoreLists:string[] = ['manager','.gitignore','.git','.idea'].map(item=>join(workBasePath,item));

(async ()=>{

  console.dir(ignoreLists);
  let files:string[] = fs.readdirSync(workBasePath).map(item=>join(workBasePath,item));

  console.dir(files);
  files.forEach((filepath:string) => {

    if(ignoreLists.includes(filepath)) {
      console.log('过滤到文件 ',filepath);
      return ;
    }

    fs.stat(filepath,(err,fileState:Stats)=>{
      if(err){
        console.error(err);
        return;
      }
      if(fileState.isDirectory()){
        fse.emptyDirSync(filepath);
        fs.rmdirSync(filepath);
      }else if(fileState.isFile()){
        fs.unlinkSync(filepath)
      }
    });
  });
})();
