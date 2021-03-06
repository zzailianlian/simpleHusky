const fsPromise = require('fs/promises')
const path = require('path')
const packageJSON = require('./package.json')
const child_process = require('child_process')

const nodePreCommitContent = `#! /usr/bin/env node

const child_process = require('child_process')

console.log('我还是pre-commit-新增的')

child_process.exec('${packageJSON.zzzgithooks['pre-commit']}',(err,res)=>{
  if(err){
    return console.log('err',err)
  }
  console.log(res)
})
`

fsPromise.mkdir(path.resolve(__dirname, '.test2')).then(res => {
  fsPromise.writeFile(path.resolve(__dirname, '.test2', 'pre-commit'), nodePreCommitContent,{
    flag:'w+'
  }).then(res => {
    console.log('pre-commit-res', res);
    child_process.exec(`git config core.hooksPath ${path.resolve(__dirname, '.test2')} && chmod +x ${path.resolve(__dirname, '.test2', 'pre-commit')}`, (err) => {
      if (err) {
        return console.log('err', err)
      }
      console.log('hhhh');
    })
  }).catch(err => {
    console.error('pre-commit-err', err);
  });
}).catch(err => {
  console.error('mkdirerr', err);
});
