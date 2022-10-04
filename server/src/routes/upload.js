const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path');
const express = require('express')
const router = express.Router()
var COS = require('cos-nodejs-sdk-v5');

// 创建实例
var cos = new COS({
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY,
});
// 存储桶名称，由bucketname-appid 组成，appid必须填入，可以在COS控制台查看存储桶名称。 https://console.cloud.tencent.com/cos5/bucket
var Bucket = process.env.COS_BUCKET_NAME;
// 存储桶Region可以在COS控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/ 
// 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
var Region = 'ap-nanjing';

router.post('/file', (req, res) => {
  let form = new multiparty.Form();
  form.encoding = 'utf-8';
  form.uploadDir = 'public/upload';
  form.parse(req, function (err, fields, files) {
    try {
      let upfile = files.file[0]
      // 为文件进行命名,修改upfile文件中的path,否则会随机生成文件名
      let newpath = form.uploadDir + '/' + upfile.originalFilename  //文件名
      // 重命名
      fs.renameSync(upfile.path, newpath);
      // 返回信息,((upfile.size)/1048576).toFixed(2)将文件由B转换为M的单位并进行取小数点后两位进行四舍五入向上取操作
      putObject(upfile.originalFilename, (file_url) => {
        res.send({
          code: 200,
          msg: 'File Success',
          file_name: upfile.originalFilename,
          file_size: ((upfile.size) / 1048576).toFixed(2) + 'M',
          file_url,
        })
      })
      
    } catch {
      console.log(err)
      res.send({
        code: 401,
        msg: 'File error',
        more_msg: err
      })
    }
  })
})

function putObject(filename, fn) {
  console.log('putObject', filename)
  // 创建测试文件
  var filepath = path.resolve(__dirname, '../../public/upload/'+filename);
  console.log('filepath', filepath)
  cos.sliceUploadFile({
    Bucket: Bucket,
    Region: Region,
    Key: filename,
    FilePath: filepath // 本地文件地址，需自行替换
}, function (err, data) {
    console.log(err, data);
    fn(data.Location)
});
}

module.exports = router
