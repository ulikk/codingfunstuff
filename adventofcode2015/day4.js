var crypto = require('crypto');

var input = 'bgvyzdsv';

for (i=0;i<10000000;++i)
{
  var hash = crypto.createHash('md5').update(input+i).digest('hex');
  if ((i % 10000) == 0) process.stdout.write("\r" + i + ":" + hash + "      ");
  if (hash.substring(0,5) == "00000")
  {
      process.stdout.write("\r" + i + ":" + hash + "      ");
      break;
  }  
}
