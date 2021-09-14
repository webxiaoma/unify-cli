const path = require("path");
const config = require("./config")
const downloadGitRepo = require('download-git-repo');

module.exports = {
  selectedLibName:'', // 选择得项目开发语言
  selectedLayoutName:'', // 选择得项目开发框架
  // 创建目录
  createdDir(fileName){
      if(!fileName) return;

      fse.ensureDir(fileName, ()=>{
        console.log('创建成功')
      })
      
      if(this.checkDirName(fileName)){

      }
  },

  /**
   * @msg 检测文件夹合法性已经是否存在
   */
  checkDirName(fileName){
    
  },

  /**
   * @msg 创建询问语言模板列表
   * @return 返回 inquirer prompt 格式 详情查看 https://www.npmjs.com/package/inquirer
   */
  createProInquiryPrompt(){
    const keys = Object.keys(config.projectList);

    const list = [{
      type: 'rawlist',
      name: 'lib',
      message: '请选择项目开语言(Please select the project Development library)',
      default: 'Vue',
      choices: []
    }];

    keys.forEach(item=>{
      list[0].choices.push({
         value:item,
         name:item
      })
    })

    return list;
  },

  /**
   * @msg 创建项目模块询问列表
   */
  createLayoutInquiryPrompt(libName){
    this.selectedLibName = libName;
    const keys = Object.keys(config.projectList[libName]);
    
    const list = [{
      type: 'rawlist',
      name: 'layout',
      message: '请选择要使用得项目(Please select the project you want to use)',
      choices: []
    }];

    try{
      keys.forEach(item=>{
        list[0].choices.push({
           value:item,
           name:`${config.projectList[libName][item].name} (${config.projectList[libName][item].desc})`
        })
      })
    }catch(err){
       console.error(err)
    }

    return list;
  },
  createProject(layoutName){
    this.selectedLayoutName = layoutName
    this.downloadProject()
  },
  downloadProject(){
    const project = config.projectList[this.selectedLibName][this.selectedLayoutName];
    const pathUrl = path.join(__dirname,`../../${config.projectName}/${project.name}`)

    downloadGitRepo(project.url, pathUrl, { clone: true }, function (err) {
      console.log(err ? 'Error' : 'Success')
    })
  },






}