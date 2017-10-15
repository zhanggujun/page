##	原生JS写的一个分页小插件
###	使用
*	页面引入page.js和page.css
*	实例对象：new Page()
*	原生JS，不依赖任何第三方插件或库
###	参数说明
>
构造函数接收三个参数 new Page(el,startPage,allPage),el--被挂载的dom的id,startPage--初始化时被选中的页码,allPage--总页码。
一个原型方法 onChage--当页码被改变的时候触发,接收两个参数：now,all now--被选中的页码 all--总页码
###	示例
```
	var _page = new Page('box',2,100);  // box--分页容器id  2--初始化被选中页码 100--总页码
	_page.onChange = function(now,all){
	    // now--被选中页码 all--总页码
		console.log(now,all);
	}
```