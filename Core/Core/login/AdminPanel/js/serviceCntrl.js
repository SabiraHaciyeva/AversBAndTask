function getAllServices() {
    fetch("https://69b3c525e224ec066bdd09b4.mockapi.io/services")
        .then(res => res.json())
        .then(services => {
            const tbody = document.querySelector('.avers-table tbody');
            tbody.innerHTML = '';
            // Esas js + html yazan
            services.forEach(item => {
                tbody.innerHTML += `
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-4 text-sm font-medium">${item.id}</td>
                        <td class="p-4">
                            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white">
                                <i class="${item.icon}"></i>
                            </div>
                        </td>
                        <td class="p-4 text-sm font-medium text-slate-800">${item.title}</td>
                        <td class="p-4 text-sm text-slate-600 max-w-xs truncate">${item.image}</td>
                        <td class="p-4 text-sm">${item.sira}</td>
                        <td class="p-4">
                            <span class="px-3 py-1 rounded-full text-xs font-medium ${item.status == 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                                ${item.status == 1 ? 'Aktiv' : 'Deaktiv'}
                            </span>
                        </td>
                        <td class="p-4">
                            <div class="flex items-center gap-2">
                                <button onclick="editService(${item.id})" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition">
                                    <i class="fas fa-edit text-sm"></i>
                                </button>
                                <button onclick="deleteService(${item.id})" class="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition">
                                    <i class="fas fa-trash text-sm"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.error('Xəta:', err);
            alert('Xidmətləri yükləmək mümkün olmadı');
        });
}




function sendServices() {
    const title = document.getElementById('serviceTitle').value;
    const image = document.getElementById('serviceImage').value;
    const icon = document.getElementById('serviceIcon').value;
    const sira = document.getElementById('serviceSira').value;
    const status = document.getElementById('serviceStatus').value; 

    if (!title || !image) {
        alert('Title və Image boş ola bilməz!');
        return;
    }

    const data = {
        title: title,
        icon: icon || 'fas fa-briefcase',
        image: image,
        sira: parseInt(sira) || 1,
        status: parseInt(status) 
    };

    fetch('https://69b3c525e224ec066bdd09b4.mockapi.io/services', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        alert('Xidmət əlavə edildi! ID: ' + result.id);
        openservices();
        getAllServices(); 
        // refresh inutp
        document.getElementById('serviceTitle').value = '';
        document.getElementById('serviceImage').value = '';
        document.getElementById('serviceIcon').value = '';
        document.getElementById('serviceSira').value = '';
        document.getElementById('serviceStatus').value = '1'; // Default Aktiv
    })
    .catch(err => {
        console.error('Xəta:', err);
        alert('Xəta baş verdi');
    });
}
// Delete xidmet
function deleteService(id) {
    if (!confirm('Bu xidməti silmək istədiyinizə əminsiniz?')) return;
    
    fetch(`https://69b3c525e224ec066bdd09b4.mockapi.io/services/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        alert('Xidmət silindi');
        getAllServices(); // Siyahını yenilə
    })
    .catch(err => {
        console.error('Xəta:', err);
    });
}


// Edit service
function editService(id) {
    fetch(`https://69b3c525e224ec066bdd09b4.mockapi.io/services/${id}`)
        .then(res => res.json())
        .then(data => {
            // inp'lerin icin dolduur
            document.getElementById('editServiceId').value = data.id;
            document.getElementById('editServiceTitle').value = data.title || '';
            document.getElementById('editServiceImage').value = data.image || '';
            document.getElementById('editServiceIcon').value = data.icon || '';
            document.getElementById('editServiceSira').value = data.sira || '';
            document.getElementById('editServiceStatus').value = data.status == 1 ? "1" : "0";

            openEditServiceModal();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => {
            console.error('Xəta:', err);
            alert('Xidməti yükləmək mümkün olmadı');
        });
}

//Update service
function updateService() {
    const id = document.getElementById('editServiceId').value;
    if (!id) return alert("Zəhmət olmasa cədvəldən bir xidmət seçin!");

    const data = {
        title: document.getElementById('editServiceTitle').value.trim(),
        image: document.getElementById('editServiceImage').value.trim(),
        icon: document.getElementById('editServiceIcon').value.trim(),
        sira: parseInt(document.getElementById('editServiceSira').value) || 1,
        status: parseInt(document.getElementById('editServiceStatus').value)
    };

    fetch(`https://69b3c525e224ec066bdd09b4.mockapi.io/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
    })
    .then(() => {
        alert("Xidmət uğurla yeniləndi!");
        getAllServices();
        closeEditServiceModal();
    })
    .catch(err => {
        console.error('Xəta:', err);
        alert('Xəta baş verdi: ' + err.message);
    });
}

function openEditServiceModal() {
    document.getElementById('modalEditService').style.display = 'flex';
}

function closeEditServiceModal() {
    document.getElementById('modalEditService').style.display = 'none';
    document.getElementById('editServiceId').value = '';
    document.getElementById('editServiceTitle').value = '';
    document.getElementById('editServiceImage').value = '';
    document.getElementById('editServiceIcon').value = '';
    document.getElementById('editServiceSira').value = '';
    document.getElementById('editServiceStatus').value = '1';
}

document.addEventListener('DOMContentLoaded', getAllServices);