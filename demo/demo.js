function $(id) {
    return document.getElementById(id);
  }

  function getMore() {
    let num = new Num2Word();
    var text = num.convert($("number").value);
    $("result").innerHTML = text;
  }
