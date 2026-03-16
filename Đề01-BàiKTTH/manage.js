document.addEventListener('DOMContentLoaded', () => {
    renderTable();
});

function renderTable() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const tbody = document.getElementById('studentTableBody');
    const statsBar = document.getElementById('statsBar');
    
    tbody.innerHTML = '';

    let totalGpa = 0;

    students.forEach((student, index) => {
        totalGpa += parseFloat(student.gpa);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.dob}</td>
            <td>${student.classRoom}</td>
            <td>${student.gpa}</td>
            <td>
                <button class="btn-edit" onclick="editStudent('${student.id}')">Sửa</button>
                <button class="btn-delete" onclick="deleteStudent('${student.id}')">Xoá</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    const avgGpa = students.length > 0 ? (totalGpa / students.length).toFixed(2) : '0.00';
    statsBar.innerHTML = `Tổng số sinh viên: ${students.length} | Điểm TB lớp: ${avgGpa}`;
}

function deleteStudent(id) {
    if (confirm('Bạn có chắc chắn muốn xoá sinh viên này không?')) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students = students.filter(student => student.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }
}

function editStudent(id) {
    localStorage.setItem('editStudentId', id);
    window.location.href = 'students.html';
}