//设置cookie
function setCookie(sName,sValue,iDay){
    if(iDay){
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+iDay);
        document.cookie=`${sName}=${sValue};expires=${oDate};path=/`;
    }else{
        document.cookie=`${sName}=${sValue};path=/`;
    }
}
//获取cookie
function getCookie(name){
    var arr=document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==name){
            return arr2[1]
        }
    }
    return '';
}
function removeCookie(name){
    setCookie(name,'露露',-1)
}