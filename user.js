const BASE_URL ='http://localhost:8000';

window.onload = async () => {
    await loadData();
}

    const loadData = async () => {
        
        console.log('user page loaded')
        //1. load user ทั้งหมด จาก api ที่เตรียมไว้
        const response = await axios.get(`${BASE_URL}/users`);

        console.log(response.data);
        

        
        //2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html (แสดงในรูป html)
        const userDOM = document.getElementById('user');
        
        let htmlData = '<div>'
            htmlData = '<table>'
        for (let i = 0; i < response.data.length; i++) {
            let user = response.data[i];
            htmlData += `<div>
            
            
                <tr>
                    <td> ${user.id} </td>
                    <td> ${user.firstname} </td>
                    <td>${user.lastname}</td>
                    <td>${user.age}</td>
                    <td>${user.gender}</td>
                    <td>
                        <a href = 'index4_px_vh_vw.html?id=${user.id}'>
                            <button class="buttom">Edit</button>
                        </a>
                    </td>
                    <td>
                    <button class ="delete" data-id = '${user.id}'>Delete</button>
                    </td>
                </tr>
            
            
            
            </div>`
        }
        htmlData += '</table>'
        htmlData += `</div>`
        userDOM.innerHTML = htmlData;


    //3. ลบ user โดยการกดปุ่ม delete
    const deleteDOMs = document.getElementsByClassName('delete');
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            //ดึง id ของ user ที่ต้องการลบ
            const id = event.target.dataset.id;
            try{
                await axios.delete(`${BASE_URL}/users/${id}`);
                loadData(); //recursive function คือ การเรียกฟังก์ชันตัวเอง
            }catch(error){
                console.log('error', error);
            }
        })
    } // ลบเสร็จ ก็จะกลับไปโหลดข้อมูลใหม่ ที่ข้อ1.
    
}