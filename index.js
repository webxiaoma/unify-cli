#!/usr/bin/env node
const {CreateCli} = require("./lib")
const { Command } = require('commander');
const program = new Command();


// version
program
  .version('1.0.0')
  .option('-v, --version', '输出版本(output the version number)')
  .option('-h, --help', '查看帮助(change the working directory)')



// 创建项目
program
  .command('create [project-name]')
  .description('创建项目(create a project)')
  .action((name, cmd)=> {
    CreateCli.init(name, cmd)
  });



/**
 *@msg 执行命令
 */
program.parse(process.argv);