// Kiểm tra dữ liệu rỗng, kiểm tra định dạng email, Kiểm tra giới hạn kí tự, Kiểm tra xem giá trị nhập vào có trong khoảng hay không
//Kiễm tra nhập vào chữ không có phép số
function checkEmtyValue(theThongBao,value){
    if(value == ""){
        // thông báo dành cho người dùng
        theThongBao.innerHTML ="Vui lòng không bỏ trống";
        return false;
    }else{
        //Xóa thông báo khi không cần lỗi
        theThongBao.innerHTML="";
        return true;
    }

}
// value ="abcdef" ==> Yêu cầu người dùng dữ liệu nhập vào từ 4 đến 10 kí tự
// 6 đến 10
function checkMinMaxValue(theThongBao,value,min,max){
   // 'abc' ==> 3 | "quang khai" ==> 10
   let doDai = value.length;
   if(doDai < min || doDai > max){
    theThongBao.innerHTML=`Vui lòng nhập trong khoảng từ ${min} đến ${max}`
    return false;
   }else{
    theThongBao.innerHTML=""
    return true
   }

}

function checkEmailValue(theThongBao,value){
    let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let checkEmail = regexEmail.test(value) //true | false;
    if(checkEmail){
        theThongBao.innerHTML=""
        return true;
    }else{
        theThongBao.innerHTML="Vui lòng nhập đúng định dạng email"
        return false;
    }
}
// 1 ký tự viết hoa, 1 ký tự đặc biệt
function checkPasswordValue(theThongBao,value){
    let regexPassword = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
    let checkPassword=regexPassword.test(value);
    if(checkPassword){
        theThongBao.innerHTML=""
        return true;
    }else{
        theThongBao.innerHTML="Vùi lòng nhập mật khẩu có ít nhất 1 kí tự viết hoa và một kí tự dặt biệt"
        return false
    }
}

// ----Tìm kiếm sinh viên ---
document.getElementById("txtSearch").oninput=function(event){ // sự kiện sẽ chạy khi input thay đổi dữ liệu
    let keyword = event.target.value.trim().toLowerCase(); // "             noi com         " loại bỏ khoảng cách phía trước và phía sau chuyển đổi tất cả chữ hoa thành chữ thường
    let newKeyWord = removeVietnameseTones(keyword)
    let arrSearch = arrSinhVien.filter((items,index)=>{
        // item.txtTenSV="Quang Khải" newKeyWord = "khai"
        //item.txtTenSV.includes(newKeyWord) ==> true => false
        console.log(items)
        let newTenSV = removeVietnameseTones(items.txtTenSV.trim().toLowerCase())
        return newTenSV.includes(newKeyWord)
    });
    renderDataSinhVien(arrSearch);
}