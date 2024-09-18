// Tổng hợp các chức năng sẽ thực hiện trong bài tập QLSV
//CRUD -(Create-Read-Update-Delete)
/**
 * Thêm sinh viên(done)
 * Xóa sinh viên
 * Cập nhật sinh viên
 * Clear dữ liệu đang có trong form
 * Render dữ liệu lên giao diện (done)
 * Lưu trữ và sử dụng dữ liệu ở local storage(done)
 * Validation dữ liệu
 * Tìm kiếm sinh viên
 * Thông báo cho người dùng
 */

let arrSinhVien = [];

//---Thêm sinh viên---
document.getElementById("formQLSV").onsubmit = function (event) {
    //preventDefault dùng để ngăn chặn sự kiện reload
    event.preventDefault();
    //Thực hiện xử lí và truy cập lấy tất cả dữ liệu từ các input đang có trên giao diện
    let sinhVien = getValueForm();
    if (sinhVien != null) {
        arrSinhVien.push(sinhVien);
        setLocalStore("arr", arrSinhVien);
        renderDataSinhVien();
        event.target.reset();
    }
};

// --- Chức năng hiển thị thông tin sinh viên lên table-----
function renderDataSinhVien(arr = arrSinhVien) {
    let content = "";
    for (let i of arr) {
        let newSinhVien = new SinhVien;
        Object.assign(newSinhVien, i);
        let { txtMaSV, txtTenSV, txtEmail, txtNgaySinh, khSV } = newSinhVien
        content += `
        <tr>
        <td>${txtMaSV}</td>
        <td>${txtTenSV}</td>
        <td>${txtEmail}</td>
        <td>${txtNgaySinh}</td>
        <td>${khSV}</td>
        <td>${newSinhVien.tinhDiemTrungBinh().toFixed(2)}</td>
        <td>
            <button onclick="deleteSinhVien('${txtMaSV}')" class="btn btn-danger">Xóa</button>
            <button onclick="getInfoSinhVien('${txtMaSV}')" class="btn btn-warning">Sửa</button>
        </td>
        </tr>
        `;
    }
    document.getElementById("tbodySinhVien").innerHTML = content;

}
window.onload = function () {
    let dataLocal = getLocalStore("arr");
    console.log(dataLocal)
    if (dataLocal) {
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

function setLocalStore(key, value) {
    let dataString = JSON.stringify(value);
    localStorage.setItem(key, dataString)
}
function getLocalStore(key) {
    let dataLocal = localStorage.getItem(key)
    return dataLocal ? JSON.parse(dataLocal) : null // phương thức sẽ không được luu trữ
}

// -- Xóa sinh viên ---
function deleteSinhVien(maSV) {
    // khi xóa 1 phần tử sử dụng phương thức splice(vị trí bắt đầu, số lượng phần tử cần xóa)
    console.log(maSV);
    // xử lí tìm kiếm vị trí sinh viên trong mảng
    // thao tác xóa sinh viên và cập nhật dữ liệu
    let index = arrSinhVien.findIndex((items, index) => items.txtMaSV == maSV);
    if (index != -1) {
        arrSinhVien.splice(index, 1);
        renderDataSinhVien();
        setLocalStore("arr", arrSinhVien);
    }



}
// -- Get info sinhVien -----
// B1. gắn function get info sinh viên vào button sửa và lấy mã sinh viên
// B2. Thực hiện tìm kiếm sinh viên trong mảng
// B3. Thực hiện đưa dữ liệu sinh viên lên input trong form cho người dùng chỉnh sửa
// B4. Ngăn chặn người dùng chỉnh sửa mã SV(disable, readonly)
function getInfoSinhVien(maSV) {
    let timKiemViTri = -1
    for (let i in arrSinhVien) {
        console.log(i)
        if (arrSinhVien[i].txtMaSV == maSV) {
            timKiemViTri = i;
        }
    }
    let arrField = document.querySelectorAll("#formQLSV input,#formQLSV select");
    let sinhVien = arrSinhVien[timKiemViTri];
    console.log(sinhVien)
    for (let i of arrField) {
        //i đại diện cho cho các input và select tìm kiếm được trong form
        i.value = sinhVien[i.id];
        if (i.id == "txtMaSV") {
            i.readOnly = true;
        }
    }
}
// --- Cập nhật sinh viên ----
//B1. DOM tới nút button cập nhật và tạo một sự kiện click
//B2. Xử lý dữ liệu người dùng đã cập nhật trên form(Nhớ xem từng lấy dữ liệu ở đâu?)
//B3. Tìm kiếm tới vị trí của phần tử đang được cập nhật
//B4. Thay thế dữ liệu mới vào vị trí của phần tử được cập nhật
//B5. Thực hiện chạy lại hàm render và cập nhật xuống localStorage
//B6. Ckear toàn bộ dữ liệu của form và tắt readOnly của input mã SV

document.querySelector(".btn-info").onclick = function () {
    let sinhVien = getValueForm();
    let index = arrSinhVien.findIndex((items, index) => items.txtMaSV == sinhVien.txtMaSV)
    if (index != -1) {
        arrSinhVien[index] = sinhVien;
        renderDataSinhVien();
        setLocalStore("arr", arrSinhVien);
        document.getElementById("txtMaSV").readOnly = false;
        document.getElementById("formQLSV").reset()
    }
}
//---Get value form---
function getValueForm() {
    let arrField = document.querySelectorAll("#formQLSV input,#formQLSV select");
    let sinhVien = new SinhVien();
    console.log(sinhVien);
    //Tạo một biến cờ để check trường hợp khi nào trả về đối tượng sinhVien;
    let flag = true;
    for (let i of arrField) {
        let { value, id } = i; //destructuring
        sinhVien[id] = value; //sinhVien.id ở đây nó sẽ gọi tới thuộc tính, muốn đưa dữ liệu, đưa dữ liệu hoặc một chuỗi thì phải dùng []
        //Truy cập tới thẻ cha input gần nhất
        let theThongBao = i.parentElement.querySelector("span");
        if (!checkEmtyValue(theThongBao, value)) { // hàm này nếu return: true thì mới chạy được hàm đi vào bên trong thực hiện gán biến flag = false;
            flag = false;
        } else {
            // if(id =="txtPass" && !checkMinMaxValue(theThongBao,value,6,10)){
            //     flag = false;
            let dataValue = i.getAttribute("data-validation") //undifined | email | minMax
            let dataMin = i.getAttribute("data-min")
            let dataMax = i.getAttribute("data-max")
            if (dataValue == "email" && !checkEmailValue(theThongBao, value)) {
                flag = false;
            } else if (dataValue == "minMax" && !checkMinMaxValue(theThongBao, value, dataMin * 1, dataMax * 1)) {
                flag = false;
            } else if (dataValue == "pass" && (!checkPasswordValue(theThongBao, value) || !checkMinMaxValue(theThongBao, value, dataMin * 1, dataMax * 1))) {

            }
        }
    }


    return flag ? sinhVien : null;

}