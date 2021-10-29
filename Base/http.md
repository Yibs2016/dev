##### XMLHttpRequest
- http协议在客户端js中的实现
> 一个http请求对应一个xhr实例，包含http协议中的各种属性，二进制传输 
> Content-type 收发两端按什么类型解析二进制的数据主体 
> response和responseText配合responseType，方便用户获取到解析后的响应数据
	json（application/json）,可在responseText上手动JSON.parse。也可直接在response上获取解析好的json对象。 
	document（text/html），responseText为html文本，response为DOM对象。 
	对于其他数据，比如媒体类型（视频，音频），普通二进制流，无法在responseText获取，因为这种二进制Body.text()后会损坏数据d。可以指定esponseType为blob，在response上获取到Blob对象。(axios中：Failed to read the 'responseText' property from 'XMLHttpRequest': The value is only accessible if the object's 'responseType' is '' or 'text')
 

 