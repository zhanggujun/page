# 瞎写的一个分页小插件 #
打开page.html可看到效果
构造函数接收三个参数 new Page(el,startPage,allPage),el--被挂载的dom的id,startPage--初始化时被选中的页码,allPage--总页码
有一个原型方法 onChage--当页码被改变的时候触发,接收两个参数：
new Page(el,startPage,allPage).onChange = function(now,all){
> 	// now -被选中的页码 all -总页码
> 	// code
}