const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'drgeenqmn',
  api_key: '749614134784779',
  api_secret: 'zbSrW-VvBT-6VdRrxtbKeAuhk3M',
});

exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: 'auto' }
    );
  });
};
