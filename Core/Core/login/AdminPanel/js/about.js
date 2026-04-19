// ============ API URL ============
const API_URL = "https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo";

// ============ GLOBAL VARIABLES (müəlliminki kimi) ============
const editId = document.getElementById('editId');
const editCategory = document.getElementById('editCategory');
const editUstTitle = document.getElementById('editUstTitle');
const editCoreTitle = document.getElementById('editCoreTitle');
const editDescription = document.getElementById('editDescription');
const editDescription2 = document.getElementById('editDescription2');
const editIcon = document.getElementById('editIcon');
const editAltTitle1 = document.getElementById('editAltTitle1');
const editAltTitle2 = document.getElementById('editAltTitle2');
const editAltTitle3 = document.getElementById('editAltTitle3');
const editAltTitle4 = document.getElementById('editAltTitle4');
const editStatus = document.getElementById('editStatus');

// ============ GET ALL (sizin getAllAbout) ============
function getAllAbout() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('aboutTableBody');
            if (!tbody) return;
            tbody.innerHTML = '';

            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-slate-50 transition-colors';

                const statusBadge = item.status == "1" || item.status == 1
                    ? '<span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Aktiv</span>'
                    : '<span class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Deaktiv</span>';

                const checkEmpty = (val) => {
                    if (!val) return '<span class="text-slate-300 italic">Yazilmir</span>';
                    return val.length > 40 ? val.substring(0, 40) + '...' : val;
                };

                const iconDisplay = item.Icon 
                    ? `<div class="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600"><i class="${item.Icon} text-xs"></i></div>`
                    : '<span class="text-slate-300 italic">olmur</span>';

                tr.innerHTML = `
                    <td class="p-3 font-medium text-slate-900">#${item.id}</td>
                    <td class="p-3"><span class="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-medium">${item.category || '-'}</span></td>
                    <td class="p-3 text-slate-800">${checkEmpty(item.UstTitle)}</td>
                    <td class="p-3 text-slate-800 font-medium">${checkEmpty(item.CoreTitle)}</td>
                    <td class="p-3 text-slate-700 max-w-xs">${checkEmpty(item.Description)}</td>
                    <td class="p-3 text-slate-700 max-w-xs">${checkEmpty(item.Description2)}</td>
                    <td class="p-3">${iconDisplay}</td>
                    <td class="p-3 text-slate-700">${checkEmpty(item.AltTitle1)}</td>
                    <td class="p-3 text-slate-700">${checkEmpty(item.AltTitle2)}</td>
                    <td class="p-3 text-slate-700">${checkEmpty(item.AltTitle3)}</td>
                    <td class="p-3 text-slate-700">${checkEmpty(item.AltTitle4)}</td>
                    <td class="p-3">${statusBadge}</td>
                    <td class="p-3">
                        <div class="flex items-center gap-2">
                            <button onclick="editAbout(${item.id})" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition">
                                <i class="fas fa-edit text-xs"></i>
                            </button>
                            <button onclick="deleteAbout(${item.id})" class="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition">
                                <i class="fas fa-trash text-xs"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error('Xəta:', err);
            alert('Məlumatları yükləmək mümkün olmadı');
        });
}

// About edit
function editAbout(id) {
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
            // bu lazimlidi api glenei inputun icine yazir
            editId.value = data.id;
            document.getElementById('editCategoryDisplay').value = data.category;
            editCategory.value = data.category;
            editUstTitle.value = data.UstTitle || '';
            editCoreTitle.value = data.CoreTitle || '';
            editDescription.value = data.Description || '';
            editDescription2.value = data.Description2 || '';
            editIcon.value = data.Icon || '';
            editAltTitle1.value = data.AltTitle1 || '';
            editAltTitle2.value = data.AltTitle2 || '';
            editAltTitle3.value = data.AltTitle3 || '';
            editAltTitle4.value = data.AltTitle4 || '';
            editStatus.value = data.status == "1" || data.status == 1 ? "1" : "0";

            updateEditFields(data.category);
            
            openEditModal();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => {
            console.error('Xəta:', err);
            alert('Məlumatları yükləmək mümkün olmadı');
        });
}

// About update
function updateAbout() {
    const id = editId.value;
    if (!id) return alert("Zəhmət olmasa cədvəldən bir məlumat seçin!");

    // category deyismiycem qarisiqliq yrnmsn
    const data = {
        category: editCategory.value,
        status: editStatus.value,
        UstTitle: editUstTitle.value.trim() || null,
        CoreTitle: editCoreTitle.value.trim() || null,
        Description: editDescription.value.trim() || null,
        Description2: editDescription2.value.trim() || null,
        Icon: editIcon.value.trim() || null,
        AltTitle1: editAltTitle1.value.trim() || null,
        AltTitle2: editAltTitle2.value.trim() || null,
        AltTitle3: editAltTitle3.value.trim() || null,
        AltTitle4: editAltTitle4.value.trim() || null
    };

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
    })
        .then(() => {
        alert("Məlumat uğurla yeniləndi!");
            getAllAbout();
        closeEditModal();
        resetEditForm();
    })
    .catch(err => {
        console.error('Xəta:', err);
        alert('Xəta baş verdi: ' + err.message);
    });
}

// About delete
function deleteAbout(id) {
    if (!confirm('Bu məlumatı silmək istədiyinizə əminsiniz?')) return;
    
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => {
            alert('Məlumat silindi');
            getAllAbout();
        })
        .catch(err => {
            console.error('Xəta:', err);
            alert('Silə bilmədik');
        });
}

// Modal cntrl
function openEditModal() {
    document.getElementById('modalEditAbout').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('modalEditAbout').style.display = 'none';
}

function resetEditForm() {
    editId.value = '';
    editUstTitle.value = '';
    editCoreTitle.value = '';
    editDescription.value = '';
    editDescription2.value = '';
    editIcon.value = '';
    editAltTitle1.value = '';
    editAltTitle2.value = '';
    editAltTitle3.value = '';
    editAltTitle4.value = '';
}

// category ucundu hansi acilanda hansi imputlar qlair fln
function updateEditFields(category) {
    const allFields = [
        'editUstTitleWrap', 'editCoreTitleWrap', 'editDescriptionWrap',
        'editDescription2Wrap', 'editIconWrap', 'editAltTitle1Wrap',
        'editAltTitle2Wrap', 'editAltTitle3Wrap', 'editAltTitle4Wrap'
    ];
    allFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    const show = (id) => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'block';
    };

    if (category === 'Business Development & Innovation') {
        show('editCoreTitleWrap');
        show('editDescriptionWrap');
        show('editIconWrap');
    } else if (category === 'Grow Your Business with Avers Today') {
        show('editDescriptionWrap');
        show('editDescription2Wrap');
        show('editIconWrap');
        show('editCoreTitleWrap');
        show('editAltTitle1Wrap');
        show('editAltTitle2Wrap');
        show('editAltTitle3Wrap');
        show('editAltTitle4Wrap');
    } else if (category === 'Rapid Prototype and Development') {
        show('editUstTitleWrap');
        show('editCoreTitleWrap');
        show('editDescriptionWrap');
        show('editDescription2Wrap');
    } else if (category === 'Simple Easy Steps to Follow') {
        show('editIconWrap');
        show('editCoreTitleWrap');
        show('editDescriptionWrap');
    } else if (category === 'A Great Team for Quality Results') {
        show('editCoreTitleWrap');
        show('editDescriptionWrap');
    } else if (category === 'What People Say') {
        show('editDescriptionWrap');
        show('editIconWrap');
        show('editAltTitle1Wrap');
        show('editAltTitle2Wrap');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getAllAbout();
});