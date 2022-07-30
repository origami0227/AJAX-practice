let n = 1;
getPage.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", `/page${n + 1}`);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const array = JSON.parse(request.response);
      array.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.id;
        xxx.appendChild(li);
      });
      n += 1;
    }
  };
  request.send();
};

//给JSON事件一个监听
getJSON.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/5.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(typeof request.response);
      console.log(request.response);
      const bool = JSON.parse(request.response); //SON 字符串 => JS 数据,由于 JSON 只有六种类型，所以转成的数据也只有6种
      console.log(typeof bool);
      console.log(bool);
    }
  };
  request.send();
};

//给XML事件一个监听
getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/4.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const dom = request.responseXML; //DOM对象不止是用于HTMl也用于XML
      const text = dom.getElementsByTagName("warning")[0].textContent; //注意要加[0]，否则将会获得一个伪数组
      console.log(text.trim()); //trim一下可以消除回车
    }
  };
  request.send();
};

//给加载HTML事件一个监听
getHTML.onclick = () => {
  const request = new XMLHttpRequest(); //还是创建HTTPRequest对象
  request.open("GET", "/3.html"); //调用open
  request.onload = () => {
    const div = document.createElement("div"); //创建一个div
    div.innerHTML = request.response; //在这个div里面写上内容
    document.body.appendChild(div); //放入body里面，以上三行是对于成功请求的事件进行能够加载的处理（轻量级请求）
  };
  request.onerror = () => {}; //onerror不是很好的适配AJAX
  request.send();
};

//给加载JS事件一个监听
getJS.onclick = () => {
  const request = new XMLHttpRequest(); //依然是创建HTTPRequest对象
  request.open("GET", "/2.js"); //调用对象的open方法
  //请求它的成功或者失败
  request.onload = () => {
    console.log(request.response);
    const script = document.createElement("script"); //创建script标签
    script.innerHTML = request.response; //填写script内容
    document.body.appendChild(script); //插入body标签内，以上三行让JS生效
  };
  request.onerror = () => {};
  request.send(); //发送出去
};

//给加载css事件一个监听
getCSS.onclick = () => {
  const request = new XMLHttpRequest(); //创建HttpRequest对象,此时readystate是0
  request.open("GET", "/style.css"); //调用对象的open方法，此时readystate是1
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      //下载完成，但不知道是否成功 成功一般为2xx 失败可能为4xx 5xx
      if (request.status >= 200 && request.status <= 300) {
        const style = document.createElement("style"); //创建style标签
        style.innerHTML = request.response; //填写style内容
        document.head.appendChild(style); //插入到head标签里面
      } else {
        alert("加载css失败");
      }
    }
  };
  // request.onload = () => {
  //   console.log(request.response);
  //   console.log("成功了");
  // }; //监听对象的onload事件
  // request.onerror = () => {
  //   console.log("失败了");
  // }; //监听对象的error事件
  request.send(); //调用对象的send方法，此时readystate是2
};
