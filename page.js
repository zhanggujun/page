(function(){
    // 分页构造函数;
    var Page = function(id,now,all){
        this.id = this.getElement('#'+id);
        this.now = parseInt(now);
        this.all = parseInt(all);
        this.page = this.getRandomId();
        this.init(this.now,this.all);
    };
    Page.prototype = {
        constructor:Page,
        getElement:function(element){
            if(typeof element!=='string')
                return null;
            var firstString = element.charAt(0);
            return firstString==='#'?
                document.getElementById(element.replace(firstString,'')):
                firstString==='.'?
                    document.getElementsByClassName(element.replace(firstString,'')):
                    document.getElementsByTagName(element);
        },
        creteBox:function(now,all){
            now = parseInt(now);
            all = parseInt(all);
            if(all<now)
                now = all;
            var html = '<div class="WW_page" id="'+this.page+'">';
            //第一页
            if (now<=1) {
                now = 1;
                html += this.createPage(1,all,'上一页');
            } else {
                //非第一页
                html += this.createPage(now-1,all,'上一页');
                //总是显示第一页页码
                html += this.createPage(1,all,'1');
            }
            //校正页码
            this.now = now;
            this.all = all;

            //开始页码
            var start = 2;
            var end = (all<9)?all:9;
            //是否显示前置省略号,即大于10的开始页码
            if(now>=7){
                html += '<a class="WW_onePage">···</a>';
                start = now-4;
                var e = now+4;
                end = (all<e)?all:e;
            }
            for (var i=start;i<now;i++) {
                html += this.createPage(i,all);
            }
            html += this.createCurrent(now,all);
            for (var j=now+1;j<=end;j++){
                html += this.createPage(j,all);
            }
            if (end<all){
                html += '<a class="WW_onePage">···</a>';
                //显示最后一页页码,如不需要则去掉下面这一句
                html += this.createPage(all,all);
            }
            html += this.createPage(now+1,all,'下一页');
            html += '</div>';
            return html;
        },
        createPage:function (now,all,page) {
            page = page||now;
            return '<a index="'+now+'" all="'+all+'" class="WW_onePage WM_change">'+page+'</a>';
        },
        createCurrent:function(now,all){
            return '<a index="'+now+'" all="'+all+'" class="WW_current WW_onePage">'+now+'</a>';
        },
        getRandomId:function(){
            return ('WW_'+Math.random()+(new Date().getTime())).replace(/\./g,'');
        },
        init:function(now,all){
            this.id.innerHTML = this.creteBox(now,all);
            var oPage = this.getElement('#'+this.page);
            var oChange = oPage.getElementsByClassName('WM_change');
            var oA = oPage.getElementsByClassName('WW_onePage');
            if(all==1){
                this.addClass(oA[oA.length-1],'WW_disabled');
                this.addClass(oA[0],'WW_disabled');
                return false;
            }
            if(now==all)
                this.addClass(oA[oA.length-1],'WW_disabled');
            if(now==1)
                this.addClass(oA[0],'WW_disabled');
            var _self = this;
            for(var i=0;i<oChange.length;i++){
                oChange[i].onclick = (function(i,event){
                    return function(){
                        event = event||window.event;
                        event.preventDefault();
                        if(_self.hasClass(oChange[i],'WW_disabled'))
                            return false;
                        var now = parseInt(oChange[i].getAttribute('index'));
                        var all = parseInt(oChange[i].getAttribute('all'));
                        _self.init(now,all);
                        typeof _self.onChange==='function'&&_self.onChange.call(_self,now,all);
                    }
                })(i);
            }
        },
        addClass:function(el,className){
            if(this.hasClass(el,className))
                return false;
            var newClass = el.className.split(' ');
            newClass.push(className);
            el.className = newClass.join(' ');
        },
        hasClass:function(el,className){
            var reg = new RegExp('(^|\\s)'+className+'(\\s|$)');
            return reg.test(el.className);
        }
    };
    window.Page = Page;
})();