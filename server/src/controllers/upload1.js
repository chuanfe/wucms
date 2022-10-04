const multiparty = require('multiparty');
const fs = require('fs')
var COS = require('cos-nodejs-sdk-v5');

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    console.log('upload file---', req.file)
    if (!req.file) resolve({ secure_url: null });
    /* 生成multiparty对象，并配置上传目标路径 */
    let form = new multiparty.Form();
    form.encoding = 'utf-8';
    // 设置文件存储路径，以当前编辑的文件为相对路径
    form.uploadDir = './fileupload';
    form.parse(req, (err, fields, files) => {
      try {
        let upfile = files.file[0]
        // 为文件进行命名,修改upfile文件中的path,否则会随机生成文件名
        let newpath = form.uploadDir + '/' + upfile.originalFilename  //文件名
        // 重命名
        fs.renameSync(upfile.path, newpath);
        // 返回信息,((upfile.size)/1048576).toFixed(2)将文件由B转换为M的单位并进行取小数点后两位进行四舍五入向上取操作
        resolve({
          code: 200,
          msg: 'File Success',
          file_name: upfile.originalFilename,
          file_size: ((upfile.size) / 1048576).toFixed(2) + 'M'
        })
      } catch {
        console.log(err)
        reject({
          code: 401,
          msg: 'File error',
          more_msg: err
        })
      }
    })

  });
};


const uploadBucket = () => {
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

  // 分片上传
  cos.sliceUploadFile({
    Bucket: Bucket,
    Region: Region,
    Key: '1.zip',
    FilePath: './1.zip' // 本地文件地址，需自行替换
  }, function (err, data) {
    console.log(err, data);
    if (err) reject(err);
    resolve(data);
  });
}