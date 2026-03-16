document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    function showError(id, message) {
        const errDiv = document.getElementById('err-' + id);
        errDiv.innerText = message;
        errDiv.style.display = 'block';
        isValid = false;
    }

    function clearError(id) {
        const errDiv = document.getElementById('err-' + id);
        errDiv.innerText = '';
        errDiv.style.display = 'none';
    }

    const studentId = document.getElementById('studentId').value.trim();
    const fullName = document.getElementById('fullName').value.trim();
    const dob = document.getElementById('dob').value;
    const classRoom = document.getElementById('classRoom').value;
    const gpa = document.getElementById('gpa').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    ['studentId', 'fullName', 'dob', 'classRoom', 'gpa', 'email', 'password', 'confirmPassword'].forEach(clearError);

    const idRegex = /^SV\d{6}$/;
    if (!studentId) {
        showError('studentId', 'Mã sinh viên không được để trống.');
    } else if (!idRegex.test(studentId)) {
        showError('studentId', 'Mã sinh viên phải bắt đầu bằng "SV" và theo sau là 6 chữ số (VD: SV123456).');
    }

    const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
    if (!fullName) {
        showError('fullName', 'Họ và tên không được để trống.');
    } else if (!nameRegex.test(fullName)) {
        showError('fullName', 'Họ và tên chỉ được chứa chữ cái và khoảng trắng.');
    }
    if (!dob) {
        showError('dob', 'Ngày sinh không được để trống.');
    } else {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            showError('dob', 'Sinh viên phải từ 18 tuổi trở lên.');
        }
    }

    const gpaNum = parseFloat(gpa);
    const gpaRegex = /^\d+(\.\d{1,2})?$/; 
    if (!gpa) {
        showError('gpa', 'Điểm trung bình không được để trống.');
    } else if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 10) {
        showError('gpa', 'Điểm trung bình phải là số từ 0 đến 10.');
    } else if (!gpaRegex.test(gpa)) {
        showError('gpa', 'Điểm trung bình chỉ cho phép tối đa 2 chữ số thập phân.');
    }

    if (!email) {
        showError('email', 'Email không được để trống.');
    } else if (!email.endsWith('@student.edu.vn')) {
        showError('email', 'Email phải kết thúc bằng "@student.edu.vn".');
    } else {
        const emailRegex = /^[^\s@]+@student\.edu\.vn$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Định dạng email không hợp lệ.');
        }
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!password) {
        showError('password', 'Mật khẩu không được để trống.');
    } else if (!passRegex.test(password)) {
        showError('password', 'Mật khẩu phải từ 8 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.');
    }

    if (!confirmPassword) {
        showError('confirmPassword', 'Vui lòng xác nhận mật khẩu.');
    } else if (password !== confirmPassword) {
        showError('confirmPassword', 'Mật khẩu xác nhận không khớp.');
    }

    if (isValid) {
        const newStudent = {
            id: studentId,
            name: fullName,
            dob: dob,
            classRoom: classRoom,
            gpa: gpaNum,
            email: email,
            password: password 
        };

        let students = JSON.parse(localStorage.getItem('students')) || [];
        
        students.push(newStudent);
        
        localStorage.setItem('students', JSON.stringify(students));

        alert('Thêm sinh viên thành công!');
        
        window.location.href = 'manage.html'; 
    }
});