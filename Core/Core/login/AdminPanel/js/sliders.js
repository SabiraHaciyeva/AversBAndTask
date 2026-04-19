// ============ GET ALL SLIDE ============
function getAllSliders() {
    fetch("https://69e2d0313327837a1552a346.mockapi.io/admin/slider/slider")
        .then(res => res.json())
        .then(slide => {
            const tbody = document.querySelector('.avers-table tbody');
            tbody.innerHTML = '';
            // Esas js html yaradan
            slide.forEach(item => {
                tbody.innerHTML += `
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-5 text-sm font-medium w-20">${item.id}</td>
                        <td class="p-4">
                            <img src="${item.icon}" class="w-18 h-16 object-cover rounded-lg">
                        </td>
                        <td class="p-4 w-35 text-sm font-medium text-slate-800">${item.title}</td>
                        <td class="p-4 w-45 text-sm text-slate-600 max-w-xs truncate">${item.image}</td>
                        
                        <td class="p-4 text-sm text-slate-600">${item.sira}</td>
                        <td class="p-4">
                            <span class="px-3 py-1 rounded-full text-xs font-medium ${item.status == 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                                ${item.status == 1 ? 'Aktiv' : 'Deaktiv'}
                            </span>
                        </td>
                        <td class="p-4">
                            <div class="flex items-center gap-2">
                               <!-- BU DÜYMƏNİ ƏLAVƏ EDİN -->
                                    <button onclick="editSlider(${item.Id})" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition">
                                        <i class="fas fa-edit text-xs"></i>
                                    </button>
                                    <button onclick="deleteSliders(${item.Id})" class="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition">
                                        <i class="fas fa-trash text-xs"></i>
                                    </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.error('Xəta:', err);
            alert('Xəbərləri yükləmək mümkün olmadı');
        });
}

// Send
function sendSliders() {
    const title = document.getElementById('sliderTitle').value;
    const image = document.getElementById('sliderImage').value;
    const sira = document.getElementById('sliderSira').value;
    const icon = document.getElementById('sliderIcon').value;
    const status = document.getElementById('sliderStatus').value;

    if (!title || !image) {
        alert('Title və Image boş ola bilməz!');
        return;
    }

    const data = {
        title: title,
        image: image,
        icon: icon,
        sira: sira,
        status: parseInt(status) || 1
    };

    fetch('https://69e2d0313327837a1552a346.mockapi.io/admin/slider/slider', {
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
            alert('Xəbər əlavə edildi! ID: ' + result.id);
            openSliders();
            getAllSliders();
            // refreshleyor inputu bu strukdurda yazilcaq hamsi--s
            document.getElementById('sliderTitle').value = '';
            document.getElementById('sliderImage').value = '';
            document.getElementById('sliderSira').value = '';
            document.getElementById('sliderIcon').value = '';
            document.getElementById('sliderStatus').value = '1';
        })
        .catch(err => {
            console.error('Xəta:', err);
            alert('Xəta baş verdi: ' + err.message);
        });
}

// Slayd delete
function deleteSliders(id) {
    if (!confirm('Bu xəbəri silmək istədiyinizə əminsiniz?')) return;

    fetch(`https://69e2d0313327837a1552a346.mockapi.io/admin/slider/slider/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            alert('Xəbər silindi');
            getAllSliders();
        })
        .catch(err => {
            console.error('Xəta:', err);
            alert('Silə bilmədik');
        });
}



//Modal cntrl
let modalSliders = document.getElementById('modalSliders')
function openSliders() {
    modalSliders.style.display === 'none' ? modalSliders.style.display = 'flex' : modalSliders.style.display = 'none'
}





// Edit slider eyni yazmisam ama islemir baxarsan
function editSlider(id) {
    fetch(`https://69e2d0313327837a1552a346.mockapi.io/admin/slider/slider/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log('Gələn ID:', id);  // ← BU SƏTRİ ƏLAVƏ EDİN
            console.log('API-dən gələn data:', data);
            // Modal input-larını doldurru 1in yazib kopyla yapisdir etmise niyese burda tapmir
            document.getElementById('editSliderId').value = data.id;
            document.getElementById('editSliderTitle').value = data.Title || '';
            document.getElementById('editSliderImage').value = data.Image || '';
            document.getElementById('editSliderIcon').value = data.Icon || '';
            document.getElementById('editSliderSira').value = data.Sira || '';
            document.getElementById('editSliderStatus').value = data.Status == "1" || data.Status == 1 ? "1" : "0";

            openEditSliderModal();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => {
            console.error('Xəta:', err);
            alert('Slaydı yükləmək mümkün olmadı');
        });
}

// Update slider
function updateSlider() {
    const id = document.getElementById('editSliderId').value;
    if (!id) return alert("Zəhmət olmasa cədvəldən bir slayd seçin!");

    const data = {
        Title: document.getElementById('editSliderTitle').value.trim(),
        Image: document.getElementById('editSliderImage').value.trim(),
        Icon: document.getElementById('editSliderIcon').value.trim(),
        Sira: document.getElementById('editSliderSira').value,
        Status: document.getElementById('editSliderStatus').value
    };

    fetch(`https://69e2d0313327837a1552a346.mockapi.io/admin/slider/slider/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        })
        .then(() => {
            alert("Slayd uğurla yeniləndi!");
            getAllSliders();
            closeEditSliderModal();
        })
        .catch(err => {
            console.error('Xəta:', err);
            alert('Xəta baş verdi: ' + err.message);
        });
}


// Modal 2 controllerdir
function openEditSliderModal() {
    document.getElementById('modalEditSlider').style.display = 'flex';
}

function closeEditSliderModal() {
    document.getElementById('modalEditSlider').style.display = 'none';
    document.getElementById('editSliderId').value = '';
    document.getElementById('editSliderTitle').value = '';
    document.getElementById('editSliderImage').value = '';
    document.getElementById('editSliderIcon').value = '';
    document.getElementById('editSliderSira').value = '';
    document.getElementById('editSliderStatus').value = '1';
}
document.addEventListener('DOMContentLoaded', getAllSliders);