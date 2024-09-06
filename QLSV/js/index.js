// Tổng hợp các chức năng sẽ thực hiện trong bài tập QLSV
//CRUD -(Create-Read-Update-Delete)
/**
 * Thêm sinh viên(done)
 * Xóa sinh viên
 * Cập nhật sinh viên
 * Clear dữ liệu đang có trong form
 * Render dữ liệu lên giao diện (done)
 * Lưu trữ và sử dụng dữ liệu ở local storage
 * Validation dữ liệu
 * Tìm kiếm sinh viên
 * Thông báo cho người dùng
 */

let arrSinhVien =[];

//---Thêm sinh viên---
document.getElementById("formQLSV").onsubmit = function(event){
    //preventDefault dùng để ngăn chặn sự kiện reload
    event.preventDefault();
    //Thực hiện xử lí và truy cập lấy tất cả dữ liệu từ các input đang có trên giao diện
    let arrField = document.querySelectorAll("#formQLSV input,#formQLSV select")
    console.log(arrField);
    let sinhVien = new SinhVien();
    console.log(sinhVien);
    for(let i of arrField){
        let { value, id } = i; //destructuring
        sinhVien[id] = value; //sinhVien.id ở đây nó sẽ gọi tới thuộc tính, muốn đưa dữ liệu, đưa dữ liệu hoặc một chuỗi thì phải dùng []
    }
    arrSinhVien.push(sinhVien);
    setLocalStore("arr", arrSinhVien);
    renderDataSinhVien();
    event.target.reset();
};

// --- Chức năng hiển thị thông tin sinh viên lên table-----
function renderDataSinhVien(arr = arrSinhVien){
    let content ="";
    for(let i of arr){
        let newSinhVien = new SinhVien;
        Object.assign(newSinhVien,i)
        let {txtMaSV,txtTenSV,txtEmail,txtNgaySinh,khSV} = newSinhVien
        content+=`
        <tr>
        <td>${txtMaSV}</td>
        <td>${txtTenSV}</td>
        <td>${txtEmail}</td>
        <td>${txtNgaySinh}</td>
        <td>${khSV}</td>
        <td>${newSinhVien.tinhDiemTrungBinh().toFixed(2)}</td>
        <td>
            <button class="btn btn-danger">Xóa</button>
            <button class="btn btn-warning">Sửa</button>
        </td>
        </tr>
        `;
    }
    document.getElementById("tbodySinhVien").innerHTML=content;
}
window.onload = function(){
    let dataLocal = getLocalStore("arr");
    if(dataLocal){
        arrSinhVien = dataLocal
        console.log(arrSinhVien)
        renderDataSinhVien();
    }
}
// ----Local Storage ---
// # phương thức chính: setItem, getItem, removeItem
// localStorage.setItem("hoTen","Quang Khải")
// let arrMonAn = [
//     {
//         tenMon:"Màn thầu"
//     },
//     {
//         tenMon: "Xí Quách"
//     },
// ];
// let dataString = JSON.stringify(arrMonAn)
// localStorage.setItem("arr",dataString)
// let dataLocal = localStorage.getItem("leyleu")
// console.log(dataLocal)
// let parseValue = dataLocal ? JSON.parse(dataLocal) : null;

// localStorage.removeItem("hoTen")

//tạo ra một function sẽ giúp đưa bất kì dữ liệu nào xuống local storage lưu trữ

function setLocalStore(key, value){
    let dataString = JSON.stringify(value);
    localStorage.setItem(key,dataString)
}
function getLocalStore(key){
    let dataLocal = localStorage.getItem(key)
    return dataLocal ? JSON.parse(dataLocal) : null // phương thức sẽ không được luu trữ
}