const inquirer = require("inquirer");
const utils = require("./utils")

/**
 * @msg 创建项目命令
 */
class CreateCli {
  constructor(){
    this.fileName = null;
    this.cmd = null;
  }

  init(fileName,cmd){
      console.log(fileName)
      this.createdDir(fileName)
  }

  createdDir(){
    utils.createdDir(this.fileName)
    this.inquiryLanguage();
  }
  
  // 询问开发语言
  inquiryLanguage(){
    inquirer.prompt(utils.createProInquiryPrompt()).then(answers => {
       console.log(answers)
       this.inquiryLayout(answers.lib)
    })
  }

  // 询问开发框架
  inquiryLayout(libName){
    inquirer.prompt(utils.createLayoutInquiryPrompt(libName)).then(answers => {
        console.log(answers)
        utils.createProject(answers.layout)
    })
  }
}




module.exports = new CreateCli();