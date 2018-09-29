/*Code line count start here*/
class Num2Word {
  constructor() {
    this.num; this.num_digits; this.digits;
  }
 
  reverseNum(num){
    return num.split("").reverse().join(""); 
  }
  
  sliceNum(num, pos){
    return num.slice(pos[0], pos[1]);
  }
  
  splitdigits(num) {
    return ("" + num).split("");
  }

  numdigits(value) {
    return (Math.log(value) * Math.LOG10E + 1) | 0;
  }
  
  small_num(num) {
    var digits = this.splitdigits(num);
    if(digits[0] < 1) num = digits[0] = digits[1];
    var onesArray =["","one","two","three","four","five","six","seven","eight","nine"];
    var teenArray = ["","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
    var tensArray = ["","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"]; 
    if (num % 10 === 0) {
      return tensArray[num / 10];
     
   } else {
      if (num < 10) {
        return onesArray[num];
      } else if (num > 10 && num < 20) {
        return teenArray[digits[1]];
      } else if (num > 19) {
        return tensArray[digits[0]] + " " + onesArray[digits[1]];
      }
    }
  }
  
  convertSmall(num, scale, incl){
    var toReturn;
    if(this.numdigits(num) < 1){
      toReturn = "";
    }else if(this.numdigits(num) < 3){
      toReturn = incl+this.small_num(num) +" "+scale;
    }else if(num < 1000){
       if(num % 100 === 0){
          toReturn = this.small_num(this.splitdigits(num)[0]) + " hundred "+scale;
       }else{
          toReturn = this.small_num(this.splitdigits(num)[0]) + " hundred "+incl+" "+this.small_num(this.splitdigits(num)[1]+""+this.splitdigits(num)[2])+" "+scale;
       }
    }
    return toReturn;
  }
  
  convert(num) {
    this.num_digits = this.numdigits(num); 
    this.digits = this.splitdigits(num);
    var scaleDigits = [6, 9], text = "", addStr = "";
    if(this.num_digits > 1 && this.sliceNum(num, [0, 1]) % 1 != 0){
      text = "Number to small"; /**/
    }else if(num == 0){ 
       text = "zero";
    }else if(num < 1000){
       addStr = (this.num_digits > 2) ? ("and ") : ("");
       text = this.convertSmall(num, "", addStr);
    }else{
       var reversedNum = this.reverseNum(num);
       var toScale = [], x = 0, ctr = 0, pos = [];        
       while(ctr < this.num_digits){ 
         toScale[x] = this.sliceNum(reversedNum, [(ctr<1) ? (0) : (ctr), ctr+3]);
         ctr+=3;
         x++;
       }
       for(var x=0;x<toScale.length;x++) toScale[x] = this.reverseNum(toScale[x]);
       text = this.large_num(toScale);
    }
    return text;
  }
  
  large_num(num){
    var text = [], numStr, addStr, part, numToCon = 0;
    var scales = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion","octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quatttuor-decillion", "quindecillion","sexdecillion", "septen-decillion", "octodecillion", "novemdecillion","vigintillion", "centillion"];
    
    for(var x=0;x<num.length;x++) (this.convertSmall(num[x], "", "") != "") ? (numToCon++) : ("");  
    for(var x=0;x<num.length;x++){ 
        num[x] = (this.sliceNum(num[x], [0, 1]) == 0) ? (num[x].slice(1)) : (num[x]);
        part = (x != 0 && (num.length > 2 && numToCon > 2)) ? (",") : (""); 
        addStr = (x==0) ? ("and ") : ("");
        text[x] = " "+this.convertSmall(num[x], scales[x]+part, addStr); 
    } 
    text.reverse();
    numStr = text.join(""); 
    return numStr;
  }
}
