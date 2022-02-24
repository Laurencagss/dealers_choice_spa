const ul = document.querySelector('ul');

ul.addEventListener('click', async(ev)=>{
    if(ev.target.tagName === 'LI'){
        const id = ev.target.getAttribute('data-id');
        await axios.delete(`/terraces/${id}`);
        console.log(id);
        setUp();
    }
});

const setUp = async()=>{
    const response = await axios.get('/terrace');
    const terraces = response.data;

    const html = terraces.map(terrace=>{
        return `
            <li data-id='${terrace.id}'>${terrace.name}</li>
        `
    }).join('');

    ul.innerHTML = html;
};

setUp();