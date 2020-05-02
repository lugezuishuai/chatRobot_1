window.onload = function(){
    var robot = (function () {
        return {
            init(ele) {
                this.ele = document.querySelector(ele);
                this.input = this.ele.querySelector('input');
                this.send = this.ele.querySelector('.send_btn');
                this.msg_robot = this.ele.querySelector('.msg_robot');
                this.msg_mine = this.ele.querySelector('.msg_mine');
                this.chatContent = this.ele.querySelector('.chatContent');
                this.event();
    
            },
            event() {
                var that = this;
                this.send.onclick = function () {
                    console.log('151');
                    that.chat();
                }
                document.onkeydown = function (e) {
                    if (e.keyCode == 13) {
                        that.chat();
                    }
                }
            },
            chat() {
                var that = this;
                var sayContent = this.input.value;
                var paras = "key=7e0c61672f674208a85f85f7ff08855f&userid=robot&info=" + sayContent;
                ajax.post("http://www.tuling123.com/openapi/api", paras, function (content, xhr) {
                    var newNodeMine = that.msg_mine.cloneNode(true);
                    newNodeMine.lastElementChild.innerHTML = sayContent;
                    newNodeMine.style.display = 'block';
                    that.chatContent.appendChild(newNodeMine);
                    that.autoScroll(that.chatContent);
                    that.input.value = '';
                    console.log(content)
                    var obj = JSON.parse(content);
                    var msgRoot = obj.text;
                    //判断图片信息
                    if (obj.url) {
                        msgRobot += "<a href='" + obj.url + "' target='_blank'>点我看图片.</a>";
                    }
                    //判断菜谱信息
                    if (obj.list && obj.code == "308000") {
                        msgRobot += " ①菜谱名字：" + obj.list[0].name + " ②菜谱原料：" + obj.list[0].info + " 做饭链接：" + "<a href='" + obj.list[0].detailurl + "' target='_blank'>点我看怎么做？</a>";
                    }
                    //判断新闻信息
                    if (obj.list && obj.code == "302000") {
                        msgRobot += " ①文章标题：" + obj.list[0].article + " ②文章来源：" + obj.list[0].source + " 做饭链接：" + "<a href='" + obj.list[0].detailurl + "' target='_blank'>点我看新闻.</a>";
                    }
                    var newNodeRoot=that.msg_robot.cloneNode(true);
                    newNodeRoot.lastElementChild.innerHTML=msgRoot;
                    newNodeRoot.style.display='block';
                    that.chatContent.appendChild(newNodeRoot);
                    that.autoScroll(that.chatContent)
                })
            },
            autoScroll(content) {
              setTimeout(function step(){
                  var top=content.scrollTop;
                  content.scrollTop+=top+4;
                  if (top==content.scrollTop) {
                      setTimeout(step,20)
                  }
              },0)
            }
        }
    }())
    robot.init('.imgLayout');
}