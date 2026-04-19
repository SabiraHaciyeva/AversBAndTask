// ============ API URL ============
const API_URL = "https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo";

// ============ MODAL ============
let modalAbout = document.getElementById('modalAbout');
function openAbout() {
    modalAbout.style.display === 'none' ? modalAbout.style.display = 'flex' : modalAbout.style.display = 'none';
}

// ============ FUNKSİYALAR (Show/Hide) ============
function hide(el) { el.closest('div').style.display = 'none'; }
function show(el) { el.closest('div').style.display = 'block'; }

// ============ KATEQORİYA DİNLƏYİCİ ============
document.getElementById('aboutCategory').addEventListener('change', function () {
    const c = this.value;
    updateFields(c);
});

// Field-ləri yenilə (FUNKSİYANI YUXARIYA YAZDIM)
function updateFields(category) {
    const description = document.getElementById('aboutDescription');
    const description2 = document.getElementById('aboutDescription2');
    const UstTitle = document.getElementById('aboutTitleUst');
    const CoreTitle = document.getElementById('aboutTitleCore');
    const icon = document.getElementById('aboutIcon');
    const AltTitle1 = document.getElementById('aboutTitleAlt1');
    const AltTitle2 = document.getElementById('aboutTitleAlt2');
    const AltTitle3 = document.getElementById('aboutTitleAlt3');
    const AltTitle4 = document.getElementById('aboutTitleAlt4');

    // Hamısını gizlət
    [description, description2, icon, CoreTitle, AltTitle1, AltTitle2, AltTitle3, AltTitle4, UstTitle].forEach(hide);
    
    // Kateqoriyaya görə göstər
    if (category === 'Business Development & Innovation') { 
        [CoreTitle, description, icon].forEach(show);
    } else if (category === 'Grow Your Business with Avers Today') { 
        [description, description2, icon, CoreTitle, AltTitle1, AltTitle2, AltTitle3, AltTitle4].forEach(show);
    } else if (category === 'Rapid Prototype and Development') { 
        [UstTitle, CoreTitle, description, description2].forEach(show);
    } else if (category === 'Simple Easy Steps to Follow') { 
        [icon, CoreTitle, description].forEach(show);
    } else if (category === 'A Great Team for Quality Results') { 
        [CoreTitle, description].forEach(show);
    } else if (category === 'What People Say') { 
        [description, icon, AltTitle1, AltTitle2].forEach(show);
    }
}

// ============ GET ALL ABOUT ============
// function getAllAbout() {
//     fetch("https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo")
//         .then(res => res.json())
//         .then(data => {
//             const tbody = document.querySelector('.avers-table tbody');
//             tbody.innerHTML = '';
            
//             const transformedData = data.map(item => ({
//                 id: item.id,
//                 category: item.category,
//                 title: item.CoreTitle || item.UstTitle || 'Başlıqsız',
//                 description: item.Description ? item.Description.substring(0, 50) + '...' : '-',
//                 statusBadge: item.status == "1" || item.status == 1
//                     ? '<span class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Aktiv</span>'
//                     : '<span class="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Deaktiv</span>'
//             }));
            
//             const filterCategory = document.getElementById('filterCategory')?.value;
//             const filteredData = filterCategory && filterCategory !== 'Hamısı'
//                 ? transformedData.filter(item => item.category === filterCategory)
//                 : transformedData;
            
//             filteredData.forEach(item => {
//                 tbody.innerHTML += `
//                     <tr class="hover:bg-slate-50 transition-colors">
//                         <td class="p-4 text-sm font-medium">${item.id}</td>
//                         <td class="p-4 text-sm font-medium text-slate-800">${item.category}</td>
//                         <td class="p-4 text-sm font-medium text-slate-800">${item.title}</td>
//                         <td class="p-4 text-sm text-slate-600 max-w-xs truncate">${item.description}</td>
//                         <td class="p-4">${item.statusBadge}</td>
//                         <td class="p-4">
//                             <div class="flex items-center gap-2">
//                                 <button onclick="editAbout(${item.id})" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition">
//                                     <i class="fas fa-edit text-sm"></i>
//                                 </button>
//                                 <button onclick="deleteAbout(${item.id})" class="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition">
//                                     <i class="fas fa-trash text-sm"></i>
//                                 </button>
//                             </div>
//                         </td>
//                     </tr>
//                 `;
//             });
//         })
//         .catch(err => {
//             console.error('Xəta:', err);
//             alert('Məlumatları yükləmək mümkün olmadı');
//         });
// }

// ƏVVƏLKİ funksiyanı BU ilə əvəz et:
function getAllAbout() {
    fetch("https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo")
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('aboutTableBody');
            if (!tbody) return;
            
            tbody.innerHTML = '';

            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-slate-50 transition-colors';

                // Status badge
                const statusBadge = item.status == "1" || item.status == 1
                    ? '<span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Aktiv</span>'
                    : '<span class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Deaktiv</span>';

                // Boş yoxlama funksiyası
                const checkEmpty = (val) => {
                    if (!val || val === null || val === undefined || val === '') {
                        return '<span class="text-slate-300 italic">Yazilmir</span>';
                    }
                    // Uzun mətnləri kəs
                    if (val.length > 40) {
                        return `<span title="${val}">${val.substring(0, 40)}...</span>`;
                    }
                    return val;
                };

                // Icon göstərici
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

// ============ SEND ABOUT (NULL ilə göndər) ============
function sendAbout() {
    const category = document.getElementById('aboutCategory').value;
    
    // ✅ BÜTÜN FIELD-LƏRİ NULL OLARAQ BAŞLAT
    const data = {
        category: category,
        status: document.getElementById('aboutStatusReal')?.value || "1",
        UstTitle: null,
        CoreTitle: null,
        Description: null,
        Description2: null,
        Icon: null,
        AltTitle1: null,
        AltTitle2: null,
        AltTitle3: null,
        AltTitle4: null
    };

    // HTML ID-ləri -> API adları
    const fieldMap = {
        'UstTitle': 'aboutTitleUst',
        'CoreTitle': 'aboutTitleCore',
        'Description': 'aboutDescription',
        'Description2': 'aboutDescription2',
        'Icon': 'aboutIcon',
        'AltTitle1': 'aboutTitleAlt1',
        'AltTitle2': 'aboutTitleAlt2',
        'AltTitle3': 'aboutTitleAlt3',
        'AltTitle4': 'aboutTitleAlt4'
    };

    // Dolu olanları yaz, boş qalanlar null qalır
    for (const [apiName, htmlId] of Object.entries(fieldMap)) {
        const el = document.getElementById(htmlId);
        if (el && el.value.trim() !== '') {
            data[apiName] = el.value.trim();
        }
        // Boşdursa null qalır (default olaraq null yazdıq)
    }

    fetch('https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
    })
    .then(result => {
        alert('Məlumat əlavə edildi! ID: ' + result.id);
        openAbout();
        getAllAbout();
        clearForm();
    })
    .catch(err => {
        console.error('Xəta:', err);
        alert('Xəta baş verdi: ' + err.message);
    });
}

// ============ DELETE ABOUT ============
function deleteAbout(id) {
    if (!confirm('Bu məlumatı silmək istədiyinizə əminsiniz?')) return;
    
    fetch(`https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        alert('Məlumat silindi');
        getAllAbout();
    })
    .catch(err => {
        console.error('Xəta:', err);
        alert('Silə bilmədik');
    });
}

// ============ YARDIMÇI FUNKSİYALAR ============
function clearForm() {
    const ids = ['aboutTitleUst', 'aboutTitleCore', 'aboutDescription', 'aboutDescription2', 
                 'aboutIcon', 'aboutTitleAlt1', 'aboutTitleAlt2', 'aboutTitleAlt3', 'aboutTitleAlt4'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    
    const statusEl = document.getElementById('aboutStatusReal');
    if (statusEl) statusEl.value = '1';
    
    const firstCategory = document.getElementById('aboutCategory')?.value;
    if (firstCategory) updateFields(firstCategory);
}

// function editAbout(id) {
//     console.log('Edit about:', id);
//     alert('Edit about hazirlaniyooreee,yzb qtrmamism~~s:): ' + id);
// }

// ============ SƏHİFƏ YÜKLƏNƏNDƏ ============
document.addEventListener('DOMContentLoaded', function () {
    const firstCategory = document.getElementById('aboutCategory')?.value;
    if (firstCategory) updateFields(firstCategory);
    
    getAllAbout();
});








// Edit deyisenleri
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

//GET ALL 
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