function getAllNews() {
    fetch("https://69b3c525e224ec066bdd09b4.mockapi.io/news")
        .then(res => res.json())
        .then(news => {
            const tbody = document.querySelector('.avers-table tbody');
            
            tbody.innerHTML = '';//g yazdi maplemek apila
            news.forEach(item => {
                tbody.innerHTML += `
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="p-4 text-sm font-medium">${item.id}</td>
                        <td class="p-4">
                            <img src="${item.image}" class="w-16 h-16 object-cover rounded-lg">
                        </td>
                        <td class="p-4 text-sm font-medium text-slate-800">${item.title}</td>
                        <td class="p-4 text-sm text-slate-600 max-w-xs truncate">${item.image}</td>
                        <td class="p-4 text-sm">
                            <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">${item.category}</span>
                        </td>
                        <td class="p-4 text-sm text-slate-600">${item.day} ${item.month}</td>
                        <td class="p-4 text-sm text-slate-600">${item.author}</td>
                        <td class="p-4">
                            <span class="px-3 py-1 rounded-full text-xs font-medium ${item.status == 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                                ${item.status == 1 ? 'Aktiv' : 'Deaktiv'}
                            </span>
                        </td>
                        <td class="p-4">
                            <div class="flex items-center gap-2">
                                <button onclick="editNews(${item.id})" class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition">
                                    <i class="fas fa-edit text-sm"></i>
                                </button>
                                <button onclick="deleteNews(${item.id})" class="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition">
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
            alert('Xəbərləri yükləmək mümkün olmadı');
        });
}

//Send news
function sendNews() {
    const title = document.getElementById('newsTitle').value;
    const image = document.getElementById('newsImage').value;
    const day = document.getElementById('newsDay').value;
    const month = document.getElementById('newsMonth').value;
    const category = document.getElementById('newsCategory').value;
    const author = document.getElementById('newsAuthor').value;
    const status = document.getElementById('newsStatus').value;

    if (!title || !image) {
        alert('Title və Image boş ola bilməz!');
        return;
    }

    const data = {
        title: title,
        image: image,
        day: day ,
        month: month,
        category: category,
        author: author,
        status: parseInt(status) || 1
    };

    fetch('https://69b3c525e224ec066bdd09b4.mockapi.io/news', {
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
        
        openNews();
        
        getAllNews();
        
        // refresh inptu
        document.getElementById('newsTitle').value = '';
        document.getElementById('newsImage').value = '';
        document.getElementById('newsDay').value = '';
        document.getElementById('newsMonth').value = '';
        document.getElementById('newsCategory').value = '';
        document.getElementById('newsAuthor').value = '';
        document.getElementById('newsStatus').value = '1';
    })
    .catch(err => {
        console.error('Xəta:', err);
        alert('Xəta baş verdi: ' + err.message);
    });
}

// Delete new
function deleteNews(id) {
    if (!confirm('Bu xəbəri silmək istədiyinizə əminsiniz?')) return;
    
    fetch(`https://69b3c525e224ec066bdd09b4.mockapi.io/news/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        alert('Xəbər silindi');
        getAllNews();
    })
    .catch(err => {
        console.error('Xəta:', err);
        alert('Silə bilmədik');
    });
}




let modalNews=document.getElementById('modalNews')
function openNews(){
    modalNews.style.display==='none'? modalNews.style.display='flex': modalNews.style.display='none'
}

document.addEventListener('DOMContentLoaded', getAllNews);